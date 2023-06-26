import { filterNonFunctions, isFunction } from "../helpers/function.helper";
import {
  OperationResult,
  OperationResultFlag,
  OperatorFunction,
} from "../models/operator";
import {
  isInstanceOfSubscriber,
  subscriberOf,
  OnNext,
  Subscriber,
  Subscription,
} from "../models/subscription";
import { ObservableFork } from "./observable-fork";


export class Observable<T = never> {

  protected _innerSequence!: OperationResult<T>[];
  protected _subscribers: Subscriber<T>[] = [];
  protected _isComplete: boolean = true;
  protected _error!: Error;

  protected _forks: ObservableFork<any>[] = [];

  protected get innerSequence() {
    return this._innerSequence;
  }

  protected set innerSequence(sequence: OperationResult<T>[]) {
    this._innerSequence = sequence;
  }

  constructor(...initialSequence: T[]) {
    this.innerSequence = initialSequence.map(
      (value) => new OperationResult(value)
    );
  }

  pipe(): Observable<T>;
  pipe<A>(...operations: [OperatorFunction<T, OperationResult<A>>]): Observable<A>;
  pipe<A, B>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>]): Observable<B>;
  pipe<A, B, C>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>, OperatorFunction<B, OperationResult<C>>]): Observable<C>;
  pipe<A, B, C, D>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>, OperatorFunction<B, OperationResult<C>>, OperatorFunction<C, OperationResult<D>>]): Observable<D>;
  pipe<A, B, C, D, E>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>, OperatorFunction<B, OperationResult<C>>, OperatorFunction<C, OperationResult<D>>, OperatorFunction<D, OperationResult<E>>]): Observable<B>;
  pipe<A, B, C, D, E, F>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>, OperatorFunction<B, OperationResult<C>>, OperatorFunction<C, OperationResult<D>>, OperatorFunction<D, OperationResult<E>>, OperatorFunction<E, OperationResult<F>>]): Observable<F>;
  pipe<A, B, C, D, E, F, G>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>, OperatorFunction<B, OperationResult<C>>, OperatorFunction<C, OperationResult<D>>, OperatorFunction<D, OperationResult<E>>, OperatorFunction<E, OperationResult<F>>, OperatorFunction<F, OperationResult<G>>]): Observable<G>;
  pipe<A, B, C, D, E, F, G>(...operations: [OperatorFunction<T, OperationResult<A>>, OperatorFunction<A, OperationResult<B>>, OperatorFunction<B, OperationResult<C>>, OperatorFunction<C, OperationResult<D>>, OperatorFunction<D, OperationResult<E>>, OperatorFunction<E, OperationResult<F>>, OperatorFunction<F, OperationResult<G>>, ...OperatorFunction<any, OperationResult<any>>[]]): Observable<G>;
  pipe<A, B, C, D, E, F, G>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    ...operations: OperatorFunction<any, OperationResult<any>>[]
  ): Observable<unknown>;
  pipe(
    ...operations: OperatorFunction<any, OperationResult<any>>[]
  ): Observable<any> {
    const obs$ = new Observable<any>();

    const newSequence: OperationResult<any>[] = [];
    const sourceSequence = this.innerSequence;
    for (let i = 0, l = sourceSequence.length; i < l && !sourceSequence[i].isMustStop(); i++ ) {
      try {
        const operationResult = this._executeOperations(
          sourceSequence[i].value,
          operations
        );

        if (!operationResult.isFilterNotMatched()) {
          newSequence.push(operationResult);
        }
      } catch (error) {
        newSequence.push(new OperationResult(sourceSequence[i].value as any, OperationResultFlag.OperationError, error as Error));
        i = l;
      }
    }

    
    obs$.innerSequence = newSequence;
    return obs$;
  }

  subscribe(subscriber?: OnNext<T> | Subscriber<T> | undefined): Subscription {
    if (subscriber === undefined) {
      this.executeSubscriber(this.innerSequence);
      return new Subscription();
    }

    if (!isFunction(subscriber) && !isInstanceOfSubscriber(subscriber)) {
      throw new Error("Please provide either a function or a Subscriber");
    }

    let _subscriber: Subscriber<T> = !isInstanceOfSubscriber(subscriber)
      ? subscriberOf(subscriber)
      : subscriber;
    this._subscribers.push(_subscriber);
    this.executeSubscriber(this.innerSequence, _subscriber);

    return new Subscription(
      () =>
        (this._subscribers = this._subscribers.filter((s) => s !== subscriber))
    );
  }

  protected executeSubscriber(
    sequence: OperationResult<T>[],
    _subscriber?: Subscriber<T> | undefined,
  ): void {
    for (let i = 0, l = sequence.length; i < l; i++) {
      let operationResult = sequence[i];
      if (operationResult.isOperationError()) {
        this._error = operationResult.error as Error;
        (_subscriber?.error || (() => {throw operationResult.error}))(operationResult.error as Error);
        break;
      }
      
      if (operationResult.isFilterNotMatched()) {
        continue;
      }

      if (operationResult.isMustStop()) {
        break;
      }
      
      _subscriber?.next && _subscriber.next(operationResult.value);
        
    }

    this._isComplete && _subscriber?.complete && _subscriber.complete();
  }

  private _computeValue<T>(
    initValue: T,
    ...operations: OperatorFunction<T, OperationResult<any>>[]
  ): OperationResult<any> {
    let res: OperationResult<any> = new OperationResult(initValue);
    for (let i = 0; i < operations.length; i++) {
      res = operations[i](res.value);
      switch (res.flag) {
        case OperationResultFlag.FilterNotMatched:
        case OperationResultFlag.MustStop:
          i = operations.length;
          break;
        case OperationResultFlag.UnwrapSwitch:
          res = new OperationResult(res.value.innerSequence[res.value.innerSequence.length - 1]?.value);
          break;
        case OperationResultFlag.WaitingForValue:
      
        default:
          break;
      }
    }
    return res;
  }

  protected _executeOperations<T, U = any>(
    value: T,
    operators: OperatorFunction<T, OperationResult<U>>[]
  ): OperationResult<U> {
    const computedValue = this._computeValue(
      value as T,
      ...(filterNonFunctions(...operators) as OperatorFunction<
        T,
        OperationResult<U>
      >[])
    );
    return computedValue;
  }
}
