import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationCovoyageComponent } from './generation-covoyage.component';

describe('GenerationCovoyageComponent', () => {
  let component: GenerationCovoyageComponent;
  let fixture: ComponentFixture<GenerationCovoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationCovoyageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationCovoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
