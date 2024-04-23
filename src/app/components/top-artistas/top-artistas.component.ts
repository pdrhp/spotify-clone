import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

 Artistas : IArtista[] = [];

  constructor(private spotifyService : SpotifyService, private router : Router) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.Artistas = await this.spotifyService.buscarTopArtistas(5);
  }

  irParaPaginaArtista(idArtista : string){
    this.router.navigate([`player/lista/artista/${idArtista}`])
  }

}
