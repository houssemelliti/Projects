import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject, interval, of, fromEvent } from 'rxjs';
import { take, map, filter, mergeMap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs';
  observable$;
  mySubject$;
  searchString;

  searchSubject$ = new Subject<string>();
  results$: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //this.testClickEvent();
    // this.testDebounce();
    this.testWrapApi();
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
    this.mySubject$.unsubscribe();
  }
  /**
   * RxJS observables and subjects
   *
   * @memberof AppComponent
   */
  testObservable() {
    this.observable$ = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    this.observable$.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log('just after subscribe');
  }

  testSubject() {
    this.mySubject$ = new Subject();
    this.mySubject$.subscribe(x => console.log(`first subscribe: ${x}`));
    this.mySubject$.next(1);
    this.mySubject$.next(2);
    // this.mySubject$.unsubscribe();
    this.mySubject$.subscribe(x => console.log(`second subscribe: ${x}`));
    this.mySubject$.next(3);
  }

  testBehaviorSubject() {
    this.mySubject$ = new BehaviorSubject(200);
    this.mySubject$.subscribe(x => console.log(`first subscribe: ${x}`));
    this.mySubject$.next(1);
    this.mySubject$.next(2);
    // this.mySubject$.unsubscribe();
    this.mySubject$.subscribe(x => console.log(`second subscribe: ${x}`));
    this.mySubject$.next(3);
  }

  testReplaySubject() {
    this.mySubject$ = new ReplaySubject();
    this.mySubject$.subscribe(x => console.log(`first subscribe: ${x}`));
    this.mySubject$.next(1);
    this.mySubject$.next(2);
    // this.mySubject$.unsubscribe();
    this.mySubject$.subscribe(x => console.log(`second subscribe: ${x}`));
    this.mySubject$.next(3);
  }

  /**
   * RxJS Operators
   * @memberof AppComponent
   */
  testTake() {
    const intervalCount$ = interval(1000);
    const takeFive$ = intervalCount$.pipe(take(5));
    takeFive$.subscribe(x => console.log(x));
  }

  testMap() {
    const intervalCount$ = interval(1000);
    intervalCount$
      .pipe(take(5))
      .pipe(map(x => x * 10))
      .subscribe(x => console.log(x));
  }

  testFilter() {
    const intervalCount$ = interval(1000);
    intervalCount$
      .pipe(take(5))
      .pipe(map(x => x * 10))
      .pipe(filter(x => x > 20))
      .subscribe(x => console.log(x));
  }

  testMergeMap() {
    const letters = of('a', 'b', 'c', 'd', 'e');
    const result = letters.pipe(
      mergeMap(x => interval(1000).pipe(take(5)).pipe(map(i => x + i)))
    );
    result.subscribe(x => console.log(x));
  }

  testSwitchMap() {
    const letters = of('a', 'b', 'c', 'd', 'e');
    const result = letters.pipe(
      switchMap(x => interval(1000).pipe(take(5)).pipe(map(i => x + i)))
    );
    result.subscribe(x => console.log(x));
  }

  /**
   * User Interface
   *
   * @memberof AppComponent
   */
  testClickEvent() {
    const clicks = fromEvent(document, 'click');
    clicks.subscribe(x => console.log(x));
  }

  inputChanged($event) {
    console.log('input changed', $event);
    this.searchSubject$.next($event);
  }

  testDebounce() {
    this.searchSubject$
      .pipe(debounceTime(200))
      .subscribe(x => console.log('debounced', x));
  }



  testWrapApi() {
    this.results$ = this.searchSubject$
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      // .do(x => console.log('do', x))
      .pipe(switchMap(searchString => this.queryAPI(searchString)));

  }

  queryAPI(searchString) {
    console.log('queryAPI', searchString);
    return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
      // tslint:disable-next-line: no-string-literal
      .pipe(map(result => result['data']['children']));
  }

}
