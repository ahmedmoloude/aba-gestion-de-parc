import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchandiseComponent } from './marchandise.component';

describe('MarchandiseComponent', () => {
  let component: MarchandiseComponent;
  let fixture: ComponentFixture<MarchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchandiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
