import { Colors } from "./Colors";
import chroma from "chroma-js";
import { GlobalsString, GlobalsNumber } from "csstype";
import { $breakpointSmall } from "./Breakpoints";

const TypedStyles = {
  base: {
    control: {
      backgroundColor: Colors.$colorAnchor
    }
  },
  orderbook: {
    control: {
      backgroundColor: "transparent"
    }
  }
};

export const $styleSelect = (type = "base") => ({
  container: styles => ({
    ...styles,
    zIndex: 5
  }),
  valueContainer: styles => ({
    ...styles,
    height: "100%",
    padding: 0
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: "0 8px"
  }),
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    ...TypedStyles[type].control,
    color: Colors.$colorWhite,
    height: "2em",
    minHeight: "2em",
    minWidth: "5rem",
    width: "8rem",
    alignSelf: "flex-start",
    borderWidth: 0,
    opacity: isDisabled ? 0.04 : 1
  }),
  menu: (styles, state) => {
    return {
      ...styles,
      backgroundColor: Colors.$colorAnchor
    };
  },
  placeholder: (styles, state) => {
    return {
      ...styles,
      color: Colors.$colorWhite
    };
  },
  singleValue: (styles, state) => {
    return {
      ...styles,
      color: Colors.$colorWhite
    };
  },
  option: (styles, state) => {
    console.debug("State: ", state);
    let { data, isDisabled, isFocused, isSelected } = state;
    return {
      ...styles,
      height: "2rem",
      minHeight: "2rem",
      backgroundColor: isDisabled
        ? null
        : isFocused
          ? Colors.$colorIndependence
          : isSelected
            ? Colors.$colorLead
            : Colors.$colorAnchor,
      color: isSelected ? Colors.$colorWhite : Colors.$colorWhiteOp8,
      cursor: isDisabled ? "not-allowed" : "default"
    };
  }
});

type FlexLayout =
  | "stretch"
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between";
type FlexParams = number | "auto" | GlobalsNumber;

export const $styleFlexContainer = (
  flexDirection: "row" | "column" = "row",
  justifyContent: FlexLayout = "stretch",
  alignItems: FlexLayout = "stretch"
) => ({
  display: "flex",
  flexDirection,
  justifyContent,
  alignItems
});

export const $styleFlexAutoWrap = {
  [`@media (max-width: ${$breakpointSmall})`]: {
    flexWrap: "wrap"
  }
};

export const $styleFlexItem = (
  flexGrow: FlexParams = "auto",
  flexShrink: FlexParams = "auto",
  flexBasis = "auto",
  alignSelf: FlexLayout = "stretch"
) => ({
  flexGrow,
  flexShrink,
  flexBasis,
  alignSelf
});

export const $styleSecondaryText = {
  color: Colors.$colorWhiteOp8
};
