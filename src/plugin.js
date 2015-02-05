Phaser.Plugin.PhaserSpine = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);

  game.phaserSpine = this;
}

/**
 * [spine description]
 * @param  {string} key       Key to identify the Spine assets
 * @param  {string} url       The url for spine data JSON
 * @return {None}             
 */
Phaser.Loader.prototype.spine = function(key, url) {

  var atlasKey = key+"Atlas";

  this.json(key, url);
  this.text(atlasKey, url.substr(0, url.lastIndexOf('.')) + '.atlas');
}