import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaugeageDialogComponent } from './jaugeage-dialog.component';

describe('JaugeageDialogComponent', () => {
  let component: JaugeageDialogComponent;
  let fixture: ComponentFixture<JaugeageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JaugeageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JaugeageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
