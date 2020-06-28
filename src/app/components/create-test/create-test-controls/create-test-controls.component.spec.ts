import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestControlsComponent } from './create-test-controls.component';

describe('CreateTestControlsComponent', () => {
  let component: CreateTestControlsComponent;
  let fixture: ComponentFixture<CreateTestControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
