import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Inject, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable } from 'rxjs';
import { DemandeState } from 'app/core/store/affretement/demande/demande.reducer';
import { deliverDemandeDocuments, loadDemandes, updateDemandeDocumentStatus } from 'app/core/store/affretement/demande/demande.actions';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastService } from 'app/services';

interface FoodNode {
  name: string;
  id: number;
  children?: FoodNode[];
}
class ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
}

interface OriginalObject {
  id: number;
  document: number;
  attachment: any;
}

interface GroupedObject {
  demande_id: number;
  document_id: number[];
  attachements: any[];
}
@Component({
  selector: 'app-recuperation-document',
  templateUrl: './recuperation-document.component.html',
  styleUrls: ['./recuperation-document.component.css'],
})
export class RecuperationDocumentComponent implements OnInit {
  // private _transformer = (node: FoodNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     id: node.id,
  //     level: level,
  //   };
  // };

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   node => node.level,
  //   node => node.expandable,
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   node => node.level,
  //   node => node.expandable,
  //   node => node.children,
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // tree = [];

  TREE_DATA: FoodNode[] = [];

  treeControl: FlatTreeControl<ExampleFlatNode>;

  treeFlattener: MatTreeFlattener<FoodNode, ExampleFlatNode>;

  dataSource: MatTreeFlatDataSource<FoodNode, ExampleFlatNode>;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ExampleFlatNode, FoodNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FoodNode, ExampleFlatNode>();

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ExampleFlatNode>(true /* multiple */);

  /** A selected parent node to be inserted */
  selectedParent: ExampleFlatNode | null = null;

  status: string = this.data.status;
  demandes: any[] = this.data.demandes;

  selectedDocument = [];
  selectedDemandes: OriginalObject[] = [];
  formData:FormData = new FormData();

  spinner = false;
  DeliverSpinner=false;

  demande$ : Observable<DemandeState> = this.store.select(state => state.demande);

  constructor(@Inject(MAT_DIALOG_DATA) private data:{demandes: any, status: string},
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<RecuperationDocumentComponent>,
              private _toast: ToastService              ) {
                this.treeFlattener = new MatTreeFlattener(
                  this.transformer,
                  this.getLevel,
                  this.isExpandable,
                  this.getChildren,
                );
                this.treeControl = new FlatTreeControl<ExampleFlatNode>(this.getLevel, this.isExpandable);
                this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
              }


  ngOnInit(): void {
    console.log(this.data);
    this.TREE_DATA = this.transformData(this.demandes);
    // let keys = []
    // this.TREE_DATA.forEach((element) => {
    //   let tree = []
    //   element.children.forEach((c, index) => {
    //     if(c.children.length > 0)
    //     tree.push(c)
    //     // element.children.splice(element.children.findIndex(e => e.name == c.name), 1)
    //   })
    //   element.children=tree
    // });
    this.dataSource.data = this.TREE_DATA;
    console.log('transformedData');
    console.log(this.TREE_DATA);
  }


   transformData(data) {
    const resultList = [];

    for (const request of data) {
      const result = {
        name: "Demande N° " + request?.demande?.reference,
        id: request?.demande?.id,
        children: []
      };
      const { return_documents, return_fonds } = request;
      // BL
      let blReferences = [];
      return_documents?.BL?.forEach(element => {
       if(element.status_retour == this.status)
       blReferences.push({name: element.reference, id: element.id});
      });
      if (blReferences?.length > 0)
      result?.children?.push(
        {
          name: "BL",
          children: [...blReferences],
        }
      )
      // Facture
      let factureReferences = [];
      return_documents?.Facture?.forEach(element => {
        if(element.status_retour == this.status)
        factureReferences.push({name: element.reference, id: element.id});
      });
      if (factureReferences?.length > 0)
      result?.children?.push(
       {
         name: "Facture",
         children: [...factureReferences],
       }
      )

      let traitReferences = [];
      return_fonds?.Trait?.forEach(element => {
        if(element.status_retour == this.status)
        traitReferences.push({name: element.montant+" Dhs", id: element.id});
      });
      if(traitReferences?.length > 0)
      result?.children?.push(
      {
        name: "Traite",
        children: [...traitReferences],
      }
      )

      let chequeReferences = [];
      return_fonds?.Cheque?.forEach(element => {
        if(element.status_retour == this.status)
        chequeReferences.push({name: element.montant+" Dhs", id: element.id});
      });
      if(chequeReferences?.length > 0)
      result?.children?.push(
        {
          name: "Chèque",
          children: [...chequeReferences],
        }
      )
      if(result?.children?.length > 0)
      resultList.push (result);
      // const factureReferences = return_documents?.Facture?.map((doc) => {
      // });
    }
    return resultList;
  }

  // todoItemSelectionToggle(node){
  //   console.log('NODE', node)
  //   if(node.level == 2 && this.selectedDocument.includes(node.id)){
  //     this.selectedDocument.splice(this.selectedDocument.findIndex(e => e == node.id), 1)
  //   }else if(node.level == 2 && !this.selectedDocument.includes(node.id)){
  //     this.selectedDocument.push(node.id)
  //   }
  //   console.log('SELECTED DOCUMENTS', this.selectedDocument)
  // }

  RecoverDocuments(){
    if(this.status!="SCANNED" || this.checklistSelection.isEmpty()) return;
    for (const node of this.checklistSelection.selected) {
      if(node.level == 2)
      this.selectedDocument.push(node.id);
    }
    this.spinner = true;
    // let status = this.status=="SCANNED" ? "RECOVER":"DELIVERED"
    let status = "RECOVER"
    let body = {
      document_id: this.selectedDocument,
      status
    };
    this.store.dispatch(updateDemandeDocumentStatus({data:body}));
    this.demande$.subscribe(
      (resp) => {
        console.log('updateDemandeDocumentStatus');
        console.log(resp);
        this.spinner = false;
        if (resp.dataState=="SUCCESS") {
          this.dialogRef.close({status: this.status});
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  onFileChange(event: Event, node: FoodNode): void {
    const input = event.target as HTMLInputElement;
    console.log('Node:', node.name, 'File:', input?.files);

    if (input?.files && input.files.length) {
      const file = input.files[0];
      const files = [];
      for (let index = 0; index < input.files.length; index++) {
        const element = input.files[index];
        files.push(element)
      }
      // Process the selected file here
      console.log('Node:', node.name, 'File:', file);
      this.selectedDemandes.push({id: node.id, attachment: files, document: null})
    }

    // fileUpload.addEventListener('change', function() {
    //   const file: File | null = fileUpload.files?.[0];
    //   if (file) {
    //     fileNameSpan.textContent = file.name;
    //     self.formData = new FormData();
    //     self.formData.append('attachement', file);
    //   } else {
    //     fileNameSpan.textContent = 'Choisir un fichier';
    //     self.formData.append('attachement', null);
    //   }
    // });
  }

  groupObjectsByProperty(arr: OriginalObject[]): GroupedObject[] {
    const groupedObjects: { [id: number]: GroupedObject } = {};

    arr.forEach((obj) => {
      if (groupedObjects[obj.id]) {
        if(obj.document)
        groupedObjects[obj.id].document_id.push(obj.document);
        if (obj.attachment)
        groupedObjects[obj.id].attachements = obj.attachment;
      } else {
        groupedObjects[obj.id] = { demande_id: obj.id, document_id: obj.document?[obj.document]:[], attachements:obj.attachment?obj.attachment:[] };
      }
    });
    return Object.values(groupedObjects);
  }

  DeliverDocuments() {
    if(this.status!="RECOVER" || this.checklistSelection.isEmpty()) return;
    for (const node of this.checklistSelection.selected) {
      if(node.level == 2 && this.selectedDemandes.includes){
        let object = {id: this.getGrandParentNode(node)?.id, attachment: null, document: node.id};
        if(!this.selectedDemandes.includes(object))
        this.selectedDemandes.push(object)
      }
    }
    console.log('this.selectedDemandes');
    console.log(this.selectedDemandes);
    let groupObjectsByProperty = this.groupObjectsByProperty(this.selectedDemandes);
    console.log('groupObjectsByProperty');
    console.log(groupObjectsByProperty);
    let demandes=[];
    this.formData = new FormData();
    for (const iterator of groupObjectsByProperty) {
      if (iterator.document_id.length>0){
        let object = {
          'demande_id': iterator.demande_id,
          'document_id': iterator.document_id,
          'attachements': iterator.attachements
        };
        demandes.push(object)
      }
    }
    console.log('demandes');
    console.log(demandes);
    demandes.forEach((d, index) => {
      this.formData.append("demandes["+index+"][demande_id]", d.demande_id)
      d.document_id.forEach((doc, i) => {

        this.formData.append("demandes["+index+"][document_id]["+i+"]", doc)
      });
      if(d.attachements.length==0) {
        this._toast.error('la liste des attachements est vide!');
        return;
      }
      d.attachements.forEach((at, i) => {

        this.formData.append("demandes["+index+"][attachements]["+i+"]", at)
      });
    })



    this.DeliverSpinner = true;
    this.store.dispatch(deliverDemandeDocuments({data:this.formData}));
    this.demande$.subscribe(
      (resp) => {
        console.log('DeliverDocuments');
        console.log(resp);
        this.DeliverSpinner = false;
        if (resp.dataState=="SUCCESS") {
          this.dialogRef.close({status: this.status});
        }
      },
      (error) => {
        this.DeliverSpinner = false;
      }
    );
  }

  getLevel = (node: ExampleFlatNode) => node.level;

  isExpandable = (node: ExampleFlatNode) => node.expandable;

  getChildren = (node: FoodNode): FoodNode[] => node.children;

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  hasNoContent = (_: number, _nodeData: ExampleFlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FoodNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name ? existingNode : new ExampleFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.id =  node?.id;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

   /** Whether all the descendants of the node are selected. */
   descendantsAllSelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: ExampleFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: ExampleFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ExampleFlatNode): void {
    let parent: ExampleFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ExampleFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

    /* Get the parent node of a node */
    getGrandParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
      const currentLevel = this.getLevel(node);

      if (currentLevel < 1) {
        return null;
      }

      const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

      for (let i = startIndex; i >= 0; i--) {
        const currentNode = this.treeControl.dataNodes[i];

        if (this.getLevel(currentNode) == 0) {
          return currentNode;
        }
      }
      return null;
    }
}
