import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-accuse-reception',
  templateUrl: './dialog-accuse-reception.component.html',
  styleUrls: ['./dialog-accuse-reception.component.css']
})
export class DialogAccuseReceptionComponent implements OnInit {
  image_src: string;
  display_img: boolean = false;
  file: any;
  type: any;
  item: any;
  picture_name: string;
  images: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectImage(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.picture_name = this.file.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
      this.file['file'] = event.target.result;
    };
    this.images.push(this.file);
    console.log('IMAGES []', this.images);
  }

  removeImage(i) {
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer l'image ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.images.splice(i, 1);
      }
    });
  }

}
