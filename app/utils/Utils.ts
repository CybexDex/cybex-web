declare var __DEV__;
import { flattenDeep } from "lodash";
import { getHexColorByString } from "./ColorUtils";

const getExtension = (extensions, field) => {
  for (let options of flattenDeep(extensions).filter(o => typeof o === "object")) {
    if (options[field]) {
      return options[field];
    }
  }
  return null;
}


const getObjectExtensionField = (object: any, field: string) => {
  if (!object || !object.extensions) {
    return null;
  } else {
    return getExtension(object.extensions, field);
  }
}

const debugGen: (logTag: string, colorRgba?: string) => (...toPrint) => void =
  (logTag, colorRgba = `#${getHexColorByString(logTag)}`) => __DEV__ ?
    (...toPrint) => console.debug(`%c[${logTag}]:`, `color: ${colorRgba};`, ...toPrint) :
    () => void (0);

export {
  debugGen,
  getExtension,
  getObjectExtensionField
};