import crypto from 'crypto';

export const randomString = (bytesSize = 32) =>
  crypto.randomBytes(bytesSize).toString('hex');

export const numbersInRangeObject = (begin, end) => {
    if (end < begin) {
        throw Error(`Invalid range because ${end} < ${begin}`);
    }
    let sum = 0;
    let count = 0;
    for (let i = begin; i <= end; i++) {
        sum += i;
        count++;
    }
    return { sum, count };
};


export const numbersInRangeAverageObject = (begin, end) => {
    if (end < begin) {
        throw Error(`Invalid range because ${end} < ${begin}`);
    }
    let sum = 0;
    let count = 0;
    let average;
    for (let i = begin; i <= end; i++) {
        sum += i;
        count++;
    }
    average = sum/count;
    return { sum, count,  average};
};