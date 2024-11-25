import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationGpsComponent } from './association-gps.component';

describe('AssociationGpsComponent', () => {
  let component: AssociationGpsComponent;
  let fixture: ComponentFixture<AssociationGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
