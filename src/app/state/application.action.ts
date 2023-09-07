import { Action, createAction, props } from '@ngrx/store';
import { Vessel } from '../model/Vessel';
import { Emission } from '../model/Emission';

export const AddVesselsAction = createAction(
    'ADD_VESSELS', props<{payload: Vessel[]}>()
)


export const AddEmissionsAction = createAction(
    'ADD_EMISSIONS', props<{payload: Emission[]}>()
)