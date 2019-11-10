/*
发送ajax请求的函数模块
封装axios
函数的返回值是一个promise对象
统一处理请求错误： 外面套一层promise
*/

import axios from 'axios';
import { message } from 'antd';

export default function ajax (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    /*
      1. 执行ajax请求
      2. 请求成功，调用resolve
      3. 请求失败， 不能调用reject，而是提示异常信息 
    */
    let promise = null;
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data
      });
    } else {
      promise = axios.post(url, data);
    }
    promise.then(response => resolve(response.data)).catch(err => {
      // reject(err);   注意不能调用reject
      message.error('请求出错了，地址' + url + ', 错误信息：' + err.message);
    })
  });
  
}
