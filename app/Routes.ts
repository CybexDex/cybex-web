import Loadable from "react-loadable";
import LoadingIndicator from "components/LoadingIndicator";
import { Route, Switch } from "react-router-dom";


export const LoadComponent = (uri: string) =>
  Loadable({
    loader: () => import(uri),
    loading: LoadingIndicator
  });
