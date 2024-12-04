import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDemandeLightComponent } from './new-demande-light.component';

describe('NewDemandeLightComponent', () => {
  let component: NewDemandeLightComponent;
  let fixture: ComponentFixture<NewDemandeLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDemandeLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDemandeLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
