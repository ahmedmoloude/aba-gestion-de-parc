import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualistationGlobalComponent } from './visualistation-global.component';

describe('VisualistationGlobalComponent', () => {
  let component: VisualistationGlobalComponent;
  let fixture: ComponentFixture<VisualistationGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualistationGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualistationGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
