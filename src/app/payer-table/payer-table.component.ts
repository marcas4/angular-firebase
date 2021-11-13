import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-payer-table',
  templateUrl: './payer-table.component.html',
  styleUrls: ['./payer-table.component.scss'],
})
export class PayerTableComponent implements OnInit {
  public players$!: Observable<Player[]>;
  public selectedPlayer!: Player;
  public showModal = false;

  constructor(private playerService: PlayerService, private teamService: TeamService) {}

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
    leftFooted: false
    }
    this.showModal = true;
    this.selectedPlayer = playervacio;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player};
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  deletePlayer(player: Player) {
    this.teamService
      .getTeam()
      .pipe(take(1))
      .subscribe(teams => {
        const moddifiedPlayers = teams[0].player ? teams[0].player.filter((p: any) => p.key !== player.$key) : teams[0].player;
        const formattedTeam = {
          ...teams[0],
          players: [...moddifiedPlayers]
        };
        this.playerService.deletePlayer(player.$key);
        this.teamService.editTeam(formattedTeam);
      });
  }

  closeDialog() {
    this.showModal = false;
  }
} 
