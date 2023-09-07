import { createReducer, on } from '@ngrx/store';
import { Emission } from "../model/Emission";
import { Vessel } from "../model/Vessel";
import { AddEmissionsAction, AddVesselsAction } from './application.action';


export interface StoreData {
    vessels: Vessel[],
    emissions: Emission[],
}

export const initialState: StoreData = {vessels:[], emissions:[]};

export const reducer = createReducer(
  initialState,
  on(AddVesselsAction, (state, action) => addVesselsToState(state, action.payload)),
  on(AddEmissionsAction, (state, action) => addEmissionsToState(state, action.payload))
);

function addVesselsToState(currentState: StoreData, vessels: Vessel[]): StoreData {
  return {
    vessels,
    emissions: currentState.emissions,
  }
}

function addEmissionsToState(currentState: StoreData, emissions: Emission[]): StoreData {
  return {
    vessels: currentState.vessels,
    emissions,
  }
}