import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PersonelService } from 'app/core/services/personel.service';
import { WorkflowValidationService } from 'app/core/services/workflow-validation.service';
import { AppState } from 'app/core/store/app.states';
import { loadRoles } from 'app/core/store/role/role.actions';
import { RoleState, StateEnum } from 'app/core/store/role/role.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-workflow-dialog',
  templateUrl: './add-workflow-dialog.component.html',
  styleUrls: ['./add-workflow-dialog.component.css']
})
export class AddWorkflowDialogComponent implements OnInit {
  isSaving = false;
  isLoading = false;
  workflowItems = {

    relatedTo: 'QUOTESVERSION',
    workflow: [{
    validatorType: 'role',
    validator: '',
    relatedTo: '',
  }]
};
  role$: Observable<RoleState> = this.store.select(state => state.role);
  roles = [];
  users = [];
  constructor(
    private store: Store<AppState>,
    private personelService: PersonelService,
    private workflowValidation: WorkflowValidationService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadRoles());
    this.role$.subscribe(
      (resp) => {
        if(resp.rolesState == StateEnum.SUCCESS) {
          this.roles = resp.roles;
        }
      }
    )
    this.personelService.getPersonnels().subscribe(
      (data: any) => {
        this.users = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  addLigne(){
    this.workflowItems.workflow.push({
      validatorType: 'role',
      validator: '',
      relatedTo: '',
    })
  }

  deleteLigne(index){
    this.workflowItems.workflow.splice(index, 1)
  }

  onSubmit(){
    console.log('WORKFLOW', this.workflowItems.workflow)
    let workflow = [];
    let checker = false;
    this.workflowItems.workflow.forEach((element, index) => {
      if(element.validator == '' || element.validator == null || this.workflowItems.relatedTo == ''){
        checker = true 
      }
      let object = {
        role_id: 0,
        user_id: 0,
        niveau: 0,
      }
      object.role_id = element.validatorType == 'role' ? parseInt(element.validator) : null
      object.user_id = element.validatorType == 'user' ? parseInt(element.validator ): null
      object.niveau = index+1;

      workflow.push(object)
      
    });

    let payload = {
      type : this.workflowItems.relatedTo,
      workflow: workflow
    }
    if(checker){
      return 
    }
    console.log('PAYLOAD', payload)
    this.isSaving = true
    this.workflowValidation.saveWorkflow(payload).subscribe(() => {
      this.isSaving = false;
      this.workflowValidation.getList()
    })
  }
  

}
