import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country, Player, SquadNumber } from '../interfaces/player';
import { Team } from '../interfaces/team';

import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

declare type CategoryType = keyof typeof Country;
@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  @Input()
  player!: Player;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team!: Team;
  public countries = Object.keys(Country).map((key) => ({
    label: key,
    key: Country[key as CategoryType],
  }));
  
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key: any) => ({
      label: key,
      key: SquadNumber[key],
    }));

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeam()
      .pipe(take(1))
      .subscribe((team) => {
        if (team.length > 0) {
          this.team = team[0];
        }
      });
  }

  private newPlayer(playerFormValue: Player) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key
    };
    const formattedTeam = {
      ...this.team,
      players: [...(this.team.player ? this.team.player : []), playerFormValueKey]
    };
    this.teamService.editTeam(formattedTeam);
  }

  private editPlayer(playerFormValue: Player) {
    const playerFormValueWithKey = { ...playerFormValue, $key: this.player.$key };
    const playerFormValueWithFormattedKey = { ...playerFormValue, key: this.player.$key };
    delete playerFormValueWithFormattedKey.$key;
    const moddifiedPlayers = this.team.player
      ? this.team.player.map(player => {
          return player.$key === this.player.$key ? playerFormValueWithFormattedKey : player 
      }) : this.team.player;
    const formattedTeam = {
      ...this.team,
      players: [...(moddifiedPlayers ? moddifiedPlayers : [playerFormValueWithFormattedKey])]
    };
    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = {...playerForm.value};
    if (playerForm.valid) {
      playerFormValue.leftFooted = playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    if(this.player) {
      this.editPlayer(playerFormValue);
    }else {
      this.newPlayer(playerFormValue);
    }
    window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }

}