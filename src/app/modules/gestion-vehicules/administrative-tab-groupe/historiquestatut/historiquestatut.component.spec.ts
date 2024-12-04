import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquestatutComponent } from './historiquestatut.component';

describe('HistoriquestatutComponent', () => {
  let component: HistoriquestatutComponent;
  let fixture: ComponentFixture<HistoriquestatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquestatutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquestatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
