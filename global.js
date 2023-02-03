//console.log(global); 
// global.setTimeout(() => {
//    console.log("Inside Timeout") 
// }, 3000);

setTimeout(() => {
    console.log("Inside Timeout");
    clearInterval(int)
}, 3000);

const int = setInterval(() => {
 console.log("Inside Set Interval");
}, 1000)

console.log(__dirname);
console.log(__filename); 