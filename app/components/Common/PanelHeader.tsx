import * as React from "react";
import { Colors, CommonType } from "./Colors";
import Radium from "Radium";
import { Clickable } from "./CommonStyles";

const Styles = {
  base: {},
  clickable: {}
};

const PanelHeader = ({
  label,
  active = false,
  type = CommonType.Primary,
  onClick,
  children
}) => {
  // return onClick ?  <div >;
};

export default PanelHeader;
