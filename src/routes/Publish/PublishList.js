import React, { PureComponent, Fragment } from 'react';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Form, Row, Col, Button, Input, Select, Divider } from 'antd';
import { connect } from 'dva';
import tbStyles from '../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ publish, loading }) => ({
  publish,
  loading: loading.models.publish,
}))
@Form.create()
export default class PublishList extends PureComponent {
  state = {
    modalVisible: false,
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
        type: 'publish/fetchPublishList',
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
      type: 'publish/fetchPublishList',
      payload: {},
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'publish/fetchPublishList',
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
            <FormItem label="发布人">
              {getFieldDecorator('publisher')(<Input placeholder="发布人" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(<Input placeholder="手机号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="发布单号">
              {getFieldDecorator('publishNum')(<Input placeholder="发布单号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="发布状态">
              {getFieldDecorator('status')(
                <Select placeholder="发布状态" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
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
    dispatch({
      type: 'publish/fetchPublishDetail',
      payload: {id}
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'publish/fetchPublishList',
    });
  }

  render() {
    const {
      publish: { publishList },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '发布单号',
        dataIndex: 'publishNum',
      },
      {
        title: '用户编号',
        dataIndex: 'userCode',
      },
      {
        title: '注册手机',
        dataIndex: 'mobile',
      },
      {
        title: '任务生成时间',
        dataIndex: 'publishTime',
      },
      {
        title: '帮助开始时间',
        dataIndex: 'helpSt',
      },
      {
        title: '帮助结束时间',
        dataIndex: 'helpEt',
      },
      {
        title: '助人币',
        dataIndex: 'helpCoin',
      },
      {
        title: '任务状态',
        dataIndex: 'status',
      },
      {
        title: '发布类型',
        dataIndex: 'type',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <Fragment>
            <a onClick={() => this.handleShowDetail(record.id)}>详情</a>
            <Divider type="vertical" />
            <a href="">位置</a>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="发布列表">
        <Card bordered={false}>
          <div className={tbStyles.tableList}>
            <div className={tbStyles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              showSelection="none"
              selectedRows={selectedRows}
              loading={loading}
              data={publishList}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
