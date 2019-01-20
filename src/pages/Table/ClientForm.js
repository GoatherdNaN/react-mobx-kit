/*
 * @Author: Edlan
 * @Date: 2018-10-26 10:15:25
 * @Description: 增、改、 查看 公共页
 */
import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, DatePicker } from 'antd'
import { inject, observer } from 'mobx-react'
import SpinWrapper from 'components/SpinWrapper'
import { format, disabledDate, disabledDateTime, getDate } from 'utils/moment'

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

@withRouter
@Form.create()
@inject('tableStore','dispatch')
@observer
export default class Workplace extends Component {
  constructor(props) {
    super(props);
    const { location: { query } } = props;
    const { id } = query || {};
    this.id = id;
    // this.isCheck = !!path.match(/check/g);
    // this.isNew = !params.id;
    if(id) {
      props.dispatch({
        type: 'tableStore/fetchDataById',
        payload: { id }
      });
    }
    this.state = {
      initData: {}
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { location: { query },tableStore: { singleData: initData } } = nextProps;
    if (query && query.id && initData) {
      return {
        initData,
      };
    }
    return null;
  }

  handleBack = isNeedHoldSearchCriteria => {
    const { history } = this.props;
    history.push({
      pathname: '/basis/nomalList',
      query: {
        isNeedHoldSearchCriteria: !!isNeedHoldSearchCriteria
      }
    });
  }

  handleSure = e => {
    e.preventDefault();
    const { isNew, id } = this;
    const { form } = this.props;
    form.validateFields((err, formValues) => {
      if (err) return;
      formValues.updatedAt = getDate(formValues.updatedAt);
      if(!isNew) {
        formValues.id = id;
        this.props.tableStore.update(formValues,()=>this.handleBack(true));
      } else {
        this.props.tableStore.add(formValues,()=>this.handleBack(false));
      }
    });
  }

  render() {
    const { initData } = this.state;
    console.log('/',initData);
    const { isCheck, isNew } = this;
    const {
      form: { getFieldDecorator },
      tableStore: { initFormLoading, confirmLoading }
    } = this.props;
    const title = isNew ? '新增': (isCheck ? '查看' : '编辑');
    return (
      <SpinWrapper
        title={title}
        isCheck={isCheck}
        initFormLoading={initFormLoading}
        confirmLoading={confirmLoading}
        onBack={this.handleBack}
        onSure={this.handleSure}
      >
        <Form onSubmit={this.handleSearch}>
          <FormItem {...formItemLayout} label="姓名" >
            {!isCheck ? getFieldDecorator('name', {
              initialValue: initData.name,
            })(
              <Input placeholder="请输入姓名，最长20个字符" />
            ) : initData.name}
          </FormItem>
          <FormItem {...formItemLayout} label="年龄" >
            {!isCheck ? getFieldDecorator('age', {
              initialValue: initData.age,
            })(
              <Input placeholder="请输入年龄，必须为数字" />
            ) : initData.age}
          </FormItem>
          <FormItem {...formItemLayout} label="职位" >
            {!isCheck ? getFieldDecorator('job', {
              initialValue: initData.job,
            })(
              <Input placeholder="请输入职位，最长10个字符" />
            ) : initData.job}
          </FormItem>
          <FormItem {...formItemLayout} label="家庭住址" >
            {!isCheck ? getFieldDecorator('address', {
              initialValue: initData.address,
            })(
              <TextArea rows={4} placeholder="请输入家庭住址，最长200个字符" />
            ) : initData.address}
          </FormItem>
          <FormItem {...formItemLayout} label="状态" >
            {!isCheck ? getFieldDecorator('status', {
              initialValue: initData.status,
            })(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                <Option value={0}>停职</Option>
                <Option value={1}>在职</Option>
              </Select>
            ) : initData.status}
          </FormItem>
          <FormItem {...formItemLayout} label="上传调度时间" >
            {!isCheck ? getFieldDecorator('updatedAt', initData.updatedAt ? {
              initialValue: moment(initData.updatedAt,format),
            } : {})(
              <DatePicker
                style={{ width: '100%' }}
                format={format}
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