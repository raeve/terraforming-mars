import { CardName } from "../../CardName";
import { Game } from "../../Game";
import { Player } from "../../Player";
import { CardType } from "../CardType";
import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { SelectSpace } from "../../inputs/SelectSpace";
import { ISpace } from "../../ISpace";
import { TileType } from "../../TileType";

export class DesperateMeasures implements IProjectCard {
    public cost: number = 1;
    public tags: Array<Tags> = [Tags.EVENT];
    public cardType: CardType = CardType.EVENT;
    public name: CardName = CardName.DESPERATE_MEASURES;

    private getHazardTiles(game: Game) {
      return game.board.spaces.filter(space => space.tile?.hazard === true);
    }

    public canPlay(_player: Player, game: Game): boolean {
      // You can't play desperate measures if there isn't a hazard marker in play.
      return this.getHazardTiles(game).length > 0;
    }

    public play(player: Player, game: Game) {
      return new SelectSpace("Select a hazard space to own", this.getHazardTiles(game), (space: ISpace) => {
        space.player = player;
        var tileType = space.tile!.tileType;
        if (TileType.DUST_STORM_MILD  === tileType || TileType.DUST_STORM_SEVERE === tileType) {
          game.increaseOxygenLevel(player, 1);
        } else {
          // is an erosion tile when the expression above is false.
          game.increaseTemperature(player, 1);
        }
        return undefined;
    });
    }

    public getVictoryPoints() {
      return -2;
    }
}
