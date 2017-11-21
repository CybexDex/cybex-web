import { flattenDeep } from "lodash";

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

export {
  getExtension,
  getObjectExtensionField
};