import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {

  artistas : IArtista[] = [];

  constructor(private spotifyService: SpotifyService, private router : Router) { }

  ngOnInit(): void {
    this.buscarArtistas();
  }

  async buscarArtistas(){
     this.artistas = await this.spotifyService.buscarTopArtistas();
     console.log(this.artistas);
  }


  irParaPaginaArtista(idArtista : string){
    this.router.navigate([`player/lista/artista/${idArtista}`])
  }


}
