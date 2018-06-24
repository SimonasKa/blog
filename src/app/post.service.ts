import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public postsCount: number;
  constructor() { 
  }

  getPosts(postsPrePage, currentPage) {
    let postSliceStart = (currentPage-1) * postsPrePage;
    let postSliceEnd = postSliceStart + postsPrePage;
    let posts = JSON.parse(localStorage.getItem('posts')).posts;
    this.postsCount = posts.length;
    
    return posts.slice(postSliceStart, postSliceEnd);
  }

  getPost(id){
    return  JSON.parse(localStorage.getItem('posts')).posts[id];
  }

  getPageCount(postsPrePage){
    let pagesCount = Math.ceil(this.postsCount/postsPrePage);
    let pagesCountArray = [];
    for (var i = 1; i <= pagesCount; i++) {
      pagesCountArray.push(i);
    }
    return pagesCountArray;
  }

  setSampleData(){
    // var json = require('../assets/data.json');
    // localStorage.setItem('posts', JSON.stringify(json));
  }

  createPost(post) {
    post.date = new Date();
    let posts = JSON.parse(localStorage.getItem('posts')).posts.push(post);;
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  updatePost(post, id) {
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts.posts[id].author = post.author;
    posts.posts[id].title = post.title;
    posts.posts[id].content = post.content;
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  deletePost(id) {
    console.log(id);
    let posts = JSON.parse(localStorage.getItem('posts'));
    let tempPosts = posts;
    posts.posts.splice(-1,1);
    delete tempPosts.posts[id];
    let i = 0;
    for (let post of tempPosts.posts) {
      if(post){
        posts.posts[i] = post;
        i++;
      }
    }
    this.postsCount = posts.posts.length;
    localStorage.setItem('posts', JSON.stringify(posts));
  }


}
