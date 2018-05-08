let ids = {
  id: -1
};

export const getId = (prefix = "id") => {
  if (!(prefix in ids)) {
    ids[prefix] = -1;
  }
  return `$${prefix}__${++ids[prefix]}`;
};
