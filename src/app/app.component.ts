import { Component } from '@angular/core';
import { Post } from './post-list-item/post-list-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Bienvenue sur mon blog réalisé avec Angular';

  posts: Post[] = [
    {
      title: 'Mon premier post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
      loveIts: 0,
      created_at: new Date(),
    },
    {
      title: 'Mon deuxième post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
      loveIts: 0,
      created_at: new Date(),
    },
    {
      title: 'Encore un post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit lacus, dignissim eu nulla vitae, sagittis hendrerit magna. Nam interdum leo maximus felis auctor, sit amet feugiat lorem sagittis. Duis eleifend metus id ex convallis rhoncus. Curabitur pulvinar rutrum velit id feugiat. ',
      loveIts: 0,
      created_at: new Date(),
    },
  ];
}
