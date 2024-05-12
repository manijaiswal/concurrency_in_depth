
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const { performance } = require('perf_hooks');

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
    for (let i = start; i<end; i++) {
        if (checkPrime(i) == true) {
            noOfPrimes++;
        }
    }
}

if (isMainThread) {
    console.log('Inside main thread')
    let batchSize = 10;
    let checkTill = 1000000;
    let batch = checkTill/batchSize;
    let nstart = 3;
    let workers = [];
    let nend = 0;
    let start = performance.now();
    for (let i = 0;i < batchSize; i++) {
        nend = nstart + batch;
        const worker = new Worker(__filename, {workerData: {start: nstart, end: nend}})
        nstart = nend + 1;
        workers.push(worker);
    }
    console.log(`Checking till ${checkTill}, found ${noOfPrimes} prime numbers. Took ${performance.now() - start} milliseconds`);
    // workers.forEach((w) => {
    //     w.on('message', (msg)=> {
    //         console.log(`Checking till ${checkTill}, found ${msg + 1} prime numbers. Took ${performance.now() - start} milliseconds`);
    //     })
    // })
    
} else {
    let startTime = performance.now();
    findPrime(workerData.start, workerData.end);
    parentPort.postMessage(noOfPrimes);
    console.log(`thread till ${JSON.stringify(workerData)}, found prime numbers ${noOfPrimes}. Took ${performance.now() - startTime} milliseconds`);
}

