import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupMerchantPage } from './topup-merchant.page';

describe('TopupMerchantPage', () => {
  let component: TopupMerchantPage;
  let fixture: ComponentFixture<TopupMerchantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupMerchantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupMerchantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});