import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderItem } from './../helpers/header-item';
import { AddButtonComponent } from '../../shared/components/header-components/add-button/add-button.component';
import { HeaderFilterComponent } from '../../shared/components/header-components/header-filter/header-filter.component';
@Injectable({
  providedIn: 'root',
})
export class DynamicContentHeaderService {
  constructor(private cfr: ComponentFactoryResolver) {
    
  }

  getComponent(name) {
    let new_component = new Component();
    return new_component[name]();
  }

  loadComponent(vcr: ViewContainerRef, comp, attribut = null) {
    vcr.clear();
    if (comp) {
      const currentComponent = this.getComponent(comp);
      return vcr.createComponent(
        this.cfr.resolveComponentFactory(currentComponent.component)
      );
    }
  }
}

class Component {
  createAddButtonComponent() {
    return new HeaderItem(AddButtonComponent);
  }

  createHeaderFilterComponent() {
    return new HeaderItem(HeaderFilterComponent);
  }
}
