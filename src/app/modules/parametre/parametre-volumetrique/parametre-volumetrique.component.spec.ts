import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreVolumetriqueComponent } from './parametre-volumetrique.component';

describe('ParametreVolumetriqueComponent', () => {
  let component: ParametreVolumetriqueComponent;
  let fixture: ComponentFixture<ParametreVolumetriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreVolumetriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreVolumetriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
