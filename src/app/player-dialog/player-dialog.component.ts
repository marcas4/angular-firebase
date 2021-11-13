import { Component, OnInit } from '@angular/core';
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
  private team!: Team;
  public player!: Player;
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
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFormValue: Player) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key,
    };
    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.player ? this.team.player : []),
        playerFormValueKey
      ]
    }
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.newPlayer(playerFormValue);
    window.location.replace('#');
  }
}
