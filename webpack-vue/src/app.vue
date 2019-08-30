<template>
	<div class="app">
		<h3 :class="className">{{msg}}</h3>
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