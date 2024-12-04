import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsDevisComponent } from './gestions-devis.component';

describe('GestionsDevisComponent', () => {
  let component: GestionsDevisComponent;
  let fixture: ComponentFixture<GestionsDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionsDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionsDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
