import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaticaComponent } from './add-patica.component';

describe('AddPaticaComponent', () => {
  let component: AddPaticaComponent;
  let fixture: ComponentFixture<AddPaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
