Phaser.Plugin.PhaserSpine = function(game, parent) {
  Phaser.Plugin.call(this, game, parent);

  game.phaserSpine = this;

  this._load()
}

Phaser.Plugin.PhaserSpine.prototype._load = function() {
  Phaser.Loader.prototype.spine = function(key, url, pages) {

    if(pages === "undefined") throw "Spine image pages cant be null";

    this.json(key, url);

    this.onFileComplete.add(function onLoadedJSON(progress, cacheKey) {

      if (cacheKey != key){
        return;
      }

      var spineData = this.game.cache.getJSON(cacheKey);
      var atlasKey = key+"Atlas";

      this.text(atlasKey, url.substr(0, url.lastIndexOf('.')) + '.atlas');

      this.onFileComplete.add(function onLoadedAtlas(progress, cacheKey) {
        if (cacheKey != atlasKey) {
          return;
        }

        var loader = this;

        function loadNextPage() {
          var page = pages[0];
          pages = pages.splice(0, 1);

          loader.image(page, page);
          loader.onFileComplete.add(function onLoadImage(progress, cacheKey) {
            if (page != cacheKey) return;

            loader.onFileComplete.remove(onLoadImage);

            if (pages.length > 0) {
              loadNextPage();
            }
          });
        }

        loadNextPage();

        this.onFileComplete.remove(onLoadedAtlas);
      }, this);

      this.onFileComplete.remove(onLoadedJSON);

    }, this);
}
}