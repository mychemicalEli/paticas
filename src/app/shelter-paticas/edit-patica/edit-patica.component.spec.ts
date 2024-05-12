import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaticaComponent } from './edit-patica.component';

describe('EditPaticaComponent', () => {
  let component: EditPaticaComponent;
  let fixture: ComponentFixture<EditPaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPaticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
