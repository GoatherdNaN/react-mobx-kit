import React, { Component  } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Badge, Form, Input, Select, Button, Popconfirm } from 'antd'
import PageHeaderWrapper from 'components/PageHeaderWrapper'
import AuthComponent from 'components/Authorized/AuthComponent'
import StandardTable from 'components/StandardTable'

const FormItem = Form.Item;

const statusMap = ['error', 'success'];
const status = ['停职', '在职'];

@Form.create()
@inject('tableStore')
@observer
export default class Table extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: []
    };
  }

  componentWillMount() {
    const { location: { query } } = this.props;
    if(!(query && query.isNeedHoldSearchCriteria)) {
      this.props.tableStore.initSearchCriteria();
    }
    this.props.tableStore.fetchList();
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
      render: val => <Badge status={statusMap[val]} text={status[val]} />
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt'
    },
    {
      title: '操作',
      render: (text, record) => (
        <div className="operate-col">
          <AuthComponent code="table-check">
            <a onClick={() => this.check(record.id)}>查看</a>
          </AuthComponent>
          <AuthComponent code="table-update">
            <a onClick={() => this.edit(record.id)}>编辑</a>
          </AuthComponent>
          <AuthComponent code="table-remove">
            <Popconfirm
              placement="topRight"
              title="确定删除该条数据吗？"
              onConfirm={() => this.changeStatus(val.id, val.status)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </AuthComponent>
        </div>
      ),
    },
  ];
  // 增
  add = () => {
    const { history } = this.props;
    history.push(`/basis/table/new`);
  }
  // 查看
  check = id => {
    const { history } = this.props;
    history.push(`/basis/table/check/${id}`);
  }
  // 改
  edit = id => {
    const { history } = this.props;
    history.push(`/basis/table/edit/${id}`);
  }
  /**查：开始 */
  // 表格项变动查询，如分页项
  handleStandardTableChange = pagination => {
    const { tableStore: { searchCriteria } } = this.props;
    const params = {
      ...searchCriteria,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.props.tableStore.fetchList(params);
  }
  // 搜索
  handleSearch = e => {
    e.preventDefault(); // 不加会出现Referer改变的问题
    const { form } = this.props;
    form.validateFields((err, formValues) => {
      if (err) return;
      this.props.tableStore.fetchList(formValues);
    });
  }
  // 重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.props.tableStore.initSearchCriteria();
    this.props.tableStore.fetchList();
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
      tableStore: { loading, searchCriteria }
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: searchCriteria.name,
            })(
              <Input placeholder="请输入姓名" />
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <FormItem>
            {getFieldDecorator('status', {
              initialValue: searchCriteria.status,
            })(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                <Option value="0">停职</Option>
                <Option value="1">在职</Option>
              </Select>
            )}
          </FormItem>
        </div>
        <div className="searchItem">
          <Button loading={loading} type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
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
      loading,
    } = this.props.tableStore;

    return (
      <PageHeaderWrapper title="表格">
        <Card bordered={false}>
          <div className="tableList">
            {this.renderSearchForm()}
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={this.add}>
                新建
              </Button>
              <AuthComponent code="table-remove">
                {selectedRows.length > 0 && (
                  <Button icon="delete">删除</Button>
                )}
              </AuthComponent>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={{list,pagination}}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}