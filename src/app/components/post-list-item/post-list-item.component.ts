import { Component, Input } from '@angular/core';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
})
export class PostListItemComponent {
  @Input() postId!: number;
  @Input() postTitle!: string;
  @Input() postContent!: string;
  @Input() postLoveIts!: number;
  @Input() postCreationDate!: Date;

  constructor(private postService: PostService) {}

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
    // this.postLoveIts = this.postLoveIts + 1;
    this.postService.incrementLoveIts(this.postId);
  }

  onDislike(): void {
    // this.postLoveIts = this.postLoveIts - 1;
    this.postService.decrementLoveIts(this.postId);
  }

  onRemovePostItem() {
    const postToRemove = this.postService.getPostById(this.postId);
    this.postService.removePost(postToRemove);
  }
}
