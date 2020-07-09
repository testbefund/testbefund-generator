import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TestbefundTestDefinition} from '@api/model/testbefundTestDefinition';

@Component({
  selector: 'app-create-test-single-test',
  templateUrl: './create-test-single-test.component.html',
  styleUrls: ['./create-test-single-test.component.scss']
})
export class CreateTestSingleTestComponent implements OnInit {

  @Input()
  test: TestbefundTestDefinition;

  @Output()
  delete = new EventEmitter<void>();

  @Output()
  update = new EventEmitter<TestbefundTestDefinition>();

  constructor() {
  }

  ngOnInit(): void {
  }

  setIcdCode(icdCode: string): void {
    this.update.emit({...this.test, icdCode});
  }

  setTitle(title: string): void {
    this.update.emit({...this.test, title});
  }
}
