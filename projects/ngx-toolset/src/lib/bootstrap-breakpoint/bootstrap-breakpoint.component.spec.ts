import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapBreakpointComponent } from './bootstrap-breakpoint.component';

describe('BootstrapBreakpointComponent', () => {
  let component: BootstrapBreakpointComponent;
  let fixture: ComponentFixture<BootstrapBreakpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapBreakpointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootstrapBreakpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
