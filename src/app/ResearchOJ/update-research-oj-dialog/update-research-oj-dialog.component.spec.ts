import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResearchOJDialogComponent } from './update-research-oj-dialog.component';

describe('UpdateResearchOJDialogComponent', () => {
  let component: UpdateResearchOJDialogComponent;
  let fixture: ComponentFixture<UpdateResearchOJDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResearchOJDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResearchOJDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
