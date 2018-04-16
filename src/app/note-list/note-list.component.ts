import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_NOTE, REMOVE_NOTE, TOGGLE_NOTE } from '../actions';
import { INote } from '../note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @select() notes;
  stateForLocalStorage: Array<any> = [];
  
  model: INote = {
    id: 0,
    description: "",
    responsible: "",
    priority: "low",
    isCompleted: false
  };

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() { localStorage.clear(); }

  onSubmit() {
    let data: Object = this.ngRedux.dispatch({type: ADD_NOTE, note: this.model});
    
    let stored = JSON.parse(localStorage.getItem("store"));

    if(this.stateForLocalStorage.length == 0) {
      this.stateForLocalStorage.push(data);
      // save data to localstorage to retrieve later
      localStorage.setItem('state', JSON.stringify(this.stateForLocalStorage));
    } else if (stored !== null) {
      stored.push(data);
      // save data to localstorage to retrieve later
      localStorage.setItem('state', JSON.stringify(stored));
    }
       
  }

  toggleNote(note) {
    this.ngRedux.dispatch({type: TOGGLE_NOTE, id: note.id});
  }

  removeNote(note) {
    this.ngRedux.dispatch({type: REMOVE_NOTE, id: note.id});
  }

}
