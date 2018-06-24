import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public submitted = false;
  public successMessage: String;
  public postForm: FormGroup;

  constructor(private _postService: PostService, private router: Router, private route: ActivatedRoute, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  goToPosts() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get f() { return this.postForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
        this.successMessage = '';
        return;
    }
    if(confirm('Are you sure you want to create a new post ?')){
      this.successMessage = "Post successfully created"
      this._postService.createPost(this.postForm.value);
    }
    else {
      return;
    }
    
  }

}
