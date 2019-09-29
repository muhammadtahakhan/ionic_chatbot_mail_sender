import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FilterPipe } from './../FilterPipe';

@Component({
  selector: 'cs-search-bar-layout-2',
  templateUrl: 'search-bar-layout-2.page.html',
  styleUrls: ['search-bar-layout-2.page.scss'],
  providers: [FilterPipe]
})
export class SearchBarLayout2Page implements OnChanges {
  @Input() data: any;

  @Output() onItemClick = new EventEmitter();
  @Output() onTextChange = new EventEmitter();

  search: String = '';

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onItemClickFunc(item): void {
    if (event) {
      event.stopPropagation();
    }
    this.onItemClick.emit(item);
  }

  onTextChangeFunc(item): void {
    if (event) {
      event.stopPropagation();
    }
    this.onTextChange.emit(this.search);
  }
}
