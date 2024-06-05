import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaborateContentComponent } from './colaborate-content.component';

describe('ColaborateContentComponent', () => {
  let component: ColaborateContentComponent;
  let fixture: ComponentFixture<ColaborateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColaborateContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColaborateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
