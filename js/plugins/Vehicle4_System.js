/*:
 * @plugindesc [V5.1] Vehicle4 Custom System - Kendaraan ke-4 yang sepenuhnya dapat dikustomisasi.
 * @author ARIFIN (diperbaiki V5.1)
 *
 * ============================================================
 * @param --- Visual ---
 * @default
 * ============================================================
 *
 * @param Vehicle Image
 * @parent --- Visual ---
 * @type file
 * @dir img/characters/
 * @default Vehicle
 * @desc Gambar sprite kendaraan dari folder img/characters/.
 *
 * @param Vehicle Index
 * @parent --- Visual ---
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Indeks karakter dalam sprite sheet (0–7).
 *
 * @param Vehicle Direction
 * @parent --- Visual ---
 * @type select
 * @option Bawah
 * @value 2
 * @option Kiri
 * @value 4
 * @option Kanan
 * @value 6
 * @option Atas
 * @value 8
 * @default 2
 * @desc Arah hadap kendaraan saat pertama kali muncul di map.
 *
 * ============================================================
 * @param --- Sistem ---
 * @default
 * ============================================================
 *
 * @param Speed
 * @parent --- Sistem ---
 * @type select
 * @option Sangat Lambat
 * @value 1
 * @option Lambat
 * @value 2
 * @option Agak Lambat
 * @value 3
 * @option Normal
 * @value 4
 * @option Cepat
 * @value 5
 * @option Sangat Cepat
 * @value 6
 * @default 5
 * @desc Kecepatan gerak kendaraan saat dikendarai.
 *
 * @param Encounter Rate
 * @parent --- Sistem ---
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Persentase encounter saat di kendaraan. 0 = tidak ada encounter, 100 = normal penuh.
 *
 * @param Disable Dash
 * @parent --- Sistem ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @default true
 * @desc Matikan fungsi dash/lari saat mengendarai kendaraan ini.
 *
 * ============================================================
 * @param --- Boarding ---
 * @default
 * ============================================================
 *
 * @param Board Rule
 * @parent --- Boarding ---
 * @type select
 * @option Dari depan atau di atas kendaraan
 * @value frontOrOn
 * @option Hanya dari depan
 * @value frontOnly
 * @option Dari depan atau samping
 * @value frontOrSide
 * @option Dari mana saja yang menempel
 * @value adjacentOrOn
 * @default adjacentOrOn
 * @desc Aturan posisi player untuk bisa naik kendaraan.
 *
 * ============================================================
 * @param --- Starting Position ---
 * @default
 * ============================================================
 *
 * @param Auto Spawn
 * @parent --- Starting Position ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @default true
 * @desc Ya: kendaraan muncul di Starting Position saat New Game.
 *       Tidak: kendaraan tidak muncul sama sekali.
 *
 * @param Starting Map ID
 * @parent --- Starting Position ---
 * @type number
 * @min 1
 * @default 1
 * @desc ID map tempat kendaraan pertama kali muncul saat New Game.
 *
 * @param Starting X
 * @parent --- Starting Position ---
 * @type number
 * @min 0
 * @default 0
 * @desc Koordinat X posisi awal kendaraan saat New Game.
 *
 * @param Starting Y
 * @parent --- Starting Position ---
 * @type number
 * @min 0
 * @default 0
 * @desc Koordinat Y posisi awal kendaraan saat New Game.
 *
 * ============================================================
 * @param --- Passability ---
 * @default
 * ============================================================
 *
 * @param Passability Type
 * @parent --- Passability ---
 * @type select
 * @option Normal (ikuti tile passability standar)
 * @value normal
 * @option Hanya darat (tidak bisa melewati air)
 * @value land
 * @option Hanya air (ikuti passability kapal)
 * @value water
 * @option Di mana saja (abaikan semua collision tile)
 * @value any
 * @default normal
 * @desc Jenis pergerakan kendaraan terhadap tile.
 *
 * ============================================================
 * @param --- Audio BGM ---
 * @default
 * ============================================================
 *
 * @param BGM Name
 * @parent --- Audio BGM ---
 * @type file
 * @dir audio/bgm/
 * @default
 * @desc BGM yang diputar saat mengendarai kendaraan. Kosongkan jika tidak ingin ada BGM khusus.
 *
 * @param BGM Volume
 * @parent --- Audio BGM ---
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param BGM Pitch
 * @parent --- Audio BGM ---
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param BGM Pan
 * @parent --- Audio BGM ---
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Pan audio BGM. -100 = kiri penuh, 0 = tengah, 100 = kanan penuh.
 *
 * ============================================================
 * @param --- Audio SE ---
 * @default
 * ============================================================
 *
 * @param SE Get On
 * @parent --- Audio SE ---
 * @type file
 * @dir audio/se/
 * @default
 * @desc Suara saat naik kendaraan.
 *
 * @param SE Get On Volume
 * @parent --- Audio SE ---
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param SE Get On Pitch
 * @parent --- Audio SE ---
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param SE Get Off
 * @parent --- Audio SE ---
 * @type file
 * @dir audio/se/
 * @default
 * @desc Suara saat turun dari kendaraan.
 *
 * @param SE Get Off Volume
 * @parent --- Audio SE ---
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param SE Get Off Pitch
 * @parent --- Audio SE ---
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @help
 * =============================================================
 * Vehicle4 Custom System V5.1
 * =============================================================
 *
 * Plugin ini menambahkan kendaraan ke-4 ke dalam RPG Maker MV.
 * Semua pengaturan dilakukan dari Plugin Parameters, tanpa
 * Plugin Command tambahan.
 *
 * --- CARA PENGGUNAAN ---
 *
 * 1. Aktifkan plugin ini.
 * 2. Atur semua parameter sesuai kebutuhan.
 * 3. Isi Starting Map ID, Starting X, Starting Y.
 * 4. Player bisa naik/turun kendaraan dengan tombol OK/Z.
 *
 * --- STARTING POSITION ---
 *
 * Starting Position hanya berlaku saat New Game.
 * Setelah itu, posisi kendaraan selalu tersimpan otomatis
 * di dalam save file — tidak perlu pengaturan tambahan.
 *
 * Contoh:
 *   Starting Map ID : 3
 *   Starting X      : 10
 *   Starting Y      : 5
 *   → Saat New Game, kendaraan muncul di map 3, tile (10, 5).
 *
 * Kendaraan akan tetap berada di posisi terakhir saat di-load,
 * bahkan jika berpindah-pindah antar map.
 *
 * --- PASSABILITY ---
 *
 * Normal       : Mengikuti aturan tile standar RPG Maker.
 * Hanya darat  : Tidak bisa melewati tile air terbuka.
 * Hanya air    : Hanya bisa melewati tile yang dilalui kapal.
 * Di mana saja : Bisa melewati semua tile (melayang).
 *
 * --- ENCOUNTER RATE ---
 *
 * 0   = Tidak ada encounter sama sekali saat di kendaraan.
 * 50  = 50% dari encounter rate normal map.
 * 100 = Encounter rate penuh sama seperti berjalan kaki.
 *
 * =============================================================
 */

(function () {
  "use strict";

  var PLUGIN_NAME = "Vehicle4_System";
  var P = PluginManager.parameters(PLUGIN_NAME);

  // ============================================================
  // Utilitas
  // ============================================================

  function toNumber(value, fallback) {
    var n = Number(value);
    return isNaN(n) ? fallback : n;
  }

  function toBoolean(value, fallback) {
    if (value === true || value === "true") return true;
    if (value === false || value === "false") return false;
    return fallback;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function choose(value, allowed, fallback) {
    return allowed.indexOf(value) >= 0 ? value : fallback;
  }

  function cleanText(value, fallback) {
    value = String(value || "").trim();
    return value || fallback;
  }

  function validDirection(value) {
    var n = toNumber(value, 2);
    return [2, 4, 6, 8].indexOf(n) >= 0 ? n : 2;
  }

  function reverseDirection(d) {
    var map = { 2: 8, 8: 2, 4: 6, 6: 4 };
    return map[d] || 2;
  }

  function rightOfDirection(d) {
    var map = { 2: 6, 6: 8, 8: 4, 4: 2 };
    return map[d] || 6;
  }

  function leftOfDirection(d) {
    var map = { 2: 4, 4: 8, 8: 6, 6: 2 };
    return map[d] || 4;
  }

  // ============================================================
  // Konfigurasi
  // ============================================================

  var CFG = {};

  function readConfig() {
    CFG.image = cleanText(P["Vehicle Image"], "Vehicle");
    CFG.index = clamp(toNumber(P["Vehicle Index"], 0), 0, 7);
    CFG.direction = validDirection(P["Vehicle Direction"]);

    CFG.speed = clamp(toNumber(P["Speed"], 5), 1, 6);
    CFG.encounterRate = clamp(toNumber(P["Encounter Rate"], 0), 0, 100);
    CFG.disableDash = toBoolean(P["Disable Dash"], true);

    CFG.boardRule = choose(
      String(P["Board Rule"] || "adjacentOrOn"),
      ["frontOrOn", "frontOnly", "frontOrSide", "adjacentOrOn"],
      "adjacentOrOn",
    );

    // Starting Position — hanya dipakai saat New Game
    CFG.autoSpawn = toBoolean(P["Auto Spawn"], true);
    CFG.startingMapId = Math.max(1, toNumber(P["Starting Map ID"], 1));
    CFG.startingX = Math.max(0, toNumber(P["Starting X"], 0));
    CFG.startingY = Math.max(0, toNumber(P["Starting Y"], 0));

    CFG.passabilityType = choose(
      String(P["Passability Type"] || "normal"),
      ["normal", "land", "water", "any"],
      "normal",
    );

    CFG.bgmName = String(P["BGM Name"] || "");
    CFG.bgmVolume = clamp(toNumber(P["BGM Volume"], 90), 0, 100);
    CFG.bgmPitch = clamp(toNumber(P["BGM Pitch"], 100), 50, 150);
    CFG.bgmPan = clamp(toNumber(P["BGM Pan"], 0), -100, 100);

    CFG.seGetOn = String(P["SE Get On"] || "");
    CFG.seGetOnVolume = clamp(toNumber(P["SE Get On Volume"], 90), 0, 100);
    CFG.seGetOnPitch = clamp(toNumber(P["SE Get On Pitch"], 100), 50, 150);
    CFG.seGetOff = String(P["SE Get Off"] || "");
    CFG.seGetOffVolume = clamp(toNumber(P["SE Get Off Volume"], 90), 0, 100);
    CFG.seGetOffPitch = clamp(toNumber(P["SE Get Off Pitch"], 100), 50, 150);
  }

  readConfig();

  // ============================================================
  // Audio helpers
  // ============================================================

  function vehicleBgm() {
    return {
      name: CFG.bgmName,
      volume: CFG.bgmVolume,
      pitch: CFG.bgmPitch,
      pan: CFG.bgmPan,
    };
  }

  function playSound(name, volume, pitch) {
    if (!name) return;
    AudioManager.playSe({ name: name, volume: volume, pitch: pitch, pan: 0 });
  }

  // ============================================================
  // Akses vehicle4
  // ============================================================

  function vehicle4() {
    if (!$gameMap) return null;
    return $gameMap.vehicle4 ? $gameMap.vehicle4() : null;
  }

  function refreshVehicle4() {
    var v = vehicle4();
    if (!v) return;
    v._bgm = vehicleBgm();
    v.initMoveSpeed();
    v.refresh();
  }

  // ============================================================
  // Starting Position — hanya dipanggil saat New Game
  // ============================================================

  function placeVehicleAtStart(vehicle) {
    if (!vehicle) return;

    if (!CFG.autoSpawn) {
      vehicle._v4Hidden = true;
      vehicle._driving = false;
      vehicle._vehicleOn = false;
      vehicle.setLocation(0, 0, 0);
      vehicle.refresh();
      return;
    }

    vehicle._v4Hidden = false;
    vehicle._driving = false;
    vehicle._vehicleOn = false;
    vehicle._through = false;
    vehicle._bgm = vehicleBgm();
    vehicle.setLocation(CFG.startingMapId, CFG.startingX, CFG.startingY);
    vehicle.setDirection(CFG.direction);
    vehicle.initMoveSpeed();
    vehicle.refresh();
  }

  // ============================================================
  // Save / Load data kendaraan
  // ============================================================

  function makeVehicleSaveData(vehicle) {
    if (!vehicle) return null;
    return {
      mapId: vehicle._mapId || 0,
      x: vehicle._x || 0,
      y: vehicle._y || 0,
      realX: vehicle._realX != null ? vehicle._realX : vehicle._x || 0,
      realY: vehicle._realY != null ? vehicle._realY : vehicle._y || 0,
      direction: vehicle.direction(),
      hidden: !!vehicle._v4Hidden,
      driving: !!vehicle._driving,
      vehicleOn: !!vehicle._vehicleOn,
    };
  }

  function loadVehicleSaveData(vehicle, data) {
    if (!vehicle || !data) return;
    vehicle._mapId = Math.max(0, toNumber(data.mapId, 0));
    vehicle._x = Math.max(0, toNumber(data.x, 0));
    vehicle._y = Math.max(0, toNumber(data.y, 0));
    vehicle._realX = Number(data.realX != null ? data.realX : vehicle._x);
    vehicle._realY = Number(data.realY != null ? data.realY : vehicle._y);
    vehicle._v4Hidden = !!data.hidden;
    vehicle._driving = !!data.driving;
    vehicle._vehicleOn = !!data.vehicleOn;
    vehicle._bgm = vehicleBgm();
    vehicle.setDirection(validDirection(data.direction));
    vehicle.initMoveSpeed();
    vehicle.refresh();
  }

  // ============================================================
  // Sinkronisasi posisi vehicle dengan player saat dikendarai
  // ============================================================

  function syncVehicleToPlayer() {
    var v = vehicle4();
    if (!v) return;
    if (!$gamePlayer) return;
    if ($gamePlayer._vehicleType !== "vehicle4") return;

    v._mapId = $gameMap.mapId();
    v._x = $gamePlayer._x;
    v._y = $gamePlayer._y;
    v._realX = $gamePlayer._realX;
    v._realY = $gamePlayer._realY;
    v._v4Hidden = false;
    v._driving = true;
    v._vehicleOn = true;
    v.setDirection($gamePlayer.direction());
    v.setTransparent(false);
  }

  // ============================================================
  // Boarding detection
  // ============================================================

  function isBoardPosition(player, vehicle) {
    var px = player.x;
    var py = player.y;
    var vx = vehicle.x;
    var vy = vehicle.y;
    var d = player.direction();

    var fx = $gameMap.roundXWithDirection(px, d);
    var fy = $gameMap.roundYWithDirection(py, d);

    var onVehicle = vehicle.pos(px, py);
    var frontVehicle = vehicle.pos(fx, fy);

    if (CFG.boardRule === "frontOnly") {
      return frontVehicle;
    }

    if (CFG.boardRule === "frontOrOn") {
      return onVehicle || frontVehicle;
    }

    if (CFG.boardRule === "frontOrSide") {
      var ld = leftOfDirection(d);
      var rd = rightOfDirection(d);
      var lx = $gameMap.roundXWithDirection(px, ld);
      var ly = $gameMap.roundYWithDirection(py, ld);
      var rx = $gameMap.roundXWithDirection(px, rd);
      var ry = $gameMap.roundYWithDirection(py, rd);
      return frontVehicle || vehicle.pos(lx, ly) || vehicle.pos(rx, ry);
    }

    // adjacentOrOn: jarak Manhattan <= 1 (termasuk berdiri di atas)
    return (
      Math.abs($gameMap.deltaX(px, vx)) + Math.abs($gameMap.deltaY(py, vy)) <= 1
    );
  }

  // ============================================================
  // Exit detection
  // ============================================================

  function exitPosition(x, y, d) {
    return {
      x: $gameMap.roundXWithDirection(x, d),
      y: $gameMap.roundYWithDirection(y, d),
    };
  }

  function tileHasBlockingEvent(x, y) {
    return $gameMap.eventsXyNt(x, y).some(function (ev) {
      return ev.isNormalPriority() && !ev._through;
    });
  }

  function tileHasOtherVehicle(x, y) {
    return (
      $gameMap.boat().posNt(x, y) ||
      $gameMap.ship().posNt(x, y) ||
      $gameMap.airship().posNt(x, y)
    );
  }

  function canStandAfterExit(x, y, fromDir) {
    if (!$gameMap.isValid(x, y)) return false;
    if (!$gameMap.isPassable(x, y, reverseDirection(fromDir))) return false;
    if (tileHasOtherVehicle(x, y)) return false;
    if (tileHasBlockingEvent(x, y)) return false;
    var v = vehicle4();
    if (v && v.posNt(x, y)) return false;
    return true;
  }

  function canExitTowards(vx, vy, d) {
    var target = exitPosition(vx, vy, d);
    if (!$gameMap.isValid(target.x, target.y)) return false;

    if (CFG.passabilityType !== "water" && CFG.passabilityType !== "any") {
      if (!$gameMap.isPassable(vx, vy, d)) return false;
    }

    return canStandAfterExit(target.x, target.y, d);
  }

  function findExitPosition() {
    var v = vehicle4();
    if (!v) return null;

    var d = validDirection($gamePlayer.direction());
    var dirs = [
      d,
      rightOfDirection(d),
      leftOfDirection(d),
      reverseDirection(d),
    ];

    for (var i = 0; i < dirs.length; i++) {
      var dir = dirs[i];
      if (canExitTowards(v.x, v.y, dir)) {
        var pos = exitPosition(v.x, v.y, dir);
        return { x: pos.x, y: pos.y, dir: dir };
      }
    }

    return null;
  }

  // ============================================================
  // Naik / turun kendaraan
  // ============================================================

  function setFollowersHidden(hidden) {
    $gamePlayer.followers().forEach(function (f) {
      f.setTransparent(hidden);
      f.setThrough(hidden);
    });
  }

  function boardVehicle4(vehicle) {
    $gamePlayer._v4PreviousSpeed = $gamePlayer._moveSpeed;
    $gamePlayer._vehicleType = "vehicle4";
    $gamePlayer._vehicleGettingOn = false;
    $gamePlayer._vehicleGettingOff = false;

    vehicle._mapId = $gameMap.mapId();
    vehicle._v4Hidden = false;
    vehicle._driving = true;
    vehicle._vehicleOn = true;
    vehicle._through = false;
    vehicle.setTransparent(false);
    vehicle.setWalkAnime(true);
    vehicle.setStepAnime(false);
    vehicle.refresh();

    $gamePlayer.setPosition(vehicle.x, vehicle.y);
    $gamePlayer._realX = vehicle._realX;
    $gamePlayer._realY = vehicle._realY;
    $gamePlayer.setDirection(vehicle.direction());
    $gamePlayer.setMoveSpeed(CFG.speed);
    $gamePlayer.setTransparent(true);
    $gamePlayer.setThrough(false);
    $gamePlayer.setWalkAnime(false);
    $gamePlayer.setStepAnime(false);

    setFollowersHidden(true);
    playSound(CFG.seGetOn, CFG.seGetOnVolume, CFG.seGetOnPitch);

    if (CFG.bgmName) {
      $gameSystem.saveWalkingBgm();
      AudioManager.playBgm(vehicleBgm());
    }

    return true;
  }

  function leaveVehicle4(exit) {
    var vehicle = vehicle4();
    if (!vehicle || !exit) return false;

    var vehicleDir = vehicle.direction();

    vehicle._mapId = $gameMap.mapId();
    vehicle._x = $gamePlayer._x;
    vehicle._y = $gamePlayer._y;
    vehicle._realX = $gamePlayer._realX;
    vehicle._realY = $gamePlayer._realY;
    vehicle._driving = false;
    vehicle._vehicleOn = false;
    vehicle._v4Hidden = false;
    vehicle._through = false;
    vehicle.setDirection(vehicleDir);
    vehicle.setWalkAnime(false);
    vehicle.setStepAnime(false);
    vehicle.setTransparent(false);
    vehicle.refresh();

    $gamePlayer._vehicleType = "walk";
    $gamePlayer._vehicleGettingOn = false;
    $gamePlayer._vehicleGettingOff = false;
    $gamePlayer.setPosition(exit.x, exit.y);
    $gamePlayer._realX = exit.x;
    $gamePlayer._realY = exit.y;
    $gamePlayer.setDirection(reverseDirection(exit.dir));
    $gamePlayer.setMoveSpeed(
      $gamePlayer._v4PreviousSpeed != null ? $gamePlayer._v4PreviousSpeed : 4,
    );
    $gamePlayer._v4PreviousSpeed = null;
    $gamePlayer.setTransparent(false);
    $gamePlayer.setThrough(false);
    $gamePlayer.setWalkAnime(true);
    $gamePlayer.setStepAnime(false);

    $gamePlayer.followers().forEach(function (f) {
      f.locate($gamePlayer.x, $gamePlayer.y);
      f.setDirection($gamePlayer.direction());
      f.setTransparent(false);
      f.setThrough(false);
    });

    playSound(CFG.seGetOff, CFG.seGetOffVolume, CFG.seGetOffPitch);

    if (CFG.bgmName) {
      $gameSystem.replayWalkingBgm();
    } else {
      $gameMap.autoplay();
    }

    return true;
  }

  // ============================================================
  // Game_Vehicle overrides
  // ============================================================

  var _Game_Vehicle_initialize = Game_Vehicle.prototype.initialize;
  Game_Vehicle.prototype.initialize = function (type) {
    if (type === "vehicle4") {
      Game_Character.prototype.initialize.call(this);
      this._type = "vehicle4";
      this._mapId = 0;
      this._vehicleOn = false;
      this._driving = false;
      this._v4Hidden = true;
      this._bgm = vehicleBgm();
      this._priorityType = 1;
      this._through = false;
      this.initMoveSpeed();
      this.setImage(CFG.image, CFG.index);
      this.setDirection(CFG.direction);
      this.setTransparent(true);
      return;
    }
    _Game_Vehicle_initialize.call(this, type);
  };

  var _Game_Vehicle_initMoveSpeed = Game_Vehicle.prototype.initMoveSpeed;
  Game_Vehicle.prototype.initMoveSpeed = function () {
    if (this._type === "vehicle4") {
      this._moveSpeed = CFG.speed;
      return;
    }
    _Game_Vehicle_initMoveSpeed.call(this);
  };

  var _Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
  Game_Vehicle.prototype.refresh = function () {
    if (this._type === "vehicle4") {
      this.setImage(CFG.image, CFG.index);
      this._originalPattern = 1;
      this._pattern = 1;
      this._animationCount = 0;

      var hidden =
        this._v4Hidden ||
        this._mapId <= 0 ||
        ($gameMap && this._mapId !== $gameMap.mapId());

      this.setTransparent(hidden);
      return;
    }
    _Game_Vehicle_refresh.call(this);
  };

  var _Game_Vehicle_isValid = Game_Vehicle.prototype.isValid;
  Game_Vehicle.prototype.isValid = function () {
    if (this._type === "vehicle4") {
      if (this._v4Hidden) return false;
      if (this._mapId <= 0) return false;
      if (!$gameMap) return false;
      return this._mapId === $gameMap.mapId();
    }
    return _Game_Vehicle_isValid.call(this);
  };

  var _Game_Vehicle_isLowest = Game_Vehicle.prototype.isLowest;
  Game_Vehicle.prototype.isLowest = function () {
    if (this._type === "vehicle4") return false;
    return _Game_Vehicle_isLowest.call(this);
  };

  var _Game_Vehicle_playBgm = Game_Vehicle.prototype.playBgm;
  Game_Vehicle.prototype.playBgm = function () {
    if (this._type === "vehicle4") {
      if (CFG.bgmName) AudioManager.playBgm(vehicleBgm());
      return;
    }
    _Game_Vehicle_playBgm.call(this);
  };

  var _Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
  Game_Vehicle.prototype.getOn = function () {
    if (this._type === "vehicle4") {
      this._driving = true;
      this._vehicleOn = true;
      this.refresh();
      return;
    }
    _Game_Vehicle_getOn.call(this);
  };

  var _Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
  Game_Vehicle.prototype.getOff = function () {
    if (this._type === "vehicle4") {
      this._driving = false;
      this._vehicleOn = false;
      this.refresh();
      return;
    }
    _Game_Vehicle_getOff.call(this);
  };

  var _Game_Vehicle_canPass = Game_Vehicle.prototype.canPass;
  Game_Vehicle.prototype.canPass = function (x, y, d) {
    if (this._type !== "vehicle4") {
      return _Game_Vehicle_canPass.call(this, x, y, d);
    }

    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);

    if (!$gameMap.isValid(x2, y2)) return false;

    switch (CFG.passabilityType) {
      case "any":
        return true;

      case "water":
        return $gameMap.isShipPassable(x2, y2);

      case "land":
        return (
          $gameMap.isPassable(x, y, d) &&
          $gameMap.isPassable(x2, y2, reverseDirection(d)) &&
          !$gameMap.isShipPassable(x2, y2)
        );

      default: // 'normal'
        return (
          $gameMap.isPassable(x, y, d) &&
          $gameMap.isPassable(x2, y2, reverseDirection(d))
        );
    }
  };

  var _Game_Vehicle_isCollidedWithVehicles =
    Game_Vehicle.prototype.isCollidedWithVehicles;
  Game_Vehicle.prototype.isCollidedWithVehicles = function (x, y) {
    if (this._type === "vehicle4") return tileHasOtherVehicle(x, y);
    return _Game_Vehicle_isCollidedWithVehicles.call(this, x, y);
  };

  var _Game_Vehicle_isCollidedWithEvents =
    Game_Vehicle.prototype.isCollidedWithEvents;
  Game_Vehicle.prototype.isCollidedWithEvents = function (x, y) {
    if (this._type === "vehicle4") return tileHasBlockingEvent(x, y);
    return _Game_Vehicle_isCollidedWithEvents.call(this, x, y);
  };

  var _Game_Vehicle_isCollidedWithCharacters =
    Game_Vehicle.prototype.isCollidedWithCharacters;
  Game_Vehicle.prototype.isCollidedWithCharacters = function (x, y) {
    if (this._type === "vehicle4") {
      return (
        this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y)
      );
    }
    return _Game_Vehicle_isCollidedWithCharacters.call(this, x, y);
  };

  // ============================================================
  // Game_CharacterBase — collision dengan vehicle4
  // ============================================================

  var _Game_CharacterBase_isCollidedWithVehicles =
    Game_CharacterBase.prototype.isCollidedWithVehicles;
  Game_CharacterBase.prototype.isCollidedWithVehicles = function (x, y) {
    if (_Game_CharacterBase_isCollidedWithVehicles.call(this, x, y))
      return true;

    var v = vehicle4();
    if (!v || !v.isValid()) return false;
    if (this === v) return false;

    if ($gamePlayer && $gamePlayer._vehicleType === "vehicle4") {
      if (this === $gamePlayer) return false;
    }

    return v.posNt(x, y);
  };

  Game_Follower.prototype.isCollidedWithVehicles = function (x, y) {
    return Game_CharacterBase.prototype.isCollidedWithVehicles.call(this, x, y);
  };

  // ============================================================
  // Game_Map — registrasi vehicle4
  // ============================================================

  var _Game_Map_createVehicles = Game_Map.prototype.createVehicles;
  Game_Map.prototype.createVehicles = function () {
    _Game_Map_createVehicles.call(this);
    if (!this._vehicle4) {
      this._vehicle4 = new Game_Vehicle("vehicle4");
    }
  };

  Game_Map.prototype.vehicle4 = function () {
    if (!this._vehicle4) {
      this._vehicle4 = new Game_Vehicle("vehicle4");
    }
    return this._vehicle4;
  };

  var _Game_Map_vehicles = Game_Map.prototype.vehicles;
  Game_Map.prototype.vehicles = function () {
    var result = _Game_Map_vehicles.call(this);
    if (this._vehicle4 && result.indexOf(this._vehicle4) < 0) {
      result.push(this._vehicle4);
    }
    return result;
  };

  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId);

    if (!this._vehicle4) {
      this._vehicle4 = new Game_Vehicle("vehicle4");
    }

    readConfig();

    if ($gamePlayer && $gamePlayer._vehicleType === "vehicle4") {
      syncVehicleToPlayer();
      this._vehicle4.refresh();
      return;
    }

    // Refresh visibility saja; posisi tidak di-reset (sudah tersimpan di save)
    this._vehicle4.refresh();
  };

  // ============================================================
  // DataManager — save / load
  // Posisi kendaraan selalu tersimpan otomatis.
  // Starting Position hanya berlaku saat New Game.
  // ============================================================

  var _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.vehicle4Data = makeVehicleSaveData(vehicle4());
    return contents;
  };

  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);

    readConfig();

    var v = vehicle4();

    if (contents.vehicle4Data) {
      // Pulihkan posisi dari save file
      loadVehicleSaveData(v, contents.vehicle4Data);
    } else {
      // Fallback untuk save lama (sebelum plugin dipasang)
      placeVehicleAtStart(v);
    }

    refreshVehicle4();
  };

  // New Game: tempatkan kendaraan di Starting Position
  var _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function () {
    _DataManager_setupNewGame.call(this);
    readConfig();
    var v = vehicle4();
    if (v) placeVehicleAtStart(v);
  };

  // ============================================================
  // Game_Player — overrides
  // ============================================================

  var _Game_Player_vehicle = Game_Player.prototype.vehicle;
  Game_Player.prototype.vehicle = function () {
    if (this._vehicleType === "vehicle4") return vehicle4();
    return _Game_Player_vehicle.call(this);
  };

  var _Game_Player_isInVehicle = Game_Player.prototype.isInVehicle;
  Game_Player.prototype.isInVehicle = function () {
    if (this._vehicleType === "vehicle4") return true;
    return _Game_Player_isInVehicle.call(this);
  };

  var _Game_Player_isInBoat = Game_Player.prototype.isInBoat;
  Game_Player.prototype.isInBoat = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _Game_Player_isInBoat.call(this);
  };

  var _Game_Player_isInShip = Game_Player.prototype.isInShip;
  Game_Player.prototype.isInShip = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _Game_Player_isInShip.call(this);
  };

  var _Game_Player_isInAirship = Game_Player.prototype.isInAirship;
  Game_Player.prototype.isInAirship = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _Game_Player_isInAirship.call(this);
  };

  var _Game_Player_isOnLadder = Game_Player.prototype.isOnLadder;
  Game_Player.prototype.isOnLadder = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _Game_Player_isOnLadder.call(this);
  };

  var _Game_Player_isDashing = Game_Player.prototype.isDashing;
  Game_Player.prototype.isDashing = function () {
    if (this._vehicleType === "vehicle4" && CFG.disableDash) return false;
    return _Game_Player_isDashing.call(this);
  };

  var _Game_Player_canEncounter = Game_Player.prototype.canEncounter;
  Game_Player.prototype.canEncounter = function () {
    if (this._vehicleType === "vehicle4" && CFG.encounterRate <= 0)
      return false;
    return _Game_Player_canEncounter.call(this);
  };

  var _Game_Player_encounterProgressValue =
    Game_Player.prototype.encounterProgressValue;
  Game_Player.prototype.encounterProgressValue = function () {
    var base = _Game_Player_encounterProgressValue.call(this);
    if (this._vehicleType === "vehicle4") {
      return base * (CFG.encounterRate / 100);
    }
    return base;
  };

  var _Game_Player_canPass = Game_Player.prototype.canPass;
  Game_Player.prototype.canPass = function (x, y, d) {
    if (this._vehicleType !== "vehicle4") {
      return _Game_Player_canPass.call(this, x, y, d);
    }

    var v = vehicle4();
    if (!v) return false;
    if (!v.canPass(x, y, d)) return false;

    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);

    if (tileHasBlockingEvent(x2, y2)) return false;

    return true;
  };

  var _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
  Game_Player.prototype.moveByInput = function () {
    if (this._vehicleType === "vehicle4") {
      if (!this.isMoving() && this.canMove()) {
        var d = this.getInputDirection();
        if (d > 0) this.moveStraight(d);
      }
      return;
    }
    _Game_Player_moveByInput.call(this);
  };

  var _Game_Player_updateMove = Game_Player.prototype.updateMove;
  Game_Player.prototype.updateMove = function () {
    _Game_Player_updateMove.call(this);
    syncVehicleToPlayer();
  };

  Game_Player.prototype.getOnVehicle4 = function (vehicle) {
    if (!vehicle) return false;
    if (!vehicle.isValid()) return false;
    if (!isBoardPosition(this, vehicle)) return false;
    return boardVehicle4(vehicle);
  };

  var _Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function () {
    if (this._vehicleType !== "vehicle4") {
      return _Game_Player_getOffVehicle.call(this);
    }
    syncVehicleToPlayer();
    var exit = findExitPosition();
    if (!exit) return false;
    return leaveVehicle4(exit);
  };

  var _Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
  Game_Player.prototype.getOnOffVehicle = function () {
    var v = vehicle4();

    if (this._vehicleType === "vehicle4") {
      return this.getOffVehicle();
    }

    if (v && v.isValid() && isBoardPosition(this, v)) {
      return this.getOnVehicle4(v);
    }

    return _Game_Player_getOnOffVehicle.call(this);
  };

  var _Game_Player_triggerButtonAction =
    Game_Player.prototype.triggerButtonAction;
  Game_Player.prototype.triggerButtonAction = function () {
    if (Input.isTriggered("ok")) {
      if (this.getOnOffVehicle()) return true;
    }
    return _Game_Player_triggerButtonAction.call(this);
  };

  var _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function () {
    var wasInVehicle4 = this._vehicleType === "vehicle4";

    _Game_Player_performTransfer.call(this);

    if (wasInVehicle4) {
      syncVehicleToPlayer();

      var v = vehicle4();
      if (v) {
        v._driving = true;
        v._vehicleOn = true;
        v._v4Hidden = false;
        v.initMoveSpeed();
        v.refresh();
      }
    }
  };
})();
