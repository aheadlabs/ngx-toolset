import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapBreakpointComponent } from './bootstrap-breakpoint.component';
import {BreakpointObserver} from "@angular/cdk/layout";

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

  // getBreakpointFromMediaQuery
  describe('getBreakpointFromMediaQuery method', () => {
    it('should return the breakpoint filtered by media query', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px) and (max-width: 991px)';
      const expectedBreakpoint = 'md';
      // Act - Assert
      expect(component['getBreakpointFromMediaQuery'](mediaQuery)).toEqual(expectedBreakpoint);
    });
    it('should return empty when breakpoint does not exist', () => {
      // Arrange
      const mediaQuery = 'non existing media query';
      const expectedBreakpoint = '';
      // Act - Assert
      expect(component['getBreakpointFromMediaQuery'](mediaQuery)).toEqual(expectedBreakpoint);
    })
  });

  // handleMediaQueryListEvent
  describe('handleMediaQueryListEvent method', () => {
    it('should call set variables with event.media', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px) and (max-width: 991px)';
      const event: any = { media: mediaQuery };
      spyOn<BootstrapBreakpointComponent, any>(component, 'setVariables').and.callThrough();
      // Act
      component['handleMediaQueryListEvent'].call(component, event);
      // Assert
      expect(component['setVariables']).toHaveBeenCalledWith(mediaQuery);
    });
  });

  // observeMediaQueries
  describe('observeMediaQueries method', () => {
    it('should call setVariables method when media query matched', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px) and (max-width: 991px)';
      spyOn<BreakpointObserver, any>(component.breakPointObserver, 'isMatched').and.returnValue(true);
      const setVariablesSpy = spyOn<BootstrapBreakpointComponent, any>(component, 'setVariables');
      // Act
      component['observeMediaQueries'].call(component, mediaQuery);
      // Assert
      expect(setVariablesSpy).toHaveBeenCalledWith(mediaQuery);
    });
    it('should call setVariables method when media query not matched', () => {
      // Arrange
      const mediaQuery = '(min-width: 768px) and (max-width: 991px)';
      spyOn<BreakpointObserver, any>(component.breakPointObserver, 'isMatched').and.returnValue(false);
      const setVariablesSpy = spyOn<BootstrapBreakpointComponent, any>(component, 'setVariables');
      // Act
      component['observeMediaQueries'].call(component, mediaQuery);
      // Assert
      expect(setVariablesSpy).toHaveBeenCalledTimes(0);
    });
  });
  
});
