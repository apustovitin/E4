function ElectricalAppliance(type, maxPowerСonsumption){
  this.type = type, 
  this.maxPowerСonsumption = maxPowerСonsumption,
  this.powerState = 'poweredoff',
  this.currentPowerСonsumption = 0,
  this.switchOn = function(){
    this.powerState = 'poweredOn';
    this.currentPowerСonsumption = maxPowerСonsumption;
  },
  this.switchOff = function(){
    this.powerState = 'poweredOff';
    this.currentPowerСonsumption = 0;
  }
}

function Teapot(name, maxWaterVolume){
  this.name = name,
  this.waterTemperature = undefined, 
  this.maxWaterVolume = maxWaterVolume,
  this.waterVolume = 0,
  this.boil = function() {
    if (this.waterVolume > 0 && this.waterVolume <= this.maxWaterVolume && this.waterTemperature <= 100) {
      this.switchOn();
      return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
          if (this.waterTemperature < 100) {
            console.log(`temperature ${this.waterTemperature}`);
            ++this.waterTemperature;
          } else {
            clearInterval(intervalId);
            this.switchOff();
            resolve();
          }
        }, 1000);
      });
    }
  },
  this.pourWater = function(water){
    if (this.waterVolume <= this.maxWaterVolume) {
      this.waterVolume = Math.min(this.maxWaterVolume, (this.waterVolume + water));
      this.waterTemperature = 20;
    }
  },
  this.drainWater = function(water){
    if (this.waterVolume > 0) {
      this.waterVolume = Math.max(0, (this.waterVolume - water));
    }
    if (this.waterVolume === 0) {
      this.waterTemperature = undefined;
    }
    this.switchOff();
  }
}

Teapot.prototype = new ElectricalAppliance("teapot", 1000);

teapot1 = new Teapot("philips", 2);
console.log(`power ${teapot1.currentPowerСonsumption} temperature ${teapot1.waterTemperature} water ${teapot1.waterVolume}`);
teapot1.pourWater(1);
console.log(`power ${teapot1.currentPowerСonsumption} temperature ${teapot1.waterTemperature} water ${teapot1.waterVolume}`);
teapot1.boil().then(
  function() {
    console.log(`power ${teapot1.currentPowerСonsumption} temperature ${teapot1.waterTemperature} water ${teapot1.waterVolume}`);
  }
);

function Lamp(name, maxBrightness){
  this.name = name,
  this.brightness = 0, 
  this.maxBrightness = maxBrightness,
  this.lampSwitchOn = function(){
    if (this.brightness < this.maxBrightness) {
      this.switchOn();
	  this.brightness = this.maxBrightness;
    }
  },
  this.lampSwitchOff = function(){
    if (this.brightness > 0) {
      this.switchOff();
	  this.brightness = 0;
    }
  },
  this.setBrightness = function(brightness){
    if (brightness > 0 && brightness <= this.maxBrightness) {
	  this.brightness = brightness;
	  this.currentPowerСonsumption = this.maxPowerСonsumption * (brightness / this.maxBrightness)
    }
  }
}

Lamp.prototype = new ElectricalAppliance("lamp", 100);
lamp1 = new Lamp("ikea", 500);
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);
lamp1.lampSwitchOn()
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);
lamp1.setBrightness(200);
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);
let commonPowerConsumption = lamp1.currentPowerСonsumption + teapot1.currentPowerСonsumption;
console.log(`common power consumption ${commonPowerConsumption}`);
lamp1.lampSwitchOff()
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);

