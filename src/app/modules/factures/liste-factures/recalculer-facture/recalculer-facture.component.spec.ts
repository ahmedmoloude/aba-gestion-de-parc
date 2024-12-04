import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecalculerFactureComponent } from './recalculer-facture.component';

describe('RecalculerFactureComponent', () => {
  let component: RecalculerFactureComponent;
  let fixture: ComponentFixture<RecalculerFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecalculerFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecalculerFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
