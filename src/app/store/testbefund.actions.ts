import {createAction, props} from '@ngrx/store';
import {LabelSize} from './app.types';
import {TestbefundIssuingOrganization} from '@api/model/testbefundIssuingOrganization';
import {TestbefundTestDefinition} from '@api/model/testbefundTestDefinition';
import {TestbefundTestContainerDefinition} from '@api/model/testbefundTestContainerDefinition';
import {TestbefundTestContainer} from '@api/model/testbefundTestContainer';

export const TestbefundActions = {
  loadClients: createAction('[Testbefund] Load clients'),
  loadClientsSuccess: createAction('[Testbefund] Load clients success', props<{ clients: TestbefundIssuingOrganization[] }>()),
  loadClientsFailed: createAction('[Testbefund] Load clients failed'),
  addTestToCreate: createAction('[Testbefund] Add test to create', props<{ test: TestbefundTestDefinition }>()),
  removeTestToCreate: createAction('[Testbefund] Remove test to create', props<{ index: number }>()),
  updateTestToCreate: createAction('[Testbefund] Update test to create', props<{ index: number, test: TestbefundTestDefinition }>()),
  setRequest: createAction('[Testbefund] Set request', props<{ request: TestbefundTestContainerDefinition }>()),
  createTestContainer: createAction('[Testbefund] Create test container'),
  createTestContainerSuccess: createAction('[Testbefund] Create test containers success',
    props<{ containers: TestbefundTestContainer[] }>()),
  createTestContainerFailed: createAction('[Testbefund] Create test container failed'),
  setClientId: createAction('[Testbefund] Create client id', props<{ issuingOrganization: string }>()),
  setContainersToCreate: createAction('[Testbefund] set containers to create', props<{ containersToCreate: number }>()),
  setLabelSize: createAction('[Testbefund] set label size', props<{ labelSize: LabelSize }>()),
};
