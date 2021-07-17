import { TestBed } from '@angular/core/testing';

import { VoiceActivationService } from './voice-activation.service';

describe('VoiceActivationService', () => {
  let service: VoiceActivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceActivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
