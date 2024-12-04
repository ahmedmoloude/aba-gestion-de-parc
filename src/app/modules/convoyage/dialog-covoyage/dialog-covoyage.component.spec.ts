import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCovoyageComponent } from './dialog-covoyage.component';

describe('DialogCovoyageComponent', () => {
  let component: DialogCovoyageComponent;
  let fixture: ComponentFixture<DialogCovoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCovoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCovoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
