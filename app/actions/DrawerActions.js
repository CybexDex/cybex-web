import alt from "alt-instance";

class DrawerActions {
  toggleDrawer(open = undefined) {
    return dispatch => dispatch(open)
  }
}

export default alt.createActions(DrawerActions);