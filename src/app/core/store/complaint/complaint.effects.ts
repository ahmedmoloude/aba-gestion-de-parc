import { Injectable } from '@angular/core';
import { complaintActionTypes } from './complaint.action';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ComplaintService } from 'app/core/services/complaint.service';
import { Observable } from 'rxjs';
import { ToastService } from 'app/services';
import { Complaint } from 'app/core/models';

@Injectable()
export class ComplaintEffects {
  constructor(
    private complaintService: ComplaintService,
    private actions$: Actions,
    private _toast: ToastService
  ) {}

  loadComplaints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(complaintActionTypes.loadComplaints),
      switchMap((data: any) =>
        this.complaintService.getListComplaints(data.filter).pipe(
          map((complaints) => {
            complaints = complaints['response'].complaints;
            complaints = complaints.map((item) => {
              let complaint = new Complaint(item);
              complaint.childs = complaint.setList(item.childs);
              complaint.tasks =  complaint.setTasks(item)
              return complaint;
            });
            return complaintActionTypes.loadComplaintsSuccess({ complaints });
          }),
          catchError(() => [complaintActionTypes.loadComplaintsError()])
        )
      )
    )
  );

  loadComplaintReasons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(complaintActionTypes.loadComplaintReasons),
      switchMap((data: any) =>
        this.complaintService.getListComplaintReasons(data.filter).pipe(
          map((reasons) => {
            reasons = reasons['response'].complaint_reason;
            return complaintActionTypes.loadComplaintReasonsSuccess({
              reasons,
            });
          }),
          catchError(() => [complaintActionTypes.loadComplaintReasonsError()])
        )
      )
    )
  );
}
