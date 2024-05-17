import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShelterComponent } from './profile-shelter.component';

describe('ProfileShelterComponent', () => {
  let component: ProfileShelterComponent;
  let fixture: ComponentFixture<ProfileShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileShelterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
