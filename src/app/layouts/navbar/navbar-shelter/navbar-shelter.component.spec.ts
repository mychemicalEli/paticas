import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarShelterComponent } from './navbar-shelter.component';

describe('NavbarShelterComponent', () => {
  let component: NavbarShelterComponent;
  let fixture: ComponentFixture<NavbarShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarShelterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
