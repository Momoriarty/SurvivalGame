/*:
 * @plugindesc [V.1.5] Vehicle4 Custom System - Stable, Configurable, Save-Safe
 * @author Nama Kamu
 *
 * @param --- Pengaturan Visual ---
 * @default
 *
 * @param Vehicle Image
 * @parent --- Pengaturan Visual ---
 * @type file
 * @dir img/characters/
 * @desc Gambar karakter untuk vehicle4.
 * @default Vehicle
 *
 * @param Vehicle Index
 * @parent --- Pengaturan Visual ---
 * @type number
 * @min 0
 * @max 7
 * @desc Index karakter pada spritesheet.
 * @default 0
 *
 * @param --- Pengaturan Sistem ---
 * @default
 *
 * @param Speed
 * @parent --- Pengaturan Sistem ---
 * @type select
 * @option Lambat
 * @value 3
 * @option Normal
 * @value 4
 * @option Cepat
 * @value 5
 * @option Sangat Cepat
 * @value 6
 * @default 5
 *
 * @param Encounter Rate
 * @parent --- Pengaturan Sistem ---
 * @type number
 * @min 0
 * @max 100
 * @desc 0 = tidak ada encounter, 100 = normal.
 * @default 0
 *
 * @param Disable Dash
 * @parent --- Pengaturan Sistem ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @desc Matikan dash saat naik vehicle4?
 * @default true
 *
 * @param --- Pengaturan Boarding ---
 * @default
 *
 * @param Board Rule
 * @parent --- Pengaturan Boarding ---
 * @type select
 * @option Dari depan atau di atas vehicle
 * @value frontOrOn
 * @option Hanya dari depan
 * @value frontOnly
 * @option Dari depan atau samping
 * @value frontOrSide
 * @option Dari mana saja yang menempel
 * @value adjacentOrOn
 * @desc Aturan posisi untuk naik vehicle4.
 * @default frontOrOn
 *
 * @param Animation Mode
 * @parent --- Pengaturan Boarding ---
 * @type select
 * @option Default MV
 * @value default
 * @option Instant
 * @value instant
 * @option Fade
 * @value fade
 * @desc Gaya animasi naik turun.
 * @default default
 *
 * @param Fade Duration
 * @parent --- Pengaturan Boarding ---
 * @type number
 * @min 1
 * @max 120
 * @desc Durasi fade jika mode = fade.
 * @default 18
 *
 * @param --- Pengaturan Spawn Otomatis ---
 * @default
 *
 * @param Auto Spawn
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @desc Spawn otomatis tanpa event.
 * @default false
 *
 * @param Spawn Map ID
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
 * @desc Map ID spawn otomatis. 0 = nonaktif.
 * @default 0
 *
 * @param Spawn X
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
 * @default 0
 *
 * @param Spawn Y
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
 * @default 0
 *
 * @param --- Pengaturan Passability ---
 * @default
 *
 * @param Passability Type
 * @parent --- Pengaturan Passability ---
 * @type select
 * @option Normal
 * @value normal
 * @option Hanya darat
 * @value land
 * @option Hanya air
 * @value water
 * @option Di mana saja
 * @value any
 * @default normal
 *
 * @param --- Pengaturan Audio ---
 * @default
 *
 * @param BGM Name
 * @parent --- Pengaturan Audio ---
 * @type file
 * @dir audio/bgm/
 * @desc BGM saat naik vehicle4.
 * @default
 *
 * @param BGM Volume
 * @parent --- Pengaturan Audio ---
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param BGM Pitch
 * @parent --- Pengaturan Audio ---
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param SE Get On
 * @parent --- Pengaturan Audio ---
 * @type file
 * @dir audio/se/
 * @default
 *
 * @param SE Get On Volume
 * @parent --- Pengaturan Audio ---
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param SE Get Off
 * @parent --- Pengaturan Audio ---
 * @type file
 * @dir audio/se/
 * @default
 *
 * @param SE Get Off Volume
 * @parent --- Pengaturan Audio ---
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @help
 * ============================================================
 * Vehicle4_System v1.5
 * ============================================================
 *
 * FITUR:
 * - Vehicle custom ke-4
 * - Spawn dari plugin parameter atau plugin command
 * - Save/load aman dengan data mentah
 * - Board rule bisa diatur
 * - Mode animasi: default / instant / fade
 * - Bisa ubah image, speed, posisi via plugin command
 *
 * ============================================================
 * PLUGIN COMMAND
 * ============================================================
 *
 * Vehicle4 Spawn mapId x y
 *   Contoh:
 *   Vehicle4 Spawn 3 10 8
 *
 * Vehicle4 Recall
 *   Spawn ke lokasi Auto Spawn dari parameter plugin
 *
 * Vehicle4 Hide
 *   Sembunyikan vehicle4 dari map
 *
 * Vehicle4 SetSpeed n
 *   Contoh:
 *   Vehicle4 SetSpeed 6
 *
 * Vehicle4 SetImage filename index
 *   Contoh:
 *   Vehicle4 SetImage Vehicle 0
 *
 * Vehicle4 SetDirection d
 *   d = 2 / 4 / 6 / 8
 *
 * Vehicle4 SetBoardRule rule
 *   rule:
 *   frontOrOn
 *   frontOnly
 *   frontOrSide
 *   adjacentOrOn
 *
 * Vehicle4 SetAnimMode mode
 *   mode:
 *   default
 *   instant
 *   fade
 *
 * ============================================================
 * CATATAN
 * ============================================================
 *
 * - Lokasi utama vehicle4 tetap diatur dari plugin, bukan wajib event.
 * - Event hanya opsional bila kamu mau memanggil script / plugin command.
 * - Tekan Enter di dekat vehicle4 untuk naik atau turun.
 * ============================================================
 */
(function () {
  'use strict';

  var PLUGIN_NAME = 'Vehicle4_System';
  var params = PluginManager.parameters(PLUGIN_NAME);

  function toNumber(value, def) {
    var n = Number(value);
    return isNaN(n) ? def : n;
  }

  function toBool(value, def) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return def;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function safeImageName(name) {
    var s = String(name || '').trim();
    return s || 'Vehicle';
  }

  function safeIndex(index) {
    return clamp(toNumber(index, 0), 0, 7);
  }

  function safeSpeed(speed) {
    return clamp(toNumber(speed, 4), 1, 6);
  }

  function safeEncounterRate(rate) {
    return clamp(toNumber(rate, 0), 0, 100);
  }

  function safePassType(type) {
    var s = String(type || 'normal');
    if (s === 'normal' || s === 'land' || s === 'water' || s === 'any') return s;
    return 'normal';
  }

  function safeBoardRule(rule) {
    var s = String(rule || 'frontOrOn');
    if (s === 'frontOrOn' || s === 'frontOnly' || s === 'frontOrSide' || s === 'adjacentOrOn') return s;
    return 'frontOrOn';
  }

  function safeAnimMode(mode) {
    var s = String(mode || 'default');
    if (s === 'default' || s === 'instant' || s === 'fade') return s;
    return 'default';
  }

  function safeDirection(dir) {
    var d = toNumber(dir, 2);
    return (d === 2 || d === 4 || d === 6 || d === 8) ? d : 2;
  }

  var Vehicle4Config = {
    image: safeImageName(params['Vehicle Image']),
    index: safeIndex(params['Vehicle Index']),
    speed: safeSpeed(params['Speed'] || 5),
    encounterRate: safeEncounterRate(params['Encounter Rate']),
    disableDash: toBool(params['Disable Dash'], true),
    autoSpawn: toBool(params['Auto Spawn'], false),
    spawnMapId: Math.max(0, toNumber(params['Spawn Map ID'], 0)),
    spawnX: Math.max(0, toNumber(params['Spawn X'], 0)),
    spawnY: Math.max(0, toNumber(params['Spawn Y'], 0)),
    passType: safePassType(params['Passability Type']),
    bgmName: String(params['BGM Name'] || ''),
    bgmVolume: clamp(toNumber(params['BGM Volume'], 90), 0, 100),
    bgmPitch: clamp(toNumber(params['BGM Pitch'], 100), 50, 150),
    seGetOn: String(params['SE Get On'] || ''),
    seGetOnVolume: clamp(toNumber(params['SE Get On Volume'], 90), 0, 100),
    seGetOff: String(params['SE Get Off'] || ''),
    seGetOffVolume: clamp(toNumber(params['SE Get Off Volume'], 90), 0, 100),
    boardRule: safeBoardRule(params['Board Rule']),
    animMode: safeAnimMode(params['Animation Mode']),
    fadeDuration: clamp(toNumber(params['Fade Duration'], 18), 1, 120)
  };

  var _pendingVehicle4Data = null;
  var _pendingVehicle4Config = null;

  function playSe(name, volume) {
    if (name) {
      AudioManager.playSe({
        name: name,
        volume: volume,
        pitch: 100,
        pan: 0
      });
    }
  }

  function bgmObject() {
    return {
      name: Vehicle4Config.bgmName,
      volume: Vehicle4Config.bgmVolume,
      pitch: Vehicle4Config.bgmPitch,
      pan: 0
    };
  }

  function setPartyOpacity(opacity) {
    $gamePlayer.setOpacity(opacity);
    $gamePlayer.followers().forEach(function (follower) {
      follower.setOpacity(opacity);
    });
  }

  function serializeVehicle4Config() {
    return {
      image: Vehicle4Config.image,
      index: Vehicle4Config.index,
      speed: Vehicle4Config.speed,
      encounterRate: Vehicle4Config.encounterRate,
      disableDash: Vehicle4Config.disableDash,
      autoSpawn: Vehicle4Config.autoSpawn,
      spawnMapId: Vehicle4Config.spawnMapId,
      spawnX: Vehicle4Config.spawnX,
      spawnY: Vehicle4Config.spawnY,
      passType: Vehicle4Config.passType,
      bgmName: Vehicle4Config.bgmName,
      bgmVolume: Vehicle4Config.bgmVolume,
      bgmPitch: Vehicle4Config.bgmPitch,
      seGetOn: Vehicle4Config.seGetOn,
      seGetOnVolume: Vehicle4Config.seGetOnVolume,
      seGetOff: Vehicle4Config.seGetOff,
      seGetOffVolume: Vehicle4Config.seGetOffVolume,
      boardRule: Vehicle4Config.boardRule,
      animMode: Vehicle4Config.animMode,
      fadeDuration: Vehicle4Config.fadeDuration
    };
  }

  function applyVehicle4Config(data) {
    if (!data) return;
    Vehicle4Config.image = safeImageName(data.image);
    Vehicle4Config.index = safeIndex(data.index);
    Vehicle4Config.speed = safeSpeed(data.speed);
    Vehicle4Config.encounterRate = safeEncounterRate(data.encounterRate);
    Vehicle4Config.disableDash = !!data.disableDash;
    Vehicle4Config.autoSpawn = !!data.autoSpawn;
    Vehicle4Config.spawnMapId = Math.max(0, toNumber(data.spawnMapId, 0));
    Vehicle4Config.spawnX = Math.max(0, toNumber(data.spawnX, 0));
    Vehicle4Config.spawnY = Math.max(0, toNumber(data.spawnY, 0));
    Vehicle4Config.passType = safePassType(data.passType);
    Vehicle4Config.bgmName = String(data.bgmName || '');
    Vehicle4Config.bgmVolume = clamp(toNumber(data.bgmVolume, 90), 0, 100);
    Vehicle4Config.bgmPitch = clamp(toNumber(data.bgmPitch, 100), 50, 150);
    Vehicle4Config.seGetOn = String(data.seGetOn || '');
    Vehicle4Config.seGetOnVolume = clamp(toNumber(data.seGetOnVolume, 90), 0, 100);
    Vehicle4Config.seGetOff = String(data.seGetOff || '');
    Vehicle4Config.seGetOffVolume = clamp(toNumber(data.seGetOffVolume, 90), 0, 100);
    Vehicle4Config.boardRule = safeBoardRule(data.boardRule);
    Vehicle4Config.animMode = safeAnimMode(data.animMode);
    Vehicle4Config.fadeDuration = clamp(toNumber(data.fadeDuration, 18), 1, 120);
  }

  function serializeVehicle4(vehicle) {
    if (!vehicle) return null;
    return {
      mapId: vehicle._mapId || 0,
      x: vehicle._x || 0,
      y: vehicle._y || 0,
      realX: (vehicle._realX != null ? vehicle._realX : vehicle._x || 0),
      realY: (vehicle._realY != null ? vehicle._realY : vehicle._y || 0),
      direction: vehicle.direction ? vehicle.direction() : 2,
      moveSpeed: vehicle._moveSpeed || Vehicle4Config.speed,
      driving: !!vehicle._driving,
      vehicleOn: !!vehicle._vehicleOn,
      transparent: !!vehicle._transparent
    };
  }

  function applyVehicle4Data(vehicle, data) {
    if (!vehicle || !data) return;
    vehicle._mapId = Math.max(0, toNumber(data.mapId, 0));
    vehicle._x = Math.max(0, toNumber(data.x, 0));
    vehicle._y = Math.max(0, toNumber(data.y, 0));
    vehicle._realX = Number(data.realX != null ? data.realX : vehicle._x);
    vehicle._realY = Number(data.realY != null ? data.realY : vehicle._y);
    vehicle._moveSpeed = safeSpeed(data.moveSpeed);
    vehicle._driving = !!data.driving;
    vehicle._vehicleOn = !!data.vehicleOn;
    vehicle.setTransparent(!!data.transparent);
    vehicle.setDirection(safeDirection(data.direction));
    vehicle.refresh();
  }

  function refreshVehicle4() {
    if ($gameMap && $gameMap.vehicle4 && $gameMap.vehicle4()) {
      var v = $gameMap.vehicle4();
      v._bgm = bgmObject();
      v.initMoveSpeed();
      v.refresh();
    }
  }

  function isVehicle4BoardingRuleMet(player, vehicle) {
    if (!player || !vehicle) return false;

    var px = player.x;
    var py = player.y;
    var vx = vehicle.x;
    var vy = vehicle.y;
    var d = player.direction();

    var frontX = $gameMap.roundXWithDirection(px, d);
    var frontY = $gameMap.roundYWithDirection(py, d);

    var leftDir = (d === 2 ? 6 : d === 4 ? 2 : d === 6 ? 8 : 4);
    var rightDir = (d === 2 ? 4 : d === 4 ? 8 : d === 6 ? 2 : 6);

    var leftX = $gameMap.roundXWithDirection(px, leftDir);
    var leftY = $gameMap.roundYWithDirection(py, leftDir);
    var rightX = $gameMap.roundXWithDirection(px, rightDir);
    var rightY = $gameMap.roundYWithDirection(py, rightDir);

    var onVehicle = vehicle.pos(px, py);
    var frontHit = vehicle.pos(frontX, frontY);
    var sideHit = vehicle.pos(leftX, leftY) || vehicle.pos(rightX, rightY);
    var adjacentHit = Math.abs(px - vx) + Math.abs(py - vy) === 1;

    switch (Vehicle4Config.boardRule) {
      case 'frontOnly':
        return frontHit;
      case 'frontOrSide':
        return frontHit || sideHit;
      case 'adjacentOrOn':
        return onVehicle || adjacentHit;
      case 'frontOrOn':
      default:
        return onVehicle || frontHit;
    }
  }

  function shouldUseFadeMode() {
    return Vehicle4Config.animMode === 'fade';
  }

  function shouldUseInstantMode() {
    return Vehicle4Config.animMode === 'instant';
  }

  function vehicle4BoardComplete(player, vehicle) {
    if (!player || !vehicle) return;

    player.setPosition(vehicle.x, vehicle.y);
    player._realX = vehicle._realX;
    player._realY = vehicle._realY;
    player.setDirection(vehicle.direction());
    player.setMoveSpeed(Vehicle4Config.speed);
    player.setWalkAnime(false);
    player.setStepAnime(false);
    player.setTransparent(true);
    player.setThrough(false);

    vehicle.getOn();
    playSe(Vehicle4Config.seGetOn, Vehicle4Config.seGetOnVolume);

    if (Vehicle4Config.bgmName) {
      AudioManager.playBgm(bgmObject());
    }

    player._vehicleGettingOn = false;
    player._vehicle4Pending = null;
    player._v4BoardFadeCounter = 0;
  }

  function vehicle4GetOffComplete(player) {
    if (!player) return;

    player._vehicleGettingOff = false;
    player._vehicleType = 'walk';
    player.setTransparent(false);
    player.setMoveSpeed(4);
    player.setWalkAnime(true);
    player.setStepAnime(false);
    player.setThrough(false);
    player._followers.synchronize(player.x, player.y, player.direction());
    player._v4DisembarkFadeCounter = 0;
    $gameMap.autoplay();
  }

  function startVehicle4FadeOut(player) {
    player._v4BoardFadeCounter = Vehicle4Config.fadeDuration;
    setPartyOpacity(255);
  }

  function updateVehicle4FadeOut(player) {
    if (player._v4BoardFadeCounter > 0) {
      var ratio = player._v4BoardFadeCounter / Vehicle4Config.fadeDuration;
      setPartyOpacity(Math.round(255 * ratio));
      player._v4BoardFadeCounter--;
      return false;
    }
    setPartyOpacity(0);
    return true;
  }

  function startVehicle4FadeIn(player) {
    player._v4DisembarkFadeCounter = 0;
    setPartyOpacity(0);
  }

  function updateVehicle4FadeIn(player) {
    if (player._v4DisembarkFadeCounter < Vehicle4Config.fadeDuration) {
      var ratio = player._v4DisembarkFadeCounter / Vehicle4Config.fadeDuration;
      setPartyOpacity(Math.round(255 * ratio));
      player._v4DisembarkFadeCounter++;
      return false;
    }
    setPartyOpacity(255);
    return true;
  }

  function vehicle4CanPassNormal(x, y, d, reverseDir) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (!$gameMap.isPassable(x, y, d)) return false;
    if (!$gameMap.isPassable(x2, y2, reverseDir)) return false;
    return true;
  }

  function vehicle4CanPassLand(x, y, d, reverseDir) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if ($gameMap.isShipPassable(x2, y2)) return false;
    if (!$gameMap.isPassable(x, y, d)) return false;
    if (!$gameMap.isPassable(x2, y2, reverseDir)) return false;
    return true;
  }

  function vehicle4CanPassWater(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    return $gameMap.isShipPassable(x2, y2);
  }

  //==========================================================
  // GAME_VEHICLE
  //==========================================================

  var _Game_Vehicle_initialize = Game_Vehicle.prototype.initialize;
  Game_Vehicle.prototype.initialize = function (type) {
    if (type === 'vehicle4') {
      Game_Character.prototype.initialize.call(this);
      this._type = 'vehicle4';
      this._mapId = 0;
      this._vehicleOn = false;
      this._driving = false;
      this._bgm = bgmObject();
      this._priorityType = 1;
      this._through = false;
      this.setTransparent(false);
      this.initMoveSpeed();
      this.setImage(Vehicle4Config.image, Vehicle4Config.index);
    } else {
      _Game_Vehicle_initialize.call(this, type);
    }
  };

  var _Game_Vehicle_playBgm = Game_Vehicle.prototype.playBgm;
  Game_Vehicle.prototype.playBgm = function () {
    if (this._type === 'vehicle4') {
      if (Vehicle4Config.bgmName) {
        AudioManager.playBgm(bgmObject());
      }
      return;
    }
    _Game_Vehicle_playBgm.call(this);
  };

  var _Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
  Game_Vehicle.prototype.getOn = function () {
    if (this._type === 'vehicle4') {
      this._driving = true;
      this._vehicleOn = true;
      this.setWalkAnime(true);
      this.setStepAnime(false);
      this.refresh();
      return;
    }
    _Game_Vehicle_getOn.call(this);
  };

  var _Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
  Game_Vehicle.prototype.getOff = function () {
    if (this._type === 'vehicle4') {
      this._driving = false;
      this._vehicleOn = false;
      this.setWalkAnime(false);
      this.setStepAnime(false);
      this.refresh();
      return;
    }
    _Game_Vehicle_getOff.call(this);
  };

  var _Game_Vehicle_initMoveSpeed = Game_Vehicle.prototype.initMoveSpeed;
  Game_Vehicle.prototype.initMoveSpeed = function () {
    if (this._type === 'vehicle4') {
      this._moveSpeed = Vehicle4Config.speed;
    } else {
      _Game_Vehicle_initMoveSpeed.call(this);
    }
  };

  var _Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
  Game_Vehicle.prototype.refresh = function () {
    if (this._type === 'vehicle4') {
      this.setImage(Vehicle4Config.image, Vehicle4Config.index);
      this._animationCount = 0;
      this._originalPattern = 1;
      this._pattern = 1;
      return;
    }
    _Game_Vehicle_refresh.call(this);
  };

  var _Game_Vehicle_isValid = Game_Vehicle.prototype.isValid;
  Game_Vehicle.prototype.isValid = function () {
    if (this._type === 'vehicle4') {
      return this._mapId > 0;
    }
    return _Game_Vehicle_isValid.call(this);
  };

  var _Game_Vehicle_isLowest = Game_Vehicle.prototype.isLowest;
  Game_Vehicle.prototype.isLowest = function () {
    if (this._type === 'vehicle4') {
      return !this._driving;
    }
    return _Game_Vehicle_isLowest.call(this);
  };

  var _Game_Vehicle_canPass = Game_Vehicle.prototype.canPass;
  Game_Vehicle.prototype.canPass = function (x, y, d) {
    if (this._type === 'vehicle4') {
      var x2 = $gameMap.roundXWithDirection(x, d);
      var y2 = $gameMap.roundYWithDirection(y, d);
      if (!$gameMap.isValid(x2, y2)) return false;

      var reverseDir = this.reverseDir(d);

      if (Vehicle4Config.passType === 'any') return true;
      if (Vehicle4Config.passType === 'water') return vehicle4CanPassWater(x, y, d);
      if (Vehicle4Config.passType === 'land') return vehicle4CanPassLand(x, y, d, reverseDir);
      return vehicle4CanPassNormal(x, y, d, reverseDir);
    }
    return _Game_Vehicle_canPass.call(this, x, y, d);
  };

  var _Game_Vehicle_isCollidedWithVehicles = Game_Vehicle.prototype.isCollidedWithVehicles;
  Game_Vehicle.prototype.isCollidedWithVehicles = function (x, y) {
    if (this._type === 'vehicle4') {
      return $gameMap.boat().posNt(x, y) ||
        $gameMap.ship().posNt(x, y) ||
        $gameMap.airship().posNt(x, y);
    }
    return _Game_Vehicle_isCollidedWithVehicles.call(this, x, y);
  };

  var _Game_Vehicle_isCollidedWithCharacters = Game_Vehicle.prototype.isCollidedWithCharacters;
  Game_Vehicle.prototype.isCollidedWithCharacters = function (x, y) {
    if (this._type === 'vehicle4') {
      return this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y);
    }
    return _Game_Vehicle_isCollidedWithCharacters.call(this, x, y);
  };

  var _Game_Vehicle_isCollidedWithEvents = Game_Vehicle.prototype.isCollidedWithEvents;
  Game_Vehicle.prototype.isCollidedWithEvents = function (x, y) {
    if (this._type === 'vehicle4') {
      var events = $gameMap.eventsXyNt(x, y);
      return events.some(function (event) {
        return event.isNormalPriority();
      });
    }
    return _Game_Vehicle_isCollidedWithEvents.call(this, x, y);
  };

  //==========================================================
  // CHARACTER COLLISION
  //==========================================================

  var _Game_CharacterBase_isCollidedWithVehicles = Game_CharacterBase.prototype.isCollidedWithVehicles;
  Game_CharacterBase.prototype.isCollidedWithVehicles = function (x, y) {
    var result = _Game_CharacterBase_isCollidedWithVehicles.call(this, x, y);
    if (result) return true;

    if ($gameMap.vehicle4 && this === $gameMap.vehicle4()) return false;
    if ($gamePlayer._vehicleType === 'vehicle4' && this === $gamePlayer) return false;

    var v4 = $gameMap.vehicle4 && $gameMap.vehicle4();
    if (v4 && v4.isValid() && v4.posNt(x, y)) return true;

    return false;
  };

  Game_Follower.prototype.isCollidedWithVehicles = function (x, y) {
    return Game_CharacterBase.prototype.isCollidedWithVehicles.call(this, x, y);
  };

  //==========================================================
  // GAME_MAP
  //==========================================================

  var _Game_Map_createVehicles = Game_Map.prototype.createVehicles;
  Game_Map.prototype.createVehicles = function () {
    _Game_Map_createVehicles.call(this);
    this._vehicle4 = new Game_Vehicle('vehicle4');
  };

  Game_Map.prototype.vehicle4 = function () {
    return this._vehicle4;
  };

  var _Game_Map_vehicles = Game_Map.prototype.vehicles;
  Game_Map.prototype.vehicles = function () {
    var list = _Game_Map_vehicles.call(this);
    if (this._vehicle4 && list.indexOf(this._vehicle4) < 0) {
      list.push(this._vehicle4);
    }
    return list;
  };

  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId);

    if (!this._vehicle4) {
      this._vehicle4 = new Game_Vehicle('vehicle4');
    }

    if (_pendingVehicle4Config) {
      applyVehicle4Config(_pendingVehicle4Config);
      _pendingVehicle4Config = null;
      refreshVehicle4();
    }

    if (_pendingVehicle4Data) {
      applyVehicle4Data(this._vehicle4, _pendingVehicle4Data);
      _pendingVehicle4Data = null;
    } else if (Vehicle4Config.autoSpawn && Vehicle4Config.spawnMapId > 0 && this._vehicle4._mapId === 0) {
      this._vehicle4.setLocation(Vehicle4Config.spawnMapId, Vehicle4Config.spawnX, Vehicle4Config.spawnY);
    }
  };

  //==========================================================
  // DATA_MANAGER
  //==========================================================

  var _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.vehicle4Data = ($gameMap && $gameMap.vehicle4) ? serializeVehicle4($gameMap.vehicle4()) : null;
    contents.vehicle4Config = serializeVehicle4Config();
    return contents;
  };

  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);

    if (contents.vehicle4Config) {
      if ($gameMap) {
        applyVehicle4Config(contents.vehicle4Config);
        refreshVehicle4();
      } else {
        _pendingVehicle4Config = contents.vehicle4Config;
      }
    }

    if (contents.vehicle4Data) {
      if ($gameMap && $gameMap.vehicle4 && $gameMap.vehicle4()) {
        applyVehicle4Data($gameMap.vehicle4(), contents.vehicle4Data);
      } else {
        _pendingVehicle4Data = contents.vehicle4Data;
      }
    }
  };

  //==========================================================
  // PLUGIN COMMAND
  //==========================================================

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command !== 'Vehicle4') return;

    var sub = String(args[0] || '');

    if (sub === 'Spawn') {
      var mapId = Math.max(0, toNumber(args[1], 0));
      var x = Math.max(0, toNumber(args[2], 0));
      var y = Math.max(0, toNumber(args[3], 0));
      if ($gameMap && $gameMap.vehicle4()) {
        $gameMap.vehicle4().setLocation(mapId, x, y);
        $gameMap.vehicle4().refresh();
      }
      return;
    }

    if (sub === 'Recall') {
      if ($gameMap && $gameMap.vehicle4() && Vehicle4Config.spawnMapId > 0) {
        $gameMap.vehicle4().setLocation(Vehicle4Config.spawnMapId, Vehicle4Config.spawnX, Vehicle4Config.spawnY);
        $gameMap.vehicle4().refresh();
      }
      return;
    }

    if (sub === 'Hide') {
      if ($gameMap && $gameMap.vehicle4()) {
        $gameMap.vehicle4().setLocation(0, 0, 0);
        $gameMap.vehicle4().refresh();
      }
      return;
    }

    if (sub === 'SetSpeed') {
      Vehicle4Config.speed = safeSpeed(args[1]);
      refreshVehicle4();
      return;
    }

    if (sub === 'SetImage') {
      Vehicle4Config.image = safeImageName(args[1]);
      Vehicle4Config.index = safeIndex(args[2]);
      refreshVehicle4();
      return;
    }

    if (sub === 'SetDirection') {
      if ($gameMap && $gameMap.vehicle4()) {
        $gameMap.vehicle4().setDirection(safeDirection(args[1]));
      }
      return;
    }

    if (sub === 'SetBoardRule') {
      Vehicle4Config.boardRule = safeBoardRule(args[1]);
      return;
    }

    if (sub === 'SetAnimMode') {
      Vehicle4Config.animMode = safeAnimMode(args[1]);
      return;
    }
  };

  //==========================================================
  // GAME_PLAYER
  //==========================================================

  var _Game_Player_vehicle = Game_Player.prototype.vehicle;
  Game_Player.prototype.vehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      return $gameMap.vehicle4 ? $gameMap.vehicle4() : null;
    }
    return _Game_Player_vehicle.call(this);
  };

  var _Game_Player_isInVehicle = Game_Player.prototype.isInVehicle;
  Game_Player.prototype.isInVehicle = function () {
    if (this._vehicleType === 'vehicle4') return true;
    return _Game_Player_isInVehicle.call(this);
  };

  var _Game_Player_isInAirship = Game_Player.prototype.isInAirship;
  Game_Player.prototype.isInAirship = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _Game_Player_isInAirship.call(this);
  };

  var _Game_Player_isInBoat = Game_Player.prototype.isInBoat;
  Game_Player.prototype.isInBoat = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _Game_Player_isInBoat.call(this);
  };

  var _Game_Player_isInShip = Game_Player.prototype.isInShip;
  Game_Player.prototype.isInShip = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _Game_Player_isInShip.call(this);
  };

  var _Game_Player_isOnLadder = Game_Player.prototype.isOnLadder;
  Game_Player.prototype.isOnLadder = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _Game_Player_isOnLadder.call(this);
  };

  var _Game_Player_isDashing = Game_Player.prototype.isDashing;
  Game_Player.prototype.isDashing = function () {
    if (this._vehicleType === 'vehicle4' && Vehicle4Config.disableDash) return false;
    return _Game_Player_isDashing.call(this);
  };

  var _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function () {
    if (this._vehicleType === 'vehicle4') {
      if (this._vehicleGettingOn || this._vehicleGettingOff) return false;
      return true;
    }
    return _Game_Player_canMove.call(this);
  };

  var _Game_Player_canEncounter = Game_Player.prototype.canEncounter;
  Game_Player.prototype.canEncounter = function () {
    if (this._vehicleType === 'vehicle4' && Vehicle4Config.encounterRate === 0) {
      return false;
    }
    return _Game_Player_canEncounter.call(this);
  };

  var _Game_Player_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
  Game_Player.prototype.encounterProgressValue = function () {
    if (this._vehicleType === 'vehicle4') {
      return _Game_Player_encounterProgressValue.call(this) * (Vehicle4Config.encounterRate / 100);
    }
    return _Game_Player_encounterProgressValue.call(this);
  };

  var _Game_Player_canPass = Game_Player.prototype.canPass;
  Game_Player.prototype.canPass = function (x, y, d) {
    if (this._vehicleType === 'vehicle4') {
      var v = $gameMap.vehicle4();
      if (!v) return false;
      if (!v.canPass(x, y, d)) return false;

      var x2 = $gameMap.roundXWithDirection(x, d);
      var y2 = $gameMap.roundYWithDirection(y, d);
      var events = $gameMap.eventsXyNt(x2, y2);

      for (var i = 0; i < events.length; i++) {
        if (events[i].isNormalPriority() && !events[i]._through) return false;
      }
      return true;
    }
    return _Game_Player_canPass.call(this, x, y, d);
  };

  var _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
  Game_Player.prototype.moveByInput = function () {
    if (this._vehicleType === 'vehicle4') {
      if (!this.isMoving() && this.canMove()) {
        var direction = this.getInputDirection();
        if (direction > 0) {
          this.moveStraight(direction);
        }
      }
      return;
    }
    _Game_Player_moveByInput.call(this);
  };

  var _Game_Player_updateMove = Game_Player.prototype.updateMove;
  Game_Player.prototype.updateMove = function () {
    _Game_Player_updateMove.call(this);

    if (this._vehicleType === 'vehicle4' &&
        !this._vehicleGettingOn &&
        !this._vehicleGettingOff) {
      var v = $gameMap.vehicle4();
      if (v) {
        v._realX = this._realX;
        v._realY = this._realY;
        if (!this.isMoving()) {
          v._x = this._x;
          v._y = this._y;
        }
        v.setDirection(this.direction());
      }
    }
  };

  var _Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
  Game_Player.prototype.getOnOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      return this.getOffVehicle();
    }

    var v = $gameMap.vehicle4 && $gameMap.vehicle4();
    if (v && v.isValid() && isVehicle4BoardingRuleMet(this, v)) {
      return this.getOnVehicle4(v);
    }

    return _Game_Player_getOnOffVehicle.call(this);
  };

  Game_Player.prototype.getOnVehicle4 = function (vehicle) {
    this._vehicleType = 'vehicle4';
    this._vehicleGettingOn = true;
    this._vehicle4Pending = vehicle;
    this.setThrough(true);

    if (shouldUseFadeMode()) {
      startVehicle4FadeOut(this);
    }

    if (!vehicle.pos(this.x, this.y)) {
      this.forceMoveForward();
    }

    this.gatherFollowers();

    if (shouldUseInstantMode()) {
      vehicle4BoardComplete(this, vehicle);
    }

    return true;
  };

  var _Game_Player_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
  Game_Player.prototype.updateVehicleGetOn = function () {
    if (this._vehicleType === 'vehicle4') {
      if (shouldUseInstantMode()) return;

      if (this.isMoving() || this.areFollowersGathering()) {
        if (shouldUseFadeMode()) {
          updateVehicle4FadeOut(this);
        }
        return;
      }

      if (this._vehicleGettingOn) {
        if (shouldUseFadeMode()) {
          if (!updateVehicle4FadeOut(this)) return;
        }
        vehicle4BoardComplete(this, this._vehicle4Pending || $gameMap.vehicle4());
      }
      return;
    }
    _Game_Player_updateVehicleGetOn.call(this);
  };

  var _Game_Player_updateVehicleGetOff = Game_Player.prototype.updateVehicleGetOff;
  Game_Player.prototype.updateVehicleGetOff = function () {
    if (this._vehicleType === 'vehicle4') {
      if (shouldUseInstantMode()) return;

      if (this.isMoving() || this.areFollowersGathering()) {
        return;
      }

      if (this._vehicleGettingOff) {
        if (shouldUseFadeMode()) {
          if (!updateVehicle4FadeIn(this)) return;
        }
        vehicle4GetOffComplete(this);
      }
      return;
    }
    _Game_Player_updateVehicleGetOff.call(this);
  };

  var _Game_Player_canGetOffVehicle = Game_Player.prototype.canGetOffVehicle;
  Game_Player.prototype.canGetOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      var v = $gameMap.vehicle4();
      if (!v) return false;

      var d = this.direction();
      var x = $gameMap.roundXWithDirection(v.x, d);
      var y = $gameMap.roundYWithDirection(v.y, d);

      if (!$gameMap.isValid(x, y)) return false;
      if (!$gameMap.isPassable(v.x, v.y, d)) return false;
      if (!$gameMap.isPassable(x, y, this.reverseDir(d))) return false;

      var events = $gameMap.eventsXyNt(x, y);
      for (var i = 0; i < events.length; i++) {
        if (events[i].isNormalPriority() && !events[i]._through) return false;
      }

      if ($gameMap.boat().posNt(x, y)) return false;
      if ($gameMap.ship().posNt(x, y)) return false;
      if ($gameMap.airship().posNt(x, y)) return false;

      return true;
    }
    return _Game_Player_canGetOffVehicle.call(this);
  };

  var _Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      if (!this.canGetOffVehicle()) return false;

      var v = $gameMap.vehicle4();
      this._vehicleGettingOff = true;
      this.setDirection(v.direction());
      v.getOff();
      playSe(Vehicle4Config.seGetOff, Vehicle4Config.seGetOffVolume);

      if (shouldUseInstantMode()) {
        this.forceMoveForward();
        this.setTransparent(false);
        this.gatherFollowers();
        vehicle4GetOffComplete(this);
        return true;
      }

      this.forceMoveForward();
      this.setTransparent(false);
      this.gatherFollowers();

      if (shouldUseFadeMode()) {
        startVehicle4FadeIn(this);
      }

      return true;
    }
    return _Game_Player_getOffVehicle.call(this);
  };

})();