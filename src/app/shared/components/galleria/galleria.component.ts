import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.css'],
})
export class GalleriaComponent implements OnInit {

  @Input() imageList: any[];
  @Input() id: number;
  @Input() maxWidth = '850px';
  @Input() urlName: string;

  displayCustom: boolean;
  displayBasic: boolean;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  images: any[] = [];
  activeIndex: number = 0;
  storageUrl = environment.STORAGE;

  constructor() {}

  ngOnInit(): void {
    this.imageList.forEach((image: any) => {
      this.images.push(`${this.storageUrl}/${this.urlName}/${this.id}/${image.file}`);
    });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
    console.log('TEST CLICK');
  }
}
