import * as React from "react";

export const AssetIcon = (props: { symbol: string; [other: string]: any }) => {
  return (
    <img
      style={{ width: 108, height: 108, margin: "0 2em" }}
      src={`https://static-assets.51nebula.com/asset-symbols/${props.symbol.toUpperCase()}.png`}
      alt=""
      {...props}
    />
  );
};
