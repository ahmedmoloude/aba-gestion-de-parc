import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartesDialogComponent } from './cartes-dialog.component';

describe('CartesDialogComponent', () => {
  let component: CartesDialogComponent;
  let fixture: ComponentFixture<CartesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
