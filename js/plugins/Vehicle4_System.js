/*:
 * @plugindesc [V.3.0 Simple Reboard Fixed] Vehicle4 Custom System - No Animation, Stable Board/Reboard
 * @author Nama Kamu
 *
 * @param --- Pengaturan Visual ---
 * @default
 *
 * @param Vehicle Image
 * @parent --- Pengaturan Visual ---
 * @type file
 * @dir img/characters/
 * @default Vehicle
 *
 * @param Vehicle Index
 * @parent --- Pengaturan Visual ---
 * @type number
 * @min 0
 * @max 7
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
 * @default 0
 *
 * @param Disable Dash
 * @parent --- Pengaturan Sistem ---
 * @type boolean
 * @on Ya
 * @off Tidak
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
 * @default adjacentOrOn
 *
 * @param --- Pengaturan Spawn Otomatis ---
 * @default
 *
 * @param Auto Spawn
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @default true
 *
 * @param Spawn Map ID
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
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
 * Vehicle4 Spawn mapId x y
 * Vehicle4 Recall
 * Vehicle4 Hide
 * Vehicle4 SetSpeed n
 * Vehicle4 SetImage filename index
 * Vehicle4 SetDirection d
 * Vehicle4 SetBoardRule rule
 * Vehicle4 SetPassType type
 *
 * rule: frontOrOn / frontOnly / frontOrSide / adjacentOrOn
 * type: normal / land / water / any
 *
 * Versi ini sengaja menghapus animasi naik/turun.
 * Naik dan turun dibuat instant agar reboard stabil.
 *
 * Simpan file sebagai Vehicle4_System.js
 */
(function() {
  'use strict';

  var P = PluginManager.parameters('Vehicle4_System');
  var CFG = {};
  var pendingData = null;
  var pendingCfg = null;

  function num(v, d) {
    v = Number(v);
    return isNaN(v) ? d : v;
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function bool(v, d) {
    return v === 'true' ? true : v === 'false' ? false : d;
  }

  function pick(v, list, d) {
    return list.indexOf(v) >= 0 ? v : d;
  }

  function img(v) {
    v = String(v || '').trim();
    return v || 'Vehicle';
  }

  function dir(v) {
    v = num(v, 2);
    return [2, 4, 6, 8].indexOf(v) >= 0 ? v : 2;
  }

  function reverseDir(d) {
    return d === 2 ? 8 : d === 8 ? 2 : d === 4 ? 6 : d === 6 ? 4 : 0;
  }

  function rightDir(d) {
    return d === 2 ? 4 : d === 4 ? 8 : d === 8 ? 6 : d === 6 ? 2 : 4;
  }

  function leftDir(d) {
    return d === 2 ? 6 : d === 6 ? 8 : d === 8 ? 4 : d === 4 ? 2 : 6;
  }

  function loadCfg(src) {
    src = src || {};
    CFG.image = img(src.image != null ? src.image : P['Vehicle Image']);
    CFG.index = clamp(num(src.index != null ? src.index : P['Vehicle Index'], 0), 0, 7);
    CFG.speed = clamp(num(src.speed != null ? src.speed : P['Speed'], 5), 1, 6);
    CFG.encounter = clamp(num(src.encounter != null ? src.encounter : P['Encounter Rate'], 0), 0, 100);
    CFG.disableDash = src.disableDash != null ? !!src.disableDash : bool(P['Disable Dash'], true);
    CFG.boardRule = pick(String(src.boardRule != null ? src.boardRule : P['Board Rule'] || 'adjacentOrOn'), ['frontOrOn', 'frontOnly', 'frontOrSide', 'adjacentOrOn'], 'adjacentOrOn');
    CFG.autoSpawn = src.autoSpawn != null ? !!src.autoSpawn : bool(P['Auto Spawn'], true);
    CFG.spawnMapId = Math.max(0, num(src.spawnMapId != null ? src.spawnMapId : P['Spawn Map ID'], 0));
    CFG.spawnX = Math.max(0, num(src.spawnX != null ? src.spawnX : P['Spawn X'], 0));
    CFG.spawnY = Math.max(0, num(src.spawnY != null ? src.spawnY : P['Spawn Y'], 0));
    CFG.passType = pick(String(src.passType != null ? src.passType : P['Passability Type'] || 'normal'), ['normal', 'land', 'water', 'any'], 'normal');
    CFG.bgmName = String(src.bgmName != null ? src.bgmName : P['BGM Name'] || '');
    CFG.bgmVolume = clamp(num(src.bgmVolume != null ? src.bgmVolume : P['BGM Volume'], 90), 0, 100);
    CFG.bgmPitch = clamp(num(src.bgmPitch != null ? src.bgmPitch : P['BGM Pitch'], 100), 50, 150);
    CFG.seOn = String(src.seOn != null ? src.seOn : P['SE Get On'] || '');
    CFG.seOnVol = clamp(num(src.seOnVol != null ? src.seOnVol : P['SE Get On Volume'], 90), 0, 100);
    CFG.seOff = String(src.seOff != null ? src.seOff : P['SE Get Off'] || '');
    CFG.seOffVol = clamp(num(src.seOffVol != null ? src.seOffVol : P['SE Get Off Volume'], 90), 0, 100);
  }

  function cfgSave() {
    return {
      image: CFG.image,
      index: CFG.index,
      speed: CFG.speed,
      encounter: CFG.encounter,
      disableDash: CFG.disableDash,
      boardRule: CFG.boardRule,
      autoSpawn: CFG.autoSpawn,
      spawnMapId: CFG.spawnMapId,
      spawnX: CFG.spawnX,
      spawnY: CFG.spawnY,
      passType: CFG.passType,
      bgmName: CFG.bgmName,
      bgmVolume: CFG.bgmVolume,
      bgmPitch: CFG.bgmPitch,
      seOn: CFG.seOn,
      seOnVol: CFG.seOnVol,
      seOff: CFG.seOff,
      seOffVol: CFG.seOffVol
    };
  }

  function bgm() {
    return {
      name: CFG.bgmName,
      volume: CFG.bgmVolume,
      pitch: CFG.bgmPitch,
      pan: 0
    };
  }

  function playSe(name, vol) {
    if (!name) return;
    AudioManager.playSe({
      name: name,
      volume: vol,
      pitch: 100,
      pan: 0
    });
  }

  function v4() {
    return $gameMap && $gameMap.vehicle4 ? $gameMap.vehicle4() : null;
  }

  function refreshV4() {
    var v = v4();
    if (!v) return;
    v._bgm = bgm();
    v.initMoveSpeed();
    v.refresh();
  }

  function saveV4(v) {
    if (!v) return null;
    return {
      mapId: v._mapId || 0,
      x: v._x || 0,
      y: v._y || 0,
      realX: v._realX != null ? v._realX : (v._x || 0),
      realY: v._realY != null ? v._realY : (v._y || 0),
      direction: v.direction ? v.direction() : 2,
      moveSpeed: v._moveSpeed || CFG.speed,
      driving: !!v._driving,
      vehicleOn: !!v._vehicleOn,
      hidden: !!v._v4Hidden
    };
  }

  function applyV4(v, d) {
    if (!v || !d) return;
    v._mapId = Math.max(0, num(d.mapId, 0));
    v._x = Math.max(0, num(d.x, 0));
    v._y = Math.max(0, num(d.y, 0));
    v._realX = Number(d.realX != null ? d.realX : v._x);
    v._realY = Number(d.realY != null ? d.realY : v._y);
    v._moveSpeed = clamp(num(d.moveSpeed, CFG.speed), 1, 6);
    v._driving = !!d.driving;
    v._vehicleOn = !!d.vehicleOn;
    v._v4Hidden = !!d.hidden;
    v.setDirection(dir(d.direction));
    v._bgm = bgm();
    v.refresh();
  }

  function syncVehicleToPlayer() {
    var v = v4();
    if (!v || $gamePlayer._vehicleType !== 'vehicle4') return;

    v._mapId = $gameMap.mapId();
    v._x = $gamePlayer._x;
    v._y = $gamePlayer._y;
    v._realX = $gamePlayer._realX;
    v._realY = $gamePlayer._realY;
    v._v4Hidden = false;
    v.setDirection($gamePlayer.direction());
    v.setTransparent(false);
  }

  function boardOk(player, vehicle) {
    var px = player.x;
    var py = player.y;
    var vx = vehicle.x;
    var vy = vehicle.y;
    var d = player.direction();

    var fx = $gameMap.roundXWithDirection(px, d);
    var fy = $gameMap.roundYWithDirection(py, d);

    var ld = leftDir(d);
    var rd = rightDir(d);

    var lx = $gameMap.roundXWithDirection(px, ld);
    var ly = $gameMap.roundYWithDirection(py, ld);
    var rx = $gameMap.roundXWithDirection(px, rd);
    var ry = $gameMap.roundYWithDirection(py, rd);

    var on = vehicle.pos(px, py);
    var front = vehicle.pos(fx, fy);
    var side = vehicle.pos(lx, ly) || vehicle.pos(rx, ry);
    var adj = Math.abs($gameMap.deltaX(px, vx)) + Math.abs($gameMap.deltaY(py, vy)) === 1;

    switch (CFG.boardRule) {
      case 'frontOnly':
        return front;
      case 'frontOrSide':
        return front || side;
      case 'adjacentOrOn':
        return on || adj;
      case 'frontOrOn':
      default:
        return on || front;
    }
  }

  function exitTarget(fromX, fromY, d) {
    return {
      x: $gameMap.roundXWithDirection(fromX, d),
      y: $gameMap.roundYWithDirection(fromY, d)
    };
  }

  function canStandOnExitTile(x, y, fromDir) {
    if (!$gameMap.isValid(x, y)) return false;

    if (!$gameMap.isPassable(x, y, reverseDir(fromDir))) return false;

    if ($gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y) || $gameMap.airship().posNt(x, y)) {
      return false;
    }

    if ($gameMap.eventsXyNt(x, y).some(function(e) {
      return e.isNormalPriority() && !e._through;
    })) {
      return false;
    }

    var vv = v4();
    if (vv && vv.posNt(x, y)) return false;

    return true;
  }

  function canExitToTile(fromX, fromY, d) {
    var pos = exitTarget(fromX, fromY, d);
    var x = pos.x;
    var y = pos.y;

    if (!$gameMap.isValid(x, y)) return false;

    if (CFG.passType !== 'water' && CFG.passType !== 'any') {
      if (!$gameMap.isPassable(fromX, fromY, d)) return false;
    }

    return canStandOnExitTile(x, y, d);
  }

  function exitDirs(d) {
    d = dir(d);
    return [d, rightDir(d), leftDir(d), reverseDir(d)];
  }

  function findExit() {
    var vv = v4();
    if (!vv) return null;

    var dirs = exitDirs($gamePlayer.direction());
    for (var i = 0; i < dirs.length; i++) {
      var d = dirs[i];
      if (canExitToTile(vv.x, vv.y, d)) {
        var pos = exitTarget(vv.x, vv.y, d);
        return {
          x: pos.x,
          y: pos.y,
          dir: d
        };
      }
    }

    return null;
  }

  function hideFollowers(value) {
    $gamePlayer.followers().forEach(function(f) {
      f.setTransparent(value);
      f.setThrough(value);
    });
  }

  function finishBoard(v) {
    $gamePlayer._v4PrevMoveSpeed = $gamePlayer._moveSpeed;
    $gamePlayer._vehicleType = 'vehicle4';
    $gamePlayer._vehicleGettingOn = false;
    $gamePlayer._vehicleGettingOff = false;

    v._mapId = $gameMap.mapId();
    v._v4Hidden = false;
    v._driving = true;
    v._vehicleOn = true;
    v._through = false;
    v.setTransparent(false);
    v.setWalkAnime(true);
    v.setStepAnime(false);
    v.refresh();

    $gamePlayer.setPosition(v.x, v.y);
    $gamePlayer._realX = v._realX;
    $gamePlayer._realY = v._realY;
    $gamePlayer.setDirection(v.direction());
    $gamePlayer.setMoveSpeed(CFG.speed);
    $gamePlayer.setTransparent(true);
    $gamePlayer.setThrough(false);
    $gamePlayer.setWalkAnime(false);
    $gamePlayer.setStepAnime(false);
    hideFollowers(true);

    playSe(CFG.seOn, CFG.seOnVol);

    if (CFG.bgmName) {
      $gameSystem.saveWalkingBgm();
      AudioManager.playBgm(bgm());
    }
  }

  function finishGetOff(exit) {
    var vv = v4();
    if (!vv || !exit) return false;

    var oldDir = vv.direction();

    vv._mapId = $gameMap.mapId();
    vv._x = $gamePlayer._x;
    vv._y = $gamePlayer._y;
    vv._realX = $gamePlayer._realX;
    vv._realY = $gamePlayer._realY;
    vv._driving = false;
    vv._vehicleOn = false;
    vv._v4Hidden = false;
    vv._through = false;
    vv.setDirection(oldDir);
    vv.setWalkAnime(false);
    vv.setStepAnime(false);
    vv.setTransparent(false);
    vv.refresh();

    $gamePlayer._vehicleType = 'walk';
    $gamePlayer._vehicleGettingOn = false;
    $gamePlayer._vehicleGettingOff = false;
    $gamePlayer.setPosition(exit.x, exit.y);
    $gamePlayer._realX = exit.x;
    $gamePlayer._realY = exit.y;
    $gamePlayer.setDirection(reverseDir(exit.dir));
    $gamePlayer.setMoveSpeed($gamePlayer._v4PrevMoveSpeed != null ? $gamePlayer._v4PrevMoveSpeed : 4);
    $gamePlayer._v4PrevMoveSpeed = null;
    $gamePlayer.setTransparent(false);
    $gamePlayer.setThrough(false);
    $gamePlayer.setWalkAnime(true);
    $gamePlayer.setStepAnime(false);

    $gamePlayer.followers().forEach(function(f) {
      f.locate($gamePlayer.x, $gamePlayer.y);
      f.setDirection($gamePlayer.direction());
      f.setTransparent(false);
      f.setThrough(false);
    });

    playSe(CFG.seOff, CFG.seOffVol);

    if (CFG.bgmName) {
      $gameSystem.replayWalkingBgm();
    } else {
      $gameMap.autoplay();
    }

    return true;
  }

  loadCfg();

  var _GV_init = Game_Vehicle.prototype.initialize;
  Game_Vehicle.prototype.initialize = function(type) {
    if (type === 'vehicle4') {
      Game_Character.prototype.initialize.call(this);
      this._type = 'vehicle4';
      this._mapId = 0;
      this._vehicleOn = false;
      this._driving = false;
      this._v4Hidden = false;
      this._bgm = bgm();
      this._priorityType = 1;
      this._through = false;
      this.initMoveSpeed();
      this.setImage(CFG.image, CFG.index);
      this.setDirection(2);
      this.setTransparent(true);
    } else {
      _GV_init.call(this, type);
    }
  };

  var _GV_playBgm = Game_Vehicle.prototype.playBgm;
  Game_Vehicle.prototype.playBgm = function() {
    if (this._type === 'vehicle4') {
      if (CFG.bgmName) AudioManager.playBgm(bgm());
      return;
    }
    _GV_playBgm.call(this);
  };

  var _GV_getOn = Game_Vehicle.prototype.getOn;
  Game_Vehicle.prototype.getOn = function() {
    if (this._type === 'vehicle4') {
      this._driving = true;
      this._vehicleOn = true;
      this.refresh();
      return;
    }
    _GV_getOn.call(this);
  };

  var _GV_getOff = Game_Vehicle.prototype.getOff;
  Game_Vehicle.prototype.getOff = function() {
    if (this._type === 'vehicle4') {
      this._driving = false;
      this._vehicleOn = false;
      this.refresh();
      return;
    }
    _GV_getOff.call(this);
  };

  var _GV_speed = Game_Vehicle.prototype.initMoveSpeed;
  Game_Vehicle.prototype.initMoveSpeed = function() {
    if (this._type === 'vehicle4') {
      this._moveSpeed = CFG.speed;
    } else {
      _GV_speed.call(this);
    }
  };

  var _GV_refresh = Game_Vehicle.prototype.refresh;
  Game_Vehicle.prototype.refresh = function() {
    if (this._type === 'vehicle4') {
      this.setImage(CFG.image, CFG.index);
      this._originalPattern = 1;
      this._pattern = 1;
      this._animationCount = 0;
      this.setTransparent(this._v4Hidden || this._mapId <= 0 || ($gameMap && this._mapId !== $gameMap.mapId()));
      return;
    }
    _GV_refresh.call(this);
  };

  var _GV_valid = Game_Vehicle.prototype.isValid;
  Game_Vehicle.prototype.isValid = function() {
    if (this._type === 'vehicle4') {
      if (this._v4Hidden || this._mapId <= 0) return false;
      return !$gameMap || this._mapId === $gameMap.mapId();
    }
    return _GV_valid.call(this);
  };

  var _GV_low = Game_Vehicle.prototype.isLowest;
  Game_Vehicle.prototype.isLowest = function() {
    return this._type === 'vehicle4' ? false : _GV_low.call(this);
  };

  var _GV_canPass = Game_Vehicle.prototype.canPass;
  Game_Vehicle.prototype.canPass = function(x, y, d) {
    if (this._type !== 'vehicle4') return _GV_canPass.call(this, x, y, d);

    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);

    if (!$gameMap.isValid(x2, y2)) return false;
    if (CFG.passType === 'any') return true;
    if (CFG.passType === 'water') return $gameMap.isShipPassable(x2, y2);

    if (CFG.passType === 'land') {
      return !$gameMap.isShipPassable(x2, y2) &&
        $gameMap.isPassable(x, y, d) &&
        $gameMap.isPassable(x2, y2, reverseDir(d));
    }

    return $gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, reverseDir(d));
  };

  var _GV_colV = Game_Vehicle.prototype.isCollidedWithVehicles;
  Game_Vehicle.prototype.isCollidedWithVehicles = function(x, y) {
    if (this._type === 'vehicle4') {
      return $gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y) || $gameMap.airship().posNt(x, y);
    }
    return _GV_colV.call(this, x, y);
  };

  var _GV_colE = Game_Vehicle.prototype.isCollidedWithEvents;
  Game_Vehicle.prototype.isCollidedWithEvents = function(x, y) {
    if (this._type === 'vehicle4') {
      return $gameMap.eventsXyNt(x, y).some(function(e) {
        return e.isNormalPriority() && !e._through;
      });
    }
    return _GV_colE.call(this, x, y);
  };

  var _GV_colC = Game_Vehicle.prototype.isCollidedWithCharacters;
  Game_Vehicle.prototype.isCollidedWithCharacters = function(x, y) {
    if (this._type === 'vehicle4') {
      return this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y);
    }
    return _GV_colC.call(this, x, y);
  };

  var _GCB_colV = Game_CharacterBase.prototype.isCollidedWithVehicles;
  Game_CharacterBase.prototype.isCollidedWithVehicles = function(x, y) {
    if (_GCB_colV.call(this, x, y)) return true;

    var vv = v4();
    if (!vv || !vv.isValid()) return false;
    if (this === vv) return false;
    if ($gamePlayer && $gamePlayer._vehicleType === 'vehicle4' && this === $gamePlayer) return false;

    return vv.posNt(x, y);
  };

  Game_Follower.prototype.isCollidedWithVehicles = function(x, y) {
    return Game_CharacterBase.prototype.isCollidedWithVehicles.call(this, x, y);
  };

  var _GM_create = Game_Map.prototype.createVehicles;
  Game_Map.prototype.createVehicles = function() {
    _GM_create.call(this);
    this._vehicle4 = new Game_Vehicle('vehicle4');
  };

  Game_Map.prototype.vehicle4 = function() {
    return this._vehicle4;
  };

  var _GM_vehicles = Game_Map.prototype.vehicles;
  Game_Map.prototype.vehicles = function() {
    var list = _GM_vehicles.call(this);
    if (this._vehicle4 && list.indexOf(this._vehicle4) < 0) {
      list.push(this._vehicle4);
    }
    return list;
  };

  var _GM_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _GM_setup.call(this, mapId);

    if (!this._vehicle4) {
      this._vehicle4 = new Game_Vehicle('vehicle4');
    }

    if (pendingCfg) {
      loadCfg(pendingCfg);
      pendingCfg = null;
      refreshV4();
    }

    if (pendingData) {
      applyV4(this._vehicle4, pendingData);
      pendingData = null;
    } else if (CFG.autoSpawn && !this._vehicle4._v4Hidden && this._vehicle4._mapId === 0 && $gamePlayer._vehicleType !== 'vehicle4') {
      this._vehicle4._v4Hidden = false;
      this._vehicle4.setLocation(CFG.spawnMapId > 0 ? CFG.spawnMapId : mapId, CFG.spawnX, CFG.spawnY);
    }

    this._vehicle4.refresh();
  };

  var _DM_make = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var c = _DM_make.call(this);
    c.vehicle4Data = saveV4(v4());
    c.vehicle4Config = cfgSave();
    return c;
  };

  var _DM_extract = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    _DM_extract.call(this, contents);

    if (contents.vehicle4Config) {
      if ($gameMap) {
        loadCfg(contents.vehicle4Config);
        refreshV4();
      } else {
        pendingCfg = contents.vehicle4Config;
      }
    }

    if (contents.vehicle4Data) {
      if ($gameMap && v4()) {
        applyV4(v4(), contents.vehicle4Data);
      } else {
        pendingData = contents.vehicle4Data;
      }
    }
  };

  var _GI_cmd = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _GI_cmd.call(this, command, args);
    if (command !== 'Vehicle4') return;

    var sub = String(args[0] || '');
    var v = v4();

    switch (sub) {
      case 'Spawn':
        if (v && $gamePlayer._vehicleType !== 'vehicle4') {
          v._v4Hidden = false;
          v.setLocation(Math.max(0, num(args[1], 0)), Math.max(0, num(args[2], 0)), Math.max(0, num(args[3], 0)));
          v.refresh();
        }
        break;

      case 'Recall':
        if (v && $gamePlayer._vehicleType !== 'vehicle4') {
          v._v4Hidden = false;
          v.setLocation(CFG.spawnMapId > 0 ? CFG.spawnMapId : $gameMap.mapId(), CFG.spawnX, CFG.spawnY);
          v.refresh();
        }
        break;

      case 'Hide':
        if (v && $gamePlayer._vehicleType !== 'vehicle4') {
          v._v4Hidden = true;
          v.setLocation(0, 0, 0);
          v.refresh();
        }
        break;

      case 'SetSpeed':
        CFG.speed = clamp(num(args[1], CFG.speed), 1, 6);
        refreshV4();
        break;

      case 'SetImage':
        CFG.image = img(args[1]);
        CFG.index = clamp(num(args[2], 0), 0, 7);
        refreshV4();
        break;

      case 'SetDirection':
        if (v) v.setDirection(dir(args[1]));
        break;

      case 'SetBoardRule':
        CFG.boardRule = pick(String(args[1] || ''), ['frontOrOn', 'frontOnly', 'frontOrSide', 'adjacentOrOn'], CFG.boardRule);
        break;

      case 'SetPassType':
        CFG.passType = pick(String(args[1] || ''), ['normal', 'land', 'water', 'any'], CFG.passType);
        break;
    }
  };

  var _GP_vehicle = Game_Player.prototype.vehicle;
  Game_Player.prototype.vehicle = function() {
    return this._vehicleType === 'vehicle4' ? v4() : _GP_vehicle.call(this);
  };

  var _GP_inV = Game_Player.prototype.isInVehicle;
  Game_Player.prototype.isInVehicle = function() {
    return this._vehicleType === 'vehicle4' ? true : _GP_inV.call(this);
  };

  var _GP_air = Game_Player.prototype.isInAirship;
  Game_Player.prototype.isInAirship = function() {
    return this._vehicleType === 'vehicle4' ? false : _GP_air.call(this);
  };

  var _GP_boat = Game_Player.prototype.isInBoat;
  Game_Player.prototype.isInBoat = function() {
    return this._vehicleType === 'vehicle4' ? false : _GP_boat.call(this);
  };

  var _GP_ship = Game_Player.prototype.isInShip;
  Game_Player.prototype.isInShip = function() {
    return this._vehicleType === 'vehicle4' ? false : _GP_ship.call(this);
  };

  var _GP_ladder = Game_Player.prototype.isOnLadder;
  Game_Player.prototype.isOnLadder = function() {
    return this._vehicleType === 'vehicle4' ? false : _GP_ladder.call(this);
  };

  var _GP_dash = Game_Player.prototype.isDashing;
  Game_Player.prototype.isDashing = function() {
    return this._vehicleType === 'vehicle4' && CFG.disableDash ? false : _GP_dash.call(this);
  };

  var _GP_enc = Game_Player.prototype.canEncounter;
  Game_Player.prototype.canEncounter = function() {
    if (this._vehicleType === 'vehicle4' && CFG.encounter === 0) return false;
    return _GP_enc.call(this);
  };

  var _GP_encProg = Game_Player.prototype.encounterProgressValue;
  Game_Player.prototype.encounterProgressValue = function() {
    if (this._vehicleType === 'vehicle4') {
      return _GP_encProg.call(this) * (CFG.encounter / 100);
    }
    return _GP_encProg.call(this);
  };

  var _GP_canPass = Game_Player.prototype.canPass;
  Game_Player.prototype.canPass = function(x, y, d) {
    if (this._vehicleType !== 'vehicle4') {
      return _GP_canPass.call(this, x, y, d);
    }

    var vv = v4();
    if (!vv || !vv.canPass(x, y, d)) return false;

    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);

    if ($gameMap.eventsXyNt(x2, y2).some(function(e) {
      return e.isNormalPriority() && !e._through;
    })) {
      return false;
    }

    return true;
  };

  var _GP_moveInput = Game_Player.prototype.moveByInput;
  Game_Player.prototype.moveByInput = function() {
    if (this._vehicleType === 'vehicle4') {
      if (!this.isMoving() && this.canMove()) {
        var d = this.getInputDirection();
        if (d > 0) this.moveStraight(d);
      }
      return;
    }
    _GP_moveInput.call(this);
  };

  var _GP_updateMove = Game_Player.prototype.updateMove;
  Game_Player.prototype.updateMove = function() {
    _GP_updateMove.call(this);
    syncVehicleToPlayer();
  };

  Game_Player.prototype.getOnVehicle4 = function(vv) {
    if (!vv || !vv.isValid()) return false;
    if (!boardOk(this, vv)) return false;

    finishBoard(vv);
    return true;
  };

  var _GP_getOff = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function() {
    if (this._vehicleType !== 'vehicle4') {
      return _GP_getOff.call(this);
    }

    syncVehicleToPlayer();

    var exit = findExit();
    if (!exit) return false;

    return finishGetOff(exit);
  };

  var _GP_onOff = Game_Player.prototype.getOnOffVehicle;
  Game_Player.prototype.getOnOffVehicle = function() {
    var vv = v4();

    if (this._vehicleType === 'vehicle4') {
      return this.getOffVehicle();
    }

    if (vv && vv.isValid() && boardOk(this, vv)) {
      return this.getOnVehicle4(vv);
    }

    return _GP_onOff.call(this);
  };

  var _GP_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
  Game_Player.prototype.triggerButtonAction = function() {
    if (Input.isTriggered('ok')) {
      if (this.getOnOffVehicle()) return true;
    }
    return _GP_triggerButtonAction.call(this);
  };

  var _GP_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function() {
    var wasInVehicle4 = this._vehicleType === 'vehicle4';

    _GP_performTransfer.call(this);

    if (wasInVehicle4) {
      syncVehicleToPlayer();
      var vv = v4();
      if (vv) {
        vv._driving = true;
        vv._vehicleOn = true;
        vv._v4Hidden = false;
        vv.initMoveSpeed();
        vv.refresh();
      }
    }
  };

})();