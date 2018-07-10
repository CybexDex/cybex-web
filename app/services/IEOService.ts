export const API_URL = __DEV__
  ? "http://106.14.159.224:3049/"
  : __TEST__
    ? "https://ieo-apitest.nbltrust.com"
    : "https://ieo.cybex.io";

export const getProjects = () => {};
