Phaser.Plugin.PhaserSpine = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);

  game.phaserSpine = this;
}

/**
 * [spine 
 * 
 *   load the Spine assets from specified json url and basePath 
 *   for textures routes and save this in cache with the given key
 * ]
 * @param  {String} key         Key to identify the Spine assets
 * @param  {String} url         The url for spine data JSON
 * @param  {String} basePath    A suffix for textures load route.
 * @return {None}             
 */
Phaser.Loader.prototype.spine = function(key, url, basePath) {
  
  if (basePath === "undefined") { basePath = ""; }

  var atlasKey = key+"Atlas";

  var cacheData = {
    atlas: atlasKey,
    basePath: basePath
  }

  this.json(key, url);
  this.text(atlasKey, url.substr(0, url.lastIndexOf('.')) + '.atlas');

  this.game.cache.addSpine(key, cacheData);
}

Phaser.GameObjectFactory.prototype.spine = function(x, y, key) {

  var spineObject = new PIXI.Spine(game, key);

  spineObject.skeleton.setToSetupPose();
  spineObject.position.x = x;
  spineObject.position.y = y;

  this.game.stage.addChild(spineObject);

  return spineObject;
}

/**
 * [setMixByName wrap to stateData.setMixByName]
 * @param {String} fromName [source animation name]
 * @param {String} toName   [target animation name]
 * @param {Float} duration [Duration in the transition of the animations]
 */
PIXI.Spine.prototype.setMixByName = function(fromName, toName, duration){
  this.stateData.setMixByName(fromName, toName, duration);
}

/**
 * Spine assets dictiornary
 */
Phaser.Cache.prototype._spine = {};

/**
 * [addSpine add Spine assets object data to cache]
 * @param {String} key  [Unique identifier for this Spine assets]
 * @param {Object} data [Object with atlas and basePath attributes]
 */
Phaser.Cache.prototype.addSpine = function(key, data) {
  this._spine[key] = data;
}

/**
 * [getSpine return the Spine assets object data for the given key]
 * @param  {[type]} key [description]
 * @return {Object}     [the Spine assets object data]
 */
Phaser.Cache.prototype.getSpine = function(key) {
  return this._spine[key];
}
