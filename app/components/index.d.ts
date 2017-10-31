/// <reference types="react"/>
declare module "react-translate-component" {
  class Translate extends React.Component<any, any>{ }
  export default Translate;
}

declare module "rc-queue-anim" {
  class QueueAnim extends React.Component<any, any>{ }
  export default QueueAnim;
}
declare module "react-scroll-up" {
  class QueueAnim extends React.Component<any, any>{ }
  export default QueueAnim;
}
declare module "alt-container" {
  class AltContainer extends React.Component<any, any>{ }
  export default AltContainer;
}

declare module "alt-react" {
  function connect(Component, injector: any);
}

declare module "cybexjs-ws" {
  const Apis;
}

declare module CommonUtils {
  const price_text: (price: string, base: any, quote: any) => string;
  const format_volume: (amount: number) => string;
}

declare module "common/utils" {
  export default CommonUtils;
}