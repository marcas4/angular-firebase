import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-payer-table',
  templateUrl: './payer-table.component.html',
  styleUrls: ['./payer-table.component.scss'],
})
export class PayerTableComponent implements OnInit {
  public players$!: Observable<Player[]>;
  public selectedPlayer!: Player;
  public showModal = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {
    let playervacio: Player = {
    name: "",
    lastName: "",
    position: 0,
    weight: 0,
    height: 0,
    nationality: "",
    leftFooter: false
    }
    this.showModal = true;
    this.selectedPlayer = playervacio;
    setTimeout(() => {
      window.location.replace('#open');
    }, 0);
  }
}
