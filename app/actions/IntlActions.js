import alt from "alt-instance";

import localeCodes from "assets/locales";

var locales = {};
if (__ELECTRON__) {
    localeCodes.forEach(locale => {
        locales[locale] = require(`json-loader!assets/locales/locale-${locale}.json`);
    });
}

class IntlActions {

    switchLocale(locale) {
        // var locale = "cn"
        // console.debug("[IntlStore]Translate: ", locale);
        if (/cn|en/.test(locale)) {
            return {locale};
        }
        if (__ELECTRON__) {
            return {
                locale: locale,
                localeData: locales[locale]
            };
        } else {
            return (dispatch) => {
                fetch("locale-" + locale + ".json").then( (reply) => {
                    return reply.json().then(result => {
                        dispatch({
                            locale,
                            localeData: result
                        });
                    });
                }).catch(err => {
                    console.log("fetch locale error:", err);
                    return (dispatch) => {
                        // Translate: 异常返回
                        // dispatch({locale: ""});
                        dispatch({locale: "zh"});
                    };
                });
            };

        }
    }

    getLocale(locale) {
        return locale;
    }
}

export default alt.createActions(IntlActions);
