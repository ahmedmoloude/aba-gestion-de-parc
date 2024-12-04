import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAvoirComponent } from './rapport-avoir.component';

describe('RapportAvoirComponent', () => {
  let component: RapportAvoirComponent;
  let fixture: ComponentFixture<RapportAvoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportAvoirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
