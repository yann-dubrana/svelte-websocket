<script lang="ts">
	import '../app.css';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-json';
	import 'prismjs/themes/prism.css';
	import { invalidateAll } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import type { Position } from '$lib/types';

	let { data } = $props();
	let interval: NodeJS.Timeout | undefined = $state(undefined);
	let formatted = $state(true);
	let messages = $derived(data.messages.reverse());
	onMount(() => {
		startRefreshInterval();
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	function highlightJSON(json: Position) {
		const formatted = JSON.stringify(json, null, 2);
		return Prism.highlight(formatted, Prism.languages.json, 'json');
	}

	function startRefreshInterval() {
		if (interval) clearInterval(interval);
		interval = setInterval(() => {
			invalidateAll();
		}, 100);
	}

	function stopRefreshInterval() {
		if (interval) clearInterval(interval);
		interval = undefined;
	}

	function toggleRefresh() {
		if (interval) {
			stopRefreshInterval();
		} else {
			startRefreshInterval();
		}
	}
</script>


<div class="p-6 max-w-4xl mx-auto">
	<div class="flex justify-between">
		<h3 class="text-xl font-semibold text-gray-700 mb-3">Message History ({messages.length})</h3>
		<div class="space-x-6">
			<button onclick={() => {toggleRefresh()}} class="mb-4 px-4 py-2">
				{#if interval}
					<span class="text-green-500">On</span>
				{:else}
					<span class="text-red-500">Off</span>
				{/if}
			</button>
			<button onclick={()=>{formatted = !formatted}}
							class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
				{formatted ? 'Show Raw JSON' : 'Show Formatted View'}
			</button>
		</div>

	</div>
	<div class="space-y-4">
		{#each messages as message}
			{#if formatted}
				<div class="mb-8">
					<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white shadow rounded-xl p-4">
						<div><span class="font-semibold text-gray-600">ID:</span> {message.id}</div>
						<div><span class="font-semibold text-gray-600">Date:</span> {message.date}</div>
						<div><span class="font-semibold text-gray-600">Time:</span> {message.time}</div>
						<div><span class="font-semibold text-gray-600">Lat/Lon:</span> {message.lat} / {message.lon}</div>
						<div><span class="font-semibold text-gray-600">Altitude:</span> {message.altitude} m</div>
						<div><span class="font-semibold text-gray-600">HDOP:</span> {message.HDOP}</div>
						<div><span class="font-semibold text-gray-600">Satellites:</span> {message.numSV}</div>
						<div><span class="font-semibold text-gray-600">Mountpoint:</span> {message.mountpoint}</div>
						<div><span class="font-semibold text-gray-600">App Version:</span> {message.version_app}</div>
						<div><span class="font-semibold text-gray-600">Uptime:</span> {message.UPtime}s</div>
						<div><span class="font-semibold text-gray-600">Rebooted:</span> {message.has_rebooted ? 'Yes' : 'No'}</div>
						<div><span class="font-semibold text-gray-600">Button Pressed:</span> {message.button ? 'Yes' : 'No'}</div>
					</div>
					{#if message.pulse_sensors && message.pulse_sensors.length}
						<div class="mt-6 bg-white shadow rounded-xl p-4">
							<h4 class="text-lg font-semibold text-gray-700 mb-2">Pulse Sensors</h4>
							<table class="min-w-full table-auto text-sm text-left border-collapse">
								<thead>
								<tr class="bg-gray-100 text-gray-600 uppercase text-xs">
									<th class="p-2 border">#</th>
									<th class="p-2 border">Sensor ID</th>
									<th class="p-2 border">Pulses</th>
								</tr>
								</thead>
								<tbody>
								{#each message.pulse_sensors as sensor, i}
									<tr class="hover:bg-gray-50">
										<td class="p-2 border">{i + 1}</td>
										<td class="p-2 border">{sensor.pulse_sensor_id}</td>
										<td class="p-2 border">{sensor.pulses}</td>
									</tr>
								{/each}
								</tbody>
							</table>
						</div>
					{/if}

					<!-- XL Sensor Table -->
					{#if message.xl_sensor}
						<div class="mt-6 bg-white shadow rounded-xl p-4">
							<h4 class="text-lg font-semibold text-gray-700 mb-2">XL Sensor</h4>
							<table class="min-w-full table-auto text-sm text-left border-collapse">
								<thead>
								<tr class="bg-gray-100 text-gray-600 uppercase text-xs">
									<th class="p-2 border">X</th>
									<th class="p-2 border">Y</th>
									<th class="p-2 border">Z</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td class="p-2 border">{message.xl_sensor.x}</td>
									<td class="p-2 border">{message.xl_sensor.y}</td>
									<td class="p-2 border">{message.xl_sensor.z}</td>
								</tr>
								</tbody>
							</table>
						</div>
					{/if}
				</div>
			{:else}
				<div class="bg-white border border-gray-200 rounded-xl shadow p-4 overflow-x-auto max-w-full">
					<pre class="language-json text-sm">{@html highlightJSON(message)}</pre>
				</div>
			{/if}
		{/each}
	</div>
</div>

