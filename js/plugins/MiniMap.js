/*:
 * @plugindesc Optimized Camera Mini Map for RPG Maker MV - Auto Fit + V Marker
 * @author ChatGPT
 *
 * @help
 * Mini map ini menampilkan area yang sedang terlihat di layar,
 * bukan full map.
 *
 * Fitur:
 * - Posisi kiri atas
 * - Ukuran minimap menyesuaikan rasio layar (jadi tidak ada sisa area)
 * - Lebih ringan karena pakai cache
 * - Tekan M untuk show/hide
 * - Event dengan note <minimap> akan muncul di minimap
 * - Player marker pakai chevron / panah bentuk V yang ikut arah hadap
 *
 * Cara pakai event marker:
 * Tulis <minimap> di Note event.
 */

(function () {
    "use strict";

    var MiniMap = {};
    MiniMap.baseHeight = 120;      // tinggi area isi minimap
    MiniMap.padding = 6;           // jarak isi ke border
    MiniMap.marginX = 14;          // posisi kiri
    MiniMap.marginY = 14;          // posisi atas
    MiniMap.visible = true;
    MiniMap.updateInterval = 6;    // makin besar makin ringan
    MiniMap.borderSize = 3;

    function Sprite_MiniMap() {
        this.initialize.apply(this, arguments);
    }

    Sprite_MiniMap.prototype = Object.create(Sprite.prototype);
    Sprite_MiniMap.prototype.constructor = Sprite_MiniMap;

    Sprite_MiniMap.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);

        this._outerWidth = 0;
        this._outerHeight = 0;
        this._innerWidth = 0;
        this._innerHeight = 0;

        this._lastMapId = 0;
        this._lastDisplayX = -9999;
        this._lastDisplayY = -9999;
        this._lastGraphicsW = 0;
        this._lastGraphicsH = 0;
        this._frameCount = 0;

        this._tilesetBitmaps = [];
        this._tilemapHelper = null;
        this._tempTileBitmap = null;
        this._mapBitmap = null;

        this.refreshLayout();
        this.loadTileset();
    };

    Sprite_MiniMap.prototype.refreshLayout = function () {
        var screenRatio = Graphics.width / Graphics.height;

        this._innerHeight = MiniMap.baseHeight;
        this._innerWidth = Math.round(this._innerHeight * screenRatio);

        this._outerWidth = this._innerWidth + MiniMap.padding * 2;
        this._outerHeight = this._innerHeight + MiniMap.padding * 2;

        this.bitmap = new Bitmap(this._outerWidth, this._outerHeight);
        this._mapBitmap = new Bitmap(this._outerWidth, this._outerHeight);

        this.x = MiniMap.marginX;
        this.y = MiniMap.marginY;

        this._lastGraphicsW = Graphics.width;
        this._lastGraphicsH = Graphics.height;
    };

    Sprite_MiniMap.prototype.getInnerRect = function () {
        return {
            x: MiniMap.padding,
            y: MiniMap.padding,
            w: this._innerWidth,
            h: this._innerHeight
        };
    };

    Sprite_MiniMap.prototype.loadTileset = function () {
        var tileset = $gameMap.tileset();
        this._tilesetBitmaps = [];

        if (tileset && tileset.tilesetNames) {
            for (var i = 0; i < tileset.tilesetNames.length; i++) {
                this._tilesetBitmaps[i] = ImageManager.loadTileset(tileset.tilesetNames[i]);
            }
        }

        this._tilemapHelper = new Tilemap();
        this._tilemapHelper.tileWidth = $gameMap.tileWidth();
        this._tilemapHelper.tileHeight = $gameMap.tileHeight();
        this._tilemapHelper._tileWidth = $gameMap.tileWidth();
        this._tilemapHelper._tileHeight = $gameMap.tileHeight();

        this._tilemapHelper.setData(
            $gameMap.width(),
            $gameMap.height(),
            $dataMap.data
        );

        this._tilemapHelper.flags = $gameMap.tilesetFlags();
        this._tilemapHelper._bitmaps = this._tilesetBitmaps;
        this._tilemapHelper.bitmaps = this._tilesetBitmaps;
        this._tilemapHelper.animationFrame = 0;

        this._tempTileBitmap = new Bitmap(
            $gameMap.tileWidth(),
            $gameMap.tileHeight()
        );

        this._lastDisplayX = -9999;
        this._lastDisplayY = -9999;
    };

    Sprite_MiniMap.prototype.isTilesetReady = function () {
        for (var i = 0; i < this._tilesetBitmaps.length; i++) {
            if (this._tilesetBitmaps[i] && !this._tilesetBitmaps[i].isReady()) {
                return false;
            }
        }
        return true;
    };

    Sprite_MiniMap.prototype.update = function () {
        Sprite.prototype.update.call(this);

        this.visible = MiniMap.visible;
        if (!this.visible) return;

        if (this._lastGraphicsW !== Graphics.width || this._lastGraphicsH !== Graphics.height) {
            this.refreshLayout();
            this.redrawMap();
        }

        if (this._lastMapId !== $gameMap.mapId()) {
            this._lastMapId = $gameMap.mapId();
            this.loadTileset();
            this.redrawMap();
        }

        this._frameCount++;

        if (!this.isTilesetReady()) {
            this.drawLoading();
            return;
        }

        var needRedraw =
            this._frameCount % MiniMap.updateInterval === 0 &&
            (
                Math.abs($gameMap.displayX() - this._lastDisplayX) >= 0.20 ||
                Math.abs($gameMap.displayY() - this._lastDisplayY) >= 0.20
            );

        if (needRedraw) {
            this.redrawMap();
        }

        this.refresh();
    };

    Sprite_MiniMap.prototype.drawLoading = function () {
        var bmp = this.bitmap;
        bmp.clear();
        bmp.fillRect(0, 0, this._outerWidth, this._outerHeight, "rgba(0,0,0,0.65)");
        bmp.drawText("Loading...", 0, 0, this._outerWidth, this._outerHeight, "center");
    };

    Sprite_MiniMap.prototype.redrawMap = function () {
        if (!this.isTilesetReady()) return;

        var bmp = this._mapBitmap;
        var temp = this._tempTileBitmap;
        var rect = this.getInnerRect();

        var tileW = $gameMap.tileWidth();
        var tileH = $gameMap.tileHeight();

        var mapW = $gameMap.width();
        var mapH = $gameMap.height();

        var viewX = $gameMap.displayX();
        var viewY = $gameMap.displayY();

        var screenTileW = Graphics.width / tileW;
        var screenTileH = Graphics.height / tileH;

        var startX = Math.floor(viewX);
        var startY = Math.floor(viewY);
        var endX = Math.ceil(viewX + screenTileW);
        var endY = Math.ceil(viewY + screenTileH);

        bmp.clear();

        // background luar
        bmp.fillRect(0, 0, this._outerWidth, this._outerHeight, "rgba(0,0,0,0.55)");

        // background area map
        bmp.fillRect(rect.x, rect.y, rect.w, rect.h, "rgb(24, 56, 66)");

        for (var my = startY; my < endY; my++) {
            for (var mx = startX; mx < endX; mx++) {
                if (mx < 0 || my < 0 || mx >= mapW || my >= mapH) continue;

                var dx1 = rect.x + Math.floor(((mx - viewX) / screenTileW) * rect.w);
                var dy1 = rect.y + Math.floor(((my - viewY) / screenTileH) * rect.h);
                var dx2 = rect.x + Math.floor((((mx + 1) - viewX) / screenTileW) * rect.w);
                var dy2 = rect.y + Math.floor((((my + 1) - viewY) / screenTileH) * rect.h);

                var dw = Math.max(dx2 - dx1, 1);
                var dh = Math.max(dy2 - dy1, 1);

                for (var z = 0; z < 4; z++) {
                    var tileId = $gameMap.tileId(mx, my, z);
                    if (tileId <= 0) continue;

                    temp.clear();

                    try {
                        this._tilemapHelper.animationFrame = 0;
                        this._tilemapHelper._drawTile(temp, tileId, 0, 0);
                        bmp.blt(temp, 0, 0, tileW, tileH, dx1, dy1, dw, dh);
                    } catch (e) {
                        if (Tilemap.isTileA1 && Tilemap.isTileA1(tileId)) {
                            bmp.fillRect(dx1, dy1, dw, dh, "rgb(40,110,150)");
                        }
                    }
                }
            }
        }

        this._lastDisplayX = viewX;
        this._lastDisplayY = viewY;
    };

    Sprite_MiniMap.prototype.refresh = function () {
        var bmp = this.bitmap;
        var rect = this.getInnerRect();
        var bs = MiniMap.borderSize;

        bmp.clear();

        // gambar cache map
        bmp.blt(this._mapBitmap, 0, 0, this._outerWidth, this._outerHeight, 0, 0, this._outerWidth, this._outerHeight);

        // border luar
        bmp.fillRect(0, 0, this._outerWidth, bs, "white");
        bmp.fillRect(0, this._outerHeight - bs, this._outerWidth, bs, "white");
        bmp.fillRect(0, 0, bs, this._outerHeight, "white");
        bmp.fillRect(this._outerWidth - bs, 0, bs, this._outerHeight, "white");

        // border area dalam
        bmp.fillRect(rect.x, rect.y, rect.w, 1, "rgba(255,255,255,0.80)");
        bmp.fillRect(rect.x, rect.y + rect.h - 1, rect.w, 1, "rgba(255,255,255,0.80)");
        bmp.fillRect(rect.x, rect.y, 1, rect.h, "rgba(255,255,255,0.80)");
        bmp.fillRect(rect.x + rect.w - 1, rect.y, 1, rect.h, "rgba(255,255,255,0.80)");

        this.drawEventMarkers(rect);
        this.drawPlayerMarker(rect);
    };

    Sprite_MiniMap.prototype.getCharacterMiniMapPos = function (character, rect) {
        if (!character) return null;

        var tileW = $gameMap.tileWidth();
        var tileH = $gameMap.tileHeight();

        var viewX = $gameMap.displayX();
        var viewY = $gameMap.displayY();

        var screenTileW = Graphics.width / tileW;
        var screenTileH = Graphics.height / tileH;

        var cx = (character._realX !== undefined ? character._realX : character.x) + 0.5;
        var cy = (character._realY !== undefined ? character._realY : character.y) + 0.5;

        var rx = (cx - viewX) / screenTileW;
        var ry = (cy - viewY) / screenTileH;

        if (rx < 0 || ry < 0 || rx > 1 || ry > 1) return null;

        return {
            x: rect.x + Math.floor(rx * rect.w),
            y: rect.y + Math.floor(ry * rect.h)
        };
    };

    Sprite_MiniMap.prototype.drawEventMarkers = function (rect) {
        var events = $gameMap.events();

        for (var i = 0; i < events.length; i++) {
            var ev = events[i];
            if (!ev) continue;
            if (ev._erased) continue;

            var data = ev.event();
            if (!data) continue;

            var note = data.note || "";
            if (!note.match(/<minimap>/i)) continue;

            this.drawCircleMarker(ev, rect, "#ffd84a", 3);
        }
    };

    Sprite_MiniMap.prototype.drawCircleMarker = function (character, rect, color, radius) {
        var pos = this.getCharacterMiniMapPos(character, rect);
        if (!pos) return;

        var ctx = this.bitmap._context;
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        this.bitmap._setDirty();
    };

    Sprite_MiniMap.prototype.drawPlayerMarker = function (rect) {
        var pos = this.getCharacterMiniMapPos($gamePlayer, rect);
        if (!pos) return;

        var dir = $gamePlayer.direction();
        var ctx = this.bitmap._context;

        var s = 6;          // ukuran marker
        var lw = 3;         // tebal garis

        ctx.save();
        ctx.strokeStyle = "#ff5252";
        ctx.lineWidth = lw;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        if (dir === 2) { // bawah
            ctx.moveTo(pos.x - s, pos.y - s * 0.6);
            ctx.lineTo(pos.x, pos.y + s * 0.7);
            ctx.lineTo(pos.x + s, pos.y - s * 0.6);
        } else if (dir === 8) { // atas
            ctx.moveTo(pos.x - s, pos.y + s * 0.6);
            ctx.lineTo(pos.x, pos.y - s * 0.7);
            ctx.lineTo(pos.x + s, pos.y + s * 0.6);
        } else if (dir === 4) { // kiri
            ctx.moveTo(pos.x + s * 0.6, pos.y - s);
            ctx.lineTo(pos.x - s * 0.7, pos.y);
            ctx.lineTo(pos.x + s * 0.6, pos.y + s);
        } else { // kanan / default
            ctx.moveTo(pos.x - s * 0.6, pos.y - s);
            ctx.lineTo(pos.x + s * 0.7, pos.y);
            ctx.lineTo(pos.x - s * 0.6, pos.y + s);
        }

        ctx.stroke();

        // titik kecil di tengah biar lebih kelihatan
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        this.bitmap._setDirty();
    };

    var _Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function () {
        _Spriteset_Map_createUpperLayer.call(this);
        this._miniMap = new Sprite_MiniMap();
        this.addChild(this._miniMap);
    };

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);

        if (Input.isTriggered("minimap")) {
            MiniMap.visible = !MiniMap.visible;
        }
    };

    Input.keyMapper[77] = "minimap";

})();