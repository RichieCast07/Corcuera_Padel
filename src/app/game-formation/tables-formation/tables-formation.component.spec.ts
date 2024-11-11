import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesFormationComponent } from './tables-formation.component';

describe('TablesFormationComponent', () => {
  let component: TablesFormationComponent;
  let fixture: ComponentFixture<TablesFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesFormationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
