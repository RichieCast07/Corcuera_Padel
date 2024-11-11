import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCourtsComponent } from './form-courts.component';

describe('FormCourtsComponent', () => {
  let component: FormCourtsComponent;
  let fixture: ComponentFixture<FormCourtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCourtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
