import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { ICard } from '../../interfaces/card.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
    progress$: Observable<boolean>;
    private progress = new BehaviorSubject<boolean>(false);

    constructor() {
        this.progress$ = this.progress.asObservable();
    }

    isLoading(loading: boolean) {
        this.progress.next(loading);
    }
}
