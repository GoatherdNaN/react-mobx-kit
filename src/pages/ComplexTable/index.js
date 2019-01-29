import React, { Component  } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, DatePicker, message } from 'antd'
import { Button, Card } from 'base'
import { AuthComponent } from 'components/Authorized'
import StandardTable from 'components/StandardTable'
import { formatTimeStamp } from 'utils/format'
import { YMD, getInitDate } from 'utils/moment'
import { OPERATE_ITEM } from 'constants/config'
import AuthCode from 'constants/authCode'
import { getLabelFromDict, STATUS } from 'constants/dict'

const { Option } = Select;
const { PopButton } = Button;
const AuthButton = AuthComponent(Button);
const AuthPopButton = AuthComponent(PopButton,{ stopPop: true });

@withRouter
@Form.create()
@inject('complexTableStore')
@observer
export default class Table extends Component  {
  constructor(props) {
    super(props);
    let { location: { query }, complexTableStore: { getDataToJs } } = props;
    query = query || {};
    if (query.holdParams === true) {
      this.search();
    } else if (
      JSON.stringify(query) === {} ||
      query.holdParams === false ||
      !query.isFromTagBar ||
      !getDataToJs('listData').list.length
    ) {
      this.search({});
    }

    this.state = {
      visible: false,
      mode: OPERATE_ITEM.add.code,
      initData: {},
      selectedRows: []
    };
  }

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '职位',
      dataIndex: 'job',
    },
    {
      title: '家庭住址',
      dataIndex: 'address'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => getLabelFromDict(STATUS, val)
    },
    {
      title: '上次调度时间',
      width: 172,
      dataIndex: 'updatedAt',
      render: text => formatTimeStamp(text)
    },
    {
      title: '操作',
      width: 150,
      render: (text) => (
        <div className="operateCol">
          <AuthButton
            hasAuth
            type="text"
            onClick={() => this.check(text)}
          >{OPERATE_ITEM.check.title}</AuthButton>
          <AuthButton
            type="text"
            onClick={() => this.edit(text)}
            code={AuthCode.basis.nomalList.nomalListEdit.code}
          >{OPERATE_ITEM.update.title}</AuthButton>
          <AuthPopButton
            hasAuth
            type="text"
            confirmProps={{
              title: "确定删除该条数据吗？",
              onConfirm: () => this.delete(text.id)
            }}
            code={AuthCode.basis.nomalList.nomalListRemove.code}
          >删除</AuthPopButton>
        </div>
      ),
    },
  ];
  // 处理时间段
  onStartChange = (startDate) => {
    this.setState({
      startDate,
    });
  }
  onEndChange = (endDate) => {
    this.setState({
      endDate,
    });
  }
  disabledStartDate = (startDate) => {
    const { endDate } = this.state;
    if (!startDate || !endDate) {
      return false;
    }
    return startDate.valueOf() > endDate.valueOf();
  }
  disabledEndDate = (endDate) => {
    const { startDate } = this.state;
    if (!endDate || !startDate) {
      return false;
    }
    return endDate.valueOf() <= startDate.valueOf();
  }

  // 保存勾选
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  }
  // 模态框控制
  closeModal = () => {
    this.setState({
      visible: false
    })
  }
  // 跳转到增/改/查看 页面
  routeToClientForm = (initData) => {
    const { mode } = this.state;
    const { complexTableStore, history } = this.props;
    const params = mode !== OPERATE_ITEM.add.code && initData.id ? `/${initData.id}` : '';
    complexTableStore.saveInitData(initData, () => history.push(`/basis/complexList/${mode}${params}`));
  }

  // 增
  add = () => {
    this.setState({
      mode: OPERATE_ITEM.add.code
    }, () => this.routeToClientForm({}));
  }
  // 删
  delete = ids => {
    this.props.complexTableStore.remove({ ids }, this.search);
  }
  // 改
  edit = initData => {
    this.setState({
      mode: OPERATE_ITEM.update.code
    }, () => this.routeToClientForm(initData));
  }
  // 查看
  check = initData => {
    this.setState({
      mode: OPERATE_ITEM.check.code
    }, () => this.routeToClientForm(initData));
  }
  // 导出
  export = () => {
    console.log('导出!!!')
  }
  // 查
  search = (params) => {
    if (params === undefined) {
      const { complexTableStore: { getDataToJs } } = this.props;
      params = getDataToJs('searchCriteria');
    }
    if (JSON.stringify(params) === '{}') {
      this.props.form.resetFields();
    }
    this.props.complexTableStore.fetchList(params);
  }
  // 表格项变动查询，如分页项
  handleStandardTableChange = pagination => {
    const { complexTableStore: { searchCriteria } } = this.props;
    const params = {
      ...searchCriteria,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.search(params);
  }
  // 搜索
  handleSearch = e => {
    e.preventDefault(); // 不加会出现Referer改变的问题
    const { form } = this.props;
    form.validateFields((err, formValues) => {
      if (err) return;
      formValues.startDate = formatTimeStamp(formValues.startDate, YMD);
      formValues.endDate = formatTimeStamp(formValues.endDate, YMD);
      this.searchCriteria = formValues;
      this.search(formValues);
    });
  }
  // 刷新
  handleRefresh = () => {
    const { form } = this.props;
    form.resetFields();
    this.searchCriteria = {};
    this.search({});
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
      complexTableStore: {
        loading,
        searchCriteria
      }
    } = this.props;
    return (
      <Form className="searchForm" onSubmit={this.handleSearch} layout="inline">
        <div className="searchItem">
          {getFieldDecorator('name', {
            initialValue: searchCriteria.name
          })(
            <Input allowClear placeholder="请输入姓名" />
          )}
        </div>
        <div className="searchItem" style={{ width: 196 }}>
          {
            getFieldDecorator('startDate', {
              initialValue: getInitDate(searchCriteria.startDate)
            })(
              <DatePicker
                format={YMD}
                placeholder="请选择开始时间"
                onChange={this.onStartChange}
                disabledDate={this.disabledStartDate}
              />
            )
          }
        </div>
        <div className="searchItem" style={{ width: 196 }}>
          {
            getFieldDecorator('endDate', {
              initialValue: getInitDate(searchCriteria.endDate)
            })(
              <DatePicker
                format={YMD}
                placeholder="请选择结束时间"
                onChange={this.onEndChange}
                disabledDate={this.disabledEndDate}
              />
            )
          }
        </div>
        <div className="searchItem" style={{ width: 140 }}>
          {
            getFieldDecorator('status', {
              initialValue: searchCriteria.status
            })(
              <Select allowClear placeholder="请选择状态">
                {
                  STATUS.map(dict => (
                    <Option key={dict.value} value={dict.value}>{dict.label}</Option>
                  ))
                }
              </Select>
            )
          }
        </div>
        <div className="searchItem" style={{ width: 'auto' }}>
          <Button icon="search" loading={loading} type="primary" htmlType="submit">
            查询
          </Button>
        </div>
      </Form>
    );
  }

  render() {
    const { selectedRows } = this.state;
    const { complexTableStore } = this.props;
    const {
      loading,
      listData,
      getDataToJs
    } = complexTableStore;
    const refreshLoading = loading && JSON.stringify(getDataToJs('searchCriteria')) === '{}';
    return (
      <Card size="small" extra={
        <div className="buttonGroupRight">
          <AuthButton
            hasAuth
            icon="redo"
            type="info"
            loading={refreshLoading}
            onClick={this.handleRefresh}
          >刷新</AuthButton>
          <AuthPopButton
            icon="delete"
            type="dangerous"
            hasAuth={selectedRows.length}
            noMatch={() => message.info('还没选择任何项!')}
            onClick={() => this.delete(selectedRows.join(','))}
            code={AuthCode.basis.nomalList.nomalListRemove.code}
          >删除</AuthPopButton>
          <AuthButton
            icon="plus"
            type="warning"
            onClick={this.add}
            code={AuthCode.basis.nomalList.nomalListNew.code}
          >{OPERATE_ITEM.add.title}</AuthButton>
          <AuthButton
            icon="export"
            type="primary"
            onClick={this.export}
            hasAuth
          >{OPERATE_ITEM.export.title}</AuthButton>
        </div>
      }>
        <div className="tableList">
          {this.renderSearchForm()}
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={listData}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Card>
    )
  }
}