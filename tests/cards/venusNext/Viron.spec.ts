import { expect } from "chai";
import { Viron } from "../../../src/cards/venusNext/Viron";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";
import { Game } from "../../../src/Game";
import { SelectCard } from "../../../src/inputs/SelectCard";
import { RestrictedArea } from '../../../src/cards/RestrictedArea';

describe("Viron", function () {
    it("Should act", function () {
        const card = new Viron();
        const player = new Player("test", Color.BLUE, false);
        const player2 = new Player("test2", Color.RED, false);
        const game = new Game("foobar", [player,player2], player);
        const action = card.play();
        expect(action).to.eq(undefined);
        player.corporationCard = card;
        player.playedCards.push(new RestrictedArea());
        player.setActionsThisGeneration(new RestrictedArea().name);
        expect(card.canAct(player,game)).to.eq(false);
        player.megaCredits += 2;
        expect(card.canAct(player,game)).to.eq(true);
        const action2 = card.action(player, game);
        expect(action2).not.to.eq(undefined);
        expect(action2 instanceof SelectCard).to.eq(true);
    });
});