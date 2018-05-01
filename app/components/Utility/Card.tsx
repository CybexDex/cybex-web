import * as React from "react"; import * as PropTypes from "prop-types";
import { Component } from "react";
import Translate from "react-translate-component"


export interface CardStatus {
  image?: string;
  imageAlt?: string;
  iconClass?: string;
  section?: string;
  important?: boolean;
  detail?: any;
  [x: string]: any;
}

interface CardProps {
  onCardClick?: (...args: any[]) => any;
  card: CardStatus;
  children?: any;
  className?: any;
  isActive?: boolean;
  showDetail?: boolean;
  needScroll?: boolean;
}

interface CardState {
  step: number;
  currentCard: CardStatus
}
const Card = class extends React.Component<CardProps, CardState> {
  viewToScroll: HTMLElement;

  scrollIntoView() {
    this.viewToScroll && this.viewToScroll.scrollIntoView();
  }

  componentDidMount() {
    if (this.props.needScroll) {
      this.scrollIntoView();
    }
  }

  render() {
    let { children, card, className, onCardClick, isActive, showDetail } = this.props;
    return (
      <div ref={view => this.viewToScroll = view} className={className + " card-wrapper"}>
        <div className={"card-custom" + (isActive ? " active" : "")} onClick={onCardClick}>
          <div className="card-body">
            <div className="card-image">
              {
                card.iconClass ?
                  <div className={card.iconClass}></div> :
                  <img src={card.image} alt={card.imageAlt} />
              }
            </div>
            <div className="section">
              <Translate content={card.section} unsafe />
            </div>
          </div>
          {card.detail &&
            card.detail
          }
        </div>
        {children}
      </div>
    );
  }
}
export default Card;