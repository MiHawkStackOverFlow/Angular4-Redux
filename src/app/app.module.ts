import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import installed redux and redux module
// it was installed using npm install redux @angular-redux/store
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';

import { AppComponent } from './app.component';
import { NoteOverviewComponent } from './note-overview/note-overview.component';
import { NoteListComponent } from './note-list/note-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteOverviewComponent,
    NoteListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
   constructor(ngRedux: NgRedux<IAppState>) {
     ngRedux.configureStore(rootReducer, INITIAL_STATE);
   }
}
