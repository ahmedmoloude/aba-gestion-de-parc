import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePiecejointeComponent } from './demande-piecejointe.component';

describe('DemandePiecejointeComponent', () => {
  let component: DemandePiecejointeComponent;
  let fixture: ComponentFixture<DemandePiecejointeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePiecejointeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePiecejointeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
