

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import {CommentService} from '../Services/comment.service';
import {Shelter} from '../class/Shelter';
import {AnimalService} from '../Services/animal.service';
import {NotificationService} from '../Services/notification.service';
import {Animal} from '../class/Animal';
import {Commente} from '../class/Comment';
import {AuthService} from '../Services/auth.service';
import {User1} from "../class/User1";
import {PopupadoptsureComponent} from "../popupadoptsure/popupadoptsure.component";
import {PopupadoptComponent} from "../popupadopt/popupadopt.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  commente: Commente = new Commente();
  public commentes: Commente[] = [];
  ownersid: number[];
  show = false;
  show2 = true;


  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private ns: NotificationService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.minLength(1), Validators.required]],
      allatid: [null],
      ownerid: [null],
      date: [null]

    });
  }

  public commentForm: FormGroup;

  addComment(form: FormGroup) {


    if (form.valid) {

      form.value.ownerid = parseInt(localStorage.getItem('ownerID'));
      form.value.allatid = parseInt(localStorage.getItem('animalid'));
      form.value.date = Date.now();
      console.log(form.value);
      // console.log(typeof form.value.date);
      this.commentService.addComment(form.value);

      this.commentForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
    location.reload();

  }


  ngOnInit() {

    this.commentService.getComments(parseInt(localStorage.getItem('animalid'))).subscribe((res: Commente[]) => {
      this.commentes = res;
      for (let i = 0; i < res.length; i++) {
        //this.ownersid.push(res[i].ownerid);
        this.authService.getOwnerbyid(res[i].ownerid).subscribe((res4: User1) => {
          this.commentes[i].username = res4.username;

        });
      }




    });
    this.authService.getOwnerbyid;

  }

  Commentiras(){
    if (this.authService.isLogin$.value)
    {

      this.show=!this.show;
      this.show2!=this.show2;
    }
    else{this.dialog.open(PopupadoptComponent); }
  }











  /*
  private projectId: string;

  commentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onCommentCancel() {
    this.commentForm.reset();
  }

  onSubmit() {
    const content = {
      name: this.commentForm.value.name,
      email: this.commentForm.value.email,
      message: this.commentForm.value.message,
      project: this.projectId,
      postDate: Date.now()
    };
    this.commentService.addComment(content);
  }

   */
}
