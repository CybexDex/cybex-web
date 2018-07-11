import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import { Link } from "react-router"; 
import './training.scss';

class Training extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentDidMount(){
    
  }
  next() {
  }

  prev() {
  }

  render() {

    return (
      <div className="training">
          <div className="title-container">
          <div className="trangle-holder left">
          <div className="trangle"></div>
          </div>
          <h2 className="base-title">
          如果您需要参与Cybex的IEO项目，<br />
请先进行KYC认证和账号绑定。
          </h2>
          <div className="trangle-holder right">
          <div className="trangle"></div>
          </div>
          {/* <div className="kyc-btn button primery-button">
          </div> */}
        </div>
        <div className="container">
          <div className="Combined-Shape">
            <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step1.png')} />
              <p className="step-info">
              <span>
            打开ICOAPE的网站并进行邮箱注册。</span>

            <span className="spetial"><a href="https://www.icoape.com/" target="_blank">https://www.icoape.com/</a></span>
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={require('../../assets/trainings/1.png')} /></div>
          <div className="right-bottom"><img src={require('../../assets/trainings/2.png')} /></div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step2.png')} />
              <p className="step-info">
              在注册的邮箱里，您会收到一封验证邮件，点开验证链接进行登录。如果找不到验证邮件，也许它躲在垃圾邮件里。
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={require('../../assets/trainings/3.png')} /></div>
          <div className="right-bottom"><img src={require('../../assets/trainings/4.png')} /></div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step3.png')} />
              <p className="step-info">
              提交真实有效的个人KYC资料，请记得保存。个人信息均为必填项。
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={require('../../assets/trainings/5.png')} /></div>
          <div className="right-bottom"><img src={require('../../assets/trainings/6.png')} /></div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>

        

        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step4.png')} />
            </div>
            <p className="step-info">
            <span>提交成功KYC资料后，我们会对您提交的资料进行审核。审核结果会在3-7个工作日内以邮件形式发送给您。</span><br />

<span className="spectial">注意：如果您的资料错误，请重新登录ICOAPE账号重新提交，我们会再次进行审核。</span>
            
            </p>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={require('../../assets/trainings/7.png')} /></div>
          <div className="right-bottom"><img src={require('../../assets/trainings/8.png')} /></div>
        </div>

        <div className="gap">
          <div className="dashed-border"></div>
        </div>

          <div className="container-large">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step5.png')} />
              <p className="step-info">
              <span>成功通过审核后，恭喜您到了关联Cybex账号的最后步骤了！！
请先确保您已注册了一个Cybex账号，登录ICOAPE，并将Cybex账号填入关联账号处。</span><br /><span className="spectial">
同时，打开Cybex交易所<a href="https://dex.cybex.io/" target="_blank">https://dex.cybex.io/</a> 登录您的Cybex账号，在您的“账户名 – 活动记录”里将会收到一笔小额转账并附带一个验证码（verify code），将这个关键的verify code 填到ICOAPE的验证码处，就绑定成功啦！
</span>
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={require('../../assets/trainings/9.png')} /></div>
          <div className="right-middle"><img src={require('../../assets/trainings/10.png')} /></div>
          <div className="right-bottom"><img src={require('../../assets/trainings/11.png')} /></div>
        </div>
        
        



        <div className="gap">
          <div className="dashed-border"></div>
        </div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step6.png')} className="last-img" />
              <p className="step-info">
              <span>登录您绑定KYC的Cybex账号，然后选择您想众筹的项目，点击预约。搓搓小手就可以等待项目审核通过然后众筹了哟～ 


</span><span className="spectial">
注意：部分项目可能会有众筹的地区限制，所以不同项目还需要在您申请“众筹预约”后再次审核，我们将在3-7个工作日内进行审核。通过审核且项目开始众筹后，您就可以开始众筹了～ 
</span><span className="spectial">
请注意众筹前保证您的cybex账号里已有您预约项目众筹接受的币种，且数额不小于该项目的最低众筹额度。同时，不同项目的众筹限额不同，众筹超过限额部分也是无法成功众筹的。
</span>
            </p>
            </div>
            <div className="right-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={require('../../assets/trainings/12.png')} /></div>
          <div className="right-bottom"><img src={require('../../assets/trainings/training12.jpg')} /></div>
        </div>
      </div>
    );
  }
}

// export default connect(EO,{
//   listenTo() {
//     return [AccountStore];
//   },
//   getProps(props) {
//     return {
//       myAccounts: AccountStore.getMyAccounts(),
//       accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
//       isMyAccount: AccountStore.getState()
//     }
//   }
// })
export default Training;
