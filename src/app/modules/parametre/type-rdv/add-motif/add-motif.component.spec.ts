import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotifComponent } from './add-motif.component';

describe('AddMotifComponent', () => {
  let component: AddMotifComponent;
  let fixture: ComponentFixture<AddMotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
