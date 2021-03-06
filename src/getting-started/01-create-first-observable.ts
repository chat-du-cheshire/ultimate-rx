import {Observable, Observer} from 'rxjs';

console.groupCollapsed('Create your first Observable');

const observer: Observer<any> = {
    next: (value: any) => console.log('Next: ', value),
    error: (error: any) => console.log('Error: ', error),
    complete: () => console.log('Complete!')
};

const observable = new Observable((subscriber) => {
    subscriber.next('Hi!');
    subscriber.next('There');
    subscriber.complete();
    subscriber.next(1);
    subscriber.next(2);
    subscriber.error(new Error('123'));
});

observable.subscribe(observer);

console.groupEnd();