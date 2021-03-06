import { Component, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';
import { ListViewSwipeToDismissService } from 'src/app/services/list-view-swipe-to-dismiss-service';

@Component({
  selector: 'cs-swipe-to-dismiss-list-layout-1',
  templateUrl: 'swipe-to-dismiss-list-layout-1.page.html',
  styleUrls: ['swipe-to-dismiss-list-layout-1.page.scss'],
})
export class SwipeToDismissListLayout1Page implements OnChanges {
  @ViewChild('sliding', {static: false}) sliding;
  @ViewChild('dynamicList', {static: false}) dynamicList;

  @Input() data: any;

  @Output() onItemClick = new EventEmitter();
  @Output() onLike = new EventEmitter();
  @Output() onFavorite = new EventEmitter();
  @Output() onShare = new EventEmitter();
  @Output() onUndo = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor(public service:ListViewSwipeToDismissService) { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
    console.log('component', this.data);

  }

  onUndoFunc = (event) => {
    if (event) {
      event.stopPropagation();
    }
    this.sliding.closeOpened();
    this.onUndo.emit()
  }

  onDeleteFunc = (item: any, event): void => {
    if (event) {
      event.stopPropagation();
    }
    this.dynamicList.closeSlidingItems()
    // const index = this.data.items.indexOf(item);
    // if (index > -1) {
    //   this.data.items.splice(index, 1);
    // }
    this.onDelete.emit(item.id);
  }

  onItemClickFunc(item, event) {
    if (event) {
      event.stopPropagation();
    }
    this.onItemClick.emit(item);
  }

  onLikeFunc(item) {
    if (event) {
      event.stopPropagation();
    }
    this.onLike.emit(item);
  }

  onFavoriteFunc(item) {
    if (event) {
      event.stopPropagation();
    }
    this.onFavorite.emit(item);
  }

  onShareFunc(item) {
    if (event) {
      event.stopPropagation();
    }
    this.onShare.emit(item);
  }

  clickViewDetails(){
    
  }

  hashCode(str) { // java String#hashCode
   
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return '#' + this.intToRGB(hash);
} 

intToRGB(i){
  var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

setMyStyles(str) {
  let styles = {
    'background-color': this.hashCode(str),
    
  };
  return styles;
}

}
