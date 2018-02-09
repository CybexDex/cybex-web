import * as React from "react";
import Translate from "react-translate-component";

type ErrorTips = {
  name: string
  isError: boolean
  isTranslation?: boolean
  message: string,
  messageParams?: any
}[];

type props = {
  placeholder?: string
  isTranslation?: boolean
  muiltTips: boolean;
  tips: ErrorTips
};

type state = {

};

// class ErrorTip extends React.Component<props, state> {
//   render() {

//   }
// }

const ErrorMessage = ({ isTranslation, message, messageParams }) => (
  isTranslation ?
    <Translate className="has-error" component="div" content={message} {...messageParams} /> :
    <div className="has-error">{message}</div>
);
const InfoMessage = ({ isTranslation, message, messageParams }) => (
  isTranslation ?
    <Translate className="has-info" component="div" content={message} {...messageParams} /> :
    <div className="has-info">{message}</div>
);

const ErrorBox = ({ children }) => <div className="error-wrapper">{children}</div>;

const ErrorTipBox = ({ placeholder, isTranslation, tips, muiltTips }: props) => {
  let errorTips = tips.filter(tip => tip.isError);
  if (!errorTips.length && !placeholder) {
    return null;
  }
  if (!errorTips.length && placeholder) {
    return (
      <ErrorBox>
        <InfoMessage isTranslation={isTranslation} message={placeholder} messageParams={{}} />
      </ErrorBox>
    );
  }
  let tipsToShow = muiltTips ? errorTips : errorTips.slice(0, 1);
  return (
    <ErrorBox>
      {tipsToShow.map(({ name, isTranslation, message, messageParams }) =>
        <ErrorMessage key={name} isTranslation={isTranslation} message={message} messageParams={messageParams || {}}/>)
      }
    </ErrorBox>
  );
};

export { ErrorTipBox }
export default ErrorTipBox;