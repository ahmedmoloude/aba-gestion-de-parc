import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFeuillesRouteComponent } from './liste-feuilles-route.component';

describe('ListeFeuillesRouteComponent', () => {
  let component: ListeFeuillesRouteComponent;
  let fixture: ComponentFixture<ListeFeuillesRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFeuillesRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFeuillesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
