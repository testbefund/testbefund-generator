import { Component, OnInit } from '@angular/core';
import {TestbefundActions} from '../../../store/testbefund.actions';
import {CreateTestContainerRequest} from '@api/model/createTestContainerRequest';
import {Store} from '@ngrx/store';
import {TestToCreate} from '@api/model/testToCreate';
import {TestbefundSelectors} from '../../../store/testbefund.selectors';
import {Observable} from 'rxjs';
import {Client} from '@api/model/client';

@Component({
  selector: 'app-create-test-definition',
  templateUrl: './create-test-definition.component.html',
  styleUrls: ['./create-test-definition.component.scss']
})
export class CreateTestDefinitionComponent implements OnInit {

  clients$: Observable<Client[]>;
  request$: Observable<CreateTestContainerRequest>;
  creating$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.clients$ = this.store.select(TestbefundSelectors.selectClients);
    this.request$ = this.store.select(TestbefundSelectors.selectRequest);
    this.creating$ = this.store.select(TestbefundSelectors.selectContainerCreating);
  }

  reloadClients(): void {
    this.store.dispatch(TestbefundActions.loadClients());
  }

  setRequest(request: CreateTestContainerRequest): void {
    this.store.dispatch(TestbefundActions.setRequest({request}));
  }

  trackByIndex = (index: number, obj: object): number => {
    return index;
  }

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
}
