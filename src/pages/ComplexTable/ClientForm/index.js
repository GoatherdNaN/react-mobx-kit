import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, DatePicker } from 'antd'
import { inject, observer } from 'mobx-react'
import SpinWrapper from 'components/SpinWrapper'
import { YMDHMS, disabledDate, disabledDateTime, getInitDate } from 'utils/moment'
import FormConfig, { formItemLayout } from './config'
import { getLabelFromDict, STATUS } from 'constants/dict'
import { findRouteInRoutes } from '../../../routes'
import { OPERATE_ITEM } from 'constants/config'

const { TextArea } = Input;
const FormItem = Form.Item;

@withRouter
@Form.create()
@inject('complexTableStore')
@observer
export default class ClientForm extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
      location: { pathname },
      complexTableStore: { getDataToJs },
    } = props;
    const currentRouterInfo = findRouteInRoutes(pathname);
    const initData = getDataToJs('initData');
    this.mode = Object.values(OPERATE_ITEM).find(v => v.title === currentRouterInfo.name).code;
    if ( params.id && (
      !initData ||
      JSON.stringify(initData) === '{}'
      )) {
      props.complexTableStore.fetchById({ id: params.id });
    }
  }

  handleSure = (continuity) => {
    const { form, complexTableStore } = this.props;
    form.validateFields((err, payload) => {
      if (err) {
        return;
      }
      const holdParams = this.mode !== OPERATE_ITEM.add.code;
      const callback = continuity === true ? form.resetFields : () => this.back(holdParams);
      complexTableStore[this.mode](payload, callback);
    });
  }

  back = (holdParams) => {
    const query = (holdParams === true || holdParams === false) ? { holdParams } : { isFromTagBar: true };
    this.props.history.push({
      pathname: '/basis/complexList',
      query
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      complexTableStore: {
        initData,
        initFormLoading,
        confirmLoading
      },
    } = this.props;
    const isCheck = this.mode === OPERATE_ITEM.check.code;
    const formItemProps = {
      ...formItemLayout
    };
    if (isCheck) {
      formItemProps.className = 'checkFormItem';
    }
    return (
      <SpinWrapper
        mode={this.mode}
        onOk={this.handleSure}
        onCancel={this.back}
        initFormLoading={initFormLoading}
        confirmLoading={confirmLoading}
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
      </SpinWrapper>
    )
  }
}