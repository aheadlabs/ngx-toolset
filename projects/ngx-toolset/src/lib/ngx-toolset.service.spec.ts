import { TestBed } from '@angular/core/testing';

import { NgxToolsetService } from './ngx-toolset.service';

describe('NgxToolsetService', () => {
  let service: NgxToolsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxToolsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
