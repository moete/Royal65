
const makeRandomNumbers=(length:number)=> [...new Array(length)]
    .map(() => Math.random());
    
export default {
    makeRandomNumbers
}