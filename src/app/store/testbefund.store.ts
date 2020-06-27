import {Client, CreateTestContainerRequest, TestContainer} from '../generated/testbefund-api';

export interface TestbefundStore {
  clients: Client[];
  clientsLoading: boolean;
  request: CreateTestContainerRequest;
  container: TestContainer;
  containerCreating: boolean;
}

export const testbefundDefaultStore: TestbefundStore = {
  clients: [],
  clientsLoading: false,
  request: {
    clientId: null,
    testRequests: []
  },
  container: null,
  containerCreating: false
};
