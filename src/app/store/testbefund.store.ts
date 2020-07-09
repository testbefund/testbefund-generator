import {
  TestbefundIssuingOrganization,
  TestbefundTestContainer,
  TestbefundTestContainerDefinition
} from '../generated/testbefund-api';
import {LabelSize} from './app.types';

export interface TestbefundStore {
  clients: TestbefundIssuingOrganization[];
  clientsLoading: boolean;
  request: TestbefundTestContainerDefinition;
  containersToCreate: number;
  container: TestbefundTestContainer;
  containerCreating: boolean;
  labelSize: LabelSize;
}

export const testbefundDefaultStore: TestbefundStore = {
  clients: [],
  clientsLoading: false,
  containersToCreate: 4,
  request: {
    issuingOrganization: '',
    testDefinitions: [
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
