import {Client, CreateTestContainerRequest, TestContainer} from '../generated/testbefund-api';

export interface TestbefundStore {
  clients: Client[];
  clientsLoading: boolean;
  request: CreateTestContainerRequest;
  containersToCreate: number;
  container: TestContainer;
  containerCreating: boolean;
}

export const testbefundDefaultStore: TestbefundStore = {
  clients: [],
  clientsLoading: false,
  containersToCreate: 4,
  request: {
    clientId: null,
    testRequests: []
  },
  container: null,
  containerCreating: false
};
