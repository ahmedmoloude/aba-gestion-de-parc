import { Component, OnInit,ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { DialogRoleComponent } from './dialog-role/dialog-role.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { RoleState, StateEnum } from 'app/core/store/role/role.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { loadRoles } from 'app/core/store/role/role.actions';
import { addRoleHabilities, loadRoleHabilities } from 'app/core/store/role-habilities/role-habilities.actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { RoleHabilitiesState } from 'app/core/store/role-habilities/role-habilities.reducer';
import { PermissionService } from 'app/core/services/permission.service';

interface Ability {
  name: string;
  isChecked: boolean;
}

interface Module {
  icon?: string;
  name: string;
  abilities: string[];
  children?: Module[];
}

@Component({
  selector: 'app-habilitation',
  templateUrl: './habilitation.component.html',
  styleUrls: ['./habilitation.component.css'],
})
export class HabilitationComponent implements OnInit {

  modulesList:Module[] = [
    {
      "name": "Tournée",
      "icon": "pi pi-share-alt",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Liste des tournées",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Demande de ramassage",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Génération d’un passage planifié",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Tournées Régulières",
          "abilities": ["C", "R", "U", "D"]
        }
      ]
    },
    {
      "name": "Gestion de parc",
      "icon": "pi pi-percentage",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Gestion de véhicules",
          "abilities": ["C", "R", "U", "D"],
          "children": [
            {
              "name": "Véhicules",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Status véhicules",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Détails véhicules",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Documents",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Véhicule de remplacement",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "GPS",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Extincteur",
              "abilities": ["C", "R", "U", "D"]
            }
          ]
        },
        {
          "name": "Gestion des personnels",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Gestion maintenance",
          "abilities": ["C", "R", "U", "D"],
          "children": [
            {
              "name": "Liste des interventions",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Pièces de rechange",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Demande de pièces",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Pneumatique",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Planning",
              "abilities": ["C", "R", "U", "D"]
            }
          ]
        },
        {
          "name": "Demande d’intervention",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Liste des cartes",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Feuille de route",
          "abilities": ["C", "R", "U", "D"],
          "children": [
            {
              "name": "Gestion des disponibilités",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Liste des feuilles de route",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Affectation",
              "abilities": ["C", "R", "U", "D"]
            }
          ]
        },
        {
          "name": "Consommation/Dépenses",
          "abilities": ["C", "R", "U", "D"],
          "children": [
            {
              "name": "Plein et suivi d’approvisionnement",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Carburant / Autoroute",
              "abilities": ["C", "R", "U", "D"]
            }
          ]
        },
        {
          "name": "Gestion des citernes",
          "abilities": ["C", "R", "U", "D"]
        }
      ]
    },
    {
      "name": "Gestion commerciale",
      "icon": "pi pi-file-o",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Grille tarifaire",
          "abilities": ["C", "R", "U", "D"],
          "children": [
            {
              "name": "Offre Standard",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Offre sectorielle",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Offre commerciale client",
              "abilities": ["C", "R", "U", "D"],
              "children": [
                {
                  "name": "Normale",
                  "abilities": ["C", "R", "U", "D"]
                },
                {
                  "name": "spéciale (Affrètement)",
                  "abilities": ["C", "R", "U", "D"]
                },
              ]
            },
            {
              "name": "offre commerciale spéciale (Affrètement)",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Grille d'affrètement",
              "abilities": ["C", "R", "U", "D"]
            },
          ]
        },
        {
          "name": "Calendrier",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Rendez-Vous",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Tâches",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Contacts",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Clients",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Commerciaux",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Prospects",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Devis",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Objectifs",
          "abilities": ["C", "R", "U", "D"]
        }
      ]
    },
    {
      "name": "Facturation",
      "icon": "pi pi-file-pdf",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Liste des factures",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Avoir",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Créances client",
          "abilities": ["C", "R", "U", "D"],
          "children": [
            {
              "name": "Recouvrement",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Encaissement",
              "abilities": ["C", "R", "U", "D"]
            },
            {
              "name": "Gestion des impayés",
              "abilities": ["C", "R", "U", "D"]
            }
          ]
        },
        {
          "name": "Remise",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Facturation des offres spéciales (Affrètement)",
          "abilities": ["C", "R", "U", "D"]
        },
      ]
    },
    {
      "name": "Caisse",
      "icon": "pi pi-money-bill",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Affectation des cartes",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Validation de versement",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Validation retour CRBT",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Versement",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Réception des chèques et traites",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Réception BL et factures",
          "abilities": ["C", "R", "U", "D"]
        }
      ]
    },
    {
      "name": "Affrètement",
      "icon": "pi pi-truck",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Liste des demandes clients",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Liste des demandes Light",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Anomalie Chargement",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Anomalie Déchargement",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Affectation",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Liste des demandes confirmées",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Liste des documents et fonds",
          "abilities": ["C", "R", "U", "D"]
        }
      ]
    },
    {
      "name": "Configuration",
      "icon": "pi pi-cog",
      "abilities": ["C", "R", "U", "D"],
      "children": [
        {
          "name": "Paramètre",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Matrice de livraison",
          "abilities": ["C", "R", "U", "D"]
        },
        {
          "name": "Geofencing",
          "abilities": ["C", "R", "U", "D"]
        }
      ]
    },
    {
      "name": "Réclamations",
      "icon": "pi pi-exclamation-triangle",
      "abilities": ["C", "R", "U", "D"]
    },
    {
      "name": "Convoyage",
      "icon": "pi pi-sliders-h",
      "abilities": ["C", "R", "U", "D"]
    }
  ]

  page: number = 1;

  headerColumuns = ['Rôle', 'Crée le'];

  role$: Observable<RoleState> = this.store.select(state => state.role);
  role;

  roleHabilities$: Observable<RoleHabilitiesState> = this.store.select(state => state.roleHabilities);
  roleHabilitiesSubscription: Subscription;

  habilitation: boolean = false;
  LoadSpinner: boolean = false;
  vaildateSpinner: boolean = false;

  form: FormGroup;

  keys = ["C", "R", "U", "D"];
  base_keys = ['ajouter' , 'consulter' , 'modifier' , 'supprimer'];

  roleHabilities: Module[];

  constructor( public dialog: MatDialog,
                private store: Store<AppState>,
                private fb: FormBuilder,
                private el: ElementRef, private renderer: Renderer2,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    /*
      this.viewportScroller.scrollToPosition([0,0]);
      this.scrollToTop()
      window.scrollTo(0,0);
      let elt: any= document.getElementsByTagName("app-habilitation");
      elt.scrollTop =0
    */

    this.store.dispatch(loadRoles());
    this.initForm();
  }

  /* Build Habilities Form */
  initForm() {
    const group: any = {}
    this.modulesList.forEach((module) => {
      group[module.name] = this.buildForm(module);
    });
    this.form = this.fb.group(group);
  }

  buildForm(module: Module): FormGroup {
    const group: any = {};

    module.abilities.forEach((ability) => {
      group[this.getAbilityName(ability)?.toLowerCase()] = new FormControl(false);
    });

    if (module.children) {
      module.children.forEach((child) => {
        group[child.name] = this.buildForm(child);
      });
    }

    let moduleGroup = this.fb.group(group);
    this.changeCheckboxValues(moduleGroup);
    return moduleGroup;
  }
  /* End Build Habilities Form */

  /* Change Checkbox Values */
  changeCheckboxValues(parent_group: FormGroup) {
    for (const iterator of this.base_keys) {
      parent_group.controls[iterator].valueChanges.subscribe((v) => {
        this.updateChildValues(parent_group, iterator, v);
        this.updateParentValues(parent_group, iterator, v);
      });
    }
  }

  updateParentValues(group: FormGroup, iterator: string, value: any) {
    let parent = group.parent as FormGroup;

    while (parent) {
      let hasTrue = false;
      let hasFalse = false;
      for (const key in parent.controls) {
        if (Object.prototype.hasOwnProperty.call(parent.controls, key)) {
          const sibling = parent.controls[key] as FormGroup;
          if (!this.base_keys.includes(key)) {
            const siblingValue = sibling.get(iterator).value;
            if (siblingValue === true) {
              hasTrue = true;
            } else if (siblingValue === false) {
              hasFalse = true;
            }
          }
        }
      }

      const parentControl = parent.get(iterator);
      if (hasTrue && !hasFalse) {
        parentControl?.setValue(true, { emitEvent: false });
      } else if (!hasTrue && hasFalse) {
        parentControl?.setValue(false, { emitEvent: false });
      } else if (hasTrue && hasFalse) {
        parentControl?.setValue(false, { emitEvent: false });
      }

      parent = parent.parent as FormGroup;
    }
  }

  updateChildValues(group: FormGroup, iterator: string, value: any) {
    for (const key in group.controls) {
      if (Object.prototype.hasOwnProperty.call(group.controls, key)) {
        const element = group.controls[key] as FormGroup;
        if (!this.base_keys.includes(key)) {
          element.get(iterator).setValue(value, { emitEvent: false });
          element.updateValueAndValidity();
          group.updateValueAndValidity();
          this.updateChildValues(element, iterator, value);
        }
      }
    }
  }
  /* End Change Checkbox Values */

  /* Load Role Habilities */
  updateFormModule(roleHabilities) {
    this.modulesList.forEach((module) => {
      const correspondingModule = roleHabilities?.find((otherModule) => otherModule.name === module.name);
      const formgroup = this.form.controls[module.name] as FormGroup;
      this.updateFormValues(formgroup, correspondingModule);
    });
  }

  updateFormValues(formGroup: FormGroup, otherModule: Module) {
    if (otherModule) {
      this.keys.forEach(element => {
        const elementName = this.getAbilityName(element).toLowerCase();
        if(otherModule.abilities && otherModule.abilities.includes(element)){
          formGroup?.get(elementName).setValue(true);
        } else {
          formGroup?.get(elementName).setValue(false);
        }
      });
      if (otherModule.children) {
        otherModule.children.forEach((childName) => {
          const childFormGroup = formGroup.get(childName.name) as FormGroup;
          if (childFormGroup && childName) {
            this.updateFormValues(childFormGroup, childName);
          }
        });
      }
      // for (const item in formGroup.controls) {
      //   if (Object.prototype.hasOwnProperty.call(formGroup.controls, item)) {
      //     const element = formGroup.controls[item]  as FormGroup;
      //     if (!this.base_keys.includes(item)) {
      //       const correspondingModule = otherModule?.children?.find((el) => el.name === item);
      //       this.updateFormValues(element, correspondingModule);
      //     }
      //   }
      // }
    }
  }

  getRoleHabilities(role: any) {
    this.habilitation = true;
    this.role = role;
    console.log('getRoleHabilities', this.habilitation);

    this.store.dispatch(loadRoleHabilities({data:role.id}))
    this.LoadSpinner = true;
    this.roleHabilitiesSubscription = this.roleHabilities$.subscribe(
      (resp) => {
        if(resp.loadRoleHabilitiesState == StateEnum.SUCCESS  && resp.loadRoleHabilities) {
          this.roleHabilities = resp.loadRoleHabilities.abilities;
          this.updateFormModule(this.roleHabilities)
        }
        if (resp.loadRoleHabilitiesState == StateEnum.SUCCESS || resp.loadRoleHabilitiesState == StateEnum.ERROR){
          this.LoadSpinner = false;
        }
      }
    );
  }
  /* End Load role Habilities */


  getAbilityName(ability: string) {
    switch (ability) {
      case 'R':
        return 'Consulter';
      case 'C':
        return 'Ajouter';
      case 'U':
        return 'Modifier';
      case 'D':
        return 'Supprimer';
      default:
        return '---';
    }
  }

  /* Add Role */
  openDialogRole(): void {
    const dialogRef = this.dialog.open(DialogRoleComponent, {
      disableClose: false,
      width: '562px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) {
          this.role = data;
          this.habilitation = true;
          }
      }
    )
  }
  /*  End Add Role */

  /* Add Role Habilities */
  convertModule(name: string, abilities: string[], children?: Module[]): Module {
    if(!children) return {name,abilities};
    return {
        name,
        abilities,
        children,
    };
  }

  convertPermissions(permissions: Record<string, any>): Module[] {
    const result: Module[] = [];

    for (const [key, value] of Object.entries(permissions)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
          // Recursively convert nested dictionaries
          const children = this.convertPermissions(value);

          const abilities: string[] = [];
          // Add abilities based on truthiness of corresponding keys
          if (value['ajouter']) abilities.push('C');
          if (value['consulter']) abilities.push('R');
          if (value['modifier']) abilities.push('U');
          if (value['supprimer']) abilities.push('D');

          const element = (children?.length > 0) ? this.convertModule(key, abilities, children):((abilities?.length > 0)?this.convertModule(key, abilities):null)

          if(element)
          result.push(element);
      }
    }
    return result;
  }

  addRoleHabilities() {
    console.log('formValue');
    console.log(this.form.value);
    this.vaildateSpinner = true;
    const abilities = this.convertPermissions(this.form.value);
    console.log(JSON.stringify(abilities, null, 2));
    const roleHabilities = {
      role_id: this.role.id,
      abilities: abilities
    }
    this.store.dispatch(addRoleHabilities({data:roleHabilities}));
    this.roleHabilitiesSubscription = this.roleHabilities$.subscribe(
      (resp) => {
        if(resp.roleHabilitiesState == StateEnum.SUCCESS  && resp.roleHabilities) {
          this.habilitation = false;
        }
        if (resp.roleHabilitiesState == StateEnum.SUCCESS || resp.roleHabilitiesState == StateEnum.ERROR){
          this.vaildateSpinner = false;
        }
      }
    );

  }
  /* End Add Role Habilities */

  scrollToTop() {
    const scrollContainer = this.el.nativeElement.getElementsByTagName("app-parametre-tab-groupe");
    console.log('scrollContainer');    console.log(scrollContainer);
    // Use Angular Renderer for cross-browser compatibility
    this.renderer.setProperty(scrollContainer, 'scrollTop', 0);
  }

  ngOnDestroy() {
    this.roleHabilitiesSubscription?.unsubscribe();
    this.roleHabilitiesSubscription?.unsubscribe();
  }


}
