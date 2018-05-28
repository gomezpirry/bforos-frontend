import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResearcherDialogComponent } from './delete-researcher-dialog.component';

describe('DeleteResearcherDialogComponent', () => {
  let component: DeleteResearcherDialogComponent;
  let fixture: ComponentFixture<DeleteResearcherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResearcherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResearcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
