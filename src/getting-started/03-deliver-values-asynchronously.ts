import { Observable } from 'rxjs';

console.groupCollapsed('Deliver values asynchronously with observables');

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
};

const observable = new Observable(subscriber => {
    let count = 0;
    const id = setInterval(() => {
        subscriber.next(count);
        subscriber.complete();
        count += 1;
    }, 1000);

    return () => {
        console.log('called');
        clearInterval(id);

        console.groupEnd();
    };
});

console.log('before');
observable.subscribe(observer);
console.log('after');