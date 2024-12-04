import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousEditComponent } from './rendezvous-edit.component';

describe('RendezvousEditComponent', () => {
  let component: RendezvousEditComponent;
  let fixture: ComponentFixture<RendezvousEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezvousEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezvousEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
