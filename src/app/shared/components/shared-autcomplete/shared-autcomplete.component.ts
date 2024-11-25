import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer  } from '@angular/forms';

@Component({
  selector: 'app-shared-autcomplete',
  templateUrl: './shared-autcomplete.component.html',
  styleUrls: ['./shared-autcomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedAutcompleteComponent),
      multi: true
    }
  ]
})
export class SharedAutcompleteComponent implements OnInit, ControlValueAccessor {

  @ViewChild('myComponent', { static: false }) myComponent: ElementRef;
  @Input() addSeparator : boolean = false;
  @Input() type: string = 'single'; // this is a variable determines type of the component (text, single, multiple)
  @Input() opended: boolean = false; // This is a variable when is set to true, the results will be displayed directly
  @Input() disabled: boolean = false // This is a variable to bind the disabled attribute of the input field
  @Input() inputStyle: any // This is an object of CSS for styling the input field
  @Input() contentStyle: any // This is an object of CSS for styling result container
                            // You can set (li) property as an object to define the CSS of each element
                            // you can set (hover) property as an object to define the hover CSS of each element hovered
                            //  Example : {
                            //   'border': '1px solid #000000',
                            //   'border-radius': '3px',
                            //   'li': {
                            //     'color': '#0000000',
                            //     'padding': '10px',
                            //   }
                            //   'hover':{
                            //     'color': '#FFFFFF',
                            //     'background-color': 'green'
                            //   }
                            //  }
  @Input() data: any // This is the list of items to be searched
  @Input() keys: any // This is an array of keys used to search through the data. The search function filters the data based on whether any of these keys match the search input.
  @Input() uniqueKey: any // this is a variable determines the unique key of the data
  @Input() placeholer: any // This is the placeholder text for the input field
  @Input() label: any // This is the label text for the input field
  @Input() display: any // This is an array of keys used to display on the HTML
  @Input() lengthToStart: number = 3 // This is the number of characters the user must enter in the search input before the search function is triggered.
  @Input() apiUrl: string; // This is the URL of the API endpoint to search
  @Input() charToGetAll: string; // The character that triggers retrieval of all records when entered in the search field
  @Input() formControlName: string; // This is to bind formControllName
  @Input() class: any
  @Input() maxLength: any
  @Input() typeInput: any
  @Input() required: boolean = false;
  @Input() hasIcon: boolean = true
  @Output() dataEvent = new EventEmitter<any>();

  result: any = []; // This variable stores the filtered results of the search
  selectedItems = [] // This variable stores selected items
  value: any; // This variable stores the string representation of the selected item, as constructed using the keys in "display".
  showResult = false; // This variable is used to control the visibility of the search results
  loading = false; // This variable is used to show the spinner when user typing
  itemIsClicked = false; // This variable to check if any item selected
  latestSelectedItem: any

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
        if (!this.myComponent.nativeElement.contains(event.target)) {
            this.onClickOutside();
        }
    });
  }

  ngOnInit(): void {


  }
  // getValue() {
  //   return (this.formControlName) ? this.controlContainer.control.get(this.formControlName).value : null;
  // }
  writeValue(value: string) {
    this.value = value;
  }
  onChange = (value: string) => {};
  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  ngOnChanges(changes: SimpleChanges) {

    // console.log(' data ' ,changes)
    if (changes.data) {


      // TODO: 
       if (!this.value) {
          this.value = null;
          this.showResult = false
          this.result = [];
       }
      
    }
  }

  onClickOutside() {
    if(this.type == 'single' && this.result?.length <= 0 && !this.itemIsClicked) this.value = null
    if(this.type == 'multiple'){
      this.value = this.selectedItems?.map(item => item.name ? item.name : item.title).join(', ');
      this.dataEvent.emit(this.selectedItems);
    }
    this.showResult = false
  }

  hoverIn(item){
    item.isHovering = true
  }
  hoverOut(item){
    item.isHovering = false
  }

  getRecentData(){
    if(this.opended){
      this.result = this.data;
      this.addIsHoveringProperty();
    }
    this.showResult = true;
  }

  search(e, isRecent = false){
    if(e.target.value == this.charToGetAll){
      this.loading = true;
      if(this.apiUrl){
          this.searchApi(this.charToGetAll);
      }else{
          this.result = this.data;
          this.addIsHoveringProperty();
          this.sortResultsAlphabetically();
          this.showResult = true;
      }
      this.loading = false;
      return;
  }
  if(e.target.value.length >= this.lengthToStart){
      this.loading = true;
      if(this.apiUrl){
          this.searchApi(e.target.value);
      }else{
          this.result = this.data?.filter(i => this.keys.some(k => i[k] && i[k].toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(e.target.value.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
          this.addIsHoveringProperty();
          this.sortResultsAlphabetically();
          this.showResult = true;
          this.loading = false;
      }
      return;
  }
  if(!e.target.value.length) {
      this.result = [];
      this.showResult = false;
      this.itemIsClicked = false;
      if(!isRecent) this.dataEvent.emit(null);
      return;
  }
}


  searchApi(query: string) {
    this.http.get(this.apiUrl + query).subscribe((data: any) => {
      this.result = data?.response;
      this.addIsHoveringProperty();
      this.showResult = true;
      this.loading = false;
    });
  }

  selectObject(item){
    console.log('FROM SHARED', item);
    console.log(this.display);
    console.log(this.data);

    if(item){
    this.value = this.display?.map(k=>item[k])?.join(" ");
    console.log("VALUE", this.value)
    this.showResult = false;
    const {isHovering, ...newItem} = item;
    this.initIsHoveringProperty();
    this.itemIsClicked = true;
    this.latestSelectedItem = newItem
    this.dataEvent.emit(newItem);
    }
  }

  toggleSelection(item) {
    const {isHovering, ...newItem} = item;
    let founded = this.selectedItems?.find(i => i[this.uniqueKey] == newItem[this.uniqueKey])
    // console.log(founded)
    if(founded) this.selectedItems = this.selectedItems?.filter(i => i[this.uniqueKey] != founded[this.uniqueKey])
    else this.selectedItems?.push(newItem)

    // console.log('CHECK', this.selectedItems.includes(newITem))
    // if (this.selectedItems.includes(newITem))
    //   this.selectedItems = this.selectedItems.filter(i => i !== newITem);
    // else
    //   this.selectedItems.push(newITem);

    // console.log('SELECTED', this.selectedItems)
  }

  checked(item){
    // console.log('TEEEEEEEEEEEAAAZ', this.selectedItems, item)

    let result = false;
    this.selectedItems?.forEach(selected => {
      if(selected[this.uniqueKey] == item[this.uniqueKey]) result = true
    })
    return result
  }

  addIsHoveringProperty(){
    this.result = this.result?.map(item => {
      return {...item, isHovering: false};
    });
  }

  initIsHoveringProperty(){
    this.result = this.result?.map(item => {
      return {...item, isHovering: false};
    });
  }




  sortResultsAlphabetically() {
    this.result.sort((a, b) => {
      if (a.name && b.name) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });
  }
}
