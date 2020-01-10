import { TestBed } from '@angular/core/testing';

import { BarcosService } from './barcos.service';

describe('BarcosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarcosService = TestBed.get(BarcosService);
    expect(service).toBeTruthy();
  });
});
