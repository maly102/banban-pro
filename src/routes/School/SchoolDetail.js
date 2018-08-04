import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import FooterToolbar from 'components/FooterToolbar'
import {Card, Form, Cascader, Row, Col, Button, Input, Radio} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

@connect(({school, loading}) => ({
  school,
  loading: loading.models.school,
}))
@Form.create()
export default class SchoolDetail extends PureComponent {
  handleSubmit = () => {}
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <PageHeaderLayout
        title="校园详情"
      >
        <Card bordered={false}>
          <div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="校园城市"
              >
                {getFieldDecorator('city', {
                  rules: [{
                    required: true, message: '请输入校园所在的城市',
                  }],
                })(
                  <Cascader options={options} placeholder="校园城市" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="详细地址"
              >
                {getFieldDecorator('address', {
                  rules: [{
                    required: true, message: '请输入校园详细地址',
                  }],
                })(
                  <Input placeholder="详细地址" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="校园名称"
              >
                {getFieldDecorator('schoolName', {
                  rules: [{
                    required: true, message: '请输入校园名称',
                  }],
                })(
                  <Input placeholder="校园名称" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="接送要求"
              >
                {getFieldDecorator('demand')(
                  <RadioGroup>
                    <Radio value={1}>只能本班接单</Radio>
                    <Radio value={2}>只能本年级和其他班</Radio>
                    <Radio value={3}>本校内都可以</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Form>
          </div>

          <FooterToolbar>
            <Button>提交</Button>
          </FooterToolbar>
        </Card>
      </PageHeaderLayout>
    );
  }
}
