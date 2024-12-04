import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Config } from 'app/config';
import { Demande, Historique } from 'app/core/models/affretement/demande.model';

@Component({
  selector: 'app-dialog-documents',
  templateUrl: './dialog-documents.component.html',
  styleUrls: ['./dialog-documents.component.css']
})
export class DialogDocumentsComponent implements OnInit {
  getData() {
    return [
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
            alt: 'Description for Image 6',
            title: 'Title 6'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
            alt: 'Description for Image 7',
            title: 'Title 7'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
            alt: 'Description for Image 8',
            title: 'Title 8'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
            alt: 'Description for Image 9',
            title: 'Title 9'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
            alt: 'Description for Image 10',
            title: 'Title 10'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
            alt: 'Description for Image 11',
            title: 'Title 11'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
            alt: 'Description for Image 12',
            title: 'Title 12'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
            alt: 'Description for Image 13',
            title: 'Title 13'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
            alt: 'Description for Image 14',
            title: 'Title 14'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
            alt: 'Description for Image 15',
            title: 'Title 15'
        }
    ];
  }

  attachementsUrl: string = Config.api.affretement.attachementsStrorage;

  p: number = 1;

  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  images: any[] | undefined;

  responsiveOptions: any[] = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  demandes: Demande[] = this.data?.demandes;
  type: string = this.data?.type;

  historiquesParAction: { [action: string]: Historique[] } = {};
  historic = [];
  historicImages = [];
  historicAttachments = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: {demandes: any[], type: string}) { }

  ngOnInit() {
    // this.getImages().then((images) => (this.images = images));

    this.getDocumentsHistoric();
  }

  getImages() {
    return Promise.resolve(this.getData());
  }

  imageClick(index: number) {
      this.activeIndex = index;
      this.displayCustom = true;
  }

  getDemandeDocuments(){
    switch (this.type) {
      case 'BL':
        return {type:'return_documents', status:'BL'};
      case 'Facture':
        return {type:'return_documents', status:'Facture'};
      case 'Trait':
        return {type:'return_fonds', status:'Trait'};
      case 'Cheque':
        return {type:'return_fonds', status:'Cheque'};
    }
  }

  getDocumentsHistoric(){
    this.historicAttachments = [];
    this.historicImages = [];
    const documentType = this.getDemandeDocuments();
    for (const demande of this.demandes) {
      let element = {demande: null, images: null, attachments: null, documents: null, };
      element.demande = demande?.demande?.reference;
      const elementImages = (this.type == 'BL')? demande?.demande?.bl_images : ((this.type == 'Facture')? demande?.demande?.facture_images: null);
      const urlStorage = (this.type == 'BL')? `${Config.api.affretement.blStorage}/${demande?.demande?.id}` : ((this.type == 'Facture')? `${Config.api.affretement.factureStorage}/${demande?.demande?.id}`: null);

      const images = elementImages?.map(url => ({
        itemImageSrc: urlStorage+`/${url}`,
        thumbnailImageSrc: urlStorage+`/${url}`, // Assuming the thumbnail URL follows this pattern
        alt: demande?.demande?.reference , // You can add a description for each image here
        title: demande?.demande?.reference // You can add a title for each image here
      }));
      element.images = images;
      let documents = [];
      for (const item of demande[documentType?.type][documentType?.status]) {
        let document = {reference: null, scanDate: null, recuperationDate: null, remiseDate: null};
        document.reference = item.reference;
        for (const hist of item?.historiques){
          if(hist.action == "SCANNED"){
            document.scanDate = hist.created_at;
          } else if (hist.action == "RECOVER") {
            document.recuperationDate = hist.created_at;
          } else if (hist.action == "DELIVERED") {
            document.remiseDate = hist.created_at;
          }
        }
        documents.push(document);
      }
      element.documents = documents;
      element.attachments = demande?.demande?.attachements;
      this.historic?.push(element);
      console.log('historicImages' , images);

      if (images) this.historicImages?.push(...images)
      for (const iterator of demande?.demande?.attachements) {
        this.historicAttachments?.push({name: iterator?.file, url:`${this.attachementsUrl}/${demande?.demande?.id}/${iterator?.file}`});
      }
    }
  }

  // a revoir si utilisees
  gethistoriquesOne(){
    for (const demande of this.demandes) {
      // Récupérer le tableau d'historiques de BL pour cette demande
      // const historiquesBL: Historique[] = demande.return_documents.BL.map(bl => bl.historiques).flat();
      const historiquesBL: Historique[] = demande.return_documents.BL.reduce((acc, bl) => acc.concat(bl.historiques), []);

      // Parcours des historiques de BL
      for (const historique of historiquesBL) {
        console.log(`Action: ${historique.action}, Document ID: ${historique.document_id}, Date: ${historique.created_at}`);
      }
    }
  }
  gethistoriquesTwo(){
    for (const demande of this.demandes) {
      // Récupérer le tableau d'historiques de BL pour cette demande
      const historiquesBL: Historique[] = demande.return_documents.BL.reduce((acc, bl) => acc.concat(bl.historiques), []);
      console.log('historiquesBL');
      console.log(historiquesBL);

      // Parcours des historiques de BL
      for (const historique of historiquesBL) {
        // Vérifier si l'action existe dans l'objet, sinon créer un tableau vide pour cette action
        if (!this.historiquesParAction[historique.action]) {
          this.historiquesParAction[historique.action] = [];
        }
        // Ajouter l'historique à l'action correspondante dans l'objet
        this.historiquesParAction[historique.action].push(historique);
      }
    }
    console.log(this.historiquesParAction);

    // Afficher les historiques de BL groupés par action
    for (const action in this.historiquesParAction) {
      console.log(`Action: ${action}`);
      for (const historique of this.historiquesParAction[action]) {
        console.log(`Document ID: ${historique.document_id}, Date: ${historique.created_at}`);
      }
    }
  }
}
