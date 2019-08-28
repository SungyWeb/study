import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	count: 0,
  	todos: [
      { id: 1, text: 'todo1', done: true },
      { id: 2, text: 'todo2', done: false }
    ]
  },
  getters: {
  	doneTodos(state) {
  		return state.todos.filter(v => v.done);
  	},
  	doneTodosCount(state, getters) {
  		return getters.doneTodos.length;
  	}
  },
  mutations: {
  	increment(state) {
  		state.count++;
  	}
  },
  actions: {

  }
})
