import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationTourneeComponent } from './creation-tournee.component';

describe('CreationTourneeComponent', () => {
  let component: CreationTourneeComponent;
  let fixture: ComponentFixture<CreationTourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationTourneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationTourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
