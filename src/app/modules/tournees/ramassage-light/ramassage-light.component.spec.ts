import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamassageLightComponent } from './ramassage-light.component';

describe('RamassageLightComponent', () => {
  let component: RamassageLightComponent;
  let fixture: ComponentFixture<RamassageLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamassageLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamassageLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
