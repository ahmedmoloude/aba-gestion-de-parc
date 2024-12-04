import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentFilter } from 'app/core/models/caisse/filter/document-filter.model';
import { ReceptionDocument } from 'app/core/models/caisse/reception-document.model';
import { PermissionService } from 'app/core/services/permission.service';
import { AppState } from 'app/core/store/app.states';
import { StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { confirmDocumentsReception, loadChecks } from 'app/core/store/caisse/reception-document/reception-document.actions';
import { receptionDocumentState } from 'app/core/store/caisse/reception-document/reception-document.reducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reception-traite',
  templateUrl: './reception-traite.component.html',
  styleUrls: ['./reception-traite.component.css']
})
export class ReceptionTraiteComponent implements OnInit {
  p: number = 1;

  headerColumuns = [
    // 'N° Exp',
    'N° Déclaration',
    'Date emmission',
    'Expéditeur',
    'Destinataire',
    'Destination',
    'Type',
    'Référence',
    'Mode règ',
    'Banque',
    'Montant',
    'Livrée'
  ];
  inputsFiler = [

    {
      name: 'n_expedition',
      placeholder: 'Expédition',
      type: 'text',
    },
    {
      name: 'n_declaration',
      placeholder: 'Déclaration',
      type: 'text',
    },
    {
      name: 'type',
      placeholder: 'Type',
      type: 'select',
      options:[
        {
          text: 'CHECK',
          value: 'CHECK',
        },
        {
          text: 'TRAIT',
          value: 'TRAIT',
        },
      ]
    },
    {
      name: 'date_du',
      placeholder: 'Du',
      type: 'date',
    },
    {
      name: 'date_au',
      placeholder: 'Au',
      type: 'date',
    },
  ];

  document$: Observable<receptionDocumentState> = this.store.select(state=>state.receptionDocument);
  documents: ReceptionDocument[];
  selection = new SelectionModel<ReceptionDocument>(true, []);

  constructor(private store: Store<AppState>,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.dispatch(loadChecks(null));
    this.document$.subscribe(
      (data: receptionDocumentState) => {
        console.log('checks');
        console.log(data);
        console.log(data.documents);
        if (data.documentsState==StateEnum.SUCCESS && data.documents?.length > 0){
          this.documents = [...data.documents];
        }
      }
    );
  }

  filtrer($event){
    console.log("FILTER RDV", $event);
    let formValue = $event;
    let check= new DocumentFilter();
    check.n_expedition = formValue.n_expedition;
    check.n_declaration = formValue.n_declaration;
    check.date_au = formValue.date_au;
    check.date_du = formValue.date_du;
    check.type = formValue.type;
    this.store.dispatch(loadChecks({data: check}));
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.documents.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }

      this.selection.select(...this.documents);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ReceptionDocument): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.selection.selected.indexOf(row)}`;
    }

    confirmDocumentsReception(document?: ReceptionDocument) {
      console.log('confirmDocumentsReception');
      console.log(document);
      console.log(this.selection.isEmpty());
      console.log(this.selection);


      if(!document && this.selection.isEmpty()) return;

      let data = document? [document]:this.selection.selected;
      let documents = []
      for (const item of data) {
        documents.push(item.document_id);
      }
      this.store.dispatch(confirmDocumentsReception({data:{documents: documents}}))
      this.selection.clear();

    }

}
