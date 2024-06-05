import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticasListComponent } from './paticas-list.component';

describe('PaticasListComponent', () => {
  let component: PaticasListComponent;
  let fixture: ComponentFixture<PaticasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaticasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaticasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
