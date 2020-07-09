import { Component, OnInit } from '@angular/core';
import {TestbefundActions} from '../../../store/testbefund.actions';
import {Store} from '@ngrx/store';
import {TestbefundSelectors} from '../../../store/testbefund.selectors';
import {Observable} from 'rxjs';
import {TestbefundIssuingOrganization} from '@api/model/testbefundIssuingOrganization';
import {TestbefundTestContainerDefinition} from '@api/model/testbefundTestContainerDefinition';
import {TestbefundTestDefinition} from '@api/model/testbefundTestDefinition';

@Component({
  selector: 'app-create-test-definition',
  templateUrl: './create-test-definition.component.html',
  styleUrls: ['./create-test-definition.component.scss']
})
export class CreateTestDefinitionComponent implements OnInit {

  clients$: Observable<TestbefundIssuingOrganization[]>;
  request$: Observable<TestbefundTestContainerDefinition>;
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

  setRequest(request: TestbefundTestContainerDefinition): void {
    this.store.dispatch(TestbefundActions.setRequest({request}));
  }

  trackByIndex = (index: number, obj: object): number => {
    return index;
  }

  setClientId(issuingOrganization: string): void {
    this.store.dispatch(TestbefundActions.setClientId({issuingOrganization}));
  }

  deleteTest(index: number): void {
    this.store.dispatch(TestbefundActions.removeTestToCreate({index}));
  }

  updateTest(index: number, test: TestbefundTestDefinition): void {
    this.store.dispatch(TestbefundActions.updateTestToCreate({test, index}));
  }

  addTest(): void {
    this.store.dispatch(TestbefundActions.addTestToCreate({test: {icdCode: '', title: ''}}));
  }
}
