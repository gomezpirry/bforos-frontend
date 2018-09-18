import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResearcherDialogComponent } from './create-researcher-dialog.component';

describe('CreateResearcherDialogComponent', () => {
  let component: CreateResearcherDialogComponent;
  let fixture: ComponentFixture<CreateResearcherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResearcherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResearcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
