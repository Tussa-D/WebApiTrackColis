import { TestBed } from '@angular/core/testing';

import { UsersColis } from './users-colis';

describe('UsersColis', () => {
  let service: UsersColis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersColis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
