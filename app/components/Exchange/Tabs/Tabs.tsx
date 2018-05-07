import * as React from "react"; import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import { getClassName } from "app/utils/ClassName";

type TabItem = {
  key: string | number;
  label: string;
  [x: string]: any;
};

interface TabsProps {
  onTabClick?: Function;
  tabs: TabItem[];
  currentTab: TabItem;
  [x: string]: any;
};

interface TabsState {
  currentTab: TabItem
}

export class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
  }

  render() {
    const { tabs, className, onTabClick, currentTab } = this.props;
    return (
      <ul className={className ? "tab-list " + className : "tab-list"}>
        {
          tabs.map(tab => (
            <li
              className={
                getClassName(
                  "tab-list-item",
                  { "active": currentTab === tab || currentTab.key === tab.key }
                )
              }
              key={tab.key} onClick={() => onTabClick(tab)}>
              <Translate content={tab.label} />
            </li>
          ))
        }
      </ul>
    );
  }
}

export default Tabs;