import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostoriqueInventaireComponent } from './hostorique-inventaire.component';

describe('HostoriqueInventaireComponent', () => {
  let component: HostoriqueInventaireComponent;
  let fixture: ComponentFixture<HostoriqueInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostoriqueInventaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostoriqueInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
