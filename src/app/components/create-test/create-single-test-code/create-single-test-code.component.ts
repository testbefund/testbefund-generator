import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {createTestContainerRequestSchema} from '../../../utils/json-schemas';
import Ajv from 'ajv';
import {TestbefundTestContainerDefinition} from '@api/model/testbefundTestContainerDefinition';

@Component({
  selector: 'app-create-single-test-code',
  templateUrl: './create-single-test-code.component.html',
  styleUrls: ['./create-single-test-code.component.scss']
})
export class CreateSingleTestCodeComponent implements OnInit {

  errors: string[];

  @Input()
  request: TestbefundTestContainerDefinition;

  @Output()
  requestChange = new EventEmitter<TestbefundTestContainerDefinition>();

  constructor() {
  }

  ngOnInit(): void {
  }

  requestAsJson(): string {
    return JSON.stringify(this.request, null, 2);
  }

  countRows(): number {
    return this.requestAsJson().split('\n').length + 1;
  }

  updateContainer(value: string): void {
    try {
      const res = this.validate(JSON.parse(value));
      if (res) {
        this.errors = [];
        this.requestChange.emit(res);
      }
    } catch (ignored) {
      this.errors = ['Ungültige Test-Spec. Änderungen werden nicht übernommen'];
    }
  }

  private validate(request: any): TestbefundTestContainerDefinition {
    const schema = createTestContainerRequestSchema;
    const ajv = new Ajv({allErrors: true});
    const valid = ajv.validate(schema, request);
    if (!valid) {
      this.errors = ajv.errorsText().split(',');
      return null;
    } else {
      return request as TestbefundTestContainerDefinition;
    }
  }
}
