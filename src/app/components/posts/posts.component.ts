import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  title = 'Bienvenue sur mon blog réalisé avec Angular';

  constructor() {}

  ngOnInit(): void {}
}
