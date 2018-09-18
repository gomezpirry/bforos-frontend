import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResearchOJDialogComponent } from './delete-research-oj-dialog.component';

describe('DeleteResearchOJDialogComponent', () => {
  let component: DeleteResearchOJDialogComponent;
  let fixture: ComponentFixture<DeleteResearchOJDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResearchOJDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResearchOJDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
