import React, { Component } from 'react'
import Modal from 'base/Modal'

export default class ModalFrom extends Component {
  render() {
    const { visible, handleClose } = this.props;
    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}