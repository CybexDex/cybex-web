import alt from "alt-instance";
import IntlActions from "actions/IntlActions";
import SettingsActions from "actions/SettingsActions";
import counterpart from "counterpart";
var locale_en = require("json-loader!assets/locales/locale-en");
var locale_cn = require("json-loader!assets/locales/locale-zh");
import ls from "common/localStorage";
let ss = new ls("__graphene__");

counterpart.registerTranslations("zh", locale_cn);
counterpart.registerTranslations("en", locale_en);
counterpart.setFallbackLocale("zh");

import {
    addLocaleData
} from "react-intl";

import localeCodes from "assets/locales";
for (let localeCode of localeCodes) {
    addLocaleData(require(`react-intl/locale-data/${localeCode}`));
}

class IntlStore {
    constructor() {
        // 初始化默认语言

        this.locales = ["zh", "en"];
        this.localesObject = {
            en: locale_en,
            zh: locale_cn
        };
        let currentLocale = this.currentLocale = ss.has("settings_v3") ? ss.get("settings_v3").locale : "zh";
        
        this.switchLocale(currentLocale);

        this.bindListeners({
            onSwitchLocale: IntlActions.switchLocale,
            onGetLocale: IntlActions.getLocale,
            onClearSettings: SettingsActions.clearSettings
        });
    }

    hasLocale(locale) {
        return this.locales.indexOf(locale) !== -1;
    }

    getCurrentLocale() {
        return this.currentLocale;
    }

    onSwitchLocale({
        locale,
        localeData
    }) {
        switch (locale) {
            case "en":
                counterpart.registerTranslations("en", this.localesObject.en);
                break;
            case "zh":
                counterpart.registerTranslations("zh", this.localesObject.zh);
                break;

            default:
                counterpart.registerTranslations(locale, localeData);
                break;
        }

        counterpart.setLocale(locale);
        this.currentLocale = locale;
    }

    switchLocale(locale) {
        if (locale in this.localesObject) {
            counterpart.registerTranslations(locale, this.localesObject[locale]);
            counterpart.setLocale(locale);
            this.currentLocale = locale;
        }
    }

    onGetLocale(locale) {
        if (this.locales.indexOf(locale) === -1) {
            this.locales.push(locale);
        }
    }

    onClearSettings() {
        this.onSwitchLocale({
            locale: "zh"
        });
    }
}

export default alt.createStore(IntlStore, "IntlStore");