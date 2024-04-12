import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResourcesComponent } from './dashboard-resources.component';

describe('DashboardResourcesComponent', () => {
  let component: DashboardResourcesComponent;
  let fixture: ComponentFixture<DashboardResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
