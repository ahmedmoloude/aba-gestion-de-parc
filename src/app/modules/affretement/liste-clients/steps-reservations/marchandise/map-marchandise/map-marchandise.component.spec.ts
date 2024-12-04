import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMarchandiseComponent } from './map-marchandise.component';

describe('MapMarchandiseComponent', () => {
  let component: MapMarchandiseComponent;
  let fixture: ComponentFixture<MapMarchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapMarchandiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMarchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
