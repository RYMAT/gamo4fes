import { TestBed } from '@angular/core/testing';

import { JsonConvertService } from './json-convert.service';

describe('JsonConvertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonConvertService = TestBed.get(JsonConvertService);
    expect(service).toBeTruthy();
  });
});
