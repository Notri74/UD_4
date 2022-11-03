import { Component, OnInit } from '@angular/core';
import { PilotoService } from '../services/piloto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  Pilotos: any = [];

  constructor(private pilotoService: PilotoService, private router: Router) {}

  ngOnInit() {
    this.pilotoService.getPilotos().subscribe((response) => {
      this.Pilotos = response;
    });
  }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnteraaaaaaaaaaaa');
  //   this.pilotoService.getPilotos().subscribe((response) => {
  //     this.Pilotos = response;
  //     console.log('ionViewDidEnteraaaaaaaaaaaakkkkkkkkkkkkkkkkkkkk');
  //   });
  // }

  ionViewWillEnter() {
    this.pilotoService.getPilotos().subscribe((response) => {
      this.Pilotos = response;
    });
  }

  removePiloto(id) {
    if (window.confirm('Está usted seguro')) {
      this.pilotoService.deletePiloto(id).subscribe(() => {
        this.ionViewWillEnter();
        console.log('Piloto deleted!');
      });
    }
  }
  addPiloto() {
    this.router.navigateByUrl('/createfotos');
  }
}
