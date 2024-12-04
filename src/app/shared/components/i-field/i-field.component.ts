import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild, Output, EventEmitter, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, FormControl  } from '@angular/forms';

@Component({
  selector: 'i-field',
  templateUrl: './i-field.component.html',
  styleUrls: ['./i-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IFieldComponent),
      multi: true
    }
  ]
})
export class IFieldComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName: string; // This is to bind formControllName
  value: any;
  placeholder: any;
  @Input() type: any // This is the label text for the input field
  @Input() label: any // This is the label text for the input field
  @Input() disabled: boolean = false // This is a variable to bind the disabled attribute of the input field
  @Input() inputStyle: any // This is an object of CSS for styling the input field
  @Input() labelStyle: any // This is an object of CSS for styling the input field
  @Input() minValue: any // This is an object of CSS for styling the input field
  @Input() maxValue: any // This is an object of CSS for styling the input field
  @Input() rows: any // This is an object of CSS for styling the input field
  @Input() cols: any // This is an object of CSS for styling the input field

  @Input() maxlength: any; //

  @Input() acceptType: any // This is an object of CSS for styling the input field
  @ViewChild('myComponent', { static: false }) myComponent: ElementRef;
  @Output() changeValue = new EventEmitter<any>();
  @Output() inputText = new EventEmitter<any>();
  showLabel = false;
  @Input() name:any;
  @Input() formatNumber: any;

  control: FormControl;
  constructor(@Optional() private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.placeholder = this.label
    this.showLabel = this.type == 'date' ? true : false;
    if (this.controlContainer) {
      this.control = this.controlContainer.control.get(this.formControlName) as FormControl;
    }
  }

  get isInvalid() {
    if(this.control && (this.control.dirty || this.control.touched) && this.control.invalid)

    return this.control && (this.control.dirty || this.control.touched) && this.control.invalid
  }


  writeValue(value: string) {
    this.value = value;
    this.onClick()
  }
  onChange = (value: string) => {};
  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }


  onValueChange(){
    this.changeValue.emit(this.value)
  }

  registerOnTouched() {}

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
        if (!this.myComponent.nativeElement.contains(event.target)) {
            this.onClickOutside();
        }
    });
  }

  onClickOutside() {
    if(!this.value && this.type != "date"){
      this.showLabel = false
      this.placeholder = this.label
    }
  }

  onClick(){
    this.showLabel = true
    this.placeholder = '';
  }

  numericValue: number;
  formattedValue: string = '0';
  formatInputValue(value: string) {

     this.formattedValue = this.formatNumberWithCommas(
      value.replace(/[^0-9]/g, '')
    );

  }

  parseFormattedValue() {
    // Remove commas from the formatted value
    const numericValue = this.formattedValue.replace(/,/g, '');

    // Convert the numeric value back to a number
    this.numericValue = parseInt(numericValue, 10);
  }

  formatNumberWithCommas(value: string): string {
    // const parts = value.split('.');
    //here replace by space ' ' or commas ','
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return value;
  }


}
