import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityResourceComponent } from './community-resource.component';

describe('CommunityResourceComponent', () => {
  let component: CommunityResourceComponent;
  let fixture: ComponentFixture<CommunityResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityResourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunityResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
