import { from, Observable } from 'rxjs'
// Worth Reading every line. https://rxjs.dev/guide/observable
// Observables have no shared executions and are lazy. 
//  Most commonly, observables are created using creation functions, like of, from, interval, etc.
// In an Observable Execution, zero to infinite Next notifications may be delivered. If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.
// Below: Observable that pushed 1,2,3 immediately and then 4 after 1 second; since the subsribe is called; then terminates. 
const observable = new Observable((subscriber) => {
    // happens synchronously
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4); // happens asynchronously
        subscriber.complete();
        subscriber.next(5); // this wont be delivered.
    }, 1000);

})
console.log("Just Before Subscribing")
observable.subscribe({
    next(x) {
        console.log('Got Value ', x);
    },
    error(err) {
        console.log("something went wrong", err);
    },
    complete() {
        console.log("Done");
    }
})
console.log("Just Afet Subscribing")
//Note: Every JavaScript Function is a Pull system
// With generator functions and iteration in ES2015
// functions Code that calls iterator.next() is the Consumer, "pulling" out multiple values from the iterator (the Producer).
//              Producer      	                                Consumer
// Pull      	Passive: produces data when requested. 	        Active: decides when data is requested.
// Push         Active:  produces data at its own pace. 	    Passive: reacts to received data.
// Promise is JavaScript Push System. 
// RxJs System:  An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).
/**
 * 
    A Function is a lazily evaluated computation that synchronously returns a single value on invocation.
    A generator is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
    A Promise is a computation that may (or may not) eventually return a single value.
    An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.
 */
/**
 *  FUNCTION VS OBSERVABLES
 * 
 *  func.call() means "give me one value synchronously"
 *  observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"
 */
// LONG FORM:
const observable_2 = new Observable(function subscribe(subscriber) {
    const id = setInterval(() => {
        subscriber.next('hi');
    }, 1000);
});
// continously emits "hi"; coz we dont mark it as complete. 
observable_2.subscribe((x) => console.log(x));
//with subscription.unsubscribe() you can cancel the ongoing execution


const observable_3 = from([10, 20, 30]);
const sub_3 = observable_3.subscribe((x) => {
    console.log(x)
});
sub_3.unsubscribe();
// A More generic way would be. 
const observer_3 = {
    next: x => console.log('Got a next Value:', x),
    error: err => console.error('Got an Error:', err),
    complete: () => console.log("Completed")
}
observable_3.subscribe(observer_3);
