import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IFieldComponent } from '../i-field/i-field.component';
import { SharedAutcompleteComponent } from '../shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-shared-filter',
  templateUrl: './shared-filter.component.html',
  styleUrls: ['./shared-filter.component.css']
})
export class SharedFilterComponent implements OnInit {
  // @ViewChild('selectElement') selectElement: SharedAutcompleteComponent;
  @ViewChildren(SharedAutcompleteComponent) selectElements: QueryList<SharedAutcompleteComponent>;
  @ViewChildren(IFieldComponent) inputElements: QueryList<IFieldComponent>;
  // @ViewChild('inputElement') inputElement: IFieldComponent;

  @Input() inputs: { name: string; type: string , keys?: [], options?: [], apiUrl?:'' }[];
  @Input() extraInputs: { name: string; type: string , keys?: [], options?: [], apiUrl?:'' }[] = [];
  showExtraInputs = false;
  colsCount = 6

  @Output() filter = new EventEmitter<any>();

  style = {
    'padding': '0.5rem',
     'border-radius' : '15px'
  }
  constructor() { }

  ngOnInit(): void {
    console.warn('inputs', this.inputs)
    this.colsCount = this.inputs.length > 6 ? 6 : this.inputs.length
  }

  onSubmit() {
    setTimeout(() => {
      const values = {};
      this.inputs.forEach((input) => {
        if (input.type === 'select') {
          if(this.selectElements.toArray().find(e => e.uniqueKey.toLocaleLowerCase() == input.name.toLocaleLowerCase()).latestSelectedItem)
          if(input.apiUrl){
            values[input.name.toLocaleLowerCase()] = this.selectElements.toArray().find(e => e.uniqueKey.toLocaleLowerCase() == input.name.toLocaleLowerCase()).latestSelectedItem.id;
          } else {
            values[input.name.toLocaleLowerCase()] = this.selectElements.toArray().find(e => e.uniqueKey.toLocaleLowerCase() == input.name.toLocaleLowerCase()).latestSelectedItem.value;
          }
        } else {
          console.log('ELEMENTS', this.inputElements.toArray())
          if(this.inputElements.toArray().find(e => e.name.toLocaleLowerCase() == input.name.toLocaleLowerCase()).value)
            values[input.name.toLocaleLowerCase()] = this.inputElements.toArray().find(e => e.name.toLocaleLowerCase() == input.name.toLocaleLowerCase()).value;
        }
      });
      if(this.showExtraInputs){
        this.extraInputs.forEach((input) => {
          if (input.type === 'select') {
            if(this.selectElements.toArray().find(e => e.uniqueKey.toLocaleLowerCase() == input.name.toLocaleLowerCase()).latestSelectedItem)
            if(input.apiUrl){
              values[input.name.toLocaleLowerCase()] = this.selectElements.toArray().find(e => e.uniqueKey.toLocaleLowerCase() == input.name.toLocaleLowerCase()).latestSelectedItem.id;
            } else {
              values[input.name.toLocaleLowerCase()] = this.selectElements.toArray().find(e => e.uniqueKey.toLocaleLowerCase() == input.name.toLocaleLowerCase()).latestSelectedItem.value;
            }
          } else {
            console.log('ELEMENTS', this.inputElements.toArray())
            if(this.inputElements.toArray().find(e => e.name.toLocaleLowerCase() == input.name.toLocaleLowerCase()).value)
              values[input.name.toLocaleLowerCase()] = this.inputElements.toArray().find(e => e.name.toLocaleLowerCase() == input.name.toLocaleLowerCase()).value;
          }
        });
      }
      console.log('VALUES', values)
      this.filter.emit(values);
    });
  }

  toggleExtraInputs(){
    this.showExtraInputs = !this.showExtraInputs
  }

  refreshFilter(){
    this.selectElements.toArray().forEach(e => {
      e.value = null
      e.latestSelectedItem = null
    })
    this.inputElements.toArray().forEach(e => {
      e.value = null
    })
    this.filter.emit({});
  }

}
