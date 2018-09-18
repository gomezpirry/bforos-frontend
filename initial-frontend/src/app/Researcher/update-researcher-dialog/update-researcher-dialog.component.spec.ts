import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResearcherDialogComponent } from './update-researcher-dialog.component';

describe('UpdateResearcherDialogComponent', () => {
  let component: UpdateResearcherDialogComponent;
  let fixture: ComponentFixture<UpdateResearcherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResearcherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResearcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
