import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = "Newsbook • Application d'édition et de partage d'articles";

  constructor() {}

  ngOnInit(): void {}
}
