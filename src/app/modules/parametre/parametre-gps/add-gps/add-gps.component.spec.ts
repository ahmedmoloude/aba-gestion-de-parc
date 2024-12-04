import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGpsComponent } from './add-gps.component';

describe('AddGpsComponent', () => {
  let component: AddGpsComponent;
  let fixture: ComponentFixture<AddGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
