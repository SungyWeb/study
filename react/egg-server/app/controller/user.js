'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if(username === 'admin' && password === 'admin123') {
      ctx.body = {
        status: 0,
        msg: '登录成功',
        data: {
          username,
          id: 1
        }
      };
    }else {
      ctx.body = {
        status: 1,
        msg: '账号或密码错误'
      }
    }
    
  }
}

module.exports = UserController;
