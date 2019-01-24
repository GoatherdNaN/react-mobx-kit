import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import IconFont from '../IconFont'
import Button from '../Button'
import { OPERATE_ITEM } from 'constants/config'
import styles from './index.less'

function ModalTitle({ title, onResize, canResize, isFullScreen }) {
  const screenIconType = isFullScreen ? 'icon-cancel-full' : 'icon-full-screen';
  return canResize ? (
    <div className={styles.modalTitle}>
      {title}
      <IconFont
        onClick={onResize}
        type={screenIconType}
        className={styles.screenIcon}
      />
    </div>
  ) : title
}

class BaseModal extends PureComponent {
  constructor(props) {
    super(props)
    this.width = props.width || 800;
    this.state = {
      modalWidth: this.width,
      isFullScreen: false
    }
  }

  onResize = (bool) => {
    const { isFullScreen } = this.state;
    let nextIsFullScreen = bool === false ? bool : !isFullScreen;
    let modalWidth = isFullScreen ? this.width : '100%';
    this.setState({
      isFullScreen: nextIsFullScreen,
      modalWidth,
    })
  }

  render() {
    const {
      width,
      onOk,
      mode,
      title,
      canResize,
      confirmLoading,
      onCancel,
      continuity,
      afterClose,
      children,
      ...otherProps
    } = this.props;
    const { modalWidth, isFullScreen } = this.state;
    const modalTitle = title || OPERATE_ITEM[mode].title;
    const extraProps = {
      title: (
        <ModalTitle
          title={modalTitle}
          canResize={canResize}
          onResize={this.onResize}
          isFullScreen={isFullScreen}
        />
      ),
      onCancel,
      afterClose: () => {
        if (canResize && isFullScreen) {
          this.onResize(false);
        }
        afterClose();
      }
    };

    if (mode === OPERATE_ITEM.add.code) {
      extraProps.footer = [
        <Button key="cancel" name="close" onClick={onCancel}>
          取消
        </Button>,
        <Button
          type="primary"
          key="sure"
          name="sure"
          onClick={onOk}
          loading={confirmLoading}
        >
          添加
        </Button>
      ];
      if (continuity) {
        extraProps.footer.push(
          <Button
            type="info"
            key="continuityAdd"
            name="continuityAdd"
            loading={confirmLoading}
            onClick={() => onOk(true)}
          >
            连续添加
          </Button>
        )
      }
    }
    // 查看是底部按钮组只显示关闭
    else if (mode === OPERATE_ITEM.check.code) {
      extraProps.footer = [
        <Button key="close" name="close" onClick={onCancel}>
          关闭
        </Button>
      ]
    } else {
      extraProps.onOk = onOk;
      extraProps.onCancel = onCancel;
      extraProps.confirmLoading = confirmLoading;
    }

    return (
      <Modal
        width={modalWidth}
        maskClosable={false}
        transitionName="fade"
        {...extraProps}
        {...otherProps}
      >
        {children}
      </Modal>
    )
  }
}
BaseModal.propTypes = {
  afterClose: PropTypes.func,
  canResize: PropTypes.bool,
  continuity: PropTypes.bool,
  mode: PropTypes.string
}

export default BaseModal;
