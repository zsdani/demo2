

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
import {User1} from '../class/User1';
import {PopupadoptsureComponent} from '../popupadoptsure/popupadoptsure.component';
import {PopupadoptComponent} from '../popupadopt/popupadopt.component';
import {MatDialog} from '@angular/material/dialog';
import {OwnerShelter} from '../class/OwnerShelter';
import {ShelterService} from '../Services/shelter.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  commente: Commente = new Commente();
  animal: Animal = new Animal();
  public commentes: Commente[] = [];
  ownersid: number[];
  adminanimals: Animal[] = [];
  adminanimalsid: number[] = [];
  show = false;
  show2 = true;
  user: User1 = new User1();
  show3: boolean;
  thenumber: number;


  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private shelterService: ShelterService,
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

    this.commentFormchange = this.formBuilder.group({
      comment: [null, [Validators.minLength(1), Validators.required]],
      allatid: [null],
      ownerid: [null],
      date: [null]

    });
  }

  public commentForm: FormGroup;
  public commentFormchange: FormGroup;

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
        // this.ownersid.push(res[i].ownerid);
        this.authService.getOwnerbyid(res[i].ownerid).subscribe((res4: User1) => {
          this.commentes[i].username = res4.username;



        });
      }




    });
    this.authService.getOwnerbyid(parseInt(localStorage.getItem('ownerID'))).subscribe((res3: User1 ) => {
      this.user = res3;
    });

    if (localStorage.getItem('ownerRole') === 'ADMIN'){
        this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
        console.log('menhelyid:');
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.animalService.getanimalsbyshelterid(res[i].shelterid).subscribe((res1: Animal[]) => {


            for (let j = 0; j < res1.length; j++) {
              this.adminanimals.push(res1[j]);
            }
            console.log('_______________________');
            console.log(res1);

            });

        }
      });

    }

  }

  Commentiras(){
    if (this.authService.isLogin$.value)
    {

      this.show = !this.show;
      this.show2 != this.show2;
    }
    else{this.dialog.open(PopupadoptComponent); }
  }

  delete(id: number){
    this.commentService.deleteComment(id);
    location.reload();
  }

  wantedit(id: number){
    this.show3 = true;
    this.thenumber = id;

    this.commentService.getComment(id).subscribe((res: Commente) => {
      this.commentFormchange = this.formBuilder.group({
        comment: [res.comment, [Validators.minLength(1), Validators.required]],
        allatid: [res.allatid],
        ownerid: [res.ownerid],
        date: [null]

      });


      });

  }

  changeComment( form: FormGroup){
    console.log(form.value);
    if (form.valid) {
      console.log(form.value);
      //this.shelterService.updateShelter(this.shelterid, form.value as Shelter);
      this.commentService.updateComment(this.thenumber, form.value as Commente);

      this.commentFormchange.reset();

    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
    location.reload();



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
