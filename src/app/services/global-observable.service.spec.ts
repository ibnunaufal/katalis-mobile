import { TestBed } from '@angular/core/testing';

import { GlobalObservableService } from './global-observable.service';

describe('GlobalObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalObservableService = TestBed.get(GlobalObservableService);
    expect(service).toBeTruthy();
  });
});
