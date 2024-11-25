// import {Directive, Input, OnInit, OnDestroy, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';
// import {AbstractControl, ControlContainer, FormGroupDirective} from '@angular/forms';
// import {Observable, Subscription} from "rxjs";
// import {ErrorPipe} from "./pipes";

// @Directive({
//   selector: '[showErrors]',
//   providers: [ErrorPipe],
// })

// export class ShowErrorsDirective implements OnInit, OnDestroy {
//   @Input('invalidmessage') invalidmessage: string;

//   control: AbstractControl;
//   controlValue$: Observable<any>;
//   controlSubscription: Subscription;
//   hasSubmitted: boolean;

//   types: string[] = ['required', 'minlength', 'maxlength', 'date', 'max', 'min', 'number'];
//   private hasView = {required: false, minlength: false, maxLength: false, date: false};

//   constructor(private _fg: ControlContainer,
//     private _el: ElementRef,
//     private render: Renderer2,
//     private viewContainer: ViewContainerRef,
//     private errorPipe: ErrorPipe) { }

//   ngOnInit() {
//     this.control = this.form.get(this.invalidmessage);
//     let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.map(() => {
//       this.hasSubmitted = true;
//     });
//     this.controlValue$ = Observable.merge(this.control.valueChanges, Observable.of(''), formSubmit$);
//     this.controlSubscription = this.controlValue$.subscribe(() => {
//       this.setVisible();
//     });

//     this.controlValue$.subscribe(() => {
//       for (let type of this.types) {
//         let res = this.setVisibleType(type);
//         if (res) break;
//       }
//     });
//   }

//   private setVisible() {
//     if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
//       this.render.removeStyle(this._el.nativeElement, 'display');
//     } else {
//       this.render.setStyle(this._el.nativeElement, 'display', 'none');
//     }
//   }

//   private setVisibleType(type) {
//     if (this.match(type)) {
//       if (!this.hasView[type]) {
//         let text = this.errorPipe.transform(type);

//         if (['min', 'max'].indexOf(type) != -1) {
//           text += this.control.errors[type].value;
//         } else if (['minlength', 'maxlength'].indexOf(type)!= -1) {
//           text = text.replace('{$var}', this.control.errors[type].requiredLength);
//         }

//         this._el.nativeElement.innerHTML = text;
//         this.hasView[type] = true;
//       }
//       return true;
//     } else {
//       if (this.hasView[type]) {
//         this.viewContainer.clear();
//         this.hasView[type] = false;
//       }
//       return false;
//     }
//   }

//   match(error: string) {

//     return (this.control && this.control.errors && this.control.errors[error]);
//   }

//   get form() { return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

//   ngOnDestroy() {
//     this.controlSubscription.unsubscribe();
//   }
// }
