import * as React from "react"; import * as PropTypes from "prop-types";
import Translate from "react-translate-component";

type ErrorTips = {
  name: string
  isError: boolean
  isI18n?: boolean
  message: string,
  messageParams?: any
}[];

type props = {
  placeholder?: string | boolean
  isI18n?: boolean
  muiltTips: boolean;
  tips: ErrorTips
};

type state = {

};

// class ErrorTip extends React.Component<props, state> {
//   render() {

//   }
// }

const ErrorMessage = ({ isI18n, message, messageParams }) => (
  isI18n ?
    <Translate className="has-error" component="div" content={message} {...messageParams} /> :
    <div className="has-error">{message}</div>
);
const InfoMessage = ({ isI18n, message, messageParams }) => (
  isI18n ?
    <Translate className="has-info" component="div" content={message} {...messageParams} /> :
    <div className="has-info">{message}</div>
);

const ErrorBox = ({ children }) => <div className="error-wrapper">{children}</div>;

const ErrorTipBox = ({ placeholder, isI18n, tips, muiltTips }: props) => {
  let errorTips = tips.filter(tip => tip.isError);
  if (!errorTips.length && !placeholder) {
    return null;
  }
  if (!errorTips.length) {
    return placeholder === true ? (
      <ErrorBox>
        <div></div>
      </ErrorBox>
    ) : placeholder ? (
      <ErrorBox>
        <InfoMessage isI18n={isI18n} message={placeholder} messageParams={{}} />
      </ErrorBox>
    ) : null;
  }
  let tipsToShow = muiltTips ? errorTips : errorTips.slice(0, 1);
  return (
    <ErrorBox>
      {tipsToShow.map(({ name, isI18n, message, messageParams }) =>
        <ErrorMessage key={name} isI18n={isI18n} message={message} messageParams={messageParams || {}} />)
      }
    </ErrorBox>
  );
};

export { ErrorTipBox }
export default ErrorTipBox;