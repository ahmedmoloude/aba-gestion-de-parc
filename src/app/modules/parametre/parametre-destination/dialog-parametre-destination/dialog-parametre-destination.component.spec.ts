import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParametreDestinationComponent } from './dialog-parametre-destination.component';

describe('DialogParametreDestinationComponent', () => {
  let component: DialogParametreDestinationComponent;
  let fixture: ComponentFixture<DialogParametreDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogParametreDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogParametreDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
