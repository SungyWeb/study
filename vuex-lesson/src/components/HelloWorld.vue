<template>
  <div class="hello">
    <h4>{{msgd + count}}</h4>
    <h4>{{msgd1}}</h4>
    <h4>{{doneTodos}}</h4>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '哈哈哈'
    }
  },
  computed: {
    ...mapState(['count']),
    msgd() {
      return this.msg + '---';
    },
    msgd1() {
      return this.msgd + this.$store.state.count;
    },
    doneTodos() {
      return this.$store.getters.doneTodos
    }
  },
  methods: {
    ...mapMutations(['increment'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
