import React, { Component  } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Select, message } from 'antd'
import { Button, Card } from 'base'
import { AuthComponent } from 'components/Authorized'
import StandardTable from 'components/StandardTable'
import { formatTimeStamp } from 'utils/format'
import ModalForm from './ModalForm'
import { OPERATE_ITEM } from 'constants/config'
import { getLabelFromDict, STATUS } from 'constants/dict'

const FormItem = Form.Item;
const { Option } = Select;
const { PopButton } = Button;
const AuthButton = AuthComponent(Button);
const AuthPopButton = AuthComponent(PopButton,{ stopPop: true });

@Form.create()
@inject('tableStore')
@observer
export default class Table extends Component  {
  constructor(props) {
    super(props);
    this.searchCriteria = {};
    this.search();
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
          <AuthButton type="text" hasAuth onClick={() => this.check(text)}>{OPERATE_ITEM.check.title}</AuthButton>
          <AuthButton type="text" hasAuth onClick={() => this.edit(text)}>{OPERATE_ITEM.update.title}</AuthButton>
          <AuthPopButton
            hasAuth
            type="text"
            confirmProps={{
              title: "确定删除该条数据吗？",
              onConfirm: () => this.delete(text.id)
            }}
          >删除</AuthPopButton>
        </div>
      ),
    },
  ];
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

  // 增
  add = () => {
    this.setState({
      mode: OPERATE_ITEM.add.code,
      initData: {},
      visible: true,
    });
  }
  // 删
  delete = id => {
    console.log('/',id);
  }
  // 改
  edit = initData => {
    this.setState({
      initData,
      mode: OPERATE_ITEM.update.code,
      visible: true,
    });
  }
  // 查看
  check = initData => {
    this.setState({
      initData,
      mode: OPERATE_ITEM.check.code,
      visible: true,
    });
  }
  // 查
  search = (params) => {
    if (params !== undefined) {
      this.searchCriteria = params;
      if (JSON.stringify(params) === '{}') {
        this.props.form.resetFields();
      }
    }
    this.props.tableStore.fetchList(this.searchCriteria);
  }
  // 表格项变动查询，如分页项
  handleStandardTableChange = pagination => {
    this.searchCriteria = {
      ...this.searchCriteria,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.search();
  }
  // 搜索
  handleSearch = e => {
    e.preventDefault(); // 不加会出现Referer改变的问题
    const { form } = this.props;
    form.validateFields((err, formValues) => {
      if (err) return;
      this.searchCriteria = formValues;
      this.search();
    });
  }
  // 刷新
  handleRefresh = () => {
    const { form } = this.props;
    form.resetFields();
    this.searchCriteria = {};
    this.search();
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
      tableStore: {
        loading,
      }
    } = this.props;
    return (
      <Form className="searchForm" onSubmit={this.handleSearch} layout="inline">
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('name')(
              <Input placeholder="请输入姓名" />
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('name')(
              <Input placeholder="请输入姓名" />
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('name')(
              <Input placeholder="请输入姓名" />
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('name')(
              <Input placeholder="请输入姓名" />
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('status')(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                {
                  STATUS.map(dict => (
                    <Option key={dict.value} value={dict.value}>{dict.label}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <Button icon="search" loading={loading} type="primary" htmlType="submit">
            查询
          </Button>
        </div>
      </Form>
    );
  }

  render() {
    const { selectedRows, mode, visible, initData } = this.state;
    const { tableStore } = this.props;
    const {
      listData,
      loading,
      confirmLoading,
      [`${mode}`]: handleOk
    } = tableStore;
    const refreshLoading = loading && JSON.stringify(this.searchCriteria) === '{}';
    return (
      <Card size="small" title="普通列表" extra={
        <div className="buttonGroupRight">
          <AuthButton
            code='nomalList'
            icon="sync"
            loading={refreshLoading}
            type="primary"
            onClick={this.handleRefresh}
          >刷新</AuthButton>
          <AuthPopButton
            code='nomalList'
            hasAuth={selectedRows.length}
            noMatch={() => message.info('还没选择任何项!')}
            icon="delete"
          >删除</AuthPopButton>
          <Button
            icon="plus"
            type="primary"
            onClick={this.add}
          >{OPERATE_ITEM.add.title}</Button>
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
        <ModalForm
          mode={mode}
          handleOk={handleOk}
          visible={visible}
          initData={initData}
          search={this.search}
          handleClose={this.closeModal}
          confirmLoading={confirmLoading}
        />
      </Card>
    )
  }
}