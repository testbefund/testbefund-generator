import {createAction, props} from '@ngrx/store';
import {Client} from '@api/model/client';
import {TestToCreate} from '@api/model/testToCreate';
import {TestContainer} from '@api/model/testContainer';
import {CreateTestContainerRequest} from '@api/model/createTestContainerRequest';
import {LabelSize} from './app.types';

export const TestbefundActions = {
  loadClients: createAction('[Testbefund] Load clients'),
  loadClientsSuccess: createAction('[Testbefund] Load clients success', props<{clients: Client[]}>()),
  loadClientsFailed: createAction('[Testbefund] Load clients failed'),
  addTestToCreate: createAction('[Testbefund] Add test to create', props<{test: TestToCreate}>()),
  removeTestToCreate: createAction('[Testbefund] Remove test to create', props<{index: number}>()),
  updateTestToCreate: createAction('[Testbefund] Update test to create', props<{index: number, test: TestToCreate}>()),
  setRequest: createAction('[Testbefund] Set request', props<{request: CreateTestContainerRequest}>()),
  createTestContainer: createAction('[Testbefund] Create test container'),
  createTestContainerSuccess: createAction('[Testbefund] Create test containers success', props<{containers: TestContainer[]}>()),
  createTestContainerFailed: createAction('[Testbefund] Create test container failed'),
  setClientId: createAction('[Testbefund] Create client id', props<{clientId: string}>()),
  setContainersToCreate: createAction('[Testbefund] set containers to create', props<{containersToCreate: number}>()),
  setLabelSize: createAction('[Testbefund] set label size', props<{labelSize: LabelSize}>()),
};
