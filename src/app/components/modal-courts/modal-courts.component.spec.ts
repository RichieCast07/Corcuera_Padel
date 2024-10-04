import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCourtsComponent } from './modal-courts.component';

describe('ModalCourtsComponent', () => {
  let component: ModalCourtsComponent;
  let fixture: ComponentFixture<ModalCourtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCourtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
