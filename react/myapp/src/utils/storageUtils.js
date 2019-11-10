import store from 'store';
// store 是一个跨浏览器的localstorage插件
// https://github.com/marcuswestin/store.js

const USER_KEY = 'user_key';
export default {
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY, user);
  },
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return store.get(USER_KEY) || {};
  },
  removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  }
}