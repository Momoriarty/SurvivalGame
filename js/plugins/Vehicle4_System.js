/*:
 * @plugindesc [V.1.4] Database Kendaraan Ke-4 (Custom System) - Boarding Style Like Default Vehicle
 * @author Nama Kamu
 *
 * @param --- Pengaturan Visual ---
 * @default
 *
 * @param Vehicle Image
 * @parent --- Pengaturan Visual ---
 * @type file
 * @dir img/characters/
 * @desc Pilih gambar untuk kendaraan ke-4 kamu.
 * @default Vehicle
 *
 * @param Vehicle Index
 * @parent --- Pengaturan Visual ---
 * @type number
 * @min 0
 * @max 7
 * @desc Indeks gambar (0-7).
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
 * @desc Persentase encounter saat naik kendaraan (0 = tidak ada encounter, 100 = normal).
 * @default 0
 *
 * @param Disable Dash
 * @parent --- Pengaturan Sistem ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @desc Nonaktifkan dash saat naik kendaraan?
 * @default true
 *
 * @param --- Pengaturan Spawn Otomatis ---
 * @default
 *
 * @param Auto Spawn
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type boolean
 * @on Ya
 * @off Tidak
 * @desc Spawn vehicle4 otomatis tanpa Autorun Event?
 * @default false
 *
 * @param Spawn Map ID
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
 * @desc Map ID tempat vehicle4 di-spawn. (0 = nonaktif)
 * @default 0
 *
 * @param Spawn X
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
 * @desc Koordinat X spawn.
 * @default 0
 *
 * @param Spawn Y
 * @parent --- Pengaturan Spawn Otomatis ---
 * @type number
 * @min 0
 * @desc Koordinat Y spawn.
 * @default 0
 *
 * @param --- Pengaturan Passability ---
 * @default
 *
 * @param Passability Type
 * @parent --- Pengaturan Passability ---
 * @type select
 * @option Normal (seperti jalan kaki)
 * @value normal
 * @option Hanya di darat (tidak bisa di air)
 * @value land
 * @option Hanya di air (seperti kapal)
 * @value water
 * @option Bisa di mana saja (seperti airship)
 * @value any
 * @desc Atur tile yang bisa dilewati vehicle4.
 * @default normal
 *
 * @param --- Pengaturan Audio ---
 * @default
 *
 * @param BGM Name
 * @parent --- Pengaturan Audio ---
 * @type file
 * @dir audio/bgm/
 * @desc BGM yang diputar saat naik kendaraan. Kosongkan jika tidak ingin mengubah BGM.
 * @default
 *
 * @param BGM Volume
 * @parent --- Pengaturan Audio ---
 * @type number
 * @min 0
 * @max 100
 * @desc Volume BGM (0-100).
 * @default 90
 *
 * @param BGM Pitch
 * @parent --- Pengaturan Audio ---
 * @type number
 * @min 50
 * @max 150
 * @desc Pitch BGM (50-150).
 * @default 100
 *
 * @param SE Get On
 * @parent --- Pengaturan Audio ---
 * @type file
 * @dir audio/se/
 * @desc Suara efek saat naik kendaraan.
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
 * @desc Suara efek saat turun kendaraan.
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
 * Vehicle4_System v1.4 - Kendaraan Ke-4 Custom
 * ============================================================
 * CHANGELOG v1.4:
 *  - FIX: Animasi naik/turun kini mengikuti style kendaraan bawaan MV
 *  - FIX: Player maju ke tile vehicle saat naik
 *  - FIX: Player turun ke depan vehicle seperti boat/ship default
 *  - FIX: Hapus fade custom agar kamera dan timing lebih natural
 *
 * ============================================================
 * CARA PAKAI:
 *
 * [Spawn Manual] Buat Autorun Event di map:
 *   $gameMap.vehicle4().setLocation(mapId, x, y);
 *   Tambah Page 2 dengan Self Switch A = ON, contents kosong.
 *
 * [Spawn Otomatis] Aktifkan "Auto Spawn" di parameter plugin,
 *   lalu set Spawn Map ID, Spawn X, Spawn Y.
 *
 * Tekan Enter di atas kendaraan untuk naik/turun.
 * ============================================================
 */
(function () {
  'use strict';

  var params = PluginManager.parameters('Vehicle4_System');
  var vImg = String(params['Vehicle Image'] || '');
  var vIdx = Number(params['Vehicle Index'] || 0);
  var vSpd = Number(params['Speed'] || 5);
  var vEncRate = Number(params['Encounter Rate'] || 0);
  var vDashOff = (params['Disable Dash'] === 'true');
  var vAutoSpawn = (params['Auto Spawn'] === 'true');
  var vSpawnMap = Number(params['Spawn Map ID'] || 0);
  var vSpawnX = Number(params['Spawn X'] || 0);
  var vSpawnY = Number(params['Spawn Y'] || 0);
  var vPassType = String(params['Passability Type'] || 'normal');
  var vBgmName = String(params['BGM Name'] || '');
  var vBgmVol = Number(params['BGM Volume'] || 90);
  var vBgmPitch = Number(params['BGM Pitch'] || 100);
  var vSeOn = String(params['SE Get On'] || '');
  var vSeOnVol = Number(params['SE Get On Volume'] || 90);
  var vSeOff = String(params['SE Get Off'] || '');
  var vSeOffVol = Number(params['SE Get Off Volume'] || 90);

  var _pendingVehicle4Save = null;

  function playSe(name, volume) {
    if (name) {
      AudioManager.playSe({ name: name, volume: volume, pitch: 100, pan: 0 });
    }
  }

  //==========================================================
  // GAME_VEHICLE
  //==========================================================

  var _alias_Game_Vehicle_initialize = Game_Vehicle.prototype.initialize;
  Game_Vehicle.prototype.initialize = function (type) {
    if (type === 'vehicle4') {
      Game_Character.prototype.initialize.call(this);
      this._type = 'vehicle4';
      this._mapId = 0;
      this._vehicleOn = false;
      this._driving = false;
      this._bgm = { name: vBgmName, volume: vBgmVol, pitch: vBgmPitch, pan: 0 };
      this._priorityType = 1;
      this._through = false;
      this.setTransparent(false);
      this.initMoveSpeed();
      this.setImage(vImg, vIdx);
    } else {
      _alias_Game_Vehicle_initialize.call(this, type);
    }
  };

  var _alias_Game_Vehicle_playBgm = Game_Vehicle.prototype.playBgm;
  Game_Vehicle.prototype.playBgm = function () {
    if (this._type === 'vehicle4') {
      if (vBgmName) {
        AudioManager.playBgm({ name: vBgmName, volume: vBgmVol, pitch: vBgmPitch, pan: 0 });
      }
      return;
    }
    _alias_Game_Vehicle_playBgm.call(this);
  };

  var _alias_Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
  Game_Vehicle.prototype.getOn = function () {
    if (this._type === 'vehicle4') {
      this._driving = true;
      this._vehicleOn = true;
      this.setWalkAnime(true);
      this.setStepAnime(false);
      this.refresh();
      return;
    }
    _alias_Game_Vehicle_getOn.call(this);
  };

  var _alias_Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
  Game_Vehicle.prototype.getOff = function () {
    if (this._type === 'vehicle4') {
      this._driving = false;
      this._vehicleOn = false;
      this.setWalkAnime(false);
      this.setStepAnime(false);
      this.refresh();
      return;
    }
    _alias_Game_Vehicle_getOff.call(this);
  };

  var _alias_Game_Vehicle_initMoveSpeed = Game_Vehicle.prototype.initMoveSpeed;
  Game_Vehicle.prototype.initMoveSpeed = function () {
    if (this._type === 'vehicle4') {
      this._moveSpeed = vSpd;
    } else {
      _alias_Game_Vehicle_initMoveSpeed.call(this);
    }
  };

  var _alias_Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
  Game_Vehicle.prototype.refresh = function () {
    if (this._type === 'vehicle4') {
      this.setImage(vImg, vIdx);
      this._animationCount = 0;
      this._originalPattern = 1;
      this._pattern = 1;
      return;
    }
    _alias_Game_Vehicle_refresh.call(this);
  };

  var _alias_Game_Vehicle_isValid = Game_Vehicle.prototype.isValid;
  Game_Vehicle.prototype.isValid = function () {
    if (this._type === 'vehicle4') {
      return this._mapId > 0;
    }
    return _alias_Game_Vehicle_isValid.call(this);
  };

  var _alias_Game_Vehicle_isLowest = Game_Vehicle.prototype.isLowest;
  Game_Vehicle.prototype.isLowest = function () {
    if (this._type === 'vehicle4') {
      return !this._driving;
    }
    return _alias_Game_Vehicle_isLowest.call(this);
  };

  var _alias_Game_Vehicle_canPass = Game_Vehicle.prototype.canPass;
  Game_Vehicle.prototype.canPass = function (x, y, d) {
    if (this._type === 'vehicle4') {
      var x2 = $gameMap.roundXWithDirection(x, d);
      var y2 = $gameMap.roundYWithDirection(y, d);
      if (!$gameMap.isValid(x2, y2)) return false;
      if (vPassType === 'any') return true;
      if (vPassType === 'water') {
        return $gameMap.isShipPassable(x2, y2);
      }
      if (vPassType === 'land') {
        return !$gameMap.isShipPassable(x2, y2) &&
          $gameMap.isPassable(x, y, d) &&
          $gameMap.isPassable(x2, y2, this.reverseDir(d));
      }
      if (!$gameMap.isPassable(x, y, d)) return false;
      if (!$gameMap.isPassable(x2, y2, this.reverseDir(d))) return false;
      return true;
    }
    return _alias_Game_Vehicle_canPass.call(this, x, y, d);
  };

  var _alias_Game_Vehicle_isCollidedWithVehicles = Game_Vehicle.prototype.isCollidedWithVehicles;
  Game_Vehicle.prototype.isCollidedWithVehicles = function (x, y) {
    if (this._type === 'vehicle4') {
      return $gameMap.boat().posNt(x, y) ||
        $gameMap.ship().posNt(x, y) ||
        $gameMap.airship().posNt(x, y);
    }
    return _alias_Game_Vehicle_isCollidedWithVehicles.call(this, x, y);
  };

  var _alias_Game_Vehicle_isCollidedWithCharacters = Game_Vehicle.prototype.isCollidedWithCharacters;
  Game_Vehicle.prototype.isCollidedWithCharacters = function (x, y) {
    if (this._type === 'vehicle4') {
      return this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y);
    }
    return _alias_Game_Vehicle_isCollidedWithCharacters.call(this, x, y);
  };

  var _alias_Game_Vehicle_isCollidedWithEvents = Game_Vehicle.prototype.isCollidedWithEvents;
  Game_Vehicle.prototype.isCollidedWithEvents = function (x, y) {
    if (this._type === 'vehicle4') {
      var events = $gameMap.eventsXyNt(x, y);
      return events.some(function (event) {
        return event.isNormalPriority();
      });
    }
    return _alias_Game_Vehicle_isCollidedWithEvents.call(this, x, y);
  };

  //==========================================================
  // Collision dengan vehicle4
  //==========================================================

  var _alias_Game_CharacterBase_isCollidedWithVehicles = Game_CharacterBase.prototype.isCollidedWithVehicles;
  Game_CharacterBase.prototype.isCollidedWithVehicles = function (x, y) {
    var result = _alias_Game_CharacterBase_isCollidedWithVehicles.call(this, x, y);
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

  var _alias_Game_Map_createVehicles = Game_Map.prototype.createVehicles;
  Game_Map.prototype.createVehicles = function () {
    _alias_Game_Map_createVehicles.call(this);
    this._vehicle4 = new Game_Vehicle('vehicle4');
  };

  Game_Map.prototype.vehicle4 = function () {
    return this._vehicle4;
  };

  var _alias_Game_Map_vehicles = Game_Map.prototype.vehicles;
  Game_Map.prototype.vehicles = function () {
    var list = _alias_Game_Map_vehicles.call(this);
    if (this._vehicle4 && list.indexOf(this._vehicle4) < 0) {
      list.push(this._vehicle4);
    }
    return list;
  };

  var _alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _alias_Game_Map_setup.call(this, mapId);

    if (_pendingVehicle4Save) {
      this._vehicle4 = _pendingVehicle4Save;
      _pendingVehicle4Save = null;
    } else if (!this._vehicle4) {
      this._vehicle4 = new Game_Vehicle('vehicle4');
    }

    if (vAutoSpawn && vSpawnMap > 0 && this._vehicle4) {
      if (this._vehicle4._mapId === 0) {
        this._vehicle4.setLocation(vSpawnMap, vSpawnX, vSpawnY);
      }
    }
  };

  //==========================================================
  // DATA_MANAGER
  //==========================================================

  var _alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _alias_DataManager_makeSaveContents.call(this);
    contents.vehicle4 = ($gameMap && $gameMap._vehicle4) ? $gameMap._vehicle4 : null;
    return contents;
  };

  var _alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _alias_DataManager_extractSaveContents.call(this, contents);
    if (contents.vehicle4) {
      if ($gameMap) {
        $gameMap._vehicle4 = contents.vehicle4;
      } else {
        _pendingVehicle4Save = contents.vehicle4;
      }
    }
  };

  //==========================================================
  // GAME_PLAYER
  //==========================================================

  var _alias_Game_Player_vehicle = Game_Player.prototype.vehicle;
  Game_Player.prototype.vehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      return $gameMap.vehicle4 ? $gameMap.vehicle4() : null;
    }
    return _alias_Game_Player_vehicle.call(this);
  };

  var _alias_Game_Player_isInVehicle = Game_Player.prototype.isInVehicle;
  Game_Player.prototype.isInVehicle = function () {
    if (this._vehicleType === 'vehicle4') return true;
    return _alias_Game_Player_isInVehicle.call(this);
  };

  var _alias_Game_Player_isInAirship = Game_Player.prototype.isInAirship;
  Game_Player.prototype.isInAirship = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _alias_Game_Player_isInAirship.call(this);
  };

  var _alias_Game_Player_isInBoat = Game_Player.prototype.isInBoat;
  Game_Player.prototype.isInBoat = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _alias_Game_Player_isInBoat.call(this);
  };

  var _alias_Game_Player_isInShip = Game_Player.prototype.isInShip;
  Game_Player.prototype.isInShip = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _alias_Game_Player_isInShip.call(this);
  };

  var _alias_Game_Player_isOnLadder = Game_Player.prototype.isOnLadder;
  Game_Player.prototype.isOnLadder = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _alias_Game_Player_isOnLadder.call(this);
  };

  var _alias_Game_Player_isDashing = Game_Player.prototype.isDashing;
  Game_Player.prototype.isDashing = function () {
    if (this._vehicleType === 'vehicle4' && vDashOff) return false;
    return _alias_Game_Player_isDashing.call(this);
  };

  var _alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function () {
    if (this._vehicleType === 'vehicle4') {
      if (this._vehicleGettingOn || this._vehicleGettingOff) return false;
      return true;
    }
    return _alias_Game_Player_canMove.call(this);
  };

  var _alias_Game_Player_canEncounter = Game_Player.prototype.canEncounter;
  Game_Player.prototype.canEncounter = function () {
    if (this._vehicleType === 'vehicle4' && vEncRate === 0) {
      return false;
    }
    return _alias_Game_Player_canEncounter.call(this);
  };

  var _alias_Game_Player_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
  Game_Player.prototype.encounterProgressValue = function () {
    if (this._vehicleType === 'vehicle4') {
      return _alias_Game_Player_encounterProgressValue.call(this) * (vEncRate / 100);
    }
    return _alias_Game_Player_encounterProgressValue.call(this);
  };

  var _alias_Game_Player_canPassV4 = Game_Player.prototype.canPass;
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
    return _alias_Game_Player_canPassV4.call(this, x, y, d);
  };

  var _alias_Game_Player_moveByInput = Game_Player.prototype.moveByInput;
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
    _alias_Game_Player_moveByInput.call(this);
  };

  var _alias_Game_Player_updateMove = Game_Player.prototype.updateMove;
  Game_Player.prototype.updateMove = function () {
    _alias_Game_Player_updateMove.call(this);
    if (this._vehicleType === 'vehicle4' && !this._vehicleGettingOff) {
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

  var _alias_Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
  Game_Player.prototype.getOnOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      return this.getOffVehicle();
    }
    if ($gameMap.vehicle4 && $gameMap.vehicle4()) {
      var v = $gameMap.vehicle4();
      if (v.isValid()) {
        var d = this.direction();
        var frontX = $gameMap.roundXWithDirection(this.x, d);
        var frontY = $gameMap.roundYWithDirection(this.y, d);
        if (v.pos(this.x, this.y) || v.pos(frontX, frontY)) {
          return this.getOnVehicle4(v);
        }
      }
    }
    return _alias_Game_Player_getOnOffVehicle.call(this);
  };

  Game_Player.prototype.getOnVehicle4 = function (v) {
    this._vehicleType = 'vehicle4';
    this._vehicleGettingOn = true;
    this._vehicle4Pending = v;
    this.setThrough(true);

    if (!v.pos(this.x, this.y)) {
      this.forceMoveForward();
    }

    this.gatherFollowers();
    return true;
  };

  var _alias_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
  Game_Player.prototype.updateVehicleGetOn = function () {
    if (this._vehicleType === 'vehicle4') {
      if (this.areFollowersGathering() || this.isMoving()) {
        return;
      }

      if (this._vehicleGettingOn) {
        var v = this._vehicle4Pending || $gameMap.vehicle4();
        if (v) {
          this.setDirection(v.direction());
          this.setMoveSpeed(vSpd);
          this.setTransparent(true);
          this.setWalkAnime(false);
          this.setStepAnime(false);
          v.getOn();
          playSe(vSeOn, vSeOnVol);
          if (vBgmName) {
            AudioManager.playBgm({ name: vBgmName, volume: vBgmVol, pitch: vBgmPitch, pan: 0 });
          }
        }
        this._vehicleGettingOn = false;
        this._vehicle4Pending = null;
      }
      return;
    }
    _alias_updateVehicleGetOn.call(this);
  };

  var _alias_updateVehicleGetOff = Game_Player.prototype.updateVehicleGetOff;
  Game_Player.prototype.updateVehicleGetOff = function () {
    if (this._vehicleType === 'vehicle4') {
      if (this.areFollowersGathering() || this.isMoving()) {
        return;
      }

      if (this._vehicleGettingOff) {
        this._vehicleGettingOff = false;
        this._vehicleType = 'walk';
        this.setTransparent(false);
        this.setMoveSpeed(4);
        this.setWalkAnime(true);
        this.setStepAnime(false);
        this.setThrough(false);
        this._followers.synchronize(this.x, this.y, this.direction());
        $gameMap.autoplay();
      }
      return;
    }
    _alias_updateVehicleGetOff.call(this);
  };

  var _alias_Game_Player_canGetOffVehicle = Game_Player.prototype.canGetOffVehicle;
  Game_Player.prototype.canGetOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      var v = $gameMap.vehicle4();
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

      var v4 = $gameMap.vehicle4();
      if (v4 && !v4.posNt(v.x, v.y) && v4.posNt(x, y)) return false;

      return true;
    }
    return _alias_Game_Player_canGetOffVehicle.call(this);
  };

  var _alias_Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      if (this.canGetOffVehicle()) {
        var v = $gameMap.vehicle4();
        this._vehicleGettingOff = true;
        this.setDirection(v.direction());
        v.getOff();
        playSe(vSeOff, vSeOffVol);
        this.forceMoveForward();
        this.setTransparent(false);
        this.gatherFollowers();
        return true;
      }
      return false;
    }
    return _alias_Game_Player_getOffVehicle.call(this);
  };

})();