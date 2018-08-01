import React, { PureComponent, Fragment } from 'react';
import {Modal, Form, Input, InputNumber, Select, Button} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class EditClient extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();
    if(this.props.handleOk) {
      this.props.handleOk()
    }
  }

  handleCancel = (e) => {
    e.preventDefault();
    if(this.props.handleCancel) {
      this.props.handleCancel()
    }
  }

  handlePass = () => {

  }

  handleUnPass = () => {}

  renderFooterButtons = () => {
    const {isCheck} = this.props;
    if(isCheck) {
      return [
        <Button key="ok" type="primary" onClick={this.handlePass}>审核通过</Button>,
        <Button key="ng" type="danger" onClick={this.handleUnPass}>审核不通过</Button>,
      ]
    }else{
      return [
        <Button key="back" onClick={this.handleCancel}>确定</Button>,
      ]
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={620}
      >
        <Form>
          <FormItem {...formItemLayout} label="用户姓名">
            {getFieldDecorator('clientName')(<Input placeholder="请输入用户姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="用户手机号">
            {getFieldDecorator('mobile')(<Input placeholder="请输入用户手机号" type="number" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="孩子名字">
            {getFieldDecorator('childName')(<Input placeholder="请输入孩子名字" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="助人币">
            {getFieldDecorator('helpCoin', {initialValue: 0})(<InputNumber min={0} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="同学家长姓名">
            {getFieldDecorator('parentName')(<Input placeholder="请输入同学家长姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="关系">
            {getFieldDecorator('relationShip')(
              <Select style={{ width: 170 }}>
                <Option value="father">父亲</Option>
                <Option value="mother">母亲</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="同年级其他班家长">
            {getFieldDecorator('otherParent')(<Input placeholder="请输入同年级其他班家长姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="孩子所在学校">
            <div className={styles.popSchoolBox}>
              学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="孩子所在班级">
            <div className={styles.popSchoolBox}>
              学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校学校
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="学校所在地址">
            <div className={styles.popSchoolBox}>
              学校学校学校学校学校学
            </div>
          </FormItem>
        </Form>
      </Modal>
    );
  }
  }
