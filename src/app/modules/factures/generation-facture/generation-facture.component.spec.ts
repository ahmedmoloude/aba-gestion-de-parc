import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationFactureComponent } from './generation-facture.component';

describe('GenerationFactureComponent', () => {
  let component: GenerationFactureComponent;
  let fixture: ComponentFixture<GenerationFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
