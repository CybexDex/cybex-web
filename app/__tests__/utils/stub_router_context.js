import * as React from "react"; import * as PropTypes from "prop-types";


let stubRouterContext = (Component, props, stubs) => {
  function RouterStub() {}

  Object.assign(
    RouterStub,
    {
      makePath() {},
      makeHref() {},
      transitionTo() {},
      replaceWith() {},
      goBack() {},
      getCurrentPath() {},
      getCurrentRoutes() {},
      getCurrentPathname() {},
      getCurrentParams() {},
      getCurrentQuery() {},
      isActive() {},
      getRouteAtDepth() {},
      setRouteComponentAtDepth() {}
    },
    stubs
  );

  return class extends React.Component {
    static childContextTypes = {
      router: PropTypes.func,
      routeDepth: PropTypes.number
    };

    getChildContext() {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    }

    render() {
      return <Component {...props} />;
    }
  };
};

export default stubRouterContext;
