import {Action, createReducer, on} from '@ngrx/store';
import {testbefundDefaultStore, TestbefundStore} from './testbefund.store';
import {TestbefundActions} from './testbefund.actions';
import {TestbefundTestContainerDefinition} from '@api/model/testbefundTestContainerDefinition';
import {TestbefundTestDefinition} from '@api/model/testbefundTestDefinition';

function addTestToCreate(state: TestbefundStore, testToCreate: TestbefundTestDefinition): TestbefundStore {
  const request: TestbefundTestContainerDefinition = {
    ...state.request,
    testDefinitions: [...state.request.testDefinitions, testToCreate]
  };
  return {
    ...state,
    request
  };
}

function replayByIndex<T>(arr: T[], v: T, index: number): T[] {
  return [
    ...arr.filter((value, index1) => index1 !== index),
    v
  ];
}

function updateTestToCreate(state: TestbefundStore, testToCreate: TestbefundTestDefinition, index: number): TestbefundStore {
  const request: TestbefundTestContainerDefinition = {
    ...state.request,
    testDefinitions: replayByIndex(state.request.testDefinitions, testToCreate, index)
  };
  return {
    ...state,
    request
  };
}

function removeTestToCreate(state: TestbefundStore, index: number): TestbefundStore {
  const request: TestbefundTestContainerDefinition = {
    ...state.request,
    testDefinitions: state.request.testDefinitions.filter((value, index1) => index1 !== index)
  };
  return {
    ...state,
    request
  };
}


function setClientId(state: TestbefundStore, issuingOrganization: string): TestbefundStore {
  const request: TestbefundTestContainerDefinition = {
    ...state.request,
    issuingOrganization,
  };
  return {
    ...state,
    request
  };
}

const reducer = createReducer(testbefundDefaultStore,
  on(TestbefundActions.loadClients, (state) => ({...state, clientsLoading: true})),
  on(TestbefundActions.loadClientsSuccess, (state, {clients}) => ({...state, clients, clientsLoading: false})),
  on(TestbefundActions.loadClientsFailed, (state) => ({...state, clientsLoading: false})),
  on(TestbefundActions.addTestToCreate, (state, {test}) => addTestToCreate(state, test)),
  on(TestbefundActions.updateTestToCreate, (state, {test, index}) => updateTestToCreate(state, test, index)),
  on(TestbefundActions.removeTestToCreate, (state, {index}) => removeTestToCreate(state, index)),
  on(TestbefundActions.setClientId, (state, {issuingOrganization}) => setClientId(state, issuingOrganization)),
  on(TestbefundActions.setRequest, (state, {request}) => ({...state, request})),
  on(TestbefundActions.setContainersToCreate, (state, {containersToCreate}) => ({...state, containersToCreate})),
  on(TestbefundActions.createTestContainer, state => ({...state, containerCreating: true})),
  on(TestbefundActions.createTestContainerFailed, state => ({...state, containerCreating: false})),
  on(TestbefundActions.createTestContainerSuccess, state => ({...state, containerCreating: false})),
  on(TestbefundActions.setLabelSize, (state, {labelSize}) => ({...state, labelSize})),
);

export function testbefundReducer(state: TestbefundStore, action: Action): TestbefundStore {
  return reducer(state, action);
}
