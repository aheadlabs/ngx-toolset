import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxToolsetComponent } from './ngx-toolset.component';

describe('NgxToolsetComponent', () => {
  let component: NgxToolsetComponent;
  let fixture: ComponentFixture<NgxToolsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxToolsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxToolsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
