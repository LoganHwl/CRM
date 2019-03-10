import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon, Input, Form, Row, Col } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

import Noty from '../../components/Noty';

const FormItem = Form.Item;

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@Form.create()
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  // onGetCaptcha = () =>
  //   new Promise((resolve, reject) => {
  //     this.loginForm.validateFields(['mobile'], {}, (err, values) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const { dispatch } = this.props;
  //         dispatch({
  //           type: 'login/getCaptcha',
  //           payload: values.mobile,
  //         })
  //           .then(resolve)
  //           .catch(reject);
  //       }
  //     });
  //   });

  handleSubmit = (err, values) => {
    // const { type } = this.state;
    // var obj = new WxLogin({
    //     id: "login_container", // 需要显示的容器id
    //     appid: "", // 公众号appid wx*******
    //     scope: "snsapi_login", // 网页默认即可
    //     redirect_uri: "", // 授权成功后回调的url
    //     state: "", // 可设置为简单的随机数加session用来校验
    //     style: "black", // 提供"black"、"white"可选。二维码的样式
    //     href: "" ,// 外部css文件url，需要https });
    // })
    //     console.log(obj)

    const params = values;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: params,
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const {
      login,
      submitting,
      form: { getFieldDecorator },
    } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          // onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="微信快速登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="account" placeholder="账号" />

            <Password name="password" placeholder="密码" onPressEnter={this.handleSubmit} />
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator('div')(<div id="login_container">12456</div>)}
                </Col>
                <Col span={8} />
              </Row>
            </FormItem>
          </Tab>

          <Submit loading={submitting}>微信登录</Submit>
        </Login>
        <Noty />
      </div>
    );
  }
}

export default LoginPage;
