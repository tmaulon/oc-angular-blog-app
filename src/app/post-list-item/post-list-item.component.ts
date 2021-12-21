import { Component, Input, OnInit } from '@angular/core';
export interface Post {
  title: string;
  content: string;
  loveIts: number;
  created_at: Date;
}

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
})
export class PostListItemComponent implements OnInit {
  @Input() postTitle: string = '';
  @Input() postContent: string = '';
  @Input() postLoveIts: number = 0;
  postCreationDate?: Promise<Date>;

  constructor() {
    this.postCreationDate = new Promise((resolve, reject) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, 2000);
    });
  }

  ngOnInit(): void {}

  getTextColor(): string {
    if (this.postLoveIts > 0) {
      return 'darkGreen';
    } else if (this.postLoveIts < 0) {
      return 'darkRed';
    } else {
      return 'black';
    }
  }

  onLike(): void {
    this.postLoveIts = this.postLoveIts + 1;
    console.log('like', this.postLoveIts);
  }

  onDislike(): void {
    this.postLoveIts = this.postLoveIts - 1;
    console.log('dislike', this.postLoveIts);
  }
}
