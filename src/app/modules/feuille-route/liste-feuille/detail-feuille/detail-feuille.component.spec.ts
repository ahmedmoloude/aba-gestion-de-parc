import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFeuilleComponent } from './detail-feuille.component';

describe('DetailFeuilleComponent', () => {
  let component: DetailFeuilleComponent;
  let fixture: ComponentFixture<DetailFeuilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFeuilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
