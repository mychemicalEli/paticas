import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPaticasListComponent } from './shelter-paticas-list.component';

describe('ShelterPaticasListComponent', () => {
  let component: ShelterPaticasListComponent;
  let fixture: ComponentFixture<ShelterPaticasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShelterPaticasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShelterPaticasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
