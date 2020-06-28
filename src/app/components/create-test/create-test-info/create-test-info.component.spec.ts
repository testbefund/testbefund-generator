import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestInfoComponent } from './create-test-info.component';

describe('CreateTestInfoComponent', () => {
  let component: CreateTestInfoComponent;
  let fixture: ComponentFixture<CreateTestInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
