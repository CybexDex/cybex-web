import ContextMenuActions, { ContextMenuList, ContextMenuItem, getMenuId } from "actions/ContextMenuActions";
import alt from "alt-instance";
import BaseStore from "stores/BaseStore";
import * as Immutable from "immutable";

type MenuStore = {
  [x: string]: ContextMenuList
};

class ContextMenuStore extends BaseStore {
  // abstract method for alt
  bindListeners;

  //
  menuStore: MenuStore = {};

  constructor() {
    super();
    this.bindListeners({
      addMenu: ContextMenuActions.addMenu,
      detachMenu: ContextMenuActions.detachMenu,
      clearMenu: ContextMenuActions.clearMenu
    });
  }

  addMenu({menuId, menuList}) {
    if (!menuId) {
      throw new Error("A menu list must be used with an id as the first param");      
    }
    if (menuId in this.menuStore) {
      throw new Error("Multiple context menu exist. The menu id: " + menuId);
    }
    
    this.menuStore[menuId] = menuList;
  }

  detachMenu(menuId: string) {
    delete this.menuStore[menuId];
  }

  clearMenu(forceClear) {
    this.menuStore = {};
  }
}

export var ContextMenuStoreWrapper = alt.createStore(ContextMenuStore, "ContextMenuStore");
export default ContextMenuStoreWrapper