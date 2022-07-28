
import {OnInit, Component, ElementRef, EventEmitter, Output, ViewChild, OnDestroy} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';


/**
 * Emits a string that can be used to visualize the current bootstrap breakpoint.
 * For more info, see https://getbootstrap.com/docs/5.0/layout/breakpoints/
 */
@Component({
  selector: 'ngxtoolset-bootstrap-breakpoint',
  templateUrl: './bootstrap-breakpoint.component.html',
  styleUrls: ['./bootstrap-breakpoint.component.scss']
})
export class BootstrapBreakpointComponent implements OnInit, OnDestroy {

  @ViewChild('bootstrapBreakpointComponent') bootstrapBreakpointComponent!: ElementRef;

  /**
   * Event that emits bootstrap breakpoint value
   * @type EventEmitter<string>
   * @public
   */
  @Output() bootstrapBreakpoint: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event that emits bootstrap breakpoint value with a hyphen at the start.
   * F.I: -sm, -xs, -xxl
   *
   * @type EventEmitter<string>
   * @public
   */
  @Output() bootstrapBreakpointStart: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event that emits bootstrap breakpoint value with a hyphen at the end.
   * F.I: sm-, xs-, xxl-
   * @type EventEmitter<string>
   * @public
   */
  @Output() bootstrapBreakpointEnd: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Event that emits bootstrap breakpoint value with a hyphen both at the start and end.
   * F.I: -sm-, -xs-, -xxl-
   * @type EventEmitter<string>
   * @public
   */
  @Output() bootstrapBreakpointStartEnd: EventEmitter<string> = new EventEmitter<string>();

  private _bootstrapBreakpoint!: string;
  private _matcher!: MediaQueryList;
  private _mediaQueries = [
    { mediaQuery: '(max-width: 575px)', breakpoint: 'xs'},
    { mediaQuery: '(min-width: 576px) and (max-width: 767px)', breakpoint: 'sm'},
    { mediaQuery: '(min-width: 768px) and (max-width: 991px)', breakpoint: 'md'},
    { mediaQuery: '(min-width: 992px) and (max-width: 1199px)', breakpoint: 'lg'},
    { mediaQuery: '(min-width: 1200px) and (max-width: 1399px)', breakpoint: 'xl'},
    { mediaQuery: '(min-width: 1400px)', breakpoint: 'xxl'},
  ]

  constructor(public mediaMatcher: MediaMatcher,
              public breakPointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this._mediaQueries.forEach(mq => this.observeMediaQueries(mq.mediaQuery));
  }

  private getBreakpointFromMediaQuery(mediaQuery: string): string {
    return this._mediaQueries.filter(mq => mq.mediaQuery === mediaQuery).pop()?.breakpoint ?? '';
  }

  private handleMediaQueryListEvent(event: MediaQueryListEvent) {
    this.setVariables(event.media);
  }

  private observeMediaQueries(mediaQuery: string): void {
    // For initial value, use the breakpoint observer and emit initial breakpoint
    if (this.breakPointObserver.isMatched(mediaQuery)) {
      this.setVariables(mediaQuery);
    }
    // Then, open several observers with media matcher in order to live observe for changes on media queries.
    this._matcher = this.mediaMatcher.matchMedia(mediaQuery);
    this._matcher.addEventListener('change', this.handleMediaQueryListEvent.bind(this), false);
  }

  private setVariables(mediaQuery: string): void {
    this._bootstrapBreakpoint = this.getBreakpointFromMediaQuery(mediaQuery);
    this.bootstrapBreakpoint.emit(this._bootstrapBreakpoint);
    this.bootstrapBreakpointStart.emit(`-${this._bootstrapBreakpoint}`);
    this.bootstrapBreakpointEnd.emit(`${this._bootstrapBreakpoint}-`);
    this.bootstrapBreakpointStartEnd.emit(`-${this._bootstrapBreakpoint}-`);
  }

  ngOnDestroy() {
    this._matcher.removeEventListener('change', this.handleMediaQueryListEvent.bind(this));
  }

}
