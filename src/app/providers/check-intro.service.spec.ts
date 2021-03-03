import { TestBed } from '@angular/core/testing';

import { CheckIntroService } from './check-intro.service';

describe('CheckIntroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckIntroService = TestBed.get(CheckIntroService);
    expect(service).toBeTruthy();
  });
});
