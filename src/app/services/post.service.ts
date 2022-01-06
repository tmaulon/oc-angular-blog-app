import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../model/post';
import { DraftPost } from './../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsSubject = new Subject<Post[]>();
  private posts: Post[] = [];
  // private posts: Post[] = [
  //   {
  //     id: 1,
  //     title: 'Mon premier post',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
  //     loveIts: 0,
  //     created_at: new Date(),
  //   },
  //   {
  //     id: 2,
  //     title: 'Mon deuxième post',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
  //     loveIts: 0,
  //     created_at: new Date(),
  //   },
  //   {
  //     id: 3,
  //     title: 'Encore un post',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
  //     loveIts: 0,
  //     created_at: new Date(),
  //   },
  // ];

  constructor(private httpClient: HttpClient) {
    this.getAllPosts();
  }

  emitPostSubject() {
    this.postsSubject.next([...this.posts]);
  }

  saveAllPosts() {
    const savedPosts: Observable<Post[]> = this.httpClient.put<Post[]>(
      'https://oc-angular-blog-app-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      this.posts
    );
    savedPosts.subscribe({
      next: (posts) => {
        console.log('Enregistrement de tout les posts...', posts);
        this.posts.concat(posts);
      },
      error: (error) =>
        console.log(
          "Erreur lors de l'enregistrement de tout les posts : ",
          error
        ),
      complete: () => console.log('Enregistrement de tout les posts terminé!'),
    });
  }

  getLastPostId() {
    return this.posts[this.posts.length - 1].id;
  }

  incrementLastPostId() {
    return this.getLastPostId() + 1;
  }

  savePost(post: DraftPost) {
    const newPost: Post = {
      id: 0,
      title: '',
      content: '',
      created_at: new Date(),
      loveIts: 0,
    };
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.id = this.incrementLastPostId();
    const savedPost: Observable<Post> = this.httpClient.put<Post>(
      'https://oc-angular-blog-app-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      newPost
    );
    savedPost.subscribe({
      next: (post) => {
        console.log("Enregistrement d'un nouveau post...", post);
        this.posts.push(newPost);
        this.emitPostSubject();
      },
      error: (error) =>
        console.log(
          "Erreur lors de l'enregistrement d'un nouveau post : ",
          error
        ),
      complete: () => console.log("Enregistrement d'un nouveau post terminé!"),
    });
  }

  getAllPosts() {
    const posts: Observable<Post[]> = this.httpClient.get<Post[]>(
      'https://oc-angular-blog-app-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    );
    posts.subscribe({
      next: (postsResponse) => {
        console.log('Demande des posts en cours...', postsResponse);
        this.posts = postsResponse;
        this.emitPostSubject();
      },
      error: (error) =>
        console.log('Erreur lors de la demande des posts : ', error),
      complete: () => console.log('Demande des posts terminée!'),
    });
  }

  getPostById(postId: number): Post {
    const post = this.posts.find((post) => post.id === postId);
    if (!post) {
      throw new Error('Post non trouvé');
    }
    return post;
  }

  getPost(id: number): Post {
    return this.getPostById(id);
  }

  removePost(postToRemove: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (post) => post === postToRemove
    );
    if (postIndexToRemove < 0) {
      throw new Error('Index du post non trouvé!');
    }
    this.posts.splice(postIndexToRemove, 1);
    this.saveAllPosts();
    this.emitPostSubject();
  }
}
