import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'app/core/services/permission.service';
import { AddWorkflowDialogComponent } from './add-workflow-dialog/add-workflow-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowValidationService } from 'app/core/services/workflow-validation.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-workflow-validation',
  templateUrl: './workflow-validation.component.html',
  styleUrls: ['./workflow-validation.component.css']
})
export class WorkflowValidationComponent implements OnInit {
  listWorkflow = []
  private subscription: Subscription;
  constructor(public permissionService: PermissionService, public dialog: MatDialog,
   private workflowService: WorkflowValidationService) { }

  ngOnInit(): void {
    this.workflowService.workflows$.subscribe((response: any) => {
      this.listWorkflow = response.response;
      console.log('KII', this.listWorkflow)
    });
  
    // Initial fetch
    this.workflowService.getList();
  }

  openDialog(): void {
    this.dialog.open(AddWorkflowDialogComponent, {
      disableClose: true,
      width: '630px',
      data: {},
    });
  }

}
