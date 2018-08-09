export const Clickable = {
  cursor: "pointer"
};

type FlexLayoutProps =
  | "stretch"
  | "baseline"
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type FlexContainerProps = {
  display?: "flex" | "inline-flex";
  justifyContent?: FlexLayoutProps;
  alignItems?: FlexLayoutProps;
  alignContent?: FlexLayoutProps;
  flexWrap?: "wrap" | "wrap-reverse" | "nowrap";
};
const FlexContainerDefault = {
  display: "flex",
  justifyContent: "stretch",
  alignItems: "stretch",
  alignContent: "stretch",
  flexWrap: "nowrap"
};
export const FlexContainer = (customProps: FlexContainerProps) => ({
  ...FlexContainerDefault,
  ...customProps
});
