/*:
 * @plugindesc [V.1.3] Database Kendaraan Ke-4 (Custom System) - Fixed
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
 * Vehicle4_System v1.3 - Kendaraan Ke-4 Custom (Fixed)
 * ============================================================
 * CHANGELOG v1.3:
 *  - FIX: Animasi fade-out halus saat naik (karakter tidak tiba-tiba hilang)
 *  - FIX: Animasi fade-in halus saat turun (karakter tidak tiba-tiba muncul)
 *  - FIX: Kamera tidak lagi bergeser prematur saat animasi naik/turun
 *  - FIX: Semua follower ikut fade bersama player secara sinkron
 *
 * CHANGELOG v1.2:
 *  - FIX: Player/event tidak bisa lagi tembus ke vehicle4
 *  - FIX: Animasi naik/turun kini berjalan untuk semua follower (>1 aktor)
 *  - FIX: Tidak bisa turun jika di depan ada event/karakter
 *
 * CHANGELOG v1.1:
 *  - FIX: Save/Load dipindah ke DataManager (data kini tersimpan benar)
 *  - FIX: Opacity pemain selalu kembali normal saat turun kendaraan
 *  - FIX: Vehicle4 tidak lagi bertabrakan dengan dirinya sendiri
 *  - FIX: Auto-spawn tidak crash jika save lama tidak memiliki vehicle4
 *  - FIX: Posisi vehicle4 tidak melompat saat bergerak (sync realX/realY)
 *  - FIX: extractSaveContents aman walau $gameMap belum siap
 *  - FIX: Encounter rate 0 kini benar-benar memblokir semua encounter
 *  - FIX: refresh() vehicle4 kini mereset animasi frame dengan benar
 *  - FIX: isOnLadder di-override agar tidak konflik saat di atas tile tangga
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

  // Variabel sementara untuk menjembatani DataManager.extractSaveContents
  // dengan Game_Map.setup (karena $gameMap belum tentu siap saat extract)
  var _pendingVehicle4Save = null;

  // Konstanta animasi fade naik/turun
  // Durasi fade dalam frame (60fps = 1 detik). 18 frame ≈ 0.3 detik
  var FADE_DURATION = 18;

  //==========================================================
  // HELPER: Play SE
  //==========================================================
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

  // BGM kustom saat naik
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
      return;
    }
    _alias_Game_Vehicle_getOn.call(this);
  };

  var _alias_Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
  Game_Vehicle.prototype.getOff = function () {
    if (this._type === 'vehicle4') {
      this._driving = false;
      this._vehicleOn = false;
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

  // FIX: refresh() kini mereset animasi frame agar tidak stuck
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
      return (this._mapId > 0);
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

  // Passability kustom
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
      // normal
      if (!$gameMap.isPassable(x, y, d)) return false;
      if (!$gameMap.isPassable(x2, y2, this.reverseDir(d))) return false;
      return true;
    }
    return _alias_Game_Vehicle_canPass.call(this, x, y, d);
  };

  // FIX: vehicle4 tidak bertabrakan dengan dirinya sendiri
  var _alias_Game_Vehicle_isCollidedWithVehicles = Game_Vehicle.prototype.isCollidedWithVehicles;
  Game_Vehicle.prototype.isCollidedWithVehicles = function (x, y) {
    if (this._type === 'vehicle4') {
      return $gameMap.boat().posNt(x, y) ||
        $gameMap.ship().posNt(x, y) ||
        $gameMap.airship().posNt(x, y);
    }
    return _alias_Game_Vehicle_isCollidedWithVehicles.call(this, x, y);
  };

  // Collision dengan events untuk vehicle4
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
  // BUG 1 FIX: Karakter & event tidak bisa tembus vehicle4
  // isCollidedWithVehicles bawaan tidak mengenal vehicle4,
  // sehingga semua karakter bisa jalan menembus kendaraan.
  //==========================================================

  var _alias_Game_CharacterBase_isCollidedWithVehicles = Game_CharacterBase.prototype.isCollidedWithVehicles;
  Game_CharacterBase.prototype.isCollidedWithVehicles = function (x, y) {
    var result = _alias_Game_CharacterBase_isCollidedWithVehicles.call(this, x, y);
    if (result) return true;
    // Jangan cek jika ini vehicle4 itu sendiri, atau pemain yg sedang naik
    if ($gameMap.vehicle4 && this === $gameMap.vehicle4()) return false;
    if ($gamePlayer._vehicleType === 'vehicle4' && this === $gamePlayer) return false;
    var v4 = $gameMap.vehicle4 && $gameMap.vehicle4();
    if (v4 && v4.isValid() && v4.posNt(x, y)) return true;
    return false;
  };

  // Follower juga harus ikut dicegah menembus vehicle4
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
    if (this._vehicle4) list.push(this._vehicle4);
    return list;
  };

  // FIX: Auto Spawn dengan null-check + inject data save yang tertunda
  var _alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _alias_Game_Map_setup.call(this, mapId);

    // Jika ada data vehicle4 dari save file yang menunggu, inject sekarang
    if (_pendingVehicle4Save) {
      this._vehicle4 = _pendingVehicle4Save;
      _pendingVehicle4Save = null;
    } else if (!this._vehicle4) {
      // Fallback: pastikan _vehicle4 selalu ada (misal save lama)
      this._vehicle4 = new Game_Vehicle('vehicle4');
    }

    // Auto Spawn
    if (vAutoSpawn && vSpawnMap > 0 && this._vehicle4) {
      if (this._vehicle4._mapId === 0) {
        this._vehicle4.setLocation(vSpawnMap, vSpawnX, vSpawnY);
      }
    }
  };

  //==========================================================
  // DATA_MANAGER — FIX: Save/Load dipindah ke sini (bukan Game_Map)
  //==========================================================

  var _alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _alias_DataManager_makeSaveContents.call(this);
    contents.vehicle4 = ($gameMap && $gameMap._vehicle4) ? $gameMap._vehicle4 : null;
    return contents;
  };

  // FIX: Gunakan variabel penampung sementara agar aman walau $gameMap belum siap
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
      return ($gameMap.vehicle4 ? $gameMap.vehicle4() : null);
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

  // FIX: isOnLadder di-override agar tidak konflik dengan tile tangga
  var _alias_Game_Player_isOnLadder = Game_Player.prototype.isOnLadder;
  Game_Player.prototype.isOnLadder = function () {
    if (this._vehicleType === 'vehicle4') return false;
    return _alias_Game_Player_isOnLadder.call(this);
  };

  // Dash disable
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

  // FIX: canEncounter — encounter rate 0 memblokir semua jenis encounter
  var _alias_Game_Player_canEncounter = Game_Player.prototype.canEncounter;
  Game_Player.prototype.canEncounter = function () {
    if (this._vehicleType === 'vehicle4' && vEncRate === 0) {
      return false;
    }
    return _alias_Game_Player_canEncounter.call(this);
  };

  // Encounter rate kustom (untuk rate > 0)
  var _alias_Game_Player_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
  Game_Player.prototype.encounterProgressValue = function () {
    if (this._vehicleType === 'vehicle4') {
      return _alias_Game_Player_encounterProgressValue.call(this) * (vEncRate / 100);
    }
    return _alias_Game_Player_encounterProgressValue.call(this);
  };

  // canPass player saat di vehicle4
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

  // moveByInput
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

  // FIX: updateMove — sync realX/realY dulu, _x/_y hanya setelah selesai bergerak
  var _alias_Game_Player_updateMove = Game_Player.prototype.updateMove;
  Game_Player.prototype.updateMove = function () {
    _alias_Game_Player_updateMove.call(this);
    if (this._vehicleType === 'vehicle4' && !this._vehicleGettingOff) {
      var v = $gameMap.vehicle4();
      if (v) {
        // Selalu sync interpolasi real position
        v._realX = this._realX;
        v._realY = this._realY;
        // Tile position hanya di-update setelah gerakan selesai
        if (!this.isMoving()) {
          v._x = this._x;
          v._y = this._y;
        }
        v.setDirection(this.direction());
      }
    }
  };

  // getOnOffVehicle - dipanggil saat Enter
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

  //----------------------------------------------------------
  // Helper: set opacity player + semua follower sekaligus
  //----------------------------------------------------------
  function setPartyOpacity(opacity) {
    $gamePlayer.setOpacity(opacity);
    $gamePlayer.followers().forEach(function (f) {
      f.setOpacity(opacity);
    });
  }

  //----------------------------------------------------------
  // NAIK vehicle4:
  // - Set _vehicleGettingOn = true agar canMove() blokir input
  // - Simpan state awal, mulai fade-out counter
  // - Kamera tidak bergeser sampai fade selesai
  //----------------------------------------------------------
  Game_Player.prototype.getOnVehicle4 = function (v) {
    this._vehicleType = 'vehicle4';
    this._vehicleGettingOn = true;   // blokir input selama animasi
    this._v4FadeInCounter = 0;      // tidak dipakai saat naik, reset saja
    this._v4FadeOutCounter = FADE_DURATION; // hitung mundur fade-out
    this._v4PendingGetOn = v;      // simpan ref vehicle, selesaikan di updateVehicleGetOn
    // Posisi & state awal — player masih terlihat, fade dilakukan per-frame
    this.setPosition(v.x, v.y);
    this.setThrough(false);
    this.setWalkAnime(false);
    this.setStepAnime(false);
    // opacity masih 255, akan diturunkan bertahap di updateVehicleGetOn
    return true;
  };

  //----------------------------------------------------------
  // Update naik: fade-out player+followers frame demi frame
  // Setelah counter habis, selesaikan getOn + mainkan SE/BGM
  //----------------------------------------------------------
  var _alias_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
  Game_Player.prototype.updateVehicleGetOn = function () {
    if (this._vehicleType === 'vehicle4') {
      if (!this._vehicleGettingOn) return;
      if (this._v4FadeOutCounter > 0) {
        // Hitung opacity sesuai sisa counter (255 → 0 linear)
        var ratio = this._v4FadeOutCounter / FADE_DURATION;
        var opacity = Math.round(255 * ratio);
        setPartyOpacity(opacity);
        this._v4FadeOutCounter--;
      } else {
        // Fade selesai — sembunyikan penuh & tuntaskan getOn
        setPartyOpacity(0);
        var v = this._v4PendingGetOn;
        if (v) {
          v.getOn();
          playSe(vSeOn, vSeOnVol);
          if (vBgmName) {
            AudioManager.playBgm({ name: vBgmName, volume: vBgmVol, pitch: vBgmPitch, pan: 0 });
          }
        }
        this.setMoveSpeed(vSpd);
        this.setWalkAnime(true);
        this._transparent = false;
        this._v4PendingGetOn = null;
        this._vehicleGettingOn = false; // buka input
        this.gatherFollowers();
      }
      return;
    }
    _alias_updateVehicleGetOn.call(this);
  };

  //----------------------------------------------------------
  // Update turun: tunggu gerakan & followers selesai,
  // lalu fade-in player+followers frame demi frame
  // Kamera tidak bergeser sampai fade-in selesai
  //----------------------------------------------------------
  var _alias_updateVehicleGetOff = Game_Player.prototype.updateVehicleGetOff;
  Game_Player.prototype.updateVehicleGetOff = function () {
    if (this._vehicleType === 'vehicle4') {
      if (!this._vehicleGettingOff) return;

      // Fase 1: tunggu gerakan forceMoveForward + followers selesai
      if (this.isMoving() || this.areFollowersGathering()) return;

      // Fase 2: fade-in counter belum ada → inisialisasi
      if (this._v4FadeInCounter === undefined || this._v4FadeInCounter < 0) {
        this._v4FadeInCounter = 0;
      }

      if (this._v4FadeInCounter < FADE_DURATION) {
        // Naikkan opacity 0 → 255 linear
        var ratio = this._v4FadeInCounter / FADE_DURATION;
        var opacity = Math.round(255 * ratio);
        setPartyOpacity(opacity);
        this._v4FadeInCounter++;
      } else {
        // Fade-in selesai — tuntaskan state turun
        setPartyOpacity(255);
        this._v4FadeInCounter = -1;
        this._vehicleGettingOff = false;
        this._vehicleType = 'walk';
        this.setWalkAnime(true);
        this.setStepAnime(false);
        this.setThrough(false);
        this.setMoveSpeed(4);
        this._animationCount = 0;
        $gameMap.autoplay();
      }
      return;
    }
    _alias_updateVehicleGetOff.call(this);
  };

  // BUG 3 FIX: canGetOffVehicle — cek passability + event + karakter di tile tujuan
  var _alias_Game_Player_canGetOffVehicle = Game_Player.prototype.canGetOffVehicle;
  Game_Player.prototype.canGetOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      var v = $gameMap.vehicle4();
      var d = this.direction();
      var x = $gameMap.roundXWithDirection(v.x, d);
      var y = $gameMap.roundYWithDirection(v.y, d);
      // Cek apakah tile tujuan valid dan bisa dilewati
      if (!$gameMap.isValid(x, y)) return false;
      if (!$gameMap.isPassable(x, y, this.reverseDir(d))) return false;
      // Cek apakah ada event normal priority di tile tujuan
      var events = $gameMap.eventsXyNt(x, y);
      for (var i = 0; i < events.length; i++) {
        if (events[i].isNormalPriority() && !events[i]._through) return false;
      }
      // Cek apakah ada vehicle lain di tile tujuan
      if ($gameMap.boat().posNt(x, y)) return false;
      if ($gameMap.ship().posNt(x, y)) return false;
      if ($gameMap.airship().posNt(x, y)) return false;
      return true;
    }
    return _alias_Game_Player_canGetOffVehicle.call(this);
  };

  // Turun vehicle4 + SE + inisialisasi fade-in counter
  var _alias_Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function () {
    if (this._vehicleType === 'vehicle4') {
      if (this.canGetOffVehicle()) {
        var v = $gameMap.vehicle4();
        v.getOff();
        playSe(vSeOff, vSeOffVol);
        this._vehicleGettingOff = true;
        this._v4FadeInCounter = 0;  // siapkan counter fade-in
        // Pastikan party masih invisible saat mulai bergerak
        setPartyOpacity(0);
        this.setThrough(true);
        this.forceMoveForward();
        this.gatherFollowers();
        return true;
      }
      return false;
    }
    return _alias_Game_Player_getOffVehicle.call(this);
  };

})();