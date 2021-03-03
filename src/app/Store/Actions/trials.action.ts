import { Action } from '@ngrx/store';
import { Trial } from '../Reducers/trials.reducer';

export const CREATE = '[TRIAL] Create'

export class Create implements Action {
    readonly type = CREATE;
    constructor(public trial: Trial) { }
}

export type TrialActions = Create;
export type All = Create;