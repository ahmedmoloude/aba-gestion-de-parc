import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsDialogComponent } from './prospects-dialog.component';

describe('ProspectsDialogComponent', () => {
  let component: ProspectsDialogComponent;
  let fixture: ComponentFixture<ProspectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
