import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreGpsComponent } from './parametre-gps.component';

describe('ParametreGpsComponent', () => {
  let component: ParametreGpsComponent;
  let fixture: ComponentFixture<ParametreGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
