import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-map-layout-3',
  templateUrl: 'map-layout-3.page.html',
  styleUrls: ['map-layout-3.page.scss'],
})
export class MapLayout3Page implements OnChanges {
  @Input() data: any;

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }
}
