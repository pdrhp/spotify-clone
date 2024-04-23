import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-artistas',
  templateUrl: './card-artistas.component.html',
  styleUrls: ['./card-artistas.component.scss']
})
export class CardArtistasComponent implements OnInit {


  @Input()
  urlImagemArtista = 'https://i.scdn.co/image/ab6761610000f17867bc48f32d1cc16497865361';

  @Input()
  nomeArtista = 'Charlie Brown Junior';

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }


}
