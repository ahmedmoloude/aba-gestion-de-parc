import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserRetourComponent } from './visualiser-retour.component';

describe('VisualiserRetourComponent', () => {
  let component: VisualiserRetourComponent;
  let fixture: ComponentFixture<VisualiserRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
