import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualistationDetailsComponent } from './visualistation-details.component';

describe('VisualistationDetailsComponent', () => {
  let component: VisualistationDetailsComponent;
  let fixture: ComponentFixture<VisualistationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualistationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualistationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
