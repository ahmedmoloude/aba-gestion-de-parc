import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-fiche-dialog',
  templateUrl: './fiche-dialog.component.html',
  styleUrls: ['./fiche-dialog.component.css']
})
export class FicheDialogComponent implements OnInit {
  Url : SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }
  pdfSrc = 'http://localhost:8000/storage/fiche_prospect/1.pdf?origin='+ window.location.host;

  ngOnInit(): void {
  }

}
