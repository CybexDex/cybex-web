import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import Anthem from './anthem';
import jdenticon from "jdenticon";
import sha256 from "js-sha256";
import { Link } from "react-router"; 
let logo_demo = require('assets/cybex_rainbow_lg.png');
import ReactSwipe from 'react-swipe';
import './transfer.scss';

class EO extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }
  next() {
    this.reactSwipe.next();
  }

  prev() {
    this.reactSwipe.prev();
  }
  


  render() {
    const swipeOptions = {
      startSlide: 0,
      auto: 0,
      speed: 300,
      disableScroll: true,
      continuous: true,
      callback() {
        console.log('slide changed');
      },
      transitionEnd() {
        console.log('ended transition');
      }
    };
    
    console.log(logo_demo)
    return (
      <div>
        <div className="slider-holder">
        <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="mySwipe" swipeOptions={swipeOptions}>
        <div key={1}>
          <div className="item">
            <img src={require('assets/img_demo_1.jpg')} />
          </div>
        </div>
        <div key={2}>
          <div className="item">
            <div className="item-in">
            <img src={require('assets/img_demo_2.jpg')} />
            </div>
          </div>
        </div>
        <div key={3}>
          <div className="item">
            <img src={require('assets/img_demo_3.jpg')} />
          </div>
        </div>
        </ReactSwipe>
        <div>
          <div className="slide-btn slide-btn-left" onClick={this.prev.bind(this)}>&lt;</div>
          <div className="slide-btn slide-btn-right" onClick={this.next.bind(this)}>&gt;</div>
        </div>
        </div>
      <div class="container">
      <div class="waterfall">

      <div class="pin">
        <img src={logo_demo} width={100} height={100} />
        <h3 className="title">Title</h3>
        <p>1 convallis timestamp</p>
        <Link to={`/eo/detail/123`}>
        <div className="button primery-button">Join</div>
        </Link>
        <div className="info-item">
          <div className="percent">
            <div className="percent-in"></div>
          </div>
          <div className="info-text">30%</div>
        </div>
      </div>

      <div class="pin">
        <img src={logo_demo} width={100} height={100} />
        <h3 className="title">Title</h3>
        <p>2 convallis timestamp timestamp timestamp timestamp timestamp timestamp timestamp</p>
        <div className="button primery-button">Join</div>
        <div className="info-item">
          <div className="percent">
            <div className="percent-in"></div>
          </div>
          <div className="info-text">30%</div>
        </div>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      3 Nullam eget lectus augue. Donec eu sem sit amet ligula
      faucibus suscipit. Suspendisse rutrum turpis quis nunc
      convallis quis aliquam mauris suscipit.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      4 Donec a fermentum nisi. Integer dolor est, commodo ut
      sagittis vitae, egestas at augue.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      5 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed feugiat consectetur pellentesque. Nam ac elit risus,
      ac blandit dui. Duis rutrum porta tortor ut convallis.
      Duis rutrum porta tortor ut convallis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      6 Nullam eget lectus augue. Donec eu sem sit amet ligula
      faucibus suscipit. Suspendisse rutrum turpis quis nunc
      convallis quis aliquam mauris suscipit.
      Duis rutrum porta tortor ut convallis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      7 Nullam eget lectus augue.
      </p>
      </div>

      <div class="pin">
      <p>
      8 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed feugiat consectetur pellentesque.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      9 Donec a fermentum nisi. Integer dolor est, commodo ut
      sagittis vitae, egestas at augue. Suspendisse id nulla
      ac urna vestibulum mattis. Duis rutrum porta tortor ut convallis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      10 Donec a fermentum nisi. Integer dolor est, commodo ut
      sagittis vitae, egestas at augue. Suspendisse id nulla
      ac urna vestibulum mattis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      11 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed feugiat consectetur pellentesque. Nam ac elit risus,
      ac blandit dui. Duis rutrum porta tortor ut convallis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      12 Donec a fermentum nisi. Integer dolor est, commodo ut
      sagittis vitae, egestas at augue. Suspendisse id nulla
      ac urna vestibulum mattis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      13 Donec a fermentum nisi. Integer dolor est, commodo ut
      sagittis vitae, egestas at augue. Suspendisse id nulla
      ac urna vestibulum mattis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      14 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed feugiat consectetur pellentesque. Nam ac elit risus,
      ac blandit dui. Duis rutrum porta tortor ut convallis.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      15 Nullam eget lectus augue.
      </p>
      </div>

      <div class="pin">
      <img src={logo_demo} width={100} height={100} />
      <p>
      16 Nullam eget lectus augue.
      </p>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
 export default EO;
