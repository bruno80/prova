import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contato-modal',
  templateUrl: './contato-modal.page.html',
  styleUrls: ['./contato-modal.page.scss'],
})
export class ContatoModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  novo_contato = {
    "nome":"",
    "url":"",
    "id":""
  }
  
  add() {
    this.modalController.dismiss(this.novo_contato)
  }
}
