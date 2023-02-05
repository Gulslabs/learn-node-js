//  When the subject.next(value) function is called, both subscribers receive the values 1, 2, and 3.

import { BehaviorSubject, Subject, map } from "rxjs";


const subject = new Subject();
subject.subscribe(value => console.log("Original Subcriber value ", value));
subject.next(1);
subject.next(2);
subject.next(3);
subject.pipe(map(x => x * 2)).subscribe(value => console.log("Doubling Subcriber value ", value));
subject.next(4);
/**
 * BehaviorSubject stores the latest value emitted to its consumers, 
 * and whenever a new Observer subscribes, it will immediately receive the "current value". 
 * BehaviorSubjects are useful for representing "values over time". 
 * For instance, an event stream of birthdays is a Subject, but the stream of a person's age would be a BehaviorSubject.
 * 
 */
const bSubject = new BehaviorSubject(0); // 0 is the initial value. 
bSubject.subscribe(val => console.log("Observer A: ", val));
bSubject.next(1);
bSubject.next(2);
bSubject.next(3);

bSubject.subscribe(val => console.log("Observer B: ", val)); // ObserverB gets 3; wiz latest value available.
bSubject.next(4);
bSubject.next(5); 
