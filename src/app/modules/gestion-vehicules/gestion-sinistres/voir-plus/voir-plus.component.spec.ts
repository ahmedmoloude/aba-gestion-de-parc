import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirPlusComponent } from './voir-plus.component';

describe('VoirPlusComponent', () => {
  let component: VoirPlusComponent;
  let fixture: ComponentFixture<VoirPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirPlusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
