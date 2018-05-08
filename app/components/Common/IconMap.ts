const icons = {
  add: {
    base: require("./icons/ic_star.svg")
  },
  star: {
    base: require("./icons/ic_star.svg")
  },
  exchange: {
    base: require("./icons/ic_exchange.svg"),
    active: require("./icons/ic_exchange_active.svg"),
  },
  explorer: {
    base: require("./icons/ic_explorer.svg"),
    active: require("./icons/ic_explorer_active.svg"),
  },
  gateway: {
    base: require("./icons/ic_gateway.svg"),
    active: require("./icons/ic_gateway_active.svg"),
  },
  faq: {
    base: require("./icons/ic_faq.svg"),
    active: require("./icons/ic_faq_active.svg"),
  },
  checkbox: {
    base: require("./icons/ic_check_box.svg"),
    active: require("./icons/ic_check_box_active.svg"),
    master: require("./icons/ic_add_box_active.svg"),
    disabledAcitve: require("./icons/ic_check_box_active_disabled.svg"),
  },
  radio: {
    base: require("./icons/ic_radio.svg"),
    active: require("./icons/ic_radio_active.svg"),
    disabledAcitve: require("./icons/ic_radio_active_disabled.svg"),
  }
};

export const getIcon = (icon, type = "base") =>
  icons[icon] && icons[icon][type]
    ? icons[icon][type]
    : icons[icon]
      ? icons[icon]["base"]
      : icons["add"]["base"];
