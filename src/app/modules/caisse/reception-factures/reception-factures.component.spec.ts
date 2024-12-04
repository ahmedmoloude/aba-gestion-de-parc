import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionFacturesComponent } from './reception-factures.component';

describe('ReceptionFacturesComponent', () => {
  let component: ReceptionFacturesComponent;
  let fixture: ComponentFixture<ReceptionFacturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionFacturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
