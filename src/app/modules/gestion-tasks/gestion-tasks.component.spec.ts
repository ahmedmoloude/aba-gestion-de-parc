import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTasksComponent } from './gestion-tasks.component';

describe('GestionTasksComponent', () => {
  let component: GestionTasksComponent;
  let fixture: ComponentFixture<GestionTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
