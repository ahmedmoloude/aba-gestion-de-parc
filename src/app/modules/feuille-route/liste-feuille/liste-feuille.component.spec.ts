import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFeuilleComponent } from './liste-feuille.component';

describe('ListeFeuilleComponent', () => {
  let component: ListeFeuilleComponent;
  let fixture: ComponentFixture<ListeFeuilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFeuilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
