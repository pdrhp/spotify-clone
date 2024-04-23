import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();

  subs : Subscription[] = [];

  // ICones
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  PlayPauseIcone : IconDefinition[] = [faPlay, faPause];
  resumeIcon = this.PlayPauseIcone[0];

  constructor(private playerService : PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaTocando(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;

    });

    this.subs.push(sub);
  }

  voltarMusica(){
    this.playerService.voltarMusica();
  }

  proximaMusica(){
    this.playerService.proximaMusica();
  }

  async PausePlayMusica(){
    if(this.resumeIcon === this.PlayPauseIcone[0]){
      await this.playerService.PausaMusica();
      this.resumeIcon = this.PlayPauseIcone[1];
    }else{
      await this.playerService.playMusica();
      this.resumeIcon = this.PlayPauseIcone[0];
    }
  }

}
