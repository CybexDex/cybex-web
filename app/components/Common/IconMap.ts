const icons = {
  add: {
    base: require("./icons/ic_star.svg")
  },
  star: {
    base: require("./icons/ic_star.svg")
  },
  exchange: {
    base: require("./icons/ic_exchange.svg"),
    active: require("./icons/ic_exchange_active.svg")
  },
  explorer: {
    base: require("./icons/ic_explorer.svg"),
    active: require("./icons/ic_explorer_active.svg")
  },
  gateway: {
    base: require("./icons/ic_gateway.svg"),
    active: require("./icons/ic_gateway_active.svg")
  },
  settings: {
    base: require("./icons/ic_settings.svg"),
    active: require("./icons/ic_settings_active.svg")
  },
  faq: {
    base: require("./icons/ic_faq.svg"),
    active: require("./icons/ic_faq_active.svg")
  },
  logout: {
    base: require("./icons/ic_logout.svg")
  },
  checkbox: {
    base: require("./icons/ic_check_box.svg"),
    active: require("./icons/ic_check_box_active.svg"),
    master: require("./icons/ic_add_box_active.svg"),
    disabledAcitve: require("./icons/ic_check_box_active_disabled.svg")
  },
  radio: {
    base: require("./icons/ic_radio.svg"),
    active: require("./icons/ic_radio_active.svg"),
    disabledAcitve: require("./icons/ic_radio_active_disabled.svg")
  },
  lock: {
    base: require("./icons/ic_lock_outline.svg")
  },
  lockWhite: {
    base: require("./icons/ic_info_outline_white.svg")
  },
  info: {
    base: require("./icons/ic_info_outline_orange.svg")
  },
  avatarWhite: {
    base: require("./icons/ic_avatar_white.svg"),
    error: require("./icons/ic_avatar_red.svg")
  },
  avatar: {
    base: require("./icons/ic_avatar_24px.svg"),
    error: require("./icons/ic_avatar_red.svg")
  },
  visibility: {
    base: require("./icons/ic_visibility_on.svg"),
    off: require("./icons/ic_visibility_off.svg")
  },
  cloudWallet: {
    base: require("./icons/Icon_Cloud_Wallet.svg"),
  },
  localWallet: {
    base: require("./icons/Icon_Local_Wallet.svg"),
  },
  singleAccount: {
    base: require("./icons/Icon_Single_Account.svg"),
  },
};

export const getIcon = (icon, type = "base") =>
  icons[icon] && icons[icon][type]
    ? icons[icon][type]
    : icons[icon]
      ? icons[icon]["base"]
      : icons["add"]["base"];
