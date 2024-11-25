import { Component, OnInit,Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface Module {
  icon?: string;
  name: string;
  abilities: string[];
  children?: Module[];
}
@Component({
  selector: 'app-affect-role-habilitation-test',
  templateUrl: './affect-role-habilitation-test.component.html',
  styleUrls: ['./affect-role-habilitation-test.component.css']
})
export class AffectRoleHabilitationTestComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() modules: Module;

  showSubMemu: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};
  }

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

  toggleArrow(): void {
    this.showSubMemu = !this.showSubMemu;
  }

}
