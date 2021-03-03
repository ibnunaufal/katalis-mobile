import { TestBed } from '@angular/core/testing';

import { TopupMerchantService } from './topup-merchant.service';

describe('TopupMerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopupMerchantService = TestBed.get(TopupMerchantService);
    expect(service).toBeTruthy();
  });
});
