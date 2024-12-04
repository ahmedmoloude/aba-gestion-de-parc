import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAffectAgentComponent } from './dialog-affect-agent.component';

describe('DialogAffectAgentComponent', () => {
  let component: DialogAffectAgentComponent;
  let fixture: ComponentFixture<DialogAffectAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAffectAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAffectAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
