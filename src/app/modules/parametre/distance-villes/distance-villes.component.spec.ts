import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceVillesComponent } from './distance-villes.component';

describe('DistanceVillesComponent', () => {
  let component: DistanceVillesComponent;
  let fixture: ComponentFixture<DistanceVillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistanceVillesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceVillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
