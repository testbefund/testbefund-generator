import {Client, CreateTestContainerRequest, TestContainer} from '../generated/testbefund-api';
import {LabelSize} from './app.types';

export interface TestbefundStore {
  clients: Client[];
  clientsLoading: boolean;
  request: CreateTestContainerRequest;
  containersToCreate: number;
  container: TestContainer;
  containerCreating: boolean;
  labelSize: LabelSize;
}

export const testbefundDefaultStore: TestbefundStore = {
  clients: [],
  clientsLoading: false,
  containersToCreate: 4,
  request: {
    clientId: '',
    testRequests: [
      {
        title: '',
        icdCode: ''
      }
    ]
  },
  container: null,
  containerCreating: false,
  labelSize: '70x50',
};
