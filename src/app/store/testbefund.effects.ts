import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  ClientControllerService,
  CreateTestContainerRequest,
  TestControllerV1Service
} from '../generated/testbefund-api';
import {TestbefundActions} from './testbefund.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {TestbefundSelectors} from './testbefund.selectors';
import {NotificationService} from '../service/notification.service';
import {PdfCreatorService} from '../service/pdf-creator.service';

@Injectable()
export class TestbefundEffects {

  loadClients$ = createEffect(() => this.actions$.pipe(
    ofType(TestbefundActions.loadClients),
    switchMap(() => this.loadClients()),
  ));

  createContainer$ = createEffect(() => this.actions$.pipe(
    ofType(TestbefundActions.createTestContainer),
    withLatestFrom(
      this.store.select(TestbefundSelectors.selectRequest),
      this.store.select(TestbefundSelectors.selectContainersToCreate)
    ),
    switchMap(([_, request, containersToCreate]) => this.createContainer(request, containersToCreate))
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private notificationService: NotificationService,
              private pdfCreatorService: PdfCreatorService,
              private testController: TestControllerV1Service,
              private clientController: ClientControllerService) {

  }

  private loadClients(): Observable<Action> {
    return this.clientController.getAllClientsUsingGET().pipe(
      map(clients => TestbefundActions.loadClientsSuccess({clients})),
      catchError(err => {
        console.log(err);
        this.notificationService.showError('Organisationen konnten nicht geladen werden.');
        return of(TestbefundActions.loadClientsFailed());
      })
    );
  }

  private createContainer(request: CreateTestContainerRequest, count: number): Observable<Action> {
    const observables = [...Array(count).keys()].map(i => this.testController.createTestContainerUsingPOST(request));
    console.log(observables);
    return forkJoin(observables).pipe(
      tap(containers => this.pdfCreatorService.createAndDownloadPdf(containers)),
      map(containers => TestbefundActions.createTestContainerSuccess({containers})),
      catchError(err => {
        console.log(err);
        this.notificationService.showError('QR Codes konnten nicht erstellt werden.');
        return of(TestbefundActions.createTestContainerFailed());
      })
    );
  }
}
