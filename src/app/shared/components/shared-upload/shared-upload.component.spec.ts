import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUploadComponent } from './shared-upload.component';

describe('SharedUploadComponent', () => {
  let component: SharedUploadComponent;
  let fixture: ComponentFixture<SharedUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
