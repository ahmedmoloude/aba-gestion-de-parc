import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SualisationGlobaleComponent } from './sualisation-globale.component';

describe('SualisationGlobaleComponent', () => {
  let component: SualisationGlobaleComponent;
  let fixture: ComponentFixture<SualisationGlobaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SualisationGlobaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SualisationGlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
