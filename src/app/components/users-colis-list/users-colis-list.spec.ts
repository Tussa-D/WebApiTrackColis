import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersColisList } from './users-colis-list';

describe('UsersColisList', () => {
  let component: UsersColisList;
  let fixture: ComponentFixture<UsersColisList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersColisList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersColisList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
