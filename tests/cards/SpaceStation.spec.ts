
import { expect } from "chai";
import { SpaceStation } from "../../src/cards/SpaceStation";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Bushes } from "../../src/cards/Bushes";

describe("SpaceStation", function () {
    it("Should play", function () {
        const card = new SpaceStation();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        expect(player.victoryPoints).to.eq(1);
        expect(player.cardDiscounts.length).to.eq(1);
        expect(player.cardDiscounts[0](card)).to.eq(2);
        expect(player.cardDiscounts[0](new Bushes())).to.eq(0);
    });
});