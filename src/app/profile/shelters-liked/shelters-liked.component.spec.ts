import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersLikedComponent } from './shelters-liked.component';

describe('SheltersLikedComponent', () => {
  let component: SheltersLikedComponent;
  let fixture: ComponentFixture<SheltersLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheltersLikedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheltersLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
