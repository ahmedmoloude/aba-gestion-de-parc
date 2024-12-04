import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreMarqueComponent } from './parametre-marque.component';

describe('ParametreMarqueComponent', () => {
  let component: ParametreMarqueComponent;
  let fixture: ComponentFixture<ParametreMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametreMarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametreMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
