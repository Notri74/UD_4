import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PilotoService } from '../services/piloto.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-createfotos',
  templateUrl: './createfotos.page.html',
  styleUrls: ['./createfotos.page.scss'],
})
export class CreatefotosPage implements OnInit {
  pilotoForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private pilotoService: PilotoService,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.pilotoForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = '';
  }
  ngOnInit() {
    this.pilotoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      escuderia: ['', [Validators.required]],
      numero: ['', [Validators.required]],
    });
  }
  get errorControl() {
    return this.pilotoForm.controls;
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

  async submitForm() {
    this.isSubmitted = true;
    if (!this.pilotoForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.pilotoService
        .createPiloto(this.pilotoForm.value, blob)
        .subscribe((data) => {
          // window.alert('foto Enviada');
          console.log('Photo sent!');
          this.goTolist();
          // this.router.navigateByUrl('http://localhost:8100/tabs/tab3');
        });
    }
  }

  goTolist() {
    this.router.navigateByUrl('/tabs/tab3');
  }
}
