import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchOJHistoryComponent } from './research-oj-history.component';

describe('ResearchOJHistoryComponent', () => {
  let component: ResearchOJHistoryComponent;
  let fixture: ComponentFixture<ResearchOJHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchOJHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchOJHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
