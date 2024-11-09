import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCouplesComponent } from './form-couples.component';

describe('FormCouplesComponent', () => {
  let component: FormCouplesComponent;
  let fixture: ComponentFixture<FormCouplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCouplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCouplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
