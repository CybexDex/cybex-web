import alt from "alt-instance";
import {Component} from "react";

export type ContextMenuItem =  Component | HTMLElement;

export type ContextMenuList = ContextMenuItem[];

let menuId = 0;
export const getMenuId = () => `$menuId#${menuId++}`;

class ContextMenuActions {
  addMenu(menuId: string, menuList: ContextMenuList) {
    return {
      menuId,
      menuList
    };
  }

  detachMenu(menuId: string) {
    return menuId;
  }

  clearMenu(trueClear = true) {
    return trueClear;
  }
}

const ContextMenuActionsWrapped = alt.createActions(ContextMenuActions);
export default ContextMenuActionsWrapped;

