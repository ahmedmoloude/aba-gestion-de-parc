import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffretmentTreeHeaderComponent } from './affretment-tree-header.component';

describe('AffretmentTreeHeaderComponent', () => {
  let component: AffretmentTreeHeaderComponent;
  let fixture: ComponentFixture<AffretmentTreeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffretmentTreeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffretmentTreeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
