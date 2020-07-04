import {Action, createReducer, on} from '@ngrx/store';
import {testbefundDefaultStore, TestbefundStore} from './testbefund.store';
import {TestbefundActions} from './testbefund.actions';
import {TestToCreate} from '@api/model/testToCreate';
import {CreateTestContainerRequest} from '@api/model/createTestContainerRequest';
import {Test} from 'tslint';

function addTestToCreate(state: TestbefundStore, testToCreate: TestToCreate): TestbefundStore {
  const request: CreateTestContainerRequest = {
    ...state.request,
    testRequests: [...state.request.testRequests, testToCreate]
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

function updateTestToCreate(state: TestbefundStore, testToCreate: TestToCreate, index: number): TestbefundStore {
  const request: CreateTestContainerRequest = {
    ...state.request,
    testRequests: replayByIndex(state.request.testRequests, testToCreate, index)
  };
  return {
    ...state,
    request
  };
}

function removeTestToCreate(state: TestbefundStore, index: number): TestbefundStore {
  const request: CreateTestContainerRequest = {
    ...state.request,
    testRequests: state.request.testRequests.filter((value, index1) => index1 !== index)
  };
  return {
    ...state,
    request
  };
}


function setClientId(state: TestbefundStore, clientId: string): TestbefundStore {
  const request: CreateTestContainerRequest = {
    ...state.request,
    clientId,
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
  on(TestbefundActions.setClientId, (state, {clientId}) => setClientId(state, clientId)),
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
