import { Colors } from "./Colors";
import chroma from "chroma-js";

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
    padding: 0,
  }), 
  dropdownIndicator: styles => ({
    ...styles,
    padding: "0 8px",
  }), 
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    ...TypedStyles[type].control,
    color: Colors.$colorWhite,
    height: "2em",
    minHeight: "2em",
    minWidth: "5rem",
    width: "10rem",
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
