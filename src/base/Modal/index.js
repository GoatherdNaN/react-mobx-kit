import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import IconFont from '../IconFont'
import Button from '../Button/Button'
import { OPERATE_ITEM } from 'constants/config'
import styles from './index.less'

class ModalTitle extends PureComponent {
  state = {
    fullScreen: true
  }

  handleResize = () => {
    const { onResize, width } = this.props;
    this.setState(preState => ({
      fullScreen: !preState.fullScreen
    }), () => {
      const { fullScreen } = this.state;
        onResize(fullScreen ? width : '100%');
    });
  }

  render() {
    const { canResize, title } = this.props;
    const { fullScreen } = this.state;
    const screenIconType = fullScreen ? 'icon-full-screen' : 'icon-cancel-full';
    return canResize ? (
      <div className={styles.modalTitle}>
        {title}
        <IconFont
          onClick={this.handleResize}
          type={screenIconType}
          className={styles.screenIcon}
        />
      </div>
    ) : title
  }
}

export default class BaseModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modalWidth: props.width || 800
    }
  }

  onResize = (modalWidth) => {
    this.setState({
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
    const { modalWidth } = this.state;
    const modalTitle = title || OPERATE_ITEM[mode].title;
    const extraProps = {
      title: (
        <ModalTitle
          width={width || 800}
          title={modalTitle}
          canResize={canResize}
          onResize={this.onResize}
        />
      ),
      onCancel,
      afterClose: () => {
        if (canResize) {
          this.onResize(width || 800);
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
            type="primary"
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
            type="primary"
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
        maskStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
        {...extraProps}
        {...otherProps}
      >
        {children}
      </Modal>
    )
  }
}