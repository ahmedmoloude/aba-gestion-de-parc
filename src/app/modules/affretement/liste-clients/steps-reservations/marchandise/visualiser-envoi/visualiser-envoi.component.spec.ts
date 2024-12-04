import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserEnvoiComponent } from './visualiser-envoi.component';

describe('VisualiserEnvoiComponent', () => {
  let component: VisualiserEnvoiComponent;
  let fixture: ComponentFixture<VisualiserEnvoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserEnvoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserEnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
