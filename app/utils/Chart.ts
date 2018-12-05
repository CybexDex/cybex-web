function parseData(parse) {
  return function(d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    // console.debug("D: ", d);
    return d;
  };
}

const parseDate = date => new Date(date);
// const parseDate = timeFormat("%Y-%m-%d %H:%M");
// const parseDate = timeFormat("%Y-%m-%d");

export function handleStockData(data) {
  return data.map(parseData(parseDate));
  // return tsvParse(data, parseData(parseDate));
}
