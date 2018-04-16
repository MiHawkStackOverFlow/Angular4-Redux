import { Component, OnInit } from '@angular/core';

// import redux, store and actions
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { SEARCH_NOTE, REMOVE_ALL_NOTES } from '../actions';

// import for search from rxjs
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.css']
})

export class NoteOverviewComponent implements OnInit {
  @select() notes;
  @select() lastUpdate;
  
  private searchTerms = new Subject<string>();

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged()
    ).subscribe((text: string) => this.ngRedux.dispatch({
      type: SEARCH_NOTE,
      payload: {
          text: text
      }
    }));
    
  }

  clearNotes() {
    this.ngRedux.dispatch({ type: REMOVE_ALL_NOTES });
  }

  // Push a search term into the observable stream.
  searchNote(term: string): void { 
    this.searchTerms.next(term);
  }

}
