import React, { PureComponent, Fragment } from 'react';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Form, Row, Col, Button, Input, Select, Divider } from 'antd';
import { connect } from 'dva';
import tbStyles from '../List/TableList.less';

const FormItem = Form.Item;

@connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
}))
@Form.create()
export default class RejectList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'client/fetchRefuseList',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'client/fetchRefuseList',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'client/fetchRefuseList',
      payload: params,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(<Input placeholder="手机号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('clientName')(<Input placeholder="姓名" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={tbStyles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    //const { expandForm } = this.state;
    //return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    return this.renderSimpleForm();
  }

  handleShowDetail = (id) => {
    const {dispatch} = this.props

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'client/fetchRefuseList',
    });
  }

  render() {
    const {
      client: { refuseList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '用户编号',
        dataIndex: 'clientCode',
      },
      {
        title: '注册手机',
        dataIndex: 'mobile',
      },
      {
        title: '注册时间',
        dataIndex: 'registerTime',
      },
      {
        title: '姓名',
        dataIndex: 'clientName',
      },
      {
        title: '孩子姓名',
        dataIndex: 'childName',
      },
      {
        title: '关系',
        dataIndex: 'relationShip',
      },
      {
        title: '助人币',
        dataIndex: 'helpCoin',
      },
      {
        title: '孩子小名',
        dataIndex: 'childNickName',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <Fragment>
            <a onClick={() => this.handleShowDetail(record.id)}>用户详情</a>
          </Fragment>
        ),
      },
    ];
    return (
      <PageHeaderLayout title="拒绝列表">
        <Card bordered={false}>
          <div className={tbStyles.tableList}>
            <div className={tbStyles.tableListForm}>{this.renderForm()}</div>
            <div className={tbStyles.tableListOperator}>
              <span>
                <Button type="primary">审核通过</Button>
              </span>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={refuseList}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
