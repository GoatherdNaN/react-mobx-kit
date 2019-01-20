import React, { Component  } from 'react'
import { toJS  } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Badge, Form, Input, Select, message } from 'antd'
import BaseCard from 'base/BaseCard'
import Button from 'base/Button/Button'
import PopButton from 'base/Button/PopButton'
import { AuthComponent } from 'components/Authorized'
import StandardTable from 'components/StandardTable'
import { formatTimeStamp } from 'utils/format'
import ModalForm from './ModalForm'

const FormItem = Form.Item;
const AuthButton = AuthComponent(Button);
const AuthPopButton = AuthComponent(PopButton,{ stopPop: true });

const statusMap = ['error', 'success'];
const status = ['停职', '在职'];

@withRouter
@Form.create()
@inject('tableStore','dispatch')
@observer
export default class Table extends Component  {
  constructor(props) {
    super(props);
    this.searchCriteria = {};
    this.search();
    this.state = {
      visible: false,
      selectedRows: []
    };
  }

  // componentWillMount() {
  //   const { location: { query } } = this.props;
  //   if(!(query && query.isNeedHoldSearchCriteria)) {
  //     this.props.tableStore.initSearchCriteria();
  //   }
  //   this.props.tableStore.fetchList();
  // }

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
      render: val => <Badge status={statusMap[val]} text={status[val]} />
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
          <AuthButton type="text" hasAuth onClick={() => this.check(text.id)}>查看</AuthButton>
          <AuthButton type="text" hasAuth onClick={() => this.edit(text.id)}>编辑</AuthButton>
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
  // 模态框控制
  openModal = () => {
    this.setState({
      visible: true,
    })
  }
  closeModal = () => {
    this.setState({
      visible: false,
    })
  }

  // 增
  add = () => {
    this.openModal();
  }
  // 删
  delete = id => {
    console.log('/',id);
  }
  // 改
  edit = id => {
    const { history } = this.props;
    history.push({
      pathname: `/basis/nomalList/edit`,
      query: {
        id,
        searchCriteria: this.searchCriteria
      }
    });
  }
  // 查
  search = () => {
    this.props.dispatch({
      type: 'tableStore/fetchList',
      payload: this.searchCriteria
    });
  }
  /**查：开始 */
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
  /**查：结束 */
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
      tableStore: {
        ['tableStore/fetchList']: loading
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
            {getFieldDecorator('status')(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                <Option value="0">停职</Option>
                <Option value="1">在职</Option>
              </Select>
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('status')(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                <Option value="0">停职</Option>
                <Option value="1">在职</Option>
              </Select>
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('status')(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                <Option value="0">停职</Option>
                <Option value="1">在职</Option>
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
    const { selectedRows } = this.state;
    const {
      list,
      pagination,
      ['tableStore/fetchList']: loading,
    } = this.props.tableStore;
    const { visible } = this.state;
    const refreshLoading = loading && JSON.stringify(this.searchCriteria) === '{}';
    return (
      <BaseCard size="small" title="普通列表" extra={
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
          >新建</Button>
        </div>
      }>
        <div className="tableList">
            {this.renderSearchForm()}
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={{list: toJS(list),pagination}}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
        <ModalForm visible={visible} handleClose={this.closeModal} />
      </BaseCard>
    )
  }
}