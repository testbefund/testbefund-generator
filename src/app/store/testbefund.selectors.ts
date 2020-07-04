import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TestbefundStore} from './testbefund.store';

const selectFeature = createFeatureSelector<TestbefundStore>('testbefund');

export const TestbefundSelectors = {
  selectClients: createSelector(selectFeature, s1 => s1.clients),
  selectRequest: createSelector(selectFeature, s1 => s1.request),
  selectContainersToCreate: createSelector(selectFeature, s1 => s1.containersToCreate),
  selectContainerCreating: createSelector(selectFeature, s1 => s1.containerCreating),
  selectLabelSize: createSelector(selectFeature, s1 => s1.labelSize),
};
