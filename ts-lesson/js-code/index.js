"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function get(param) {
    return function (target, methodName, desc) {
        var oMethod = desc.value;
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (v) { return String(v); });
            args = [param].concat(args);
            oMethod.apply(this, args);
        };
    };
}
function _say() {
    console.log(456);
}
var AA = /** @class */ (function () {
    function AA() {
    }
    AA.prototype.say = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
    };
    __decorate([
        get('toString')
    ], AA.prototype, "say", null);
    return AA;
}());
var a = new AA();
a.say(123, '345', [5, 6, 7]);
