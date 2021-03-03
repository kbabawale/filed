import * as actions from '../Actions/trials.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';


export interface Trial {
    id?: string,
    firstname: string,
    lastname: string,
    email: string,
    monthly_advertising_budget: number,
    phone_number: number
}

//Entity Adapter
export const trialAdapter = createEntityAdapter<Trial>();
export interface State extends EntityState<Trial> { }

export const initialState: State = trialAdapter.getInitialState();

export function trialReducer(
    state: State = initialState,
    action: actions.TrialActions
) {
    switch (action.type) {
        case actions.CREATE:
            return trialAdapter.addOne(action.trial, state);

        default:
            return state;
    }
}

//create the default selectors
export const getTrialState = createFeatureSelector<State>('trials');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = trialAdapter.getSelectors(getTrialState);