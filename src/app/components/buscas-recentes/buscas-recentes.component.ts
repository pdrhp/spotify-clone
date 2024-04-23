import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {

  pesquisasRecentes = ['Top Brasil', 'Top Global', 'Porra sei la', 'alguma coisa', 'pagode'];

  campoPesquisa = '';

  constructor(private spotifyService : SpotifyService) { }

  ngOnInit(): void {
  }


  definirPesquisa(pesquisa: string){
    this.campoPesquisa = pesquisa;
  }

  async buscar(){
    const resultadoMusicas = await this.spotifyService.PesquisarMusicas(this.campoPesquisa);
    const resultadoArtisitas = await this.spotifyService.PesquisarArtistas(this.campoPesquisa);

    console.log(resultadoMusicas);
    console.log(resultadoArtisitas);
    console.log("teste");
  }

}
