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
Phaser.Loader.prototype.spine = function(key, url, basePath) {
  
  if (basePath === "undefined") { basePath = ""; }

  var atlasKey = key+"Atlas";

  var cacheData = {
    key: key,
    atlas: atlasKey,
    basePath: basePath
  }

  this.json(key, url);
  this.text(atlasKey, url.substr(0, url.lastIndexOf('.')) + '.atlas');

  this.game.cache.addSpine(key, cacheData);
}

/**
 * Spine assets and get/set methods for the cache.
 */

Phaser.Cache.prototype._spine = {};

Phaser.Cache.prototype.addSpine = function(key, data) {
  this._spine[key] = data;
}

Phaser.Cache.prototype.getSpine = function(key) {
  return this._spine[key];
}
