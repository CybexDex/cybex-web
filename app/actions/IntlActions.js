import alt from "alt-instance";

// import localeCodes from "assets/locales";
const loadzh = () =>
  import(/* webpackChunkName: "locale-zh" */ "assets/locales/locale-zh.json");
const loaden = () =>
  import(/* webpackChunkName: "locale-en" */ "assets/locales/locale-en.json");
class IntlActions {
  switchLocale(locale) {
    // var locale = "cn"
    // console.debug("[IntlStore]Translate: ", locale);
    // if (/cn|zh/.test(locale)) {
    //   return { locale };
    // }
    return dispatch => {
      (locale === "cn" || locale === "zh" ? loadzh : loaden)()
        .then(result => {
          dispatch({
            locale,
            localeData: result.default
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
