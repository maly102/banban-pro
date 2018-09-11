import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import '../../protobuf/taskinfo_pb';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

/*var test = new proto.taskinfopackage.TaskinfoMessage();
test.setTaskfiled('12312');
var str = test.serializeBinary();

var data = proto.taskinfopackage.TaskinfoMessage.deserializeBinary(str);
console.log(data.getTaskfiled())*/

/*ProtoBuf.load(require('../../protobuf/taskinfo.proto')).then((root) => {
  // Obtain a message type
  var TaskinfoMessage = root.lookupType("taskinfopackage.TaskinfoMessage");
  console.log(TaskinfoMessage)

  // Exemplary payload
  var payload = { taskFiled: "中国" };

  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  var errMsg = TaskinfoMessage.verify(payload);
  if (errMsg)
    throw Error(errMsg);

  // Create a new message
  var message = TaskinfoMessage.create(payload); // or use .fromObject if conversion is necessary

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  var buffer = TaskinfoMessage.encode(message).finish();

  // Decode an Uint8Array (browser) or Buffer (node) to a message
  var decMessage = TaskinfoMessage.decode(buffer);

  console.log(buffer)
  console.log(message)
  console.log(decMessage)

}).catch(err => {
  console.log(err)
})*/

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <Mobile name="phoneNum" placeholder="手机号" />
            <Password name="passWord" placeholder="密码" />
          </Tab>
          {/*<Tab key="mobile" tab="手机号登录">
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage('验证码错误')}
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>*/}
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
