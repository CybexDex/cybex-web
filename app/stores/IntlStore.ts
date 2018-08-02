import alt from "alt-instance";
import IntlActions from "actions/IntlActions";
import SettingsActions from "actions/SettingsActions";
import counterpart from "counterpart";
// var locale_en = require("assets/locales/locale-en.json");
var locale_cn = require("assets/locales/locale-zh.json");
import ls from "common/localStorage";
let ss = new ls("__graphene__");

counterpart.registerTranslations("zh", locale_cn);
// counterpart.registerTranslations("en", locale_en);
counterpart.setFallbackLocale("zh");

import { addLocaleData } from "react-intl";

import localeCodes from "assets/locales";
import { AbstractStore } from "./AbstractStore";
for (let localeCode of localeCodes) {
  import(`react-intl/locale-data/${localeCode}`).then(res => {
    addLocaleData(res);
  });
}

const langSet = {
  en: "en-US",
  zh: "zh-CN"
};

type Locale = {
  [lang: string]: string;
};

const getLangFromNavi = () =>
  navigator.language.toLocaleLowerCase().startsWith("zh") ? "zh" : "en";

class IntlStore extends AbstractStore<{ currentLocale }> {
  locales = ["zh", "en"];
  localesObject: { [locale: string]: any } = {
    zh: locale_cn
  };
  currentLocale;
  constructor() {
    super();
    // 初始化默认语言

    let currentLocale = (this.currentLocale = ss.has("settings_v3")
      ? ss.get("settings_v3").locale
      : getLangFromNavi());

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

  onSwitchLocale({ locale, localeData }: { locale; localeData? }) {
    console.debug("new locale: ", locale, localeData);

    if (!this.localesObject[locale] && localeData) {
      this.localesObject[locale] = localeData;
    }
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

    if (document) {
      document.documentElement.lang = langSet[locale];
    }
  }

  switchLocale(locale: string) {
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
