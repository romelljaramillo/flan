import { TestBed } from '@angular/core/testing';

import { NgxFlanKitUxService } from './ngx-flan-kit-ux.service';

describe('NgxFlanKitUxService', () => {
  let service: NgxFlanKitUxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFlanKitUxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
