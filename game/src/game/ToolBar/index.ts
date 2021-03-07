import { player } from '@/game/Models/Player'

let text: any = {}

export default {
  create: function(this: Phaser.Scene) {
    text = this.add.text(
      this.cameras.main.scrollX,
      this.cameras.main.scrollY,
      'Health: 0'
    );
  },
  update: function(this: Phaser.Scene) {
    if (player) {
      text.destroy()
      text = this.add.text(
        this.cameras.main.scrollX,
        this.cameras.main.scrollY,
        `Health: ${player.info.health}`
      );
    }
  },
}