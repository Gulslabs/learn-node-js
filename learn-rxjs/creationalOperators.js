// Two types of operator 
//1. Pipe Operators: 
// Flattening(Join) Operators, Filtering, Transformational,Multicast 
//  pure function which takes one Observable as input and generates another Observable as output.
//2. Creational Operators: operator, which can be called as standalone functions to create a new Observable

import { defer, first, fromEvent, generate, interval, map, of, take, throwError } from "rxjs";

of(1, 2, 3).pipe(map((x) => x * x)).subscribe(v => console.log("Squared Value: ", v));

of(1, 2, 3).pipe(first()).subscribe(v => console.log("First Value:", v));

// Creational 
// Defer: Create Observable from another factory; i.e. defer to other observable creator. 
const clicksOrInterval = defer(() => {
    return Math.random() > 0.5
        ? fromEvent(document, 'click')
        : interval(1000);
});
//clicksOrInterval.subscribe(x => console.log(x));

// Generate -> Loop with observable. 

const result = generate({
    initialState: 0,
    condition: x => x < 3,
    iterate: x => x + 1
});

result.subscribe({
    next: value => console.log("generated value: ", value),
    complete: () => console.log('Complete!')
});
// internal and take. 
const result_2 = interval(1000).pipe(take(5));
result_2.subscribe({
    next: x => console.log("Next Value: ", x)
})
// throwError
let errorCount = 0;

const errTimeStampObs$ = throwError(() => {
    const err = new Error(`This error count is ${++errorCount}`);
    err.timestamp = Date.now();
    return err;
});

errTimeStampObs$.subscribe({
    error: err => console.log(err.timestamp, err.message)
});

errTimeStampObs$.subscribe({
    error: err => console.log(err.timestamp, err.message)
});

//  When the subject.next(value) function is called, both subscribers receive the values 1, 2, and 3.

const subject = new subject();
subject.subscribe(value => console.log("Original Subcriber value ", value)); 
subject.pipe(map(x=>x*2)).subscribe(value => console.log("Doubling Subcriber value ", value)); 
subject.next(1); 
subject.next(2); 
subject.next(3);