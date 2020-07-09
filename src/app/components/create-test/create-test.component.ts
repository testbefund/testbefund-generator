import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TestbefundActions} from '../../store/testbefund.actions';
import {Observable} from 'rxjs';
import {TestbefundSelectors} from '../../store/testbefund.selectors';
import {LabelSize} from '../../store/app.types';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  testsToCreate$: Observable<number>;
  creating$: Observable<boolean>;
  labelSize$: Observable<LabelSize>;

  constructor(private store: Store) {
  }


  ngOnInit(): void {
    this.store.dispatch(TestbefundActions.loadClients());
    this.testsToCreate$ = this.store.select(TestbefundSelectors.selectContainersToCreate);
    this.creating$ = this.store.select(TestbefundSelectors.selectContainerCreating);
    this.labelSize$ = this.store.select(TestbefundSelectors.selectLabelSize);
  }

  addTest(): void {
    this.store.dispatch(TestbefundActions.addTestToCreate({test: {icdCode: '', title: ''}}));
  }

  generate(): void {
    this.store.dispatch(TestbefundActions.createTestContainer());
  }

  setContainersToCreate(containersToCreate: number): void {
    this.store.dispatch(TestbefundActions.setContainersToCreate({containersToCreate}));
  }

  setLabelSize(labelSize: LabelSize): void {
    this.store.dispatch(TestbefundActions.setLabelSize({labelSize}));
  }
}
