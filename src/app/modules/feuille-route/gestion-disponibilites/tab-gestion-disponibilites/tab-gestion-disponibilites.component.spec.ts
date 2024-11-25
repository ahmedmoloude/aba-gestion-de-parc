import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGestionDisponibilitesComponent } from './tab-gestion-disponibilites.component';

describe('TabGestionDisponibilitesComponent', () => {
  let component: TabGestionDisponibilitesComponent;
  let fixture: ComponentFixture<TabGestionDisponibilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabGestionDisponibilitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGestionDisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
