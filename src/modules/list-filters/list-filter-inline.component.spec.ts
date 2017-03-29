import {
  ListState,
  ListStateDispatcher,
  ListFilterModel
} from '../list/state';

import {
  TestBed,
  fakeAsync,
  async,
  tick,
  ComponentFixture
} from '@angular/core/testing';

import {
  ListFilterInlineTestComponent
} from './fixtures/list-filter-inline.component.fixture';

import {
  SkyListToolbarModule
} from '../list-toolbar';

import {
  SkyListFiltersModule
} from '.';

import {
  expect
} from '../testing';

import { FormsModule } from '@angular/forms';

import {
  SkyCheckboxModule
} from '../checkbox';
import { By } from '@angular/platform-browser';

describe('List inline filters', () => {

  let state: ListState,
    dispatcher: ListStateDispatcher,
    fixture: ComponentFixture<ListFilterInlineTestComponent>,
    nativeElement: HTMLElement,
    component: ListFilterInlineTestComponent;

  beforeEach(async(() => {
    dispatcher = new ListStateDispatcher();
    state = new ListState(dispatcher);

    TestBed.configureTestingModule({
      declarations: [
        ListFilterInlineTestComponent
      ],
      imports: [
        SkyListToolbarModule,
        SkyListFiltersModule,
        FormsModule,
        SkyCheckboxModule
      ],
      providers: [
        { provide: ListState, useValue: state },
        { provide: ListStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(ListFilterInlineTestComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    state.skip(1).take(1).subscribe(() => fixture.detectChanges());

  }));

  function getFilterButton() {
    return nativeElement.querySelector('.sky-list-toolbar-container .sky-filter-btn');
  }

  function getInlineFilters() {
    return nativeElement.querySelectorAll('.sky-list-toolbar-container .sky-filter-inline-item');
  }

  it('should add a filter button and inline filters when provided', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let filterButton = getFilterButton() as HTMLButtonElement;

    expect(filterButton).not.toBeNull();

    expect(getInlineFilters().length).toBe(0);

    filterButton.click();
    fixture.detectChanges();
    tick();
    expect(getInlineFilters().length).toBe(2);
  }));

  it('should filter appropriately when change function is called', () => {
    fixture.detectChanges();
    tick();
    state.take(1).subscribe((current) => {
      expect(current.filters.length).toBe(0);
    });
    tick();
    let selectEl = fixture.debugElement.query(By.css('select'));
  });

  it('should set active state on filter button when filters are active', () => {

  });
});
