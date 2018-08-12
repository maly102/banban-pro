import React, { PureComponent, Fragment } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import tbStyles from '../List/TableList.less';
import StandardTable from 'components/StandardTable';
import {Card, Divider, Button, Dropdown, Menu, Icon} from 'antd';
import { connect } from 'dva';

@connect(({ promotion, loading }) => ({
  promotion,
  loading: loading.models.promotion,
}))
export default class Banner extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      promotion: { bannerList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: 'banner图片',
        dataIndex: 'titlePic',
      },
      {
        title: '是否上架',
        dataIndex: 'onPromote',
      },
      {
        title: '点击次数',
        dataIndex: 'clickTimes',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <Fragment>
            <a>置顶</a>
            <Divider type="vertical" />
            <a>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    );

    return(
      <PageHeaderLayout title="推广管理">
        <Card bordered={false}>
          <div className={tbStyles.tableList}>
            <div className={tbStyles.tableListOperator}>
              <Button icon="plus" type="primary">新增</Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              loading={loading}
              selectedRows={selectedRows}
              data={bannerList}
              columns={columns}
              onSelectRow={this.handleSelectRows}
            >
            </StandardTable>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
