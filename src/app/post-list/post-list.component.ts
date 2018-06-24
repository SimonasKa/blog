import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts = [];
  public postKeys = [];
  public selectedId: number;
  public currentPage = 1;
  public postsPrePage = 5;
  public postsPrePageArray = [5, 10, 15];
  public pageCount = [];

  constructor(private _postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id; 
    });
    this.posts = this._postService.getPosts(this.postsPrePage, this.currentPage);
    this.postKeys  = Object.keys(this.posts[0]);
    this.pageCount = this._postService.getPageCount(this.postsPrePage);
  }

  goToDetailedPost(id) {
    this.router.navigate(['detail/',id], {relativeTo: this.route});
  }
  
  goToUpdatePost(id) {
    this.router.navigate(['update/',id], {relativeTo: this.route});
  }

  deletePost(id) {
    if(confirm('Are you sure you want to delete this post ?')) {
      this._postService.deletePost(id);
      location.reload();
    }else {
      return;
    }
  }

  goToCreatePost() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  setSampleData() {
    this._postService.setSampleData();
  }

  goToPage(page){
    this.currentPage = page;
    this.posts = this._postService.getPosts(this.postsPrePage, this.currentPage);
  }

  goToPostsPrePage(value){
    this.currentPage = 1;
    this.postsPrePage = value;
    this.pageCount = this._postService.getPageCount(this.postsPrePage);
    this.posts = this._postService.getPosts(this.postsPrePage, this.currentPage);
  }

}
