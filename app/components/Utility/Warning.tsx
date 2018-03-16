import * as React from "react";
import { BaseModal } from "./../Modal/BaseModalNew";
import { ModalActions } from "actions/ModalActions";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";


type WarningProps = {
  id: string,
  title: string,
  contents: string[]
  onClose: any,
  open?: boolean
};

type WarningState = {
  known: boolean
};

export class Warning extends React.Component<WarningProps, WarningState> {
  constructor(props) {
    super(props);
    this.state = {
      known: false
    };
  }

  componentDidMount() {
    ModalActions.showModal(this.props.id);
  }

  render() {
    let { title, contents, open } = this.props;
    return open ? <BaseModal modalId={this.props.id}>
      <h4 className="modal-header">
        {title}
      </h4>
      {
        contents.map(content => (<p key={content}>
          {
            content
          }
        </p>))
      }
    </BaseModal> : null;
  }
}

export const WarningWapper = connect(Warning, {
  listenTo() {
    return [ModalStore];
  },
  getProps(props) {
    let { id } = props;
    return {
      open: ModalStore.getState().showingModals.has(id)
    };
  }
});

export default WarningWapper;