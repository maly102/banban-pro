import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import FooterToolbar from 'components/FooterToolbar'
import {Card, Form, Cascader, Row, Col, Button, Input, Radio, InputNumber, Upload, Icon, Switch} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SchoolDetail.less';

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
  state = {
    classList: []
  };

  handleSubmit = () => {}

  handleAddClassInfo = () => {
    const { getFieldDecorator } = this.props.form;
    let clsList = this.state.classList.concat([]);
    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
      },
    };
    let listKey = new Date().getTime();

    clsList.push(
      <Row style={{marginTop: '24px'}} key={listKey}>
        <Col xs={0} sm={4} md={4} lg={4} xl={4}></Col>
        <Col xs={24} sm={16} md={16} lg={16} xl={16} className={styles.schoolClassBox}>
          <Row className={styles.boxCloseBtn}>
            <a onClick={() => this.handleDeleteClassInfo(listKey+'')}><Icon type="close" /></a>
          </Row>
          <Row style={{width: '95%'}}>
            <InputNumber placeholder="年级"/>&nbsp;<span>年级</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputNumber placeholder="班级"/>&nbsp;<span>班级</span>
          </Row>
          <Row style={{marginTop: '15px'}}>
            <Col span={14}>
              <span>导入班级学生信息：</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Icon type="paper-clip" />&nbsp;<span>aaaa.txt</span>
            </Col>
            <Col span={10} style={{display: 'flex'}}>
              <Upload {...uploadProps}>
                <Button size="small">
                  <Icon type="upload" />
                </Button>
              </Upload>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button size="small">查看详情</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button size="small" onClick={this.handleDeleteFile}>删除</Button>
            </Col>
          </Row>
          <Row>
            <span style={{color: 'red'}}>字段样例：学生姓名，家长姓名，家长手机号</span>
          </Row>
          <Row style={{marginTop: '15px'}}>
            <span>年级是否上架：</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Switch defaultChecked />
          </Row>
        </Col>
      </Row>
    );
    this.setState({
      classList: clsList
    })
  }

  handleDeleteFile = () => {

  }

  handleDeleteClassInfo = (key) => {
    let clsList = this.state.classList.concat([]);
    if(clsList.length > 0) {
      let findIndex = clsList.findIndex((item) => item.key === key)
      clsList.splice(findIndex, 1)
      if(findIndex >= 0) {
        this.setState({
          classList: clsList
        })
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {classList} = this.state;
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
            {classList}
            <Row style={{marginTop: '24px'}}>
              <Col xs={0} sm={4} md={4} lg={4} xl={4}></Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Button onClick={this.handleAddClassInfo}>添加年级班级</Button>
              </Col>
            </Row>
          </div>

          <div className={styles.schoolPageSubmit}>
            <Button size="large" type="primary">提交</Button>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
