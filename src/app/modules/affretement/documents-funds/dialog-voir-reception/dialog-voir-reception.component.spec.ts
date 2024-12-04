import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVoirReceptionComponent } from './dialog-voir-reception.component';

describe('DialogVoirReceptionComponent', () => {
  let component: DialogVoirReceptionComponent;
  let fixture: ComponentFixture<DialogVoirReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVoirReceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVoirReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
