import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLivraisonComponent } from './dialog-livraison.component';

describe('DialogLivraisonComponent', () => {
  let component: DialogLivraisonComponent;
  let fixture: ComponentFixture<DialogLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
