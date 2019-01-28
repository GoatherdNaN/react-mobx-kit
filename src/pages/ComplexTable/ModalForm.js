import React, { Component } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import { Modal } from 'base'
import { YMDHMS, disabledDate, disabledDateTime, getInitDate } from 'utils/moment'
import { formItemBlock } from 'constants/config'
import FormConfig from './ClientForm/config'
import { OPERATE_ITEM } from 'constants/config'
import { getLabelFromDict, STATUS } from 'constants/dict'

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
export default class ModalFrom extends Component {
  afterClose = (continuity) => {
    const { form, search, mode } = this.props;
    form.resetFields();
    if (!continuity) {
      let params;
      if (mode === OPERATE_ITEM.add.code) {
        params = {};
      }
      search(params);
    }
  }

  handleSure = (continuity) => {
    const { handleOk, form, handleClose } = this.props;
    form.validateFields((err, payload) => {
      if (err) {
        return;
      }
      const callback = continuity === true ? () => this.afterClose(continuity) : handleClose;
      handleOk(payload, callback);
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

    const formItemProps = {
      ...formItemBlock
    };
    if (isCheck) {
      formItemProps.className = 'checkFormItem';
    }

    return (
      <Modal
        continuity
        canResize
        afterClose={resetFields}
        mode={mode}
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
              ...FormConfig.name.rules,
            })(
              <Input {...FormConfig.name.itemProps} />
            ) : initData.name}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.age.label}>
            {!isCheck ? getFieldDecorator('age', {
              initialValue: initData.age,
              ...FormConfig.age.rules,
            })(
              <Input {...FormConfig.age.itemProps} />
            ) : initData.age}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.job.label}>
            {!isCheck ? getFieldDecorator('job', {
              initialValue: initData.job,
              ...FormConfig.job.rules,
            })(
              <Input {...FormConfig.job.itemProps} />
            ) : initData.job}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.address.label}>
            {!isCheck ? getFieldDecorator('address', {
              initialValue: initData.address,
              ...FormConfig.address.rules,
            })(
              <TextArea {...FormConfig.address.itemProps} rows={4} />
            ) : initData.address}
          </FormItem>
          <FormItem {...formItemProps} label={FormConfig.status.label}>
            {!isCheck ? getFieldDecorator('status', {
              initialValue: initData.status,
              ...FormConfig.status.rules,
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
              ...FormConfig.updatedAt.rules,
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