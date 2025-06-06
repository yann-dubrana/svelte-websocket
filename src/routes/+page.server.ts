import type { PageServerLoad } from './$types';
import mqtt from 'mqtt';

const options = {
	username: 'iidre',
	password: 'iidre',
	reconnectPeriod: 10000
};

let messages = [];
let client = null;

export const load: PageServerLoad = async ({ locals }) => {
	if (!client) {
		client = mqtt.connect('ws://vitopti.iidre.com:9001', options);
		client.on('connect', function () {
			console.log('Connected to Mosquitto via WebSocket');
			client.subscribe('tag');
		});
		client.on('message', function (topic, message) {
			messages.push(JSON.parse(message.toString()));
		});
	}
	return {
		messages: messages
	};
};
