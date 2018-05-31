import alt from "alt-instance";

import localeCodes from "assets/locales";

class IntlActions {
  switchLocale(locale) {
    // var locale = "cn"
    // console.debug("[IntlStore]Translate: ", locale);
    if (/cn|en/.test(locale)) {
      return { locale };
    }
    return dispatch => {
      import("assets/locales/locale-" + locale + ".json")
        .then(result => {
          dispatch({
            locale,
            localeData: result
          });
        })
        .catch(err => {
          console.log("fetch locale error:", err);
          return dispatch => {
            // Translate: 异常返回
            // dispatch({locale: ""});
            dispatch({ locale: "zh" });
          };
        });
    };
  }

  getLocale(locale) {
    return locale;
  }
}

export default alt.createActions(IntlActions);
