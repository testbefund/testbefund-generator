import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestSingleTestComponent } from './create-test-single-test.component';

describe('CreateTestSingleTestComponent', () => {
  let component: CreateTestSingleTestComponent;
  let fixture: ComponentFixture<CreateTestSingleTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestSingleTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestSingleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
