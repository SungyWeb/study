function observe(data) {
	if(!data || typeof data !== 'object') return;
	Object.keys(data).forEach(k => {
		defineReactive(data, key, data[key]);
	})
}
function defineReactive(obj, key, val) {
	observe(val);

	Object.defineProperty(obj, key, {
		emumerable: true,
		configurable: false,
		get: function() {
			return val;
		},
		set: function(newVal) {
			if(newVal === val) return;
			observe(newVal);
			// do something
			val = newVal;
		}
	})
}