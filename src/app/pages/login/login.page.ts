import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toast: ToastController
  ) { }

  ngOnInit() {
  }

  async mensagemErro(mensagem){
    const toast = await this.toast.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }

  login(email, password){
    if(email && password){
      this.authService.SignIn(email.value, password.value)
        .then((res) => {
          this.router.navigate(['home']);
        }).catch((error) => {
          let mensagem = error.code;
          if(error.code == 'auth/invalid-email')
            mensagem = 'Email inválido';
          else if(error.code == 'auth/user-not-found')
            mensagem = 'Usuário não encontrado';
          else if(error.code == 'auth/wrong-password')
            mensagem = 'Senha incorreta';
          this.mensagemErro(mensagem);
        })
    }
  }
}
