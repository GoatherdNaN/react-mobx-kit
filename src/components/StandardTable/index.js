import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames'
import { Table, Icon, Tooltip } from 'antd';
import styles from './index.less';
import { walkTreeNode } from 'utils/common';

function getTooltip(text, record, index, render) {
  let label = typeof render === 'function' ? render(text, record, index) : text;
  return (
    <Tooltip
      title={label}
      placement="topLeft"
      overlayStyle={{
        wordBreak: 'break-all'
      }}
    >{label}</Tooltip>
  )
}

function initData(columns, config) {
  const needTotalList = [];
  let columnsLen = columns.length;
  try {
    columns = columns.map(column => {
      if (column.needTotal) {
        needTotalList.push({ ...column, total: 0 });
      }
      if (config.needEllipsis) {
        column.width = column.width || 100 / columnsLen + '%';
        column.className = styles.ellipsis;
        if (column.tooltip !== false) {
          const myRender = column.render;
          column.render = (text, record, index) => getTooltip(text, record, index, myRender);
        }
      }
      return column;
    });
  } finally {
    return {
      needTotalList,
      columns
    };
  }
}
function initTotalList(columns) {
  const needTotalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      needTotalList.push({ ...column, total: 0 });
    }
  });
  return needTotalList;
}

export default class StandardTable extends PureComponent {
  static defaultProps = {
    rowKey: 'id',
  };
  constructor(props) {
    super(props);
    const { needTotalList, columns } = initData(props.columns, {
      needEllipsis: props.needEllipsis
    });
    this.columns = columns;
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  componentWillReceiveProps(nextProps) {
    // clean state
    if (Array.isArray(nextProps.selectedRowKeys) && nextProps.selectedRowKeys.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      this.setState({
        selectedRowKeys: [],
        needTotalList,
      });
    }
  }
  handleRowSelect = (record, checked, selectedRows) => {
    // delete nativeEvent
    const { rowKey } = this.props;
    const selectedRowKeys = selectedRows.map(target => target[rowKey]);
    const selectedRowsNew = selectedRows.slice();
    const selectedRowKeysSet = new Set(selectedRowKeys);
    walkTreeNode(record, (target, index, array, parent) => {
      if (
        parent &&
        selectedRowKeysSet.has(parent[rowKey]) &&
        !selectedRowKeysSet.has(target[rowKey])
      ) {
        selectedRowKeysSet.add(target[rowKey]);
        selectedRowsNew.push(target);
      }
    });
    const selectedRowKeysNew = Array.from(selectedRowKeysSet);

    let needTotalList = [...this.state.needTotalList];
    needTotalList = needTotalList.map(item => {
      return {
        ...item,
        total: selectedRowsNew.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRowKeysNew);
    }

    this.setState({ selectedRowKeys: selectedRowKeysNew, needTotalList });
  };
  handleRowSelectAll = (checked, selectedRows) => {
    const { rowKey } = this.props;
    const selectedRowKeys = selectedRows.map(target => target[rowKey]);

    let needTotalList = [...this.state.needTotalList];
    needTotalList = needTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRowKeys);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectAll(false, []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data,
      loading,
      rowKey,
      multiple = true,
      needEllipsis = false,
      defaultExpandAllRows = false,
      ...otherProps
    } = this.props;
    const { list, pagination } = data || { list: [], pagination: false };
    const paginationProps = pagination && {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      ...pagination,
    };
    const expandConfig = {
      defaultExpandAllRows,
    };
    if (defaultExpandAllRows) {
      expandConfig.indentSize = 20;
    }
    if (multiple) {
      expandConfig.title = () => (
        <Fragment>
          <Icon type="info-circle" style={{ marginRight: 10 }} />
          已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          {needTotalList.map(item => (
            <span style={{ marginLeft: 8 }} key={item.dataIndex}>
              {item.title}总计&nbsp;
              <span style={{ fontWeight: 600 }}>
                {item.render ? item.render(item.total) : item.total}
              </span>
            </span>
          ))}
          <a name="empty" onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
            清空
          </a>
        </Fragment>
      );
    }
    // if(paginationProps && paginationProps.total) {
    //   expandConfig.footer = () => `total: ${paginationProps.total}`;
    // }
    const rowSelection = {
      selectedRowKeys,
      onSelect: this.handleRowSelect,
      onSelectAll: this.handleRowSelectAll,
      // onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={classNames(styles.standardTable, {
        [styles.ellipsis]: needEllipsis
      })}>
        <Table
          style={{ marginTop: 14 }}
          size='middle'
          bordered
          loading={loading}
          rowKey={rowKey}
          rowSelection={multiple ? rowSelection : null}
          dataSource={list}
          columns={this.columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...otherProps}
          {...expandConfig}
        />
      </div>
    );
  }
}