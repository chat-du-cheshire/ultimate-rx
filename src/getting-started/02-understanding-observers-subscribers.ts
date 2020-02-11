import {Observable, Observer} from 'rxjs';

console.groupCollapsed('Understanding observers, partial observers, subscriptions');

const observable = new Observable((subscriber) => {
    subscriber.next('Hi!');
    subscriber.complete();
});

observable.subscribe((value) => console.log(value), null, () => console.log('Completed!'));

console.groupEnd();