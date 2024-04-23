import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {

  sairIcone = faSignOut;
  usuario: IUsuario = null;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.usuario = this.spotifyService.usuario;
  }

  logout(){
    this.spotifyService.logout();
  }



}
