import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsSubject = new Subject<Post[]>();
  // private posts: Post[] = [];
  private posts: Post[] = [
    {
      id: 1,
      title: 'Mon premier post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
      loveIts: 0,
      created_at: new Date(),
    },
    {
      id: 2,
      title: 'Mon deuxième post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
      loveIts: 0,
      created_at: new Date(),
    },
    {
      id: 3,
      title: 'Encore un post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
      loveIts: 0,
      created_at: new Date(),
    },
  ];

  constructor(private httpClient: HttpClient) {}

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
  savePost(post: Post) {
    const savedPost: Observable<Post> = this.httpClient.put<Post>(
      'https://oc-angular-blog-app-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      post
    );
    savedPost.subscribe({
      next: (post) => {
        console.log("Enregistrement d'un nouveau post...", post);
        this.posts.push(post);
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
      },
      error: (error) =>
        console.log('Erreur lors de la demande des posts : ', error),
      complete: () => console.log('Demande des posts terminée!'),
    });
  }
}
