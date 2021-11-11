import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerTableComponent } from './payer-table.component';

describe('PayerTableComponent', () => {
  let component: PayerTableComponent;
  let fixture: ComponentFixture<PayerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
