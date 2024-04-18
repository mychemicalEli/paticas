import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticasComponent } from './paticas.component';

describe('PaticasComponent', () => {
  let component: PaticasComponent;
  let fixture: ComponentFixture<PaticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
