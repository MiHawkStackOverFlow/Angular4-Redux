import { INote } from './note';
import { ADD_NOTE, TOGGLE_NOTE, REMOVE_NOTE, REMOVE_ALL_NOTES, SEARCH_NOTE } from './actions';

export interface IAppState {
    notes: INote[];
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
   notes: [],
   lastUpdate: null
}

export function rootReducer(state, action) {
    switch(action.type) {
        case ADD_NOTE:
            action.note.id = state.notes.length + 1;
            return Object.assign({}, state, {
              notes: state.notes.concat(Object.assign({}, action.note)),
              lastUpdate: new Date()  
            });
        case TOGGLE_NOTE:
            var note = state.notes.find(t => t.id === action.id);     
            var index = state.notes.indexOf(note);
            return Object.assign({}, state, {
                notes: [
                  ...state.notes.slice(0, index),
                  Object.assign({}, note, { isCompleted: !note.isCompleted }),
                  ...state.notes.slice(index+1)
                ],
                lastUpdate: new Date()   
            });
        case REMOVE_NOTE: 
            return Object.assign({}, state, {
              notes: state.notes.filter(t => t.id !== action.id),
              lastUpdate: new Date()
            });
        case REMOVE_ALL_NOTES: 
            return Object.assign({}, state, {
              notes: [],
              lastUpdate: new Date()  
            });
        case SEARCH_NOTE:
            if(action.payload.text === "") {
                var getState = JSON.parse(localStorage.getItem("state"));
                console.log("test", getState);
                return Object.assign({}, state, getState);
            }else {
                return Object.assign({}, state, {
                    notes: state.notes.filter(t => t.description.indexOf(action.payload.text) > -1),
                    lastUpdate: new Date()
                });
            }                
    } 
    return state;
}