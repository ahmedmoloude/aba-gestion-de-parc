import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousAddComponent } from './rendezvous-add.component';

describe('RendezvousAddComponent', () => {
  let component: RendezvousAddComponent;
  let fixture: ComponentFixture<RendezvousAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezvousAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezvousAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
