import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleTestCodeComponent } from './create-single-test-code.component';

describe('CreateSingleTestCodeComponent', () => {
  let component: CreateSingleTestCodeComponent;
  let fixture: ComponentFixture<CreateSingleTestCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSingleTestCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSingleTestCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
