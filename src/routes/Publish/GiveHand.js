import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import { Card, Form, Row, Col, Button, Input, Select } from 'antd';
import tbStyles from '../List/TableList.less';
import { connect } from 'dva';

const FormItem = Form.Item;

@connect(({ publish, loading }) => ({
  publish,
  loading: loading.models.publish,
}))
@Form.create()
export default class GiveHand extends PureComponent {
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
        type: 'publish/fetchGivehandList',
        payload: values,
      });
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();

    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'publish/fetchGivehandList',
      payload: {},
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
      type: 'publish/fetchGivehandList',
      payload: params,
    });
  }

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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'publish/fetchGivehandList',
    });
  }

  render() {
    const {
      publish: { giveHandList },
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
        title: '用户姓名',
        dataIndex: 'clientName',
      },
      {
        title: '关系',
        dataIndex: 'relationShip',
      },
      {
        title: '累计助人',
        dataIndex: 'helpCount',
      },
      {
        title: '帮接',
        dataIndex: 'pickUp',
      },
      {
        title: '帮送',
        dataIndex: 'send',
      },
      {
        title: '帮带',
        dataIndex: 'takeCare',
      },
      {
        title: '助人币',
        dataIndex: 'helpCoin',
      },
    ];

    return (
      <PageHeaderLayout title="助人列表">
        <Card bordered={false}>
          <div className={tbStyles.tableList}>
            <div className={tbStyles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              showSelection="none"
              loading={loading}
              selectedRows={selectedRows}
              data={giveHandList}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
