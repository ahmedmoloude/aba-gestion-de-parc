import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from 'app/core/services/projet/projet.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-projet',
  templateUrl: './dialog-projet.component.html',
  styleUrls: ['./dialog-projet.component.css']
})
export class DialogProjetComponent implements OnInit {
  projetForm: FormGroup;
  type: 'add' | 'edit';
  formBtn: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogProjetComponent>,
    private projetService: ProjetService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.formBtn = this.type === 'add' ? 'Ajouter' : 'Modifier';
    const name = this.type === 'edit' ? this.data.item.name : '';
    this.projetForm = new FormGroup({
      name: new FormControl(name, Validators.required),
    });
  }

  submit() {
    const formValue = this.projetForm.value;
    if (this.type === 'add') {
      this.projetService.addProjet(formValue).subscribe({
        next: (res) => {
          this.toast.success('Projet ajouté');
          this.dialogRef.close(res['response']);
        },
        error: () => this.toast.error('Erreur lors de l\'ajout')
      });
    } else {
      const uuid = this.data.item.uuid;
      this.projetService.editProjet(formValue, uuid).subscribe({
        next: (res) => {
          this.toast.success('Projet modifié');
          this.dialogRef.close(res['response']);
        },
        error: () => this.toast.error('Erreur lors de la modification')
      });
    }
  }
}
