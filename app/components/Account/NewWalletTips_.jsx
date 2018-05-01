import * as React from "react"; import * as PropTypes from "prop-types";
import { Link } from "react-router";
import Translate from "react-translate-component";

const Options = [
  {
    content: "wallet.answer_right",
    isAnswer: true
  }, {
    content: "wallet.answer_wrong_1",
  }, {
    content: "wallet.answer_wrong_2",
  }, {
    content: "wallet.answer_wrong_3",
  }
];

const messy = ori => {
  let arr = ori.slice(), res = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    let index = Math.floor(Math.random() * arr.length);
    res = res.concat(arr.splice(index, 1));
  }
  return res;
};

const ScrollTopWrapper = class extends React.Component {

  componentDidMount() {
    this.el && this.el.scrollIntoView();
  }

  render() {
    return (
      <div ref={wrap => this.el = wrap} className="scroll-wrap">
        {
          this.props.children
        }
      </div>
    )
  }
}

const NewWalletTips = class extends React.Component {
  constructor(props) {
    super(props);
    this.messyOptions = messy(Options);
    this.state = {
      answerRight: false
    };
  }
  render() {
    let { className, onKnownWallet } = this.props;
    return (
      <div className={className + " wallet-tips"}>
        <h3>您的电子钱包非常重要</h3>
        <p>您即将创建一个新的钱包账户，关于钱包的详细说明可以查看<Link to="/help/introduction/wallets">这里</Link>。</p>
        <p>于大多数交易者来说，钱包模式是最为安全的选择。
        您的本地设备将依据您所设置的钱包密码生成一份二进制的钱包文件，使用这一钱包，您将能够对您的所有资产进行访问和管理。该钱包与钱包密码搭配，是访问您资产的唯一凭证。由于钱包只存在您本人当前的访问环境中，任何其他人无法接触，从而保证了您个人资产的安全性。
      </p>
        <p>但同时，钱包文件的意外丢失也将造成非常严重的后果——<strong style={{ fontSize: "1.3em" }}>您存在于该钱包中的资产将丢失，并无法通过其他途径找回</strong>。</p>
        <p>因此，Cybex在协助您完成钱包账户的创建工作后，将推荐并引导您对您的钱包文件进行下载备份。请务必进行下载备份并保存好该文件，牢记该文件存放的位置，同时也推荐使用专用的物理设备，如U盘等，保存好该文件。这样在任何情况下，无论是遇到交易终端的意外情况还是您更换了交易设备，只需找到并恢复您所备份的钱包文件，您便可以继续方便安全的管理您的资产。</p>
        <p>感谢您的悉心阅读，在您详细阅读并理解以上内容后，请选择以下说法中合适的一项，并继续您的钱包创建工作。</p>
        <p>创建钱包账户完成后，首先应该：</p>
        {
          this.messyOptions.map((option, index) => (
            <div key={option.content} className="wallet-option">
              <button
                ref={btn => this["btn-options-" + index] = btn}
                className="button btn-custom btn-shadow hollow"
                onClick={() => {
                  if (option.isAnswer) {
                    this["btn-options-" + index].classList.add("success", "hollow");
                    this.setState({
                      answerRight: true
                    });
                  } else {
                    this["btn-options-" + index].classList.add("alert", "hollow");
                  }
                }}>
                <Translate content={option.content}></Translate>
              </button>
              <span className="tip">
                <Translate content="wallet.backup_primary"></Translate>
              </span>
            </div>
          ))
        }
        {this.state.answerRight &&
          <ScrollTopWrapper>
            <button className="button" onClick={onKnownWallet}>
              <Translate content="wallet.go_on"></Translate>
            </button>
          </ScrollTopWrapper>
        }
      </div>
    )
  }
};
export default NewWalletTips;