import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirhistoriqueComponent } from './voirhistorique.component';

describe('VoirhistoriqueComponent', () => {
  let component: VoirhistoriqueComponent;
  let fixture: ComponentFixture<VoirhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirhistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
