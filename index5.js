class ElectricalAppliance {
	constructor(type, maxPowerСonsumption) {
		this.type = type;
		this.maxPowerСonsumption = maxPowerСonsumption;
		this.powerState = 'poweredOff';
		this.currentPowerСonsumption = 0;
	}
	switchOn() {
		this.powerState = 'poweredOn';
		this.currentPowerСonsumption = this.maxPowerСonsumption;
	}
	switchOff(){
		this.powerState = 'poweredOff';
		this.currentPowerСonsumption = 0;
	}
}


class Teapot extends ElectricalAppliance {
	constructor(name, maxWaterVolume) {
		super("teapot",1000);
		this.name = name;
		this.waterTemperature = undefined;
		this.maxWaterVolume = maxWaterVolume;
		this.waterVolume = 0;
	}
	boil() {
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
	}
	pourWater(water) {
		if (this.waterVolume <= this.maxWaterVolume) {
			this.waterVolume = Math.min(this.maxWaterVolume, (this.waterVolume + water));
			this.waterTemperature = 20;
		}
	}
	drainWater(water) {
		if (this.waterVolume > 0) {
			this.waterVolume = Math.max(0, (this.waterVolume - water));
		}
		if (this.waterVolume === 0) {
			this.waterTemperature = undefined;
		}
		this.switchOff();
	}
}


class Lamp extends ElectricalAppliance {
	constructor(name, maxBrightness) {
		super("lamp", 100);
		this.name = name;
		this.brightness = 0; 
		this.maxBrightness = maxBrightness;	
	}
	lampSwitchOn() {
		if (this.brightness < this.maxBrightness) {
			this.switchOn();
			this.brightness = this.maxBrightness;
		}
	}
	lampSwitchOff() {
		if (this.brightness > 0) {
			this.switchOff();
			this.brightness = 0;
		}
	}
	setBrightness(brightness) {
		if (brightness > 0 && brightness <= this.maxBrightness) {
			this.brightness = brightness;
			this.currentPowerСonsumption = this.maxPowerСonsumption * (brightness / this.maxBrightness)
		}
	}
}


let teapot1 = new Teapot("philips", 2);
console.log(`power ${teapot1.currentPowerСonsumption} temperature ${teapot1.waterTemperature} water ${teapot1.waterVolume}`);
teapot1.pourWater(1);
console.log(`power ${teapot1.currentPowerСonsumption} temperature ${teapot1.waterTemperature} water ${teapot1.waterVolume}`);
teapot1.boil().then(
  function() {
    console.log(`power ${teapot1.currentPowerСonsumption} temperature ${teapot1.waterTemperature} water ${teapot1.waterVolume}`);
  }
);

let lamp1 = new Lamp("ikea", 500);
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);
lamp1.lampSwitchOn()
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);
lamp1.setBrightness(200);
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);
let commonPowerConsumption = lamp1.currentPowerСonsumption + teapot1.currentPowerСonsumption;
console.log(`common power consumption ${commonPowerConsumption}`);
lamp1.lampSwitchOff()
console.log(`power ${lamp1.currentPowerСonsumption} brightness ${lamp1.brightness}`);