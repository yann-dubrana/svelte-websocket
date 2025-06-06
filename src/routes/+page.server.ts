import type { PageServerLoad } from './$types';
import { SECRET_MQTT_URL, SECRET_MQTT_USERNAME, SECRET_MQTT_PASSWORD } from '$env/static/private';
import mqtt from 'mqtt';
import type { Position } from '$lib/types';

const options = {
	username: SECRET_MQTT_USERNAME,
	password: SECRET_MQTT_PASSWORD,
	reconnectPeriod: 10000
};

const messages: Position[] = [];
let client: mqtt.MqttClient | undefined = undefined;

const initMQTT = () => {
	if (client) {
		return;
	}
	client = mqtt.connect(SECRET_MQTT_URL, options);

	client.on('connect', function () {
		if (!client) {
			throw new Error('MQTT client not initialized');
		}
		client.subscribe('tag');
	});

	client.on('message', function (topic, message) {
		messages.push(JSON.parse(message.toString()));
	});

};
export const load: PageServerLoad = async ({ locals }) => {
	initMQTT();
	return {
		messages: messages
	};
};
