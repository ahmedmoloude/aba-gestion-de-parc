import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffretementDevisComponent } from './update-affretement-devis.component';

describe('UpdateAffretementDevisComponent', () => {
  let component: UpdateAffretementDevisComponent;
  let fixture: ComponentFixture<UpdateAffretementDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAffretementDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAffretementDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
