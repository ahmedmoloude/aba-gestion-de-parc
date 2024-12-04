import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarchandiseComponent } from './list-marchandise.component';

describe('ListMarchandiseComponent', () => {
  let component: ListMarchandiseComponent;
  let fixture: ComponentFixture<ListMarchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMarchandiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
