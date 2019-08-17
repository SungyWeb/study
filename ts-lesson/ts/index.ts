@test()
class MyTest {
	name: string;
	isTest: boolean;
	constructor() {
		this.name = 'tttt';
	}
}

function test() {
	return function(tar: Function) {
		tar.prototype.isTest = true;
	}
}

var a = new MyTest();
console.log(a.isTest);