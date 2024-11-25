import { Injectable } from '@angular/core';
import { AppState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/profil/profil.selectors';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private store: Store<AppState>,) { }

  // hasPermission(parent: any, child: any, ability: any): boolean {
  //   let result = true;
  //   let tempAbilities = []
  //   let role = null
  //   this.store.select(selectAuthUser).subscribe((user) => {
  //     tempAbilities = (user?.abilities.length) ? user?.abilities[0].abilities : [];
  //     role = user.role
  //     if(role.name.toLowerCase().includes('admin')){
  //       return result
  //     }

      
  //     let tempModule = tempAbilities.find(a => a.name.toLowerCase() == parent.toLowerCase())
  //     if(!tempModule) return false

  //     if(!child){

  //       result = tempModule['abilities'].includes(ability)

  //     }else{

  //       let flattenedChildren = this.flattenChildren(tempModule);
  //       flattenedChildren.push(tempModule)
  //       console.log('FlattenChidlren', flattenedChildren)
  //       let childModule = flattenedChildren.find(a => a.name.toLowerCase() == child.toLowerCase())
  //       if(!childModule) return false
  //       result = childModule['abilities'].includes(ability)
        
  //     }

  //   })
  //   return result;
  // }

  hasPermission(parent: any, child: any, ability: any): boolean {
    let result = true;
    let tempAbilities = []
    let role = null
    this.store.select(selectAuthUser).subscribe((user) => {
      tempAbilities = (user?.abilities.length) ? user?.abilities[0].abilities : [];
      role = user.role ? user.role : user.temp_role
      if (role.name.toLowerCase().includes('admin')) {
        return result;
      }
    
      const tempModule = tempAbilities.find(a => a.name.toLowerCase() === parent.toLowerCase());
      
      if (!tempModule) {
        return !result;
      }
    
      if (!child) {
        result = tempModule.abilities.includes(ability);
      }
    
      const flattenedChildren = this.flattenChildren(tempModule);
      flattenedChildren.push(tempModule);
    
      const childModule = flattenedChildren.find(a => a.name.toLowerCase() === child.toLowerCase());
    
      result = childModule ? childModule.abilities.includes(ability) : false;

    })
    return result
  }

  flattenChildren(node: any): any[] {
    let result: any[] = [];
  
    if (node.children) {
      result.push(...node.children);
  
      for (const child of node.children) {
        result.push(...this.flattenChildren(child));
      }
    }
    return result;
  }


}
