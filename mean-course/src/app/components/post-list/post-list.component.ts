import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import {PageEvent} from "@angular/material/paginator";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from '../auth.service';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0; //一开始设置初始值是0，后面在程序中修改
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  constructor(public postsService: PostsService, private authService: AuthService ) {}

  ngOnInit() { // it only runs after we authenticate ourself
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, 1);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => { // related to the posts.service
        // angular中用subscirbe和observable实现订阅，从而实现异步
        this.isLoading = false;
        // this.posts = posts;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    //subscribte takes three arguments, the first one is a function which gets executed
    // whenever new data is emitted, the second argument will be called whenever an error is emitted
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;

      });

  }


  onChangedPage(pageData: PageEvent){
    //console.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    // 这样可以分页显示，可以显示第一页，翻页也可以找到第二页

  }
  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() =>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
