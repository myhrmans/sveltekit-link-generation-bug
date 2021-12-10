<script context="module" lang="ts">
	export const prerender = true;

</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { mdiOpenInApp } from '@mdi/js';
	import { goto } from '$app/navigation';


	let width = 30;
	let height = 30;
	onMount(async () => {
	});
	$: console.log("Title: ", document.querySelector('title'))

</script>

<svelte:head>
	<title>Prototyping Tool</title>
</svelte:head>

<section>
	<div class="inner-container">
		<div  class="status-text" />
		<div  on:click={()=>{
			goto("/home/fig-controls")}} class="button">test
			<svg width="{width}" height="{height}" viewBox="0 0 24 24">
				<path d={mdiOpenInApp} />
			  </svg>
		</div>
	</div>
	<footer>
	</footer>
</section>

<style>
	
</style>
