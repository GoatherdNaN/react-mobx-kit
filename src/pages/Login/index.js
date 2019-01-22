import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import cookie from 'utils/cookie'
import storage from 'utils/storage'

import styles from './index.less'

const FormItem = Form.Item;

@Form.create()
@inject('loginStore')
@observer
export default class Login extends Component {
  state = {
    username: '',
    password: '',
    remember: false
  }

  componentWillMount() {
    storage.clear();
    this.loadAccountInfo();
  }

  componentDidMount() {
    // enter快捷键
    document.addEventListener("keyup", this.onKeyUp, false);
  }

  componentWillUnmount() {
    this.setState = () => {};
    document.removeEventListener("keyup", this.onKeyUp, false);
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
        return;
      }

      const callback = (intoUrl, token) => {
        storage.setItem('token',token);
        if(values.remember) {
          const accountInfo = values.username+ '&' +values.password;
          cookie.setCookie('accountInfo',accountInfo);
        } else {
          cookie.delCookie('accountInfo');
        }
        if(this.props.location.state) {
          intoUrl = this.props.location.state.from;
        }
        const { history } = this.props;
        history.push({
          pathname: intoUrl,
          query: {
            isFirstLoad: true
          }
        });
      }
      const { remember, ...payload } = values;
      this.props.loginStore.login(payload, callback);
    });
  }

  //判断cookie中是否有账号信息，有就可以进行预填写，没有则直接返回
  loadAccountInfo = () => {
    const accountInfo = cookie.getCookie('accountInfo');
    if(!accountInfo) return;
    let index = accountInfo.indexOf("&");
    const username = accountInfo.substring(0, index);
    const password = accountInfo.substring(index + 1);
    this.setState({ username, password, remember: true  });
  };

  render() {
    const {
      form: {
        getFieldDecorator
      },
      loginStore: {
        loading
      },
    } = this.props;
    const { username, password, remember } = this.state;
    return (
      <div className={styles.loginPage}>
        <section className={styles.loginContainer}>
          <header>Welcome!</header>
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
                initialValue: username
              })(
                <Input
                  placeholder="Username"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                initialValue: password
              })(
                <Input.Password
                  placeholder="Password"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: remember,
              })(
                <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
              )}
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.loginButton}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </section>
      </div>
    );
  }
}