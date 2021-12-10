<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { getStores } from '$app/stores';
	import '../app.css';



	const width = tweened(500, {
		duration: 0,
		easing: sineInOut
	});
	const height = tweened(40, {
		duration: 0,
		easing: sineInOut
	});
	let { page } = getStores();
	
	$: if ($page.path !== '/') {
		width.set(50);
		height.set(90);
	} else {
		width.set(30);
		height.set(40);
	}
	onMount(async () => {
	});


</script>

<!-- <Header /> -->

<main>
	<div class="container" style="width:{$width}%; height:{$height}%; ">
		<div class="title" style="margin-top: 26px">Page</div>
		<slot />
		{#if !false}
		<div><svg>
			<path d={""} />
		  </svg></div>
		{/if}
	</div>
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-family: 'Roboto', sans-serif;
		margin-bottom: 20px;
		width: 100%;
		font-weight: 500;
		font-size: 36px;
		line-height: 42px;
		text-align: center;
		color: #ffffff;
	}
	.container {
		position: absolute;
		background: #323741;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 49px;
		min-height: 600px;
		min-width: 500px;
		display: flex;
		flex-flow: column;
	}

</style>
