import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PilotoService } from './../services/piloto.service';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  updatePilotoFg: FormGroup;
  id: any;
  capturedPhoto: string = '';
  isSubmitted: boolean = false;

  constructor(
    private pilotoService: PilotoService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchPiloto(this.id);
    this.updatePilotoFg = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      escuderia: [''],
      numero: [''],
    });
  }

  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  fetchPiloto(id) {
    this.pilotoService.getPiloto(id).subscribe((data) => {
      this.updatePilotoFg.setValue({
        nombre: data['nombre'],
        apellido: data['apellido'],
        escuderia: data['escuderia'],
        numero: data['numero'],
      });
    });
  }

  onSubmit() {
    if (!this.updatePilotoFg.valid) {
      return false;
    } else {
      this.pilotoService
        .updatePiloto(this.id, this.updatePilotoFg.value)
        .subscribe(() => {
          this.updatePilotoFg.reset();
          this.router.navigateByUrl('/tabs/tab3');
        });
    }

    // this.isSubmitted = true;
    // if (!this.updatePilotoFg.valid) {
    //   console.log('Please provide all the required values!');
    //   return false;
    // } else {
    //   let blob = null;
    //   if (this.capturedPhoto != '') {
    //     const response = await fetch(this.capturedPhoto);
    //     blob = await response.blob();
    //   }

    //   this.pilotoService
    //     .updatePiloto(this.updatePilotoFg.value, blob)
    //     .subscribe((data) => {
    //       // window.alert('foto Enviada');
    //       console.log('Photo sent!');

    //       this.router.navigateByUrl('http://localhost:8100/tabs/tab3');
    //     });
    // }
  }
}

//   constructor() { }

//   ngOnInit() {
//   }

// }
