export const BaseColors = {
  // Colors
  $colorWhite: "#ffffff",
  $colorWhiteOp8: "rgba(255, 255, 255, 0.8)",
  $colorWhiteOp3: "rgba(255, 255, 255, 0.3)",
  $colorOrange: "#ff9143",
  $colorOrangeLight: "#ffc478",
  $colorCrimson: "#d2323e",
  $colorGrass: "#6dbb49",
  $colorGrassLight: "#A9E06E",
  $colorBlue: "#2e5be2",
  $colorLight: "#f7f8fa",
  $colorGrey: "#78819a",
  $colorGreyLightWhite: "rgba(120, 129, 154, 0.3)",
  $colorGreyLight: "rgba(216, 216, 216, 0.3)",
  $colorDark: "#171d2a",
  $colorMask: "rgba(23, 30, 42, 0.8)",
  // Sub Colors
  $colorRosset: "#c87b41",
  $colorBronze: "#c86443",
  $colorFlame: "#d24632",
  $colorFlameLight: "#d96250",

  //
  $colorWarn: "#c12121",
  $colorMahogany: "#502d2d",
  $colorBlush: "#ff787c",
  //
  $colorCyan: "#2b756c",
  $colorPine: "#2d4134",
  //
  $colorAegean: "#356da4",
  $colorCobalt: "#2e51b0",
  $colorLapis: "#3d5bb2",
  $colorpurple: "#7b44ae",
  $colorporcelain: "#eff1f4",
  //
  $colorLilac: "#8f9ab9",
  $colorFossil: "#707481",
  //
  $colorLead: "#1b2230",
  $colorAnchor: "#212939",
  $colorIndependence: "#293246",
  $colorNoir: "#111621"

  //
};

export const GridentColors = {
  $colorGradientFoilex: "linear-gradient(-135deg, #e7ac5f, #e76536)",
  $colorGradientGoldex: "linear-gradient(-131deg, #ffc478, #ff9143)",
  $colorGradientFlame: `linear-gradient(90deg, ${BaseColors.$colorFlameLight}, ${
    BaseColors.$colorFlame
  })`,
  $colorGradientGrass: `linear-gradient(90deg, ${BaseColors.$colorGrassLight}, ${
    BaseColors.$colorGrass
  })`,
  $colorGradientSilvex:
    "linear-gradient(48deg,rgba(255, 255, 255, 50),rgba(255, 255, 255, 100))",
  $colorGradientGreyex:
    "linear-gradient(48deg,rgba(120, 129, 154, 50),rgba(120, 129, 154, 100))"
};

export const Colors = {
  ...BaseColors,
  ...GridentColors
};

export enum CommonType {
  Primary,
  Secondary
}


export default Colors;
