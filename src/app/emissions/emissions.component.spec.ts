import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsComponent } from './emissions.component';

describe('EmissionsComponent', () => {
  let component: EmissionsComponent;
  let fixture: ComponentFixture<EmissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmissionsComponent]
    });
    fixture = TestBed.createComponent(EmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
