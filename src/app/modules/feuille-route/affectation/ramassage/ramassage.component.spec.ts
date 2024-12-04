import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamassageComponent } from './ramassage.component';

describe('RamassageComponent', () => {
  let component: RamassageComponent;
  let fixture: ComponentFixture<RamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
