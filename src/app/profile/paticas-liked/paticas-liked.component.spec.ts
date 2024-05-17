import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticasLikedComponent } from './paticas-liked.component';

describe('PaticasLikedComponent', () => {
  let component: PaticasLikedComponent;
  let fixture: ComponentFixture<PaticasLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaticasLikedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaticasLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
