import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinataireComponent } from './destinataire.component';

describe('DestinataireComponent', () => {
  let component: DestinataireComponent;
  let fixture: ComponentFixture<DestinataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
