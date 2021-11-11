import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-payer-table',
  templateUrl: './payer-table.component.html',
  styleUrls: ['./payer-table.component.scss']
})
export class PayerTableComponent implements OnInit {
  public players$!: Observable<Player[]>;
  public selectedPlayer!: Player;

  constructor(private playerService: PlayerService ) { }

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers();
  }

}
