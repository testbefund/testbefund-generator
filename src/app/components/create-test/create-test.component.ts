import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TestbefundActions} from '../../store/testbefund.actions';
import {Observable} from 'rxjs';
import {Client} from '@api/model/client';
import {TestbefundSelectors} from '../../store/testbefund.selectors';
import {CreateTestContainerRequest} from '@api/model/createTestContainerRequest';
import {TestToCreate} from '@api/model/testToCreate';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  clients$: Observable<Client[]>;
  request$: Observable<CreateTestContainerRequest>;

  constructor(private store: Store) {
  }


  ngOnInit(): void {
    this.store.dispatch(TestbefundActions.loadClients());
    this.clients$ = this.store.select(TestbefundSelectors.selectClients);
    this.request$ = this.store.select(TestbefundSelectors.selectRequest);
  }

  trackByIndex = (index: number, obj: object): number => {
    return index;
  };

  setClientId(clientId: string): void {
    this.store.dispatch(TestbefundActions.setClientId({clientId}));
  }

  deleteTest(index: number): void {
    this.store.dispatch(TestbefundActions.removeTestToCreate({index}));
  }

  updateTest(index: number, test: TestToCreate): void {
    this.store.dispatch(TestbefundActions.updateTestToCreate({test, index}));
  }

  addTest(): void {
    this.store.dispatch(TestbefundActions.addTestToCreate({test: {icdCode: '', title: ''}}));
  }

  generate(): void {
    this.store.dispatch(TestbefundActions.createTestContainer());
  }

  reloadClients(): void {
    this.store.dispatch(TestbefundActions.loadClients());
  }
}
