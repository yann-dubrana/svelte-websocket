<script lang="ts">
	import '../app.css';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();
	let  messages  = $derived( data.messages.reverse());
	onMount(() => {
		setInterval(() => {
			invalidateAll()
		}, 100);
	});
</script>


{messages.length}
{#each messages as message}
	<div class="p-6 max-w-4xl mx-auto">
		<div class="mb-8">
			<h2 class="text-2xl font-bold text-gray-800 mb-2">Message Overview</h2>
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
		</div>

		<div>
			<h3 class="text-xl font-semibold text-gray-700 mb-3">Message History ({messages.length})</h3>
			<div class="space-y-2">
				{#each messages as item}
					<div class="bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg shadow-sm">
						<div class="text-sm text-gray-700 font-medium">ID: {item.id}</div>
						<div class="text-xs text-gray-600">Location: {item.lat} / {item.lon}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/each}
