
// combineLatest:combineLatest combines the values from all the Observables passed in the observables array. 
//This is done by subscribing to each Observable in order 

import { combineLatest, delay, of, startWith, timer } from "rxjs";

// combineLatest timer example
const firstTimer = timer(0, 1000); // emits 0, 1, 2, from 0th Second and then 1, 2, 3 after every second. 
const secondTimer = timer(500, 1000) // emits 0 at 0.5th second and then 1, 2, 3 after every second. 
const combineTimers = combineLatest([firstTimer, secondTimer]);
// combineTimers.subscribe((x) => console.log("Combined Timed Value:", x));

// combineLatest dictionary example
const observables = {
    a: of(1).pipe(delay(1000), startWith(0)),
    b: of(5).pipe(delay(5000), startWith(0)),
    c: of(10).pipe(delay(10000), startWith(0)),
}
const combined = combineLatest(observables);
// combined.subscribe((x) => console.log(x));


