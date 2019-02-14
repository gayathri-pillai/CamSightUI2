import { TestBed } from '@angular/core/testing';

import { TrackEmployeeService } from './track-employee.service';

describe('TrackEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackEmployeeService = TestBed.get(TrackEmployeeService);
    expect(service).toBeTruthy();
  });
});
