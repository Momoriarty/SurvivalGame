/*:
 * @plugindesc [V.1.3] Database Kendaraan Ke-4 (Custom System)
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
 * @help
 * ============================================================
 * Vehicle4_System - Kendaraan Ke-4 Custom (FIXED VERSION 1.3)
 * ============================================================
 *
 * CARA PENGGUNAAN:
 * 1. Buat event AUTORUN di map awal, isi dengan Script:
 *      $gameMap.vehicle4().setLocation(mapId, x, y);
 * 2. Tambah Page 2 dengan Self Switch A = ON, konten kosong
 *
 * 3. Tekan Enter di atas atau di depan kendaraan untuk naik
 * 4. Tekan Enter lagi untuk turun
 *
 * ============================================================
 */
(function () {
  "use strict";

  var params = PluginManager.parameters("Vehicle4_System");
  var vImg = String(params["Vehicle Image"] || "Vehicle");
  var vIdx = Number(params["Vehicle Index"] || 0);
  var vSpd = Number(params["Speed"] || 5);

  // Validasi gambar
  if (!vImg || vImg === "") {
    vImg = "Vehicle";
  }

  //==========================================================
  // GAME_VEHICLE
  //==========================================================

  var _alias_Game_Vehicle_initialize = Game_Vehicle.prototype.initialize;
  Game_Vehicle.prototype.initialize = function (type) {
    if (type === "vehicle4") {
      Game_Character.prototype.initialize.call(this);
      this._type = "vehicle4";
      this._mapId = 0;
      this._vehicleOn = false;
      this._driving = false;
      this._bgm = { name: "", pan: 0, pitch: 100, volume: 0 };
      this.setTransparent(false);
      this.initMoveSpeed();
      this.setImage(vImg, vIdx);
      this.setThrough(true);
    } else {
      _alias_Game_Vehicle_initialize.call(this, type);
    }
  };

  var _alias_Game_Vehicle_playBgm = Game_Vehicle.prototype.playBgm;
  Game_Vehicle.prototype.playBgm = function () {
    if (this._type === "vehicle4") return;
    _alias_Game_Vehicle_playBgm.call(this);
  };

  var _alias_Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
  Game_Vehicle.prototype.getOn = function () {
    if (this._type === "vehicle4") {
      this._driving = true;
      this._vehicleOn = true;
      this.setThrough(false);
      return;
    }
    _alias_Game_Vehicle_getOn.call(this);
  };

  var _alias_Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
  Game_Vehicle.prototype.getOff = function () {
    if (this._type === "vehicle4") {
      this._driving = false;
      this._vehicleOn = false;
      this.setThrough(true);
      return;
    }
    _alias_Game_Vehicle_getOff.call(this);
  };

  var _alias_Game_Vehicle_initMoveSpeed = Game_Vehicle.prototype.initMoveSpeed;
  Game_Vehicle.prototype.initMoveSpeed = function () {
    if (this._type === "vehicle4") {
      this._moveSpeed = vSpd;
    } else {
      _alias_Game_Vehicle_initMoveSpeed.call(this);
    }
  };

  var _alias_Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
  Game_Vehicle.prototype.refresh = function () {
    if (this._type === "vehicle4") {
      this.setImage(vImg, vIdx);
    } else {
      _alias_Game_Vehicle_refresh.call(this);
    }
  };

  var _alias_Game_Vehicle_isValid = Game_Vehicle.prototype.isValid;
  Game_Vehicle.prototype.isValid = function () {
    if (this._type === "vehicle4") {
      return this._mapId > 0;
    }
    return _alias_Game_Vehicle_isValid.call(this);
  };

  var _alias_Game_Vehicle_isLowest = Game_Vehicle.prototype.isLowest;
  Game_Vehicle.prototype.isLowest = function () {
    if (this._type === "vehicle4") {
      return !this._driving;
    }
    return _alias_Game_Vehicle_isLowest.call(this);
  };

  //==========================================================
  // GAME_MAP
  //==========================================================

  var _alias_Game_Map_createVehicles = Game_Map.prototype.createVehicles;
  Game_Map.prototype.createVehicles = function () {
    _alias_Game_Map_createVehicles.call(this);
    this._vehicle4 = new Game_Vehicle("vehicle4");
  };

  Game_Map.prototype.vehicle4 = function () {
    return this._vehicle4;
  };

  var _alias_Game_Map_vehicles = Game_Map.prototype.vehicles;
  Game_Map.prototype.vehicles = function () {
    var list = _alias_Game_Map_vehicles.call(this);
    if (this._vehicle4) list.push(this._vehicle4);
    return list;
  };

  var _alias_makeSaveContents = Game_Map.prototype.makeSaveContents;
  Game_Map.prototype.makeSaveContents = function () {
    var contents = _alias_makeSaveContents.call(this);
    contents.vehicle4 = this._vehicle4;
    return contents;
  };

  var _alias_extractSaveContents = Game_Map.prototype.extractSaveContents;
  Game_Map.prototype.extractSaveContents = function (contents) {
    _alias_extractSaveContents.call(this, contents);
    if (contents.vehicle4) {
      this._vehicle4 = contents.vehicle4;
    }
  };

  //==========================================================
  // GAME_PLAYER
  //==========================================================

  var _alias_Game_Player_vehicle = Game_Player.prototype.vehicle;
  Game_Player.prototype.vehicle = function () {
    if (this._vehicleType === "vehicle4") {
      return $gameMap.vehicle4 ? $gameMap.vehicle4() : null;
    }
    return _alias_Game_Player_vehicle.call(this);
  };

  var _alias_Game_Player_isInVehicle = Game_Player.prototype.isInVehicle;
  Game_Player.prototype.isInVehicle = function () {
    if (this._vehicleType === "vehicle4") return true;
    return _alias_Game_Player_isInVehicle.call(this);
  };

  var _alias_Game_Player_isInAirship = Game_Player.prototype.isInAirship;
  Game_Player.prototype.isInAirship = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _alias_Game_Player_isInAirship.call(this);
  };

  var _alias_Game_Player_isInBoat = Game_Player.prototype.isInBoat;
  Game_Player.prototype.isInBoat = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _alias_Game_Player_isInBoat.call(this);
  };

  var _alias_Game_Player_isInShip = Game_Player.prototype.isInShip;
  Game_Player.prototype.isInShip = function () {
    if (this._vehicleType === "vehicle4") return false;
    return _alias_Game_Player_isInShip.call(this);
  };

  // ============================================================
  // PERBAIKAN UTAMA: Override method processMoveCommand
  // ============================================================

  // Method ini yang sebenarnya menangani gerakan dari input
  var _alias_Game_Player_processMoveCommand =
    Game_Player.prototype.processMoveCommand;
  Game_Player.prototype.processMoveCommand = function (command) {
    if (this._vehicleType === "vehicle4") {
      // Proses gerakan seperti biasa
      _alias_Game_Player_processMoveCommand.call(this, command);
      // Sync vehicle position setelah bergerak
      var v = $gameMap.vehicle4();
      if (v && this._vehicleType === "vehicle4") {
        v.setPosition(this.x, this.y);
        v.setDirection(this.direction());
      }
      return;
    }
    _alias_Game_Player_processMoveCommand.call(this, command);
  };

  // ============================================================
  // Override canMove untuk vehicle
  // ============================================================
  var _alias_Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function () {
    if (this._vehicleType === "vehicle4") {
      if (this._vehicleGettingOn || this._vehicleGettingOff) return false;
      return true;
    }
    return _alias_Game_Player_canMove.call(this);
  };

  // ============================================================
  // FUNGSI NAIK KENDARAAN
  // ============================================================
  Game_Player.prototype.getOnVehicle4 = function (vehicle) {
    this._originalMoveSpeed = this._moveSpeed;
    this._vehicleType = "vehicle4";
    this._vehicleGettingOn = false;
    vehicle.getOn();
    this.locate(vehicle.x, vehicle.y);
    this.setMoveSpeed(vSpd);
    this.setTransparent(true);
    this.setWalkAnime(true);
    this.setStepAnime(false);
    this.setThrough(false);

    // Lock followers
    var followers = $gamePlayer.followers()._data;
    if (followers) {
      for (var i = 0; i < followers.length; i++) {
        if (followers[i]) followers[i]._locked = true;
      }
    }

    $gameMap.refresh();
    return true;
  };

  // ============================================================
  // FUNGSI TURUN KENDARAAN
  // ============================================================
  var _alias_Game_Player_canGetOffVehicle =
    Game_Player.prototype.canGetOffVehicle;
  Game_Player.prototype.canGetOffVehicle = function () {
    if (this._vehicleType === "vehicle4") {
      var v = $gameMap.vehicle4();
      if (!v) return false;
      var d = this.direction();
      var x = $gameMap.roundXWithDirection(v.x, d);
      var y = $gameMap.roundYWithDirection(v.y, d);
      return $gameMap.isValid(x, y) && $gameMap.isPassable(x, y, d);
    }
    return _alias_Game_Player_canGetOffVehicle.call(this);
  };

  var _alias_Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function () {
    if (this._vehicleType === "vehicle4") {
      if (this.canGetOffVehicle()) {
        var v = $gameMap.vehicle4();
        v.getOff();
        this._vehicleGettingOff = true;
        this.setThrough(true);
        this.forceMoveForward();
        return true;
      }
      return false;
    }
    return _alias_Game_Player_getOffVehicle.call(this);
  };

  // ============================================================
  // UPDATE GET ON/OFF
  // ============================================================
  var _alias_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
  Game_Player.prototype.updateVehicleGetOn = function () {
    if (this._vehicleType === "vehicle4") {
      this._vehicleGettingOn = false;
      return;
    }
    _alias_updateVehicleGetOn.call(this);
  };

  var _alias_updateVehicleGetOff = Game_Player.prototype.updateVehicleGetOff;
  Game_Player.prototype.updateVehicleGetOff = function () {
    if (this._vehicleType === "vehicle4") {
      if (!this.areFollowersGathering() && this.vehicle().isLowest()) {
        this._vehicleGettingOff = false;
        this._vehicleType = "walk";
        this.setTransparent(false);
        this.setWalkAnime(true);
        this.setStepAnime(true);
        this.setThrough(false);

        var originalSpeed = this._originalMoveSpeed || 4;
        this.setMoveSpeed(originalSpeed);
        delete this._originalMoveSpeed;

        // Unlock followers
        var followers = $gamePlayer.followers()._data;
        if (followers) {
          for (var i = 0; i < followers.length; i++) {
            if (followers[i]) followers[i]._locked = false;
          }
        }

        $gameMap.refresh();
      }
      return;
    }
    _alias_updateVehicleGetOff.call(this);
  };

  // ============================================================
  // DETEKSI NAIK/TURUN
  // ============================================================
  var _alias_Game_Player_getOnOffVehicle =
    Game_Player.prototype.getOnOffVehicle;
  Game_Player.prototype.getOnOffVehicle = function () {
    // Jika sudah di vehicle4 -> turun
    if (this._vehicleType === "vehicle4") {
      return this.getOffVehicle();
    }

    // CEK VEHICLE4 UNTUK DINAIKI
    var v4 = $gameMap.vehicle4();
    if (v4 && v4.isValid()) {
      var d = this.direction();
      var frontX = $gameMap.roundXWithDirection(this.x, d);
      var frontY = $gameMap.roundYWithDirection(this.y, d);

      if (v4.pos(this.x, this.y) || v4.pos(frontX, frontY)) {
        return this.getOnVehicle4(v4);
      }
    }

    // Cek vehicle default
    if (this.isOnBoat() || this.isOnShip() || this.isOnAirship()) {
      return this.getOffVehicle();
    }

    return _alias_Game_Player_getOnOffVehicle.call(this);
  };

  // ============================================================
  // SYNC POSISI VEHICLE SETIAP FRAME
  // ============================================================
  var _alias_Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _alias_Game_Player_update.call(this, sceneActive);
    if (this._vehicleType === "vehicle4") {
      var v = $gameMap.vehicle4();
      if (v) {
        v.setPosition(this.x, this.y);
        v.setDirection(this.direction());
      }
    }
  };

  // ============================================================
  // PERBAIKAN: Override executeMove untuk vehicle
  // ============================================================
  var _alias_Game_Player_executeMove = Game_Player.prototype.executeMove;
  Game_Player.prototype.executeMove = function (direction) {
    if (this._vehicleType === "vehicle4") {
      this.moveStraight(direction);
    } else {
      _alias_Game_Player_executeMove.call(this, direction);
    }
  };

  // DEBUG: Tampilkan status saat mencoba gerak
  var _debug_move = Game_Player.prototype.moveByInput;
  Game_Player.prototype.moveByInput = function () {
    if (this._vehicleType === "vehicle4") {
      console.log("Vehicle4 moving, direction:", Input.dir4);
      console.log("canMove:", this.canMove());
      console.log("isMoving:", this.isMoving());
    }
    _debug_move.call(this);
  };
})();
