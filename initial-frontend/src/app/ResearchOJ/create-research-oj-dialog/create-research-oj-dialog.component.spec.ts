import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResearchOJDialogComponent } from './create-research-oj-dialog.component';

describe('CreateResearchOJDialogComponent', () => {
  let component: CreateResearchOJDialogComponent;
  let fixture: ComponentFixture<CreateResearchOJDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResearchOJDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResearchOJDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
