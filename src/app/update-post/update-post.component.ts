import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  public postForm: FormGroup;
  public selectedId: number;
  public submitted = false;
  public successMessage: String;

  constructor(private _postService: PostService, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id; 
    });
    let post = this._postService.getPost(this.selectedId-1);
    this.postForm = this.formBuilder.group({
      author: [post.author, Validators.required],
      title: [post.title, Validators.required],
      content: [post.content, Validators.required]
    });
   
  }
  goToPosts() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
  
  get f() { return this.postForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
        this.successMessage = '';
        return;
    }
    console.log(this.selectedId);
    if(confirm('Are you sure you want to update the post ?')){
      this.successMessage = "Post successfully update"
      this._postService.updatePost(this.postForm.value, this.selectedId-1);
    }
    else {
      return;
    }
    
  }
}
