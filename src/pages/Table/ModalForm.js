import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import Modal from 'base/Modal'
import { YMDHMS, disabledDate, disabledDateTime, getInitDate } from 'utils/moment'
import { formItemBlock } from 'constants/config'
import FormConfig from './config'
import { OPERATE_ITEM } from 'constants/config'
import { getLabelFromDict, STATUS } from 'constants/dict'

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
@inject('tableStore','dispatch')
@observer
export default class ModalFrom extends Component {
  handleSure = () => {
    const { form, mode, handleClose } = this.props;
    form.validateFields((err, payload) => {
      if (err) {
        return;
      }
      const type = `tableStore/${mode}`;
      this.props.dispatch({
        type,
        payload,
        callback: handleClose
      });
    });
  }

  render() {
    const {
      mode,
      visible,
      handleClose,
      initData,
      confirmLoading,
      form: { getFieldDecorator, resetFields },
    } = this.props;

    const isCheck = mode === OPERATE_ITEM.check.code;
    const { title } = OPERATE_ITEM[mode];

    const formItemProps = {
      ...formItemBlock
    };
    if (isCheck) {
      formItemProps.className = 'checkFormItem';
    }

    return (
      <Modal
        afterClose={resetFields}
        isCheck={isCheck}
        title={title}
        visible={visible}
        onCancel={handleClose}
        confirmLoading={confirmLoading}
        {
          ...!isCheck ? {onOk: this.handleSure} : {}
        }
      >
        <Form>
          <FormItem {...formItemProps} label={FormConfig.name.label}>
            {!isCheck ? getFieldDecorator('name', {
              initialValue: initData.name,
            })(
              <Input {...FormConfig.name.itemProps} />
            ) : initData.name}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.age.label}>
            {!isCheck ? getFieldDecorator('age', {
              initialValue: initData.age,
            })(
              <Input {...FormConfig.age.itemProps} />
            ) : initData.age}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.job.label}>
            {!isCheck ? getFieldDecorator('job', {
              initialValue: initData.job,
            })(
              <Input {...FormConfig.job.itemProps} />
            ) : initData.job}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.address.label}>
            {!isCheck ? getFieldDecorator('address', {
              initialValue: initData.address,
            })(
              <TextArea {...FormConfig.address.itemProps} rows={4} />
            ) : initData.address}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.status.label}>
            {!isCheck ? getFieldDecorator('status', {
              initialValue: initData.status,
            })(
              <Select {...FormConfig.status.itemProps} style={{ width: '100%' }}>
                {
                  STATUS.map(dict => (
                    <Option key={dict.value} value={dict.value}>{dict.label}</Option>
                  ))
                }
              </Select>
            ) : getLabelFromDict(STATUS,initData.status)}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.updatedAt.label}>
            {!isCheck ? getFieldDecorator('updatedAt', {
              initialValue: getInitDate(initData.updatedAt),
            })(
              <DatePicker
                style={{ width: '100%' }}
                format={YMDHMS}
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            ) : initData.updatedAt}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}