// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create',
//   templateUrl: './create.page.html',
//   styleUrls: ['./create.page.scss'],
// })
// export class CreatePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PilotoService } from './../services/piloto.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  userForm: FormGroup;
  pilotoForm: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private pilotoService: PilotoService
  ) {
    this.pilotoForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      escuderia: [''],
      numero: [''],
    });
  }

  ngOnInit() {}

  // onSubmit() {
  //   if (!this.pilotoForm.valid) {
  //     return false;
  //   } else {
  //     this.pilotoService
  //       .createPiloto(this.pilotoForm.value)
  //       .subscribe((response) => {
  //         this.zone.run(() => {
  //           this.pilotoForm.reset();
  //           this.router.navigate(['/tabs/tab3']);
  //         });
  //       });
  //   }
  // }
}
