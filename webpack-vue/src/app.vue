<template>
	<div class="app">
		<h3 :class="this.className" @click="changeClass">{{msg}}</h3>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				className: 'red',
				msg: '哈哈哈哈'
			}
		},
		methods: {
			changeClass() {
				this.className = this.className === 'red' ? 'blue' : 'red';
			}
 		}
	}
</script>

<style lang="less" scoped>
	.red {
		color: red
	}
	.blue {
		color: blue
	}
</style>