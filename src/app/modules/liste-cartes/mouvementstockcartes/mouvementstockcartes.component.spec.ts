import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementstockcartesComponent } from './mouvementstockcartes.component';

describe('MouvementstockcartesComponent', () => {
  let component: MouvementstockcartesComponent;
  let fixture: ComponentFixture<MouvementstockcartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouvementstockcartesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementstockcartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
