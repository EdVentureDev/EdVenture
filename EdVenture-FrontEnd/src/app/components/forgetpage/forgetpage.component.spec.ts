import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpageComponent } from './forgetpage.component';

describe('ForgetpageComponent', () => {
  let component: ForgetpageComponent;
  let fixture: ComponentFixture<ForgetpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
