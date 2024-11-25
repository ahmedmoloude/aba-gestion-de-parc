import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleterCommandeComponent } from './completer-commande.component';

describe('CompleterCommandeComponent', () => {
  let component: CompleterCommandeComponent;
  let fixture: ComponentFixture<CompleterCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleterCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleterCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
