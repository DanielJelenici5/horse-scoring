import { Component, OnInit } from '@angular/core';

import { FormBuilder, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  createNewGame(){
    console.log("clicked")
    this.router.navigate(['/create-game'])
    console.log("clicked2")
  }

}
