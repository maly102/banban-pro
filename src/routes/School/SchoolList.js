import React, { PureComponent, Fragment } from 'react';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Form, Row, Col, Button, Input, Cascader } from 'antd';
import { connect } from 'dva';
import tbStyles from '../List/TableList.less';

const FormItem = Form.Item;

@connect(({ school, loading }) => ({
  school,
  loading: loading.models.school,
}))
@Form.create()
export default class SchoolList extends PureComponent {
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
        type: 'school/fetchSchoolList',
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
      type: 'school/fetchSchoolList',
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
      type: 'school/fetchSchoolList',
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
            <FormItem label="校园名称">
              {getFieldDecorator('schoolName')(<Input placeholder="校园名称" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="城市">
              {getFieldDecorator('city')(<Cascader placeholder="城市" />)}
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
      type: 'school/fetchSchoolList',
    });
  }

  render() {
    const {
      school: { schoolList },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '校园编号',
        dataIndex: 'schoolCode',
      },
      {
        title: '校园名称',
        dataIndex: 'schoolName',
      },
      {
        title: '校园城市',
        dataIndex: 'city',
      },
      {
        title: '校园详细地址',
        dataIndex: 'address',
        width: 400,
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
      <PageHeaderLayout title="校园列表">
        <Card bordered={false}>
          <div className={tbStyles.tableList}>
            <div className={tbStyles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              showSelection="none"
              selectedRows={selectedRows}
              loading={loading}
              data={schoolList}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
