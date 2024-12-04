import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFusionnerComponent } from './dialog-fusionner.component';

describe('DialogFusionnerComponent', () => {
  let component: DialogFusionnerComponent;
  let fixture: ComponentFixture<DialogFusionnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFusionnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFusionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
