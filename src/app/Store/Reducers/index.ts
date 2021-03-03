import { ActionReducerMap } from '@ngrx/store';
import { trialReducer } from './trials.reducer';


export const reducers: ActionReducerMap<any> = {
    trials: trialReducer
};