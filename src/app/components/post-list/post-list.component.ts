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
    this.postSubscription = this.postService.postsSubject.subscribe((posts) => {
      console.log(
        'Récupération initiale des posts via les posts du service en cours...',
        posts
      );
      this.posts = posts;
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
