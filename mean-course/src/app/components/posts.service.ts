import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

// for that, we need the angular router, right now we got our posts area with the post create in the post list component


  constructor (private http:HttpClient, private router: Router) {  }

  getPosts() { //this post is sent from the server side to the client side
    // return [...this.posts];
    this.http.get<{message: string; posts: any}>
    ("http://localhost:3000/api/posts")
    //pipe is a method that accepts multiple ooperators
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // we play something before subscribe but still chained to that obervable chain and that something is the pip method
  // pipe simply allows us to add in such an operator and we can actually pipe multiple operators


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    // return {...this.posts.find(p => p.id == id)};
    return this.http.get<{_id: string; title: string; content: string }>
      ("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http
      .post<{message: string, postId: string}>("http://localhost:3000/api/posts",post)
      .subscribe(responseData => {
        //console.log(responseData.message);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        // this will execute asynchronously once we got a successful response because this first argument is only called for a successful response
        this.router.navigate(["/"]);

      });

  }

  updatePost(id: string, title:string, content: string){
    const post:Post = {id: id, title: title, content: content};
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatePosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatePosts;
        this.postsUpdated.next([...this.posts]);
        // filter allows us to only return a subset of that posts array and we pass an argument, a function to the filter
        // this function will be executed for every post in the array and if it returns true, then this element will be kept,
        // if it returns false, then this element will not be part of the new filtered post array
      });
  }
}
