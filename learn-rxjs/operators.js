// Two types of operator 
//1. Pipe Operators: 
// Flattening(Join) Operators, Filtering, Transformational,Multicast 
//  pure function which takes one Observable as input and generates another Observable as output.
//2. Creational Operators: operator, which can be called as standalone functions to create a new Observable

import { defer, first, fromEvent, interval, map, of } from "rxjs";

of(1, 2, 3).pipe(map((x) => x * x)).subscribe(v => console.log("Squared Value: ", v));

of(1, 2, 3).pipe(first()).subscribe(v => console.log("First Value:", v));

// Creational 
// Defer: Create Observable from another factory; i.e. defer to other observable creator. 
const clicksOrInterval =  defer(() => {
    return Math.random() > 0.5
        ? fromEvent(document, 'click')
        : interval(1000);
});
clicksOrInterval.subscribe(x => console.log(x));