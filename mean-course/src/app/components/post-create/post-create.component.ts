import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId : string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true; // when we start loading, we set it to true
        // this.post = this.postsService.getPost(this.postId);
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false; // when it's done, we set it to false
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      }
      else{
        this.mode = 'create';
        this.postId = null;
      }
    });
    //only the id in the url would change and the component is the same
    // the data we display on that component would need to change too
  }
  onSavePost(form: NgForm) { // it's more about saving, not just about adding
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsService.addPost(form.value.title, form.value.content);

    }
    else{
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    //this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm(); // 每次写完一组数字，然后就直接重置了
  }
}
