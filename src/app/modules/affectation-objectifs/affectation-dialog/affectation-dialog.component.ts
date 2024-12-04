import { selectEnvPayloadAgence } from './../../../core/store/agence/agence.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { PersonelService } from 'app/core/services/personel.service';
import { selectZones } from 'app/core/store/resources/resources.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';
import { ParametreService } from 'app/core/services/parametre.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import * as moment from 'moment';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

export class TodoItemFlatNode {
  item: string;
  level: number;
  value: number;
  expandable: boolean;
}

let TREE_DATA = {}

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  cities :any = [];

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor(
            private boGridService: BoGridService,
            // private affectation : AffectationDialogComponent
            ) {
    // this.affectation.spinner = true;
    this.boGridService.CitiesAgence().subscribe(
      (data) => {
        this.cities = data;
        // this.affectation.spinner = false;
        console.log("data city", this.cities)
        let object = {};
        this.cities.forEach(element => {
          object[element.name] = []
          // element.agencies?.forEach(agence => {
          //   object[element.name][agence?.name] = []
          // });
          element.zones?.forEach(zone => {
            // object[element.name][zone?.name + " ( " +this.joinSectors(zone.sectors) + " ) "] = []
            object[element.name][zone?.name] = []
            // push commercial in zones
            zone.commercial?.forEach(comm => {
              // object[element.name][zone?.name + " ( " +this.joinSectors(zone.sectors) + " ) "].push(comm?.first_name)
              object[element.name][zone?.name].push(comm?.first_name)
            });

            //push agence in zone
            zone.sectors?.forEach(sector => {
              sector.agence?.forEach(agence => {
                // object[element.name][zone?.name + " ( " +this.joinSectors(zone.sectors) + " ) "].push(agence?.name)
                object[element.name][zone?.name].push(agence?.name)
              });
            });
          });
        });  
        TREE_DATA = object; 
        // console.log("TREE DATA", TREE_DATA)
        const dataa = this.buildFileTree(TREE_DATA, 0);
        this.dataChange.next(dataa);
      },
      (error) => {
        // this.affectation.spinner = false;
        console.log('error', error);
      });
  }

  joinSectors(array){
    // console.log("JOIN", array)
    return array.map(function(obj) {
      return obj["name"];
    }).join(', ');
  }

  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      console.log("parent.children", parent.children)
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    console.log("node.item 2", node.item)
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-affectation-dialog',
  templateUrl: './affectation-dialog.component.html',
  styleUrls: ['./affectation-dialog.component.css'],
  providers: [ChecklistDatabase],
})
export class AffectationDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  objectifs :any = [];
  cities :any = [];
  cities_id :any = [];
  zones_id :any ;
  commercial_id :any ;
  zones :any = [];
  agencies :any = [];
  zonesFilter :any = [];
  commerciauxFilter :any = [];
  commerciaux : any;
  commercials :any = [];
  createObjectif = new FormGroup({});
  myForm = new FormGroup({});
  filterCity = new FormGroup({});
  spinnerAdd : boolean;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  spinner :boolean = false;
  now = moment().format('YYYY-MM');
  // '2023-03';

  ngOnInit(): void {
    console.log("now", this.now);
    this.myForm = new FormGroup({
      objectif_details: new FormArray([])
    });

    this.spinner = true;
    this.parametreService.getObjectif().subscribe(
      (data) => {
        this.objectifs = data['response'];
        // console.log('objectifs', this.objectifs);
      },
      (error) => {
        console.log('error', error);
    });

    this.store.select(selectZones).subscribe((res) => {  
      console.log(" Zones========>", res)
      this.zones = res
    });

    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agencies = res;
      console.log(' agencies========>', this.agencies);
    });

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data:any) => {
        // console.log("data Commerciale", data)
        this.commerciaux = data.response;
      },
      (error) => {
        console.log('error', error);
      });

    this.boGridService.CitiesAgence().subscribe(
      (data) => {
        this.spinner = false;
        this.cities = data;
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      });

    this.createObjectif = new FormGroup({
      objectif_id: new FormControl("", Validators.required),
      // attendu: new FormControl("", Validators.required),
      date_debut: new FormControl("", Validators.required),
      date_fin: new FormControl("", Validators.required),
    })

    // this.filterCity = new FormGroup({
    //   city_id: new FormControl("", Validators.required),
    //   zone_id: new FormControl("", Validators.required),
    //   commercial_id: new FormControl("", Validators.required),
    // })
  }

  setDateDebut(e){
    // console.log("MOIS", e.target.value)
    // console.log("FORMAT 1", moment(e.target.value).format("MM"));
    var month = moment(e.target.value)
    var start = month.startOf('month').format('YYYY-MM-DD')
    var end = month.endOf('month').format('YYYY-MM-DD')
    console.log("FORMAT 2", start);
    console.log("FORMAT 3", end);
    this.createObjectif.controls['date_debut'].setValue(start);
    this.createObjectif.controls['date_fin'].setValue(end);
    
  }

  filterZone(event){
    this.zonesFilter = []
    var zones = [];
    // console.log("EVENT CITY", event)
    if(event){
      for(var i=0; i<event.length; i++){
        // console.log("event2222====>", event[i])
        this.cities_id.push(event[i].name)
        zones = this.cities.find(city => city.id == event[i].id).zones
        // console.log("zones", zones)
        zones.forEach(element => {
          this.zonesFilter.push(element);
        });
        // console.log("zonesFilter CITY======>", this.zonesFilter)
      }
    }
  }

  onChangeZone(event){
    // console.log("event ZONE", event.value)
    // console.log("zonesFilter ZONE======>", this.zonesFilter)
    this.zones_id = event.value;
    this.commerciauxFilter = this.zonesFilter.find(zone => zone.id == event.value).commercial;
    // console.log("commerciauxFilter======>", this.commerciauxFilter)
  }

  filter(){
    console.log("cities_name", this.cities_id)
    // console.log("TREE_DATA FILTER", TREE_DATA)
    // console.log("zones_id", this.zones_id)

    this.cities_id = this.cities_id.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    // let object = {};
    const filteredTREE_DATA = {};
    if(this.cities_id){
      for(var i=0; i<this.cities_id.length; i++){
        const filteredKeys = Object.keys(TREE_DATA).filter(key => {
          return key === this.cities_id[i];
        });

        filteredKeys.forEach(key => {
          filteredTREE_DATA[key] = TREE_DATA[key];
          // object[key] = TREE_DATA[key];
        });
      }
    }
    console.log(filteredTREE_DATA, "FILTER_DATA")
    // this.ChecklistDatabase.
    // const dataa = this.buildFileTree(TREE_DATA, 0);
    // this.dataChange.next(dataa);
    const dataa = this.listDatabase.buildFileTree(filteredTREE_DATA, 0);
    this.listDatabase.dataChange.next(dataa);

  }

  get objectif() {
    return this.myForm.get('objectif_details') as FormArray;
  }

  addObjectif(){
    if(this.createObjectif.invalid){
      this._toast.warn("Remplir tout les chaamps");
      console.log("INVALID")
    }else{
      var commercials = [];
      let comm = {};
      console.log("COMMERCIAL", this.commercials)
      for(var i = 0; i < this.commercials.length; i++){
        if(this.commercials[i].level == 2){
          var commercial = this.commerciaux.find(commercial=> commercial.first_name == this.commercials[i].item)?.id
          var agence = this.agencies.find(agence=> agence.name == this.commercials[i].item)?.id
          var zone = this.zones.find(zone=> zone.name == this.commercials[i].zone_name)?.id
          console.log("ZONE", zone)
          if(commercial){
            comm = {
              "objectif_id" : this.createObjectif.get('objectif_id').value,
              "attendu" : this.commercials[i].value,
              "date_debut" : this.createObjectif.get('date_debut').value,
              "date_fin" : this.createObjectif.get('date_fin').value,
              "type" : "App\\Modules\\Personnel\\Models\\Personnel",
              "id" : commercial,
              "zone_id" : zone,
            }
          }
          if(agence){
            comm = {
              "objectif_id" : this.createObjectif.get('objectif_id').value,
              "attendu" : this.commercials[i].value,
              "date_debut" : this.createObjectif.get('date_debut').value,
              "date_fin" : this.createObjectif.get('date_fin').value,
              "type" : "Agency",
              "id" : agence,
              "zone_id" : zone,
            }
          }
        }
        commercials.push(comm);
    }
    // console.log('this.myForm.value', commercials)
    // console.log('this.myForm.value', commercials.length)
    for(var i = 0 ; i < commercials.length; i++){
      const objectif = new FormGroup({
        objectif_id: new FormControl(commercials[i].objectif_id),
        attendu: new FormControl(commercials[i].attendu),
        date_debut: new FormControl(commercials[i].date_debut),
        date_fin: new FormControl(commercials[i].date_fin),
        objectifable_type: new FormControl(commercials[i].type),
        objectifable_id: new FormControl(commercials[i].id),
        zone_id: new FormControl(commercials[i].zone_id),
      });
      this.objectif.push(objectif);
    }

    console.log('this.myForm.value', this.myForm.value)

    this.spinnerAdd = true;
    this.parametreService.addAffectationObjectif(this.myForm.value).subscribe(
      (data) => {
        console.log('data', data);
        this._toast.success("Objectif ajouté avec succés");
        this.spinnerAdd = false;
        this.dialogRef.close(data["response"]);
      },
      (error) => {
        console.log('error', error);
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue");
    });
  }}

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );

  constructor(
    private _database: ChecklistDatabase,
    public dialog: MatDialog,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AffectationDialogComponent>,
    private parametreService: ParametreService,
    private boGridService: BoGridService,
    public route: Router,
    private personelService : PersonelService,
    private listDatabase: ChecklistDatabase,
    private _toast: ToastService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === '';


  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    // console.log("node", node)
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        // console.log("child", child)
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    // console.log("node", node)
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
      // console.log("child", child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    // console.log("node", node)
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode, event): void {
    console.log("EVENT", event.target.value)
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node, event.target.value);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode, value: any = null): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    let nodeWithValue = {
      ...node,
      value: value,
      zone_name: parent.item
    }
    console.log('CHECKER', this.commercials.find(item => item.item == node.item))
    if(value){
      let foundedElement = this.commercials.find(item => item.item == node.item)
      
      if(!foundedElement || foundedElement.value != value){
        this.commercials = this.commercials.filter(item => item.item !== node.item)
        this.commercials.push(nodeWithValue)
      }else if(foundedElement){
        this.commercials = this.commercials.filter(item => item.item !== node.item)
      }
    }else{
      this.commercials = this.commercials.filter(item => item.item !== node.item)
    }
    console.log("commercials", this.commercials)
    
    // console.log("PARENT", parent)
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    // console.log("getParentNode", node)
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    // console.log("startIndex 111", startIndex)
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      // console.log("currentNode 111", currentNode)
      if (this.getLevel(currentNode) < currentLevel) {
        // console.log("currentNode 111", currentNode)
        return currentNode;
      }
    }
    return null;
  }

  saveNode(node: TodoItemFlatNode, itemValue: string) {
    // console.log("saveNode", node)
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}
