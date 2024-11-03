import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css']
})
export class StoragesComponent implements OnInit {
  parejasEliminadas: any[] = [];
  canchasEliminadas: any[] = [];

  ngOnInit() {
    this.loadEliminadas();
  }

  loadEliminadas() {
    this.parejasEliminadas = JSON.parse(localStorage.getItem('parejasAlmacenadas') || '[]');
    this.canchasEliminadas = JSON.parse(localStorage.getItem('canchasEliminadas') || '[]');
  }
}
