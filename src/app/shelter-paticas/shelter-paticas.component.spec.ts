import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPaticasComponent } from './shelter-paticas.component';

describe('ShelterPaticasComponent', () => {
  let component: ShelterPaticasComponent;
  let fixture: ComponentFixture<ShelterPaticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShelterPaticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShelterPaticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
