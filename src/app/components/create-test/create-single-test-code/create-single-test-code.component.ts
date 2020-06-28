import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateTestContainerRequest} from '@api/model/createTestContainerRequest';

@Component({
  selector: 'app-create-single-test-code',
  templateUrl: './create-single-test-code.component.html',
  styleUrls: ['./create-single-test-code.component.scss']
})
export class CreateSingleTestCodeComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'javascript'};

  error: string;

  @Input()
  request: CreateTestContainerRequest;

  @Output()
  requestChange = new EventEmitter<CreateTestContainerRequest>();

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
        this.error = '';
        this.requestChange.emit(res);
      }
    } catch (ignored) {
      this.error = 'Ungültige Test-Spec. Änderungen werden nicht übernommen';
    }
  }

  private validate(request: any): CreateTestContainerRequest {
    // TODO replace with a better validator
    const keys = Object.keys(request);
    if (keys.indexOf('clientId') < 0) {
      this.error = 'Ungültige Spec: Feld \'clientId\' fehlt.';
      return null;
    }
    if (keys.indexOf('testRequests') < 0) {
      this.error = 'Ungültige Spec: \'testRequests\' fehlt.';
      return null;
    }
    return request as CreateTestContainerRequest;
  }
}
