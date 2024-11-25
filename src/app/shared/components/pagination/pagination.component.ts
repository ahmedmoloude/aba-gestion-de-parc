import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }
   IsLength:boolean = false;
   @Input()Links:any= "";
   @Output()
   getPage :  EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    if(this.Links?.length <= 3){
      this.IsLength = true;
    }
  }
  getTheNext(link){
    const page = link?.url?.slice(-1);
    this.getPage.emit(page);
  }
}
