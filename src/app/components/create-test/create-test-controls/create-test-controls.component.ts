import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LabelSize} from '../../../store/app.types';

@Component({
  selector: 'app-create-test-controls',
  templateUrl: './create-test-controls.component.html',
  styleUrls: ['./create-test-controls.component.css']
})
export class CreateTestControlsComponent implements OnInit {

  @Input()
  testsToCreate: number;

  @Output()
  testsToCreateChange = new EventEmitter<number>();

  @Input()
  labelSize: LabelSize;

  @Output()
  labelSizeChange = new EventEmitter<LabelSize>();

  @Output()
  generate = new EventEmitter();

  @Output()
  add = new EventEmitter();

  @Input()
  disabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
