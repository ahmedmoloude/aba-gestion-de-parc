import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVolumeComponent } from './dialog-volume.component';

describe('DialogVolumeComponent', () => {
  let component: DialogVolumeComponent;
  let fixture: ComponentFixture<DialogVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
