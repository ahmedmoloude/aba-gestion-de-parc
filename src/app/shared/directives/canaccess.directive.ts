// import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
// import {hasPermission} from "app/helpers";

// @Directive({
//   selector: '[canAccess]'
// })

// // Gère l'affichage des éléments graphiques selon le role donné
// export class CanAccessDirective {
//   @Input('canAccess') set canAccess(role: any) {
//     const condition = role.inverse ? !hasPermission(role.id_group,role.target) : hasPermission(role.id_group,role.target);
//     if(condition) {
//       this.viewContainer.createEmbeddedView(this.templateRef);
//     } else {
//       this.viewContainer.clear();
//     }
//   };

//   constructor(
//     private templateRef: TemplateRef<any>,
//     private viewContainer: ViewContainerRef) {}
// }
