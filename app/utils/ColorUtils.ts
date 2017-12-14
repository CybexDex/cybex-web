export type MarketColor = {
  color: string;
  bgColor: string;
};

type ColorProfile = MarketColor;

export function getHexColorByString(colorString: string) {
  let string =  ["R", "G", "B"]
    .map(c => addZero(getColorIndex(c + colorString, 196).toString(16)))
    .join("");
    console.debug("FSTIN: ", string);
    return string;
}

export function addZero(str: string) {
  return str.length === 1 ? "0" + str : str;
}

/**
 * 
 * 
 * @export
 * @param {string} colorString The string used to calc the color index;
 * @param {number} radix Commonly it's the length of the array of colors;
 * @returns {number} 
 */
export function getColorIndex(colorString: string, radix: number): number {
  return Array
    .prototype
    .map
    .call(colorString, s => s.codePointAt(0))
    .map(num => parseInt(num, 16))
    .reduce((sum, next) => sum + next) % radix;
}

/**
 * 
 * 
 * @export
 * @param {ColorProfile[]} colorList 
 * @returns {(marketId: string) => ColorProfile} A generator
 */
export function getColorGenerator(colorList: ColorProfile[]): (marketId: string) => ColorProfile {
  return marketId =>
    colorList[getColorIndex(marketId, colorList.length)];
}

export default getColorGenerator;