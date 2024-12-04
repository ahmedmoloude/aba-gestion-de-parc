import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationTourneeComponent } from './generation-tournee.component';

describe('GenerationTourneeComponent', () => {
  let component: GenerationTourneeComponent;
  let fixture: ComponentFixture<GenerationTourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationTourneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationTourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
