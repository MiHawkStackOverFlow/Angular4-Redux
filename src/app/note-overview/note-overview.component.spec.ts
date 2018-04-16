import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteOverviewComponent } from './note-overview.component';

describe('NoteOverviewComponent', () => {
  let component: NoteOverviewComponent;
  let fixture: ComponentFixture<NoteOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
