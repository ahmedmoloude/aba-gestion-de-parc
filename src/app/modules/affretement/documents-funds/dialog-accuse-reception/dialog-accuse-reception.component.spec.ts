import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccuseReceptionComponent } from './dialog-accuse-reception.component';

describe('DialogAccuseReceptionComponent', () => {
  let component: DialogAccuseReceptionComponent;
  let fixture: ComponentFixture<DialogAccuseReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAccuseReceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAccuseReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
