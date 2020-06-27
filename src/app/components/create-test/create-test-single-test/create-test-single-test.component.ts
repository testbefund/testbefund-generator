import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TestToCreate} from '@api/model/testToCreate';

@Component({
  selector: 'app-create-test-single-test',
  templateUrl: './create-test-single-test.component.html',
  styleUrls: ['./create-test-single-test.component.scss']
})
export class CreateTestSingleTestComponent implements OnInit {

  @Input()
  test: TestToCreate;

  @Output()
  delete = new EventEmitter<void>();

  @Output()
  update = new EventEmitter<TestToCreate>()

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
