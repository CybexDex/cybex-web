var assert = require('assert');
var time = require('time');
var translate = require('./');
var Translator = translate.Translator;

describe('translate', () => {
  var instance;

  beforeEach(() => {
    instance = new Translator();
  });

  it('is a function', () => {
    assert.isFunction(t.translate);
  });

  it('is backward-compatible', () => {
    assert.isFunction(translate);
    assert.isFunction(translate.translate);
  });

  describe('#withLocale', () => {
    it('temporarily changes the current locale within the callback', () => {
      var locale = t.getLocale();

      t.withLocale(locale + 'x', () => {
        expect(t.getLocale()).toBe(locale + 'x');
      });

      expect(t.getLocale()).toBe(locale);
    });

    it('allows a custom callback context to be set', () => {
      t.withLocale('foo', () => {
        expect(this.bar).toBe('baz');
      }, { bar: 'baz' })
    });

    it('does not emit a "localechange" event', function(done) {
      var handler = () => { done('event was emitted'); };
      t.onLocaleChange(handler);
      t.withLocale(t.getLocale() + 'x', () => {});
      t.offLocaleChange(handler);
      setTimeout(done, 100);
    });

    it('returns the return value of the callback', () => {
      var result = t.withLocale('foo', () => { return 'bar'; });
      expect(result).toBe('bar');
    });
  });

  describe('#withScope', () => {
    it('is a function', () => {
      assert.isFunction(t.withScope);
    });

    it('temporarily changes the current scope within the callback', () => {
      var scope = t._registry.scope;

      t.withScope(scope + 'x', () => {
        expect(t._registry.scope).toBe(scope + 'x');
      });

      expect(t._registry.scope).toBe(scope);
    });

    it('allows a custom callback context to be set', () => {
      t.withScope('foo', () => {
        expect(this.bar).toBe('baz');
      }, { bar: 'baz' })
    });

    it('returns the return value of the callback', () => {
      var result = t.withScope('foo', () => { return 'bar'; });
      expect(result).toBe('bar');
    });
  });

  describe('#withSeparator', () => {
    it('is a function', () => {
      assert.isFunction(t.withSeparator);
    });

    it('temporarily changes the current separator within the callback', () => {
      var separator = t.getSeparator();

      t.withSeparator(separator + 'x', () => {
        expect(t.getSeparator()).toBe(separator + 'x');
      });

      expect(t.getSeparator()).toBe(separator);
    });

    it('allows a custom callback context to be set', () => {
      t.withSeparator('foo', () => {
        expect(this.bar).toBe('baz');
      }, { bar: 'baz' })
    });

    it('returns the return value of the callback', () => {
      var result = t.withSeparator('foo', () => { return 'bar'; });
      expect(result).toBe('bar');
    });
  });

  describe('#onLocaleChange', () => {
    it('is called when the locale changes', function(done) {
      var handler = () => { done(); };
      t.onLocaleChange(handler);
      t.setLocale(t.getLocale() + 'x');
      t.offLocaleChange(handler);
    });

    it('is not called when the locale does not change', function(done) {
      var handler = () => { done('function was called'); };
      t.onLocaleChange(handler);
      t.setLocale(t.getLocale());
      t.offLocaleChange(handler);
      setTimeout(done, 100);
    });

    describe('when called', () => {
      it('exposes both the new and old locale as arguments', function(done) {
        var oldLocale = t.getLocale();
        var newLocale = oldLocale + 'x';

        var handler = function(locale, previousLocale) {
          expect(locale).toBe(newLocale);
          expect(previousLocale).toBe(oldLocale);
          done();
        };

        t.onLocaleChange(handler);
        t.setLocale(newLocale);
        t.offLocaleChange(handler);
      });
    });

    describe('when called more than 10 times', () => {
      it('does not let Node issue a warning about a possible memory leak', () => {
        var oldConsoleError = console.error;

        console.error = function(message) {
          if (/EventEmitter memory leak/.test(message)) {
            assert.fail(null, null, 'Node issues a warning about a possible memory leak', null);
          } else {
            oldConsoleError.apply(console, arguments);
          }
        };

        var handlers = [], handler, i;

        for (i = 0; i < 11; i++) {
          handler = () => {};
          t.onLocaleChange(handler);
          handlers.push(handler);
        }

        for (i = 0; i < 11; i++) {
          t.offLocaleChange(handlers[i]);
        }

        console.error = oldConsoleError
      });
    })
  });

  describe('#offLocaleChange', () => {
    it('stops the emission of events to the handler', function(done) {
      var count = 0;

      var handler = () => { count++; };

      t.onLocaleChange(handler);
      t.setLocale(t.getLocale() + 'x');
      t.setLocale(t.getLocale() + 'x');
      t.offLocaleChange(handler);
      t.setLocale(t.getLocale() + 'x');

      setTimeout(() => {
        assert.equal(count, 2, 'handler was called although deactivated');
        done();
      }, 100);
    });
  });

  describe('#onTranslationNotFound', () => {
    it('is a function', () => {
      assert.isFunction(t.onTranslationNotFound);
    });

    it('is called when the translation is missing and a fallback is provided as option', function(done) {
      var handler = () => { done(); };
      t.onTranslationNotFound(handler);
      t.translate('foo', { fallback: 'bar' });
      t.offTranslationNotFound(handler);
    });

    it('is not called when the translation is missing and no fallback is provided as option', function(done) {
      var handler = () => { done('function was called'); };
      t.onTranslationNotFound(handler);
      t.translate('foo', { fallback: undefined });
      t.offTranslationNotFound(handler);
      setTimeout(done, 100);
    });

    it('is not called when a translation exists', function(done) {
      var handler = () => { done('function was called'); };
      t.registerTranslations('xx', { foo: 'bar' });
      t.onTranslationNotFound(handler);
      t.translate('foo', { locale: 'xx', fallback: 'baz' });
      t.offTranslationNotFound(handler);
      setTimeout(done, 100);
    });

    describe('when called', () => {
      it('exposes the current locale, key, and fallback as arguments', function(done) {
        var handler = function(locale, key, fallback) {
          expect('yy').toBe(locale);
          expect('foo').toBe(key);
          expect('bar').toBe(fallback);
          done();
        };

        t.onTranslationNotFound(handler);
        t.translate('foo', { locale: 'yy', fallback: 'bar' });
        t.offTranslationNotFound(handler);
      });
    });
  });

  describe('#offTranslationNotFound', () => {
    it('is a function', () => {
      assert.isFunction(t.offTranslationNotFound);
    });

    it('stops the emission of events to the handler', function(done) {
      var count = 0;

      var handler = () => { count++; };

      t.onTranslationNotFound(handler);
      t.translate('foo', { fallback: 'bar' });
      t.translate('foo', { fallback: 'bar' });
      t.offTranslationNotFound(handler);
      t.translate('foo', { fallback: 'bar' });

      setTimeout(() => {
        assert.equal(count, 2, 'handler was called although deactivated');
        done();
      }, 100);
    });
  });

  describe('#setKeyTransformer', () => {
    var transformer = function(key, options) {
      assert.deepEqual({ locale: 'xx', bingo: 'bongo' }, options);
      return key.toLowerCase();
    };

    it('uses the custom key transformer when translating', () => {
      t.registerTranslations('xx', { foo: 'bar' });

      var translation = t.translate('FOO', { locale: 'xx', bingo: 'bongo' });
      assert.matches(translation, /missing translation/);

      t.setKeyTransformer(transformer);
      translation = t.translate('FOO', { locale: 'xx', bingo: 'bongo' });
      expect('bar').toBe(translation);
    });
  });

  describe('#translate', () => {
    it('is a function', () => {
      assert.isFunction(t.translate);
    });
  });

  describe('when called', () => {
    describe('with a non-empty string or an array as first argument', () => {
      it('does not throw an invalid argument error', () => {
        assert.doesNotThrow(() => { t.translate('foo'); },   /invalid argument/);
        assert.doesNotThrow(() => { t.translate(['foo']); }, /invalid argument/);
      });

      describe('with the default locale present', () => {
        describe('without a current scope or provided scope option', () => {
          it('generates the correct normalized keys', () => {
            expect(t.translate('foo')).toBe('missing translation: en.foo');
          });
        });

        describe('with a current scope present', () => {
          it('generates the correct normalized keys', () => {
            t.withScope('other', () => {
              expect(t.translate('foo')).toBe('missing translation: en.other.foo');
            });
          });
        });

        describe('with a scope provided as option', () => {
          it('generates the correct normalized keys', () => {
            assert.equal(t.translate('foo', { scope: 'other' }), 'missing translation: en.other.foo');
          });
        });
      });

      describe('with a different locale present', () => {
        describe('without a current scope or provided scope option', () => {
          it('generates the correct normalized keys', () => {
            t.withLocale('de', () => {
              expect(t.translate('foo')).toBe('missing translation: de.foo');
            });
          });
        });

        describe('with a current scope present', () => {
          it('generates the correct normalized keys', () => {
            t.withLocale('de', () => {
              t.withScope('other', () => {
                expect(t.translate('foo')).toBe('missing translation: de.other.foo');
              });
            });
          });
        });

        describe('with a scope provided as option', () => {
          it('generates the correct normalized keys', () => {
            t.withLocale('de', () => {
              assert.equal(t.translate('foo', { scope: 'other' }), 'missing translation: de.other.foo');
            });
          });
        });
      });

      describe('with a locale provided as option', () => {
        describe('without a current scope or provided scope option', () => {
          it('generates the correct normalized keys', () => {
            assert.equal(t.translate('foo', { locale: 'de' }), 'missing translation: de.foo');
          });
        });

        describe('with a current scope present', () => {
          it('generates the correct normalized keys', () => {
            t.withScope('other', () => {
              assert.equal(t.translate('foo', { locale: 'de' }), 'missing translation: de.other.foo');
            });
          });
        });

        describe('with a scope provided as option', () => {
          it('generates the correct normalized keys', () => {
            assert.equal(t.translate('foo', { locale: 'de', scope: 'other' }), 'missing translation: de.other.foo');
          });
        });
      });

      describe('with options provided', () => {
        it('does not mutate these options', () => {
          var options = { locale: 'en', scope: ['foo1', 'foo2'], count: 3, bar: { baz: 'bum' } };
          t.translate('boing', options);
          assert.deepEqual(options, { locale: 'en', scope: ['foo1', 'foo2'], count: 3, bar: { baz: 'bum' } });
        });
      });

      describe('with a translation for the key present', () => {
        it('returns that translation', () => {
          t.registerTranslations('en', { foo: { bar: { baz: { bam: 'boo' } } } });

          // strings
          expect(t.translate('foo.bar.baz.bam')).toBe('boo');
          assert.equal(t.translate('bar.baz.bam',         { scope: 'foo' }),          'boo');
          assert.equal(t.translate('baz.bam',             { scope: 'foo.bar' }),      'boo');
          assert.equal(t.translate('bam',                 { scope: 'foo.bar.baz' }),  'boo');

          // arrays
          assert.equal(t.translate(['foo', 'bar', 'baz', 'bam']),                                     'boo');
          assert.equal(t.translate(['bar', 'baz', 'bam'],         { scope: ['foo'] }),                'boo');
          assert.equal(t.translate(['baz', 'bam'],                { scope: ['foo', 'bar'] }),         'boo');
          assert.equal(t.translate(['bam'],                       { scope: ['foo', 'bar', 'baz'] }),  'boo');

          // mixed
          assert.equal(t.translate(['foo.bar', 'baz', 'bam']),                                 'boo');
          assert.equal(t.translate(['bar', 'baz.bam'],         { scope: 'foo' }),              'boo');
          assert.equal(t.translate(['baz', 'bam'],             { scope: 'foo.bar' }),          'boo');
          assert.equal(t.translate('bam',                      { scope: ['foo.bar', 'baz'] }), 'boo');

          // strange looking
          assert.equal(t.translate(['..foo.bar', 'baz', '', 'bam']),                                            'boo');
          assert.equal(t.translate(['bar', 'baz..bam.'],             { scope: '.foo' }),                        'boo');
          assert.equal(t.translate(['baz', null, 'bam'],             { scope: 'foo.bar.' }),                    'boo');
          assert.equal(t.translate('bam...',                         { scope: [null, 'foo..bar', '', 'baz'] }), 'boo');
        });

        describe('with a `count` provided as option', () => {
          it('correctly pluralizes the translated value', () => {
            t.registerTranslations('en', { foo: { zero: 'no items', one: 'one item', other: '%(count)s items' } });

            assert.equal(t.translate('foo', { count: 0 }),   'no items');
            assert.equal(t.translate('foo', { count: 1 }),   'one item');
            assert.equal(t.translate('foo', { count: 2 }),   '2 items');
            assert.equal(t.translate('foo', { count: 42 }),  '42 items');
          });
        });

        describe('with a `separator` provided as option', () => {
          it('correctly returns single array with key', () => {
            t.registerTranslations('en', {
              'long.key.with.dots.in.name': 'Key with dots doesn\'t get split and returns correctly',
              another: {
                key: 'bar'
              },
              mixed: {
                'dots.and': {
                  separator: 'bingo'
                }
              }
            });

            assert.equal(t.translate('long.key.with.dots.in.name', { separator: '-' }), 'Key with dots doesn\'t get split and returns correctly');
            assert.equal(t.translate('long.key.with.dots.in.name.not-found', { separator: '-' }), 'missing translation: en-long.key.with.dots.in.name.not-found');
            assert.equal(t.translate('another-key', { separator: '-' }), 'bar');
            assert.equal(t.translate('mixed-dots.and-separator', { separator: '-' }), 'bingo');
          });

          it('correctly returns nested key when using `*` as seperator', () => {
            t.registerTranslations('en', { "long": { key: { "with": { dots: { "in": { name: 'boo'  }  } } }}  });

            assert.equal(t.translate('long*key*with*dots*in*name', { separator: '*' }), 'boo');
          });
        });

        describe('with other options provided', () => {
          describe('by default', () => {
            it('interpolates these options into the translated value', () => {
              t.registerTranslations('en', { foo: 'Hi %(name)s! See you %(when)s!' });
              assert.equal(t.translate('foo', { name: 'Paul', when: 'later', where: 'home' }), 'Hi Paul! See you later!');

              t.registerTranslations('en', { foo: 'Hello %(users[0].name)s and %(users[1].name)s!' });
              assert.equal(t.translate('foo', { users: [{ name: 'Molly' }, { name: 'Polly' }] }), 'Hello Molly and Polly!');
            });

            it('interpolates the registered interpolations into the translated value', () => {
              var current = t._registry.interpolations;

              t.registerTranslations('en', {'hello':'Hello from %(brand)s!'});
              t.registerInterpolations({brand:'Z'});
              expect(t.translate('hello')).toBe('Hello from Z!');

              t._registry.interpolations = current;

              t.registerInterpolations({ app_name: 'My Cool App', question: 'How are you today?' });
              t.registerTranslations('en', { greeting: 'Welcome to %(app_name)s, %(name)s! %(question)s' });

              assert.equal(t.translate('greeting', { name: 'Martin' }), 'Welcome to My Cool App, Martin! How are you today?');
              assert.equal(t.translate('greeting', { name: 'Martin', app_name: 'The Foo App' }), 'Welcome to The Foo App, Martin! How are you today?');

              t._registry.interpolations = current;
            });
          });

          describe('with the `interpolate` options set to `false`', () => {
            it('interpolates these options into the translated value', () => {
              t.registerTranslations('en', { foo: 'Hi %(name)s! See you %(when)s!' });
              assert.equal(t.translate('foo', { interpolate: false, name: 'Paul', when: 'later', where: 'home' }), 'Hi %(name)s! See you %(when)s!');
            });
          });
        });

        describe('with the keepTrailingDot setting set to true', () => {
          it('returns the translation for keys that contain a trailing dot', () => {
            t.registerTranslations('fr', { foo: { bar: 'baz', 'With a dot.': 'Avec un point.' }, 'dot.': 'point.' });
            t._registry.keepTrailingDot = true;

            t.withLocale('fr', () => {
              expect(t.translate('foo.bar')).toBe('baz');
              expect(t.translate('foo.With a dot.')).toBe('Avec un point.');
              expect(t.translate('dot.')).toBe('point.');

              expect(t.translate('foo..bar')).toBe('baz');
              expect(t.translate('foo..With a dot.')).toBe('Avec un point.');
              expect(t.translate('.dot.')).toBe('point.');

              expect(t.translate('foo.bar.')).toBe('missing translation: fr.foo.bar.');
              expect(t.translate('foo.With a dot..')).toBe('missing translation: fr.foo.With a dot..');
              expect(t.translate('foo.With. a dot.')).toBe('missing translation: fr.foo.With. a dot.');
              expect(t.translate('dot..')).toBe('missing translation: fr.dot..');
            });
          });
        });
      });

      describe('with a translation for a prefix of the key present', () => {
        it('returns the remaining translation part', () => {
          t.registerTranslations('en', { foo: { bar: { baz: { zero: 'no items', one: 'one item', other: '%(count)s items' } } } });
          assert.deepEqual(t.translate('baz', { scope: ['foo', 'bar'] }), { zero: 'no items', one: 'one item', other: '%(count)s items' });
        });
      });

      describe('with an array-type translation for the key present', () => {
        it('returns the array that key points to', () => {
          t.registerTranslations('en', { foo: { bar: { baz: [1, 'A', 0.42] } } });
          assert.deepEqual(t.translate(['bar', 'baz'], { scope: 'foo' }), [1, 'A', 0.42]);
        });
      });

      describe('with a function-type translation for the key present', () => {
        it('returns the array that key points to', () => {
          var myFunc = () => {};

          t.registerTranslations('en', { foo: { bar: { baz: myFunc } } });
          assert.equal(t.translate(['bar', 'baz'], { scope: 'foo' }), myFunc);
        });
      });

      describe('with a function-type fallback present', () => {
        it('returns the array that key points to', () => {
          var myFunc = () => { return 'Here I am!'; };
          var myFunc2 = function(x) { return 'Here ' + x + ' are!'; };
          var fallbacks = [':i_dont_exist_either', myFunc, 'Should not be returned'];

          assert.equal(t.translate('i_dont_exist', { fallback: myFunc }), 'Here I am!');
          assert.equal(t.translate('i_dont_exist', { fallback: myFunc2, object: 'you' }), 'Here you are!');
          assert.equal(t.translate('i_dont_exist', { fallback: myFunc2 }), 'Here i_dont_exist are!');
          assert.equal(t.translate('i_dont_exist', { fallback: fallbacks }), 'Here I am!');
        });
      });

      describe('without a translation for the key present', () => {
        it('returns a string "missing translation: %(locale).%(scope).%(key)"', () => {
          assert.deepEqual(t.translate('bar', { locale: 'unknown', scope: 'foo' }), 'missing translation: unknown.foo.bar');
        });

        describe('with a `fallback` provided as option', () => {
          it('returns the fallback', () => {
            assert.equal(t.translate('baz', { locale: 'foo', scope: 'bar', fallback: 'boom' }), 'boom');
            assert.equal(t.translate('baz', { locale: 'foo', scope: 'bar', fallback: 'Hello, %(name)s!', name: 'Martin' }), 'Hello, Martin!');

            assert.equal(t.translate('bazz', { locale: 'en', scope: 'bar', fallback: { zero: 'no items', one: 'one item', other: '%(count)s items' }, count: 0 }), 'no items');
            assert.equal(t.translate('bazz', { locale: 'en', scope: 'bar', fallback: { zero: 'no items', one: 'one item', other: '%(count)s items' }, count: 1 }), 'one item');
            assert.equal(t.translate('bazz', { locale: 'en', scope: 'bar', fallback: { zero: 'no items', one: 'one item', other: '%(count)s items' }, count: 2 }), '2 items');

            assert.deepEqual(t.translate('baz', { locale: 'foo', scope: 'bar', fallback: { oh: 'yeah' } }), { oh: 'yeah' });
            assert.deepEqual(t.translate('baz', { locale: 'foo', scope: 'bar', fallback: [1, 'A', 0.42] }), 1);
          });

          it('translates the fallback if given as "symbol" or array', () => {
            t.registerTranslations('en', { foo: { bar: 'bar', baz: 'baz' } });

            assert.equal(t.translate('missing', { fallback: 'default' }), 'default');
            assert.equal(t.translate('missing', { fallback: ':foo.bar' }), 'bar');
            assert.equal(t.translate('missing', { fallback: ':bar', scope: 'foo' }), 'bar');
            assert.equal(t.translate('missing', { fallback: [':also_missing', ':foo.bar'] }), 'bar');
            assert.matches(t.translate('missing', { fallback: [':also_missing', ':foo.missed'] }), /missing translation/);
          });
        });

        describe('with a global `fallbackLocale` present', () => {
          it('returns the entry of the fallback locale', () => {
            t.registerTranslations('de', { bar: { baz: 'bam' } });
            t.registerTranslations('de', { hello: 'Hallo %(name)s!' });

            assert.equal(t.translate('baz', { locale: 'foo', scope: 'bar' }), 'missing translation: foo.bar.baz');
            assert.equal(t.translate('hello', { locale: 'foo', name: 'Martin' }), 'missing translation: foo.hello');

            var previousFallbackLocale = t.setFallbackLocale('de');

            assert.equal(t.translate('baz', { locale: 'foo', scope: 'bar' }), 'bam');
            assert.equal(t.translate('hello', { locale: 'foo', name: 'Martin' }), 'Hallo Martin!');

            t.setFallbackLocale(previousFallbackLocale);
          });
        });

        describe('with a `fallbackLocale` provided as option', () => {
          it('returns the entry of the fallback locale', () => {
            t.registerTranslations('en', { bar: { baz: 'bam' } });
            t.registerTranslations('en', { hello: 'Hello, %(name)s!' });

            assert.equal(t.translate('baz', { locale: 'foo', scope: 'bar', fallbackLocale: 'en' }), 'bam');
            assert.equal(t.translate('hello', { locale: 'foo', fallbackLocale: 'en', name: 'Martin' }), 'Hello, Martin!');
          });
        });
      });
    });

    describe('without a valid key as first argument', () => {
      it('throws an invalid argument error', () => {
        var keys = [undefined, null, 42, {}, new Date(), /./, () => {}, [], ''];

        for (var i = 0, ii = keys.length; i < ii; i++) {
          assert.throws(() => { t.translate(keys[i]); }, /invalid argument/);
        }
      });
    });

    describe('with global interpolate setting set to false', () => {
      it('will not interpolate', () => {
        var current = t._registry.interpolations;

        t.registerTranslations('en', { 'hello':'Hello from %(brand)s!' });
        t.registerInterpolations({ brand: 'Z' });

        expect(t.translate('hello')).toBe('Hello from Z!');

        var prev = t.setInterpolate(false);
        assert.equal(t.translate('hello'), 'Hello from %(brand)s!');
        assert.equal(t.translate('hello', { interpolate: true }), 'Hello from %(brand)s!');
        t.setInterpolate(prev);

        t._registry.interpolations = current;
      });
    });
  });

  describe('#localize', () => {
    before(() => {
      t.setLocale('en');
    });

    it('is a function', () => {
      assert.isFunction(t.localize);
    });

    it('does not mutate these options', () => {
      var options = { locale: 'en', scope: ['foo1', 'foo2'], count: 3, bar: { baz: 'bum' } };
      t.localize(new Date(), options);
      assert.deepEqual(options, { locale: 'en', scope: ['foo1', 'foo2'], count: 3, bar: { baz: 'bum' } });
    });

    describe('when called without a date as first argument', () => {
      it('throws an invalid argument error', () => {
        assert.throws(() => {
          t.localize('foo');
        }, /invalid argument/);
      });
    });

    describe('when called with a date as first argument', () => {
      var date = new time.Date('Thu Feb 6 2014 05:09:04 GMT+0100 (CET)');
      date.setTimezone('America/Chicago');

      describe('without providing options as second argument', () => {
        it('returns the default localization for that date', () => {
          var result = t.localize(date);
          expect(result).toBe('Wed, 5 Feb 2014 22:09');
        });
      });

      describe('providing a `format` key in the options', () => {
        describe('with format = "default"', () => {
          it('returns the default localization for that date', () => {
            var result = t.localize(date, { format: 'default' });
            expect(result).toBe('Wed, 5 Feb 2014 22:09');
          });
        });

        describe('with format = "short"', () => {
          it('returns the short localization for that date', () => {
            var result = t.localize(date, { format: 'short' });
            expect(result).toBe('5 Feb 22:09');
          });
        });

        describe('with format = "long"', () => {
          it('returns the long localization for that date', () => {
            var result = t.localize(date, { format: 'long' });
            expect(result).toBe('Wednesday, February 5th, 2014 22:09:04 -06:00');
          });
        });

        describe('with an unknown format', () => {
          it('returns a string containing "missing translation"', () => {
            var result = t.localize(date, { format: '__invalid__' });
            assert.matches(result, /missing translation/);
          });
        });
      });

      describe('providing a `type` key in the options', () => {
        describe('with type = "datetime"', () => {
          it('returns the default localization for that date', () => {
            var result = t.localize(date, { type: 'datetime' });
            expect(result).toBe('Wed, 5 Feb 2014 22:09');
          });
        });

        describe('with type = "date"', () => {
          it('returns the date localization for that date', () => {
            var result = t.localize(date, { type: 'date' });
            expect(result).toBe('Wed, 5 Feb 2014');
          });
        });

        describe('with type = "time"', () => {
          it('returns the time localization for that date', () => {
            var result = t.localize(date, { type: 'time' });
            expect(result).toBe('22:09');
          });
        });

        describe('with an unknown type', () => {
          it('returns a string containing "missing translation"', () => {
            var result = t.localize(date, { type: '__invalid__' });
            assert.matches(result, /missing translation/);
          });
        });
      });

      describe('providing both a `type` key and a `format` key in the options', () => {
        describe('with type = "datetime" and format = "default"', () => {
          it('returns the default localization for that date', () => {
            var result = t.localize(date, { type: 'datetime', format: 'default' });
            expect(result).toBe('Wed, 5 Feb 2014 22:09');
          });
        });

        describe('with type = "datetime" and format = "short"', () => {
          it('returns the short datetime localization for that date', () => {
            var result = t.localize(date, { type: 'datetime', format: 'short' });
            expect(result).toBe('5 Feb 22:09');
          });
        });

        describe('with type = "datetime" and format = "long"', () => {
          it('returns the long datetime localization for that date', () => {
            var result = t.localize(date, { type: 'datetime', format: 'long' });
            expect(result).toBe('Wednesday, February 5th, 2014 22:09:04 -06:00');
          });
        });

        describe('with type = "time" and format = "default"', () => {
          it('returns the default time localization for that date', () => {
            var result = t.localize(date, { type: 'time', format: 'default' });
            expect(result).toBe('22:09');
          });
        });

        describe('with type = "time" and format = "short"', () => {
          it('returns the short time localization for that date', () => {
            var result = t.localize(date, { type: 'time', format: 'short' });
            expect(result).toBe('22:09');
          });
        });

        describe('with type = "time" and format = "long"', () => {
          it('returns the long time localization for that date', () => {
            var result = t.localize(date, { type: 'time', format: 'long' });
            expect(result).toBe('22:09:04 -06:00');
          });
        });

        describe('with type = "date" and format = "default"', () => {
          it('returns the default date localization for that date', () => {
            var result = t.localize(date, { type: 'date', format: 'default' });
            expect(result).toBe('Wed, 5 Feb 2014');
          });
        });

        describe('with type = "date" and format = "short"', () => {
          it('returns the short date localization for that date', () => {
            var result = t.localize(date, { type: 'date', format: 'short' });
            expect(result).toBe('Feb 5');
          });
        });

        describe('with type = "date" and format = "long"', () => {
          it('returns the long date localization for that date', () => {
            var result = t.localize(date, { type: 'date', format: 'long' });
            expect(result).toBe('Wednesday, February 5th, 2014');
          });
        });

        describe('with unknown type and unknown format', () => {
          it('returns a string containing "missing translation"', () => {
            var result = t.localize(date, { type: '__invalid__', format: '__invalid__' });
            assert.matches(result, /missing translation/);
          });
        });
      });

      describe('with locale set to "de"', () => {
        var prev;

        beforeEach(() => {
          t.registerTranslations('de', require('./locales/de'));
          prev = t.setLocale('de');
        });

        afterEach(() => {
          t.setLocale(prev);
        });

        describe('without providing options as second argument', () => {
          it('returns the default localization for that date', () => {
            var result = t.localize(date);
            expect(result).toBe('Mi, 5. Feb 2014, 22:09 Uhr');
          });
        });

        describe('providing a `format` key in the options', () => {
          describe('with format = "default"', () => {
            it('returns the default localization for that date', () => {
              var result = t.localize(date, { format: 'default' });
              expect(result).toBe('Mi, 5. Feb 2014, 22:09 Uhr');
            });
          });

          describe('with format = "short"', () => {
            it('returns the short localization for that date', () => {
              var result = t.localize(date, { format: 'short' });
              expect(result).toBe('05.02.14 22:09');
            });
          });

          describe('with format = "long"', () => {
            it('returns the long localization for that date', () => {
              var result = t.localize(date, { format: 'long' });
              expect(result).toBe('Mittwoch, 5. Februar 2014, 22:09:04 -06:00');
            });
          });

          describe('with an unknown format', () => {
            it('returns a string containing "missing translation"', () => {
              var result = t.localize(date, { format: '__invalid__' });
              assert.matches(result, /missing translation/);
            });
          });
        });

        describe('providing a `type` key in the options', () => {
          describe('with type = "datetime"', () => {
            it('returns the default localization for that date', () => {
              var result = t.localize(date, { type: 'datetime' });
              expect(result).toBe('Mi, 5. Feb 2014, 22:09 Uhr');
            });
          });

          describe('with type = "date"', () => {
            it('returns the date localization for that date', () => {
              var result = t.localize(date, { type: 'date' });
              expect(result).toBe('Mi, 5. Feb 2014');
            });
          });

          describe('with type = "time"', () => {
            it('returns the time localization for that date', () => {
              var result = t.localize(date, { type: 'time' });
              expect(result).toBe('22:09 Uhr');
            });
          });

          describe('with an unknown type', () => {
            it('returns a string containing "missing translation"', () => {
              var result = t.localize(date, { type: '__invalid__' });
              assert.matches(result, /missing translation/);
            });
          });
        });

        describe('providing both a `type` key and a `format` key in the options', () => {
          describe('with type = "datetime" and format = "default"', () => {
            it('returns the default localization for that date', () => {
              var result = t.localize(date, { type: 'datetime', format: 'default' });
              expect(result).toBe('Mi, 5. Feb 2014, 22:09 Uhr');
            });
          });

          describe('with type = "datetime" and format = "short"', () => {
            it('returns the short datetime localization for that date', () => {
              var result = t.localize(date, { type: 'datetime', format: 'short' });
              expect(result).toBe('05.02.14 22:09');
            });
          });

          describe('with type = "datetime" and format = "long"', () => {
            it('returns the long datetime localization for that date', () => {
              var result = t.localize(date, { type: 'datetime', format: 'long' });
              expect(result).toBe('Mittwoch, 5. Februar 2014, 22:09:04 -06:00');
            });
          });

          describe('with type = "time" and format = "default"', () => {
            it('returns the default time localization for that date', () => {
              var result = t.localize(date, { type: 'time', format: 'default' });
              expect(result).toBe('22:09 Uhr');
            });
          });

          describe('with type = "time" and format = "short"', () => {
            it('returns the short time localization for that date', () => {
              var result = t.localize(date, { type: 'time', format: 'short' });
              expect(result).toBe('22:09');
            });
          });

          describe('with type = "time" and format = "long"', () => {
            it('returns the long time localization for that date', () => {
              var result = t.localize(date, { type: 'time', format: 'long' });
              expect(result).toBe('22:09:04 -06:00');
            });
          });

          describe('with type = "date" and format = "default"', () => {
            it('returns the default date localization for that date', () => {
              var result = t.localize(date, { type: 'date', format: 'default' });
              expect(result).toBe('Mi, 5. Feb 2014');
            });
          });

          describe('with type = "date" and format = "short"', () => {
            it('returns the short date localization for that date', () => {
              var result = t.localize(date, { type: 'date', format: 'short' });
              expect(result).toBe('05.02.14');
            });
          });

          describe('with type = "date" and format = "long"', () => {
            it('returns the long date localization for that date', () => {
              var result = t.localize(date, { type: 'date', format: 'long' });
              expect(result).toBe('Mittwoch, 5. Februar 2014');
            });
          });

          describe('with unknown type and unknown format', () => {
            it('returns a string containing "missing translation"', () => {
              var result = t.localize(date, { type: '__invalid__', format: '__invalid__' });
              assert.matches(result, /missing translation/);
            });
          });
        });
      });

      describe('with locale set to "pt-br"', () => {
        var prev;

        beforeEach(() => {
          t.registerTranslations('pt-br', require('./locales/pt-br'));
          prev = t.setLocale('pt-br');
        });

        afterEach(() => {
          t.setLocale(prev);
        });

        describe('without providing options as second argument', () => {
          it('returns the default localization for that date', () => {
            var result = t.localize(date);
            expect(result).toBe('Qua, 5 de Fev de 2014 às 22:09');
          });
        });

        describe('providing a `format` key in the options', () => {
          describe('with format = "default"', () => {
            it('returns the default localization for that date', () => {
              var result = t.localize(date, { format: 'default' });
              expect(result).toBe('Qua, 5 de Fev de 2014 às 22:09');
            });
          });

          describe('with format = "short"', () => {
            it('returns the short localization for that date', () => {
              var result = t.localize(date, { format: 'short' });
              expect(result).toBe('05/02/14 às 22:09');
            });
          });

          describe('with format = "long"', () => {
            it('returns the long localization for that date', () => {
              var result = t.localize(date, { format: 'long' });
              expect(result).toBe('Quarta-feira, 5 de Fevereiro de 2014 às 22:09:04 -06:00');
            });
          });

          describe('with an unknown format', () => {
            it('returns a string containing "missing translation"', () => {
              var result = t.localize(date, { format: '__invalid__' });
              assert.matches(result, /missing translation/);
            });
          });
        });

        describe('providing a `type` key in the options', () => {
          describe('with type = "datetime"', () => {
            it('returns the default localization for that date', () => {
              var result = t.localize(date, { type: 'datetime' });
              expect(result).toBe('Qua, 5 de Fev de 2014 às 22:09');
            });
          });

          describe('with type = "date"', () => {
            it('returns the date localization for that date', () => {
              var result = t.localize(date, { type: 'date' });
              expect(result).toBe('Qua, 5 de Fev de 2014');
            });
          });

          describe('with type = "time"', () => {
            it('returns the time localization for that date', () => {
              var result = t.localize(date, { type: 'time' });
              expect(result).toBe('22:09');
            });
          });

          describe('with an unknown type', () => {
            it('returns a string containing "missing translation"', () => {
              var result = t.localize(date, { type: '__invalid__' });
              assert.matches(result, /missing translation/);
            });
          });
        });

        describe('providing both a `type` key and a `format` key in the options', () => {
          describe('with type = "datetime" and format = "default"', () => {
            it('returns the default localization for that date', () => {
              var result = t.localize(date, { type: 'datetime', format: 'default' });
              expect(result).toBe('Qua, 5 de Fev de 2014 às 22:09');
            });
          });

          describe('with type = "datetime" and format = "short"', () => {
            it('returns the short datetime localization for that date', () => {
              var result = t.localize(date, { type: 'datetime', format: 'short' });
              expect(result).toBe('05/02/14 às 22:09');
            });
          });

          describe('with type = "datetime" and format = "long"', () => {
            it('returns the long datetime localization for that date', () => {
              var result = t.localize(date, { type: 'datetime', format: 'long' });
              expect(result).toBe('Quarta-feira, 5 de Fevereiro de 2014 às 22:09:04 -06:00');
            });
          });

          describe('with type = "time" and format = "default"', () => {
            it('returns the default time localization for that date', () => {
              var result = t.localize(date, { type: 'time', format: 'default' });
              expect(result).toBe('22:09');
            });
          });

          describe('with type = "time" and format = "short"', () => {
            it('returns the short time localization for that date', () => {
              var result = t.localize(date, { type: 'time', format: 'short' });
              expect(result).toBe('22:09');
            });
          });

          describe('with type = "time" and format = "long"', () => {
            it('returns the long time localization for that date', () => {
              var result = t.localize(date, { type: 'time', format: 'long' });
              expect(result).toBe('22:09:04 -06:00');
            });
          });

          describe('with type = "date" and format = "default"', () => {
            it('returns the default date localization for that date', () => {
              var result = t.localize(date, { type: 'date', format: 'default' });
              expect(result).toBe('Qua, 5 de Fev de 2014');
            });
          });

          describe('with type = "date" and format = "short"', () => {
            it('returns the short date localization for that date', () => {
              var result = t.localize(date, { type: 'date', format: 'short' });
              expect(result).toBe('05/02/14');
            });
          });

          describe('with type = "date" and format = "long"', () => {
            it('returns the long date localization for that date', () => {
              var result = t.localize(date, { type: 'date', format: 'long' });
              expect(result).toBe('Quarta-feira, 5 de Fevereiro de 2014');
            });
          });

          describe('with unknown type and unknown format', () => {
            it('returns a string containing "missing translation"', () => {
              var result = t.localize(date, { type: '__invalid__', format: '__invalid__' });
              assert.matches(result, /missing translation/);
            });
          });
        });
      });
    });
  });

  describe('#registerTranslations', () => {
    it('is a function', () => {
      assert.isFunction(t.registerTranslations);
    });

    it('returns the passed arguments as an object structure', () => {
      var locale = 'foo';
      var data   = { bar: { baz: 'bingo' } };

      var actual = t.registerTranslations(locale, data);

      var expected = { foo: { bar: { baz: 'bingo' }}};

      assert.deepEqual(actual, expected);
    });

    it('merges the passed arguments correctly into the registry', () => {
      t._registry.translations = {};

      t.registerTranslations('foo', { bar: { baz: 'bingo' } });
      var expected = { foo: { bar: { baz: 'bingo' } } };
      assert.deepEqual(t._registry.translations, expected);

      t.registerTranslations('foo', { bar: { bam: 'boo' } });
      var expected = { foo: { bar: { baz: 'bingo', bam: 'boo' } } };
      assert.deepEqual(t._registry.translations, expected);

      t.registerTranslations('foo', { bing: { bong: 'beng' } });
      var expected = { foo: { bar: { baz: 'bingo', bam: 'boo' }, bing: { bong: 'beng' } } };
      assert.deepEqual(t._registry.translations, expected);

      // clean up
      t._registry.translations = {};
      t.registerTranslations('en', require('./locales/en'));
    });
  });

  describe('#registerInterpolations', () => {
    it('is a function', () => {
      assert.isFunction(t.registerInterpolations);
    });

    it('merges the passed arguments correctly into the registry', () => {
      t._registry.interpolations = {};

      t.registerInterpolations({ foo: 'yes', bar: 'no' });
      assert.deepEqual(t._registry.interpolations, { foo: 'yes', bar: 'no' });

      t.registerInterpolations({ baz: 'hey' });
      assert.deepEqual(t._registry.interpolations, { foo: 'yes', bar: 'no', baz: 'hey' });

      // clean up
      t._registry.interpolations = {};
    });
  });

  describe('explicitly checking the examples of the README', () => {
    it('passes all tests', () => {
      translate.registerTranslations('en', {
        damals: {
          about_x_hours_ago: {
            one:   'about one hour ago',
            other: 'about %(count)s hours ago'
          }
        }
      });

      assert.deepEqual(translate('damals'), { about_x_hours_ago: { one: 'about one hour ago', other: 'about %(count)s hours ago' } });

      expect(translate('damals.about_x_hours_ago.one')).toBe('about one hour ago');
      assert.equal(translate(['damals', 'about_x_hours_ago', 'one']),            'about one hour ago');
      assert.equal(translate(['damals', 'about_x_hours_ago.one']),               'about one hour ago');
      assert.equal(translate('about_x_hours_ago.one', { scope: 'damals' }),      'about one hour ago');
      assert.equal(translate('one', { scope: 'damals.about_x_hours_ago' }),      'about one hour ago');
      assert.equal(translate('one', { scope: ['damals', 'about_x_hours_ago'] }), 'about one hour ago');

      assert.equal(translate('damals.about_x_hours_ago.one', { separator: '*' }), 'missing translation: en*damals.about_x_hours_ago.one');

      translate.registerTranslations('en', { foo: 'foo %(bar)s' });

      assert.equal(translate('foo', { bar: 'baz' }), 'foo baz');

      translate.registerTranslations('en', {
        x_items: {
          zero:  'No items.',
          one:   'One item.',
          other: '%(count)s items.'
        }
      });

      assert.equal(translate('x_items', { count: 0  }), 'No items.');
      assert.equal(translate('x_items', { count: 1  }), 'One item.');
      assert.equal(translate('x_items', { count: 42 }), '42 items.');

      assert.equal(translate('baz', { fallback: 'default' }), 'default');

      translate.registerTranslations('de', require('./locales/de'));
      translate.registerTranslations('de', JSON.parse('{"my_project": {"greeting": "Hallo, %(name)s!","x_items": {"one": "1 Stück", "other": "%(count)s Stücke"}}}'));

      assert.equal(translate.withLocale('de', () => { return translate('greeting', { scope: 'my_project', name: 'Martin' }); }), 'Hallo, Martin!');
      assert.equal(translate.withLocale('de', () => { return translate('x_items', { scope: 'my_project', count: 1 }); }), '1 Stück');

      var date = new time.Date('Fri Feb 21 2014 13:46:24 GMT+0100 (CET)');
      date.setTimezone('Europe/Amsterdam');

      expect(translate.localize(date)                       ).toBe('Fri, 21 Feb 2014 13:46');
      assert.equal(translate.localize(date, { format: 'short' })  , '21 Feb 13:46');
      assert.equal(translate.localize(date, { format: 'long' })   , 'Friday, February 21st, 2014 13:46:24 +01:00');

      assert.equal(translate.localize(date, { type: 'date' })                  , 'Fri, 21 Feb 2014');
      assert.equal(translate.localize(date, { type: 'date', format: 'short' }) , 'Feb 21');
      assert.equal(translate.localize(date, { type: 'date', format: 'long' })  , 'Friday, February 21st, 2014');

      assert.equal(translate.localize(date, { type: 'time' })                  , '13:46');
      assert.equal(translate.localize(date, { type: 'time', format: 'short' }) , '13:46');
      assert.equal(translate.localize(date, { type: 'time', format: 'long' })  , '13:46:24 +01:00');

      assert.equal(translate.localize(date, { locale: 'de' })  , 'Fr, 21. Feb 2014, 13:46 Uhr');

      translate.registerTranslations('en', {
        my_namespace: {
          greeting: 'Welcome to %(app_name)s, %(visitor)s!'
        }
      });

      translate.registerInterpolations({ app_name: 'My Cool App' });

      assert.equal(translate('my_namespace.greeting', { visitor: 'Martin' }), 'Welcome to My Cool App, Martin!');
      assert.equal(translate('my_namespace.greeting', { visitor: 'Martin', app_name: 'The Foo App' }), 'Welcome to The Foo App, Martin!');
    });
  });
});





/* Helper Functions */

assert.isString = function(value, message) {
  assert.equal(Object.prototype.toString.call(value), '[object String]', message || (value + ' is not a string'));
};

assert.isFunction = function(value, message) {
  assert.equal(Object.prototype.toString.call(value), '[object Function]', message || (value + ' is not a function'));
};

assert.isObject = function(value, message) {
  assert.equal(Object.prototype.toString.call(value), '[object Object]', message || (value + ' is not an object'));
};

assert.isUndefined = function(value, message) {
  assert.equal(Object.prototype.toString.call(value), '[object Undefined]', message || (value + ' is not undefined'));
};

assert.matches = function(actual, expected, message) {
  if (!expected.test(actual)) {
    assert.fail(actual, expected, message, '!~');
  }
};
