import EventEmitter from 'events';
import Translator from '../';

describe('Translator', () => {
  let t;

  beforeEach(() => {
    t = new Translator({});
  });

  it('subclasses EventEmitter', () => {
    expect(t).toBeInstanceOf(EventEmitter);
  });

  describe('getTranslations()', () => {
    it('returns the translations provided to the constructor', () => {
      const translations = { foo: { bar: 'baz' } };
      t = new Translator(translations);
      expect(t.getTranslations()).toBe(translations);
    });
  });

  describe('setTranslations()', () => {
    it('replaces the current translations', () => {
      const translations = { foo: { bar: 'baz' } };
      t.setTranslations(translations);
      expect(t.getTranslations()).toBe(translations);
    });
  });

  describe('mergeTranslations()', () => {
    it('merges provided translations into the existing', () => {
      t = new Translator({ a: { x: 1, y: 2 }, b: { z: 3 } });
      t.mergeTranslations({ a: { y: 4, z: 5 }, c: { w: 6 } });
      expect(t.getTranslations()).toEqual({ a: { x: 1, y: 4, z: 5 }, b: { z: 3 }, c: { w: 6 } })
    });

    it('does not alter the existing or new translations', () => {
      const existing = { a: 1 };
      const toMerge = { b: 2 };
      t = new Translator(existing);
      t.mergeTranslations(toMerge);
      expect(existing).toEqual({ a: 1 });
      expect(toMerge).toEqual({ b: 2 });
    });
  });

  describe('getInterpolations()', () => {
    it('returns the interpolations provided as option to the constructor', () => {
      const interpolations = { foo: { bar: 'baz' } };
      t = new Translator({}, { interpolations });
      expect(t.getInterpolations()).toBe(interpolations);
    });
  });

  describe('setInterpolations()', () => {
    it('replaces the current interpolations', () => {
      const interpolations = { foo: { bar: 'baz' } };
      t.setInterpolations(interpolations);
      expect(t.getInterpolations()).toBe(interpolations);
    });
  });

  describe('mergeInterpolations()', () => {
    it('merges provided interpolations into the existing', () => {
      t = new Translator({}, { interpolations: { a: { x: 1, y: 2 }, b: { z: 3 } } });
      t.mergeInterpolations({ a: { y: 4, z: 5 }, c: { w: 6 } });
      expect(t.getInterpolations()).toEqual({ a: { x: 1, y: 4, z: 5 }, b: { z: 3 }, c: { w: 6 } })
    });

    it('does not alter the existing or new interpolations', () => {
      const existing = { a: 1 };
      const toMerge = { b: 2 };
      t = new Translator({}, { interpolations: existing });
      t.mergeInterpolations(toMerge);
      expect(existing).toEqual({ a: 1 });
      expect(toMerge).toEqual({ b: 2 });
    });
  });

  describe('getLocale()', () => {
    it('returns en by default', () => {
      expect(t.getLocale()).toBe('en');
    });

    it('returns the locale provided as option to the constructor', () => {
      t = new Translator({}, { locale: 'foo' });
      expect(t.getLocale()).toBe('foo');
    });
  });

  describe('setLocale()', () => {
    it('changes the locale used', () => {
      t.setLocale('foo');
      expect(t.getLocale()).toBe('foo');
    });

    it('returns the previously stored locale', () => {
      const current = t.getLocale();
      expect(t.setLocale(current + 'x')).toBe(current);
    });

    describe('when called with a locale that is distinct from the current', () => {
      it('emits a localechange event', () => {
        t.emit = jest.fn();
        const current = t.getLocale();
        t.setLocale(current + 'x');
        expect(t.emit).toHaveBeenCalledWith('localechange', current + 'x', current);
      });
    });

    describe('when called with the current locale', () => {
      it('does not emit a localechange event', () => {
        t.emit = jest.fn();
        t.setLocale(t.getLocale());
        expect(t.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('getFallbackLocale()', () => {
    it('returns null by default', () => {
      expect(t.getFallbackLocale()).toBe(null);
    });

    it('returns the fallback locale provided as option to the constructor', () => {
      t = new Translator({}, { fallbackLocale: 'foo' });
      expect(t.getFallbackLocale()).toBe('foo');
    });
  });

  describe('setFallbackLocale()', () => {
    it('changes the fallback locale used', () => {
      t.setFallbackLocale('foo');
      expect(t.getFallbackLocale()).toBe('foo');
    });

    it('returns the previously stored fallback locale', () => {
      const current = t.getFallbackLocale();
      expect(t.setFallbackLocale(current + 'x')).toBe(current);
    });
  });

  describe('getAvailableLocales()', () => {
    it('returns the locales of the registered translations', () => {
      t = new Translator({ en: {}, de: {} });
      expect(t.getAvailableLocales()).toEqual(['en', 'de']);
    });
  });

  describe('setAvailableLocales()', () => {
    it('sets the locales available', () => {
      t.setAvailableLocales(['ru', 'it']);
      expect(t.getAvailableLocales()).toEqual(['ru', 'it']);
    });

    it('returns the previous available locales', () => {
      t = new Translator({ en: {}, de: {} });
      const current = t.getAvailableLocales();
      const previous = t.setAvailableLocales(current.concat('ru'));
      expect(previous).toEqual(current);
    });
  });

  describe('getSeparator()', () => {
    it('returns . by default', () => {
      expect(t.getSeparator()).toBe('.');
    });

    it('returns the separator provided as option to the constructor', () => {
      t = new Translator({}, { separator: '/' });
      expect(t.getSeparator()).toBe('/');
    });
  });

  describe('setSeparator()', () => {
    it('changes the separator used', () => {
      t.setSeparator('*');
      expect(t.getSeparator()).toBe('*');
    });

    it('returns the previously stored separator', () => {
      const current = t.getSeparator();
      expect(t.setSeparator(current + 'x')).toBe(current);
    });
  });

  describe('getInterpolate()', () => {
    it('returns true by default', () => {
      expect(t.getInterpolate()).toBe(true);
    });

    it('returns the interpolate flag provided as option to the constructor', () => {
      t = new Translator({}, { interpolate: false });
      expect(t.getInterpolate()).toBe(false);
    });
  });

  describe('setInterpolate()', () => {
    it('changes the interpolate flag used', () => {
      t.setInterpolate(false);
      expect(t.getInterpolate()).toBe(false);
    });

    it('returns the previously stored interpolate flag', () => {
      const current = t.getInterpolate();
      expect(t.setInterpolate(!current)).toBe(current);
    });
  });

  describe('getKeyTransformer()', () => {
    it('returns the identity function by default', () => {
      const transform = t.getKeyTransformer();
      const key = ['foo', 'bar'];
      expect(transform(key)).toBe(key);
    });

    it('returns the key transformer provided as option to the constructor', () => {
      const keyTransformer = (k) => `${k}${k}`;
      t = new Translator({}, { keyTransformer });
      expect(t.getKeyTransformer()).toBe(keyTransformer);
    });
  });

  describe('setKeyTransformer()', () => {
    it('changes the key transformer used', () => {
      const transformer = (k) => `${k}${k}`;
      t.setKeyTransformer(transformer);
      expect(t.getKeyTransformer()).toBe(transformer);
    });

    it('returns the previously stored key transformer', () => {
      const current = t.getKeyTransformer();
      expect(t.setKeyTransformer((k) => null)).toBe(current);
    });
  });

  describe('onLocaleChange()', () => {
    it('adds a listener for the localechange event', () => {
      t.addListener = jest.fn();
      const callback = () => {};
      t.onLocaleChange(callback);
      expect(t.addListener).toHaveBeenCalledWith('localechange', callback);
    });
  });

  describe('offLocaleChange()', () => {
    it('removes a listener for the localechange event', () => {
      t.removeListener = jest.fn();
      const callback = () => {};
      t.offLocaleChange(callback);
      expect(t.removeListener).toHaveBeenCalledWith('localechange', callback);
    });
  });

  describe('onTranslationNotFound()', () => {
    it('adds a listener for the localechange event', () => {
      t.addListener = jest.fn();
      const callback = () => {};
      t.onTranslationNotFound(callback);
      expect(t.addListener).toHaveBeenCalledWith('translationnotfound', callback);
    });
  });

  describe('offTranslationNotFound()', () => {
    it('removes a listener for the localechange event', () => {
      t.removeListener = jest.fn();
      const callback = () => {};
      t.offTranslationNotFound(callback);
      expect(t.removeListener).toHaveBeenCalledWith('translationnotfound', callback);
    });
  });

  describe('withLocale()', () => {
    it('temporarily changes the current locale within the callback', () => {
      const locale = t.getLocale();

      t.withLocale(locale + 'x', () => {
        expect(t.getLocale()).toBe(locale + 'x');
      });

      expect(t.getLocale()).toBe(locale);
    });

    it('allows a custom callback context to be set', () => {
      t.withLocale('foo', function() {
        expect(this.bar).toBe('baz');
      }, { bar: 'baz' })
    });

    it('does not emit a localechange event', () => {
      t.emit = jest.fn();
      t.withLocale(t.getLocale() + 'x', () => {});
      expect(t.emit).not.toHaveBeenCalled();
    });

    it('returns the return value of the callback', () => {
      expect(t.withLocale('foo', () => 'bar')).toBe('bar');
    });
  });
});
