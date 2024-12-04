import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleServiceComponent } from './grille-service.component';

describe('GrilleVolumeComponent', () => {
  let component: GrilleServiceComponent;
  let fixture: ComponentFixture<GrilleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrilleServiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
