export interface PulseSensor {
	pulse_sensor_id: number;
	pulses: number;
}

export interface XlSensor {
	x: number;
	y: number;
	z: number;
}

export interface Position {
	id: string;
	version_app: string;
	UPtime: number;
	has_rebooted: boolean;
	button: boolean;
	mountpoint: string;
	time: string;
	date: string;
	lat: number;
	lon: number;
	quality: number;
	numSV: number;
	HDOP: number;
	diffAge: number;
	altitude: number;
	speed?: number;
	pulse_sensors?: PulseSensor[];
	xl_sensor?: XlSensor;
}
