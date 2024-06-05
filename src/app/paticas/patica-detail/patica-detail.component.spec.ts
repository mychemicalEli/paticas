import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticaDetailComponent } from './patica-detail.component';

describe('PaticaDetailComponent', () => {
  let component: PaticaDetailComponent;
  let fixture: ComponentFixture<PaticaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaticaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaticaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
