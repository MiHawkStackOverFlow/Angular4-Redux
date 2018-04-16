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
  
  model: INote = {
    id: 0,
    description: "",
    responsible: "",
    priority: "low",
    isCompleted: false
  };

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() { }

  onSubmit() {
    this.ngRedux.dispatch({type: ADD_NOTE, note: this.model});
  }

  toggleNote(note) {
    this.ngRedux.dispatch({type: TOGGLE_NOTE, id: note.id});
  }

  removeNote(note) {
    this.ngRedux.dispatch({type: REMOVE_NOTE, id: note.id});
  }

}
