
    function get(param: any) {
        return function(target:any, methodName: any, desc: any) {
            let oMethod = desc.value;
            desc.value = function(...args: any[]) {
                args = args.map(v => String(v));
                args = [param, ...args]
                oMethod.apply(this, args)
            }
        }
    }
    function _say() {
        console.log(456)
    }
    class AA {
        @get('toString')
        say(...args:any[]) {
            console.log(args)
        }
    }
    let a = new AA();
    a.say(123, '345', [5,6,7]);