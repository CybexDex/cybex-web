export const getClassName:
  (defaultClass: string, appendClass?: { [className: string]: boolean }) => string =
  (defaultClass, appendClass) => {
    if (!appendClass) return defaultClass;
    let res = [defaultClass];
    res = [
      ...res,
      ...Object
        .keys(appendClass)
        .filter(className => appendClass[className])
    ];
    return res.join(" ");
  };