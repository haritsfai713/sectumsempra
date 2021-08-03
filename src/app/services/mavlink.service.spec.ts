import { TestBed } from '@angular/core/testing';

import { MavlinkService } from './mavlink.service';

describe('MavlinkService', () => {
  let service: MavlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MavlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
