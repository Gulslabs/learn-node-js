import { debounceTime, filter, interval, of } from "rxjs";

of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(filter(x => x % 2 == 0)).subscribe(value => console.log("Even Value Only: ", value));
// in 2 seconds Of may emit 1-9 numbers.. debounce of 2 seconds means only 11 gets emitted. 
// Reference for debouceTime and distinctUntilChanged https://www.youtube.com/watch?v=QbNUD5ca99A&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=7
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11).pipe(debounceTime(2000)).subscribe(value => console.log("Debounced Values: ", value))
