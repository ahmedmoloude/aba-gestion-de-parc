import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeExtincteurComponent } from './volume-extincteur.component';

describe('VolumeExtincteurComponent', () => {
  let component: VolumeExtincteurComponent;
  let fixture: ComponentFixture<VolumeExtincteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeExtincteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeExtincteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
