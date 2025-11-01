import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersColisForm } from './users-colis-form';

describe('UsersColisForm', () => {
  let component: UsersColisForm;
  let fixture: ComponentFixture<UsersColisForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersColisForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersColisForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
