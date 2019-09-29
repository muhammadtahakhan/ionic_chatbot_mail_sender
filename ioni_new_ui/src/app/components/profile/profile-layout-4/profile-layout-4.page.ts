import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-profile-layout-4',
  templateUrl: 'profile-layout-4.page.html',
  styleUrls: ['profile-layout-4.page.scss'],
})
export class ProfileLayout4Page implements OnChanges {
  @Input() data: any;

  @Output() onItemClick = new EventEmitter();
  @Output() onLike = new EventEmitter();
  @Output() onComment = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onItemClickFunc(params, e) {
    if (e) {
      e.stopPropagation();
    }
    this.onItemClick.emit(params);
  }

  onLikeFunc(params, event) {
    if (event) {
      event.stopPropagation();
    }
    this.onLike.emit(params);
  }

  onCommentFunc(params, event) {
    if (event) {
      event.stopPropagation();
    }
    this.onComment.emit(params);
  }
}
