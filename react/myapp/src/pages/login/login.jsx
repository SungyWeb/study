import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.less';
import logo from './imgs/logo.png';
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

class Login extends Component {

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { username, password} = values;
        const result = await reqLogin(username, password);
        if (result.status === 0) {
          message.success('登录成功');
          const user = result.data;
          memoryUtils.user = user;  // 保存到内存中
          storageUtils.save(user);  // 保存到localstorage
          this.props.history.replace('/');
        }else {
          message.error(result.msg)
        }
      }
    });
  }
  validatePwd = (rule, value, callback) => {
    if(!!value) {
      const len = value.length;
      // const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])({6,20})$/;
      const reg = /^[\w]{6,20}$/;
      if(len < 6) {
        callback('密码长度不能小于6位');
      } else if (len > 20) {
        callback('密码长度不能大于20位')
      } else {
        if(!reg.test(value)) {
          callback('密码必须同时包含数字、字母')
        }else {
          callback();
        }
      } 
    }else {
      callback('密码不能位空');
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const user = memoryUtils.user;
    if(user && user.id) {
      return <Redirect to="/"></Redirect>
    }
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-section'>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                  { min: 4, message: '最少4位!' },
                  { max: 12, message: '最多12位!' },
                  { pattern: /^[\w]{4,12}$/, message: '必须是数字字母下划线!' },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.validatePwd }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const LoginWrap = Form.create()(Login);
export default LoginWrap;