import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Config } from 'app/config';
@Component({
  selector: 'app-voir-bon',
  templateUrl: './voir-bon.component.html',
  styleUrls: ['./voir-bon.component.css'],
})
export class VoirBonComponent implements OnInit {
  url: string = Config.api.bill.printBill;
  type: string = this.data;
  pdfSrc: string;
  fileExtension: string;

  constructor(public dialogRef: MatDialogRef<VoirBonComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    this.pdfSrc = this.url + this.data?.path;

    this.fileExtension = this.getFileExtension(this.data?.path);
    console.log('pdfSrc');
    console.log(this.pdfSrc);
  }

  getFileExtension(url: string): string | undefined {
    try {
      // Extraire le nom de fichier de l'URL
      const fileName = url.split('/').pop();

      // Extraire l'extension du nom de fichier
      if (fileName) {
        const parts = fileName.split('.');
        if (parts.length > 1) {
          return parts.pop() || undefined;
        }
      }

      console.log('Extension de fichier non trouvée.');
      return undefined;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'extension du fichier :', error);
      return undefined;
    }
  }
  getType(type) {
    switch (type) {
      case 'COMMANDE':
        return 'Bon de commande';
      case 'SORTIE':
        return 'Bon de sortie';
      case 'ACHAT':
        return "bon d'achat";
      default:
        return type;
    }
  }
}
