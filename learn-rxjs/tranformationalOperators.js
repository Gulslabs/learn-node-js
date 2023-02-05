
// The mergeMap operator maps each value to a new observable created by calling the getData function, which returns a Promise.
import { mergeMap, of, map, from, switchMap } from "rxjs";

const source = of(1, 2, 3, 4, 5);

source.pipe(mergeMap(
    // from converts the promise returned by getData function into an observable. 
    num => from(getData(num))
), map(res => res.data)).subscribe(value => console.log(value));


function getData(num) {
    return new Promise((resolve, _reject) => {
        // resolve is the  callback function;  when promise is resolved. 
        setTimeout(() => resolve({ data: `Data for ${num}` }), 1000);
    });
}

// SwitchMap Examples: 
/** Returns an Observable that emits items based on applying a function that you supply to each item emitted by
 *  the source Observable; where that function returns an (so-called "inner") Observable.
 *  */
of(1, 2, 3, 4).pipe(switchMap(x => of(x, x ** 2, x ** 3))).subscribe(value => console.log("Switched Value:", value));
