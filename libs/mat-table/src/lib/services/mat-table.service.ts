import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MatTableService {
    currentPageIndex$: Observable<number>;
    currentPageSize$: Observable<number>;

    private _currentPageIndex = new BehaviorSubject<number>(0);
    private _currentPageSize = new BehaviorSubject<number>(5);

    constructor() {
        this.currentPageIndex$ = this._currentPageIndex.asObservable();
        this.currentPageSize$ = this._currentPageSize.asObservable();
    }

    setPageIndex(index: number): void {
        this._currentPageIndex.next(index);
    }

    setPageSize(size: number): void {
        this._currentPageSize.next(size);
    }
}
