import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exp-non-facture',
  templateUrl: './exp-non-facture.component.html',
  styleUrls: ['./exp-non-facture.component.css']
})
export class ExpNonFactureComponent implements OnInit {

  headerColumuns = [
    'Date',
    'N° d’expédition',
    'N° déc',
    'Port',
    'Expéditeur',
    'Destinataire',
    'Colis',
    'Poids',
    'HT',
  ];
  p: number = 1;
  constructor() {}

  visibles: any = [];
  ReadMore: boolean = true;

  visible: boolean = false;

  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }

  onclick(index) {
    if (!this.visibles.find((i) => i.index == index)) {
      this.visibles.push({
        index,
        visible: true,
      });
    } else {
      this.visibles.find((i) => i.index == index).visible = !this.visibles.find(
        (i) => i.index == index
      ).visible;
    }
  }
  ngOnInit(): void {}
}
