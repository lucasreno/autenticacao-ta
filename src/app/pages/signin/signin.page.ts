import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toast: ToastController
  ) { }

  ngOnInit() {
  }

  registrar(email, password){
    if(email.value && password.value){
      this.authService.RegisterUser(email.value, password.value).then(() => {
        this.mensagem("Cadastro realizado com sucesso");
        this.router.navigate(['login']);
      }).catch(() => {
        this.mensagem("Houve um erro durante o cadastro", true);
      });
    }
  }


  async mensagem(mensagem, erro = false) {
    const toast = await this.toast.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
      color: erro?'danger':'success'
    });

    await toast.present();
  }
}
