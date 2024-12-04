import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirBordereauVersementComponent } from './voir-bordereau-versement.component';

describe('VoirBordereauVersementComponent', () => {
  let component: VoirBordereauVersementComponent;
  let fixture: ComponentFixture<VoirBordereauVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirBordereauVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirBordereauVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
