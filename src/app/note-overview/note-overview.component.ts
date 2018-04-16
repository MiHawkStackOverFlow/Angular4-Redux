import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { REMOVE_ALL_NOTES } from '../actions';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.css']
})

export class NoteOverviewComponent implements OnInit {
  @select() notes;
  @select() lastUpdate; 

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {  }

  clearNotes() {
    this.ngRedux.dispatch({ type: REMOVE_ALL_NOTES });
  }

}
