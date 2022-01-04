import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts!: Post[];
  postSubscription!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postSubscription = this.postService.postsSubject.subscribe({
      next: (posts) => {
        console.log('Demande initiale des posts en cours...', posts);
        this.posts = posts;
      },
    });
    this.postService.emitPostSubject();
  }

  onSaveAll() {
    this.postService.saveAllPosts();
  }

  onGetAll() {
    this.postService.getAllPosts();
  }

  onRemovePost(post: Post) {
    this.postService.removePost(post);
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
