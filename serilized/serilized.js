const {performance} = require('perf_hooks');


function checkPrime(num) {
    if (num<=2) {
        return false;
    }
    for (let i =3 ;i*i<=num; i++) {
        if (num%i === 0) {
            return false;
        }
    }
    return true;
}

let noOfPrimes = 0;

function findPrime(start, end) {
    let startTime = performance.now();
    for (let i = start; i<end; i++) {
        if (checkPrime(i) == true) {
            noOfPrimes++;
        }
    }
    console.log(`total no of prime found ${performance.now() - startTime}`, noOfPrimes)
}

findPrime(3, 10000000)