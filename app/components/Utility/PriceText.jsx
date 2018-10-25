import * as React from "react";

import utils from "common/utils";

class PriceText extends React.Component {
  render() {
    let { price, preFormattedPrice, quote, base, component, precision, previous } = this.props;

    let formattedPrice = preFormattedPrice
      ? preFormattedPrice
      : previous? utils.compared_price_text(price, quote, base, precision, previous)
        : utils.price_to_text(price, quote, base, precision);

    if(previous){
      return (
        <span>
          <span className="price-decimal">{formattedPrice.dec}</span>
          {formattedPrice.trailing? (
            <span className="price-integer">{formattedPrice.trailing}</span>
          ) : null}
        </span>
      );
    }

    if (formattedPrice.full >= 1) {
      return (
        <span>
          <span className="price-integer">{formattedPrice.int}.</span>
          {formattedPrice.dec ? (
            <span className="price-integer">{formattedPrice.dec}</span>
          ) : null}
          {formattedPrice.trailing? (
            <span className="price-integer">{formattedPrice.trailing}</span>
          ) : null}
        </span>
      );
    } else if (formattedPrice.full >= 0.1) {
      return (
        <span>
          <span className="price-decimal">{formattedPrice.int}.</span>
          {formattedPrice.dec ? (
            <span className="price-integer">{formattedPrice.dec}</span>
          ) : null}
          {formattedPrice.trailing ? (
            <span className="price-decimal">{formattedPrice.trailing}</span>
          ) : null}
        </span>
      );
    } else {
      return (
        <span>
          <span className="price-decimal">{formattedPrice.int}.</span>
          {formattedPrice.dec ? (
            <span className="price-decimal">{formattedPrice.dec}</span>
          ) : null}
          {formattedPrice.trailing ? (
            <span className="price-integer">{formattedPrice.trailing}</span>
          ) : null}
        </span>
      );
    }
  }
}

export default PriceText;
