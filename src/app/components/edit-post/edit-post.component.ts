import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DraftPost } from './../../model/post';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log('form, form.value : ', form, form.value);
    const { title, content } = form.value as DraftPost;
    this.postService.savePost({ title, content });
    this.router.navigateByUrl('/posts');
  }
}
