function loggingIdentity(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
loggingIdentity([1, 2, 3]); // ok
loggingIdentity(['a', 'b', 'c']); // ok
loggingIdentity([{}, 'b', 'c']); // ok
