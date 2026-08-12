import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPostulante } from './dashboard-postulante';

describe('DashboardPostulante', () => {
  let component: DashboardPostulante;
  let fixture: ComponentFixture<DashboardPostulante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPostulante],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPostulante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
