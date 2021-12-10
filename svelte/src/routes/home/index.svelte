<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<div class="option" on:click= {() => goto('/home/fig-controls')}>Figma</div>
	<div class="option" on:click= {() => goto('/home/video')}>Video</div>
	<div class="option" on:click= {() => goto('/home/prototype')}>Live Prototype</div>
	<div class="option" on:click= {() => goto('/home/image')}>Test</div>
</div>

<style>
	.content {
		width: 85%;
		margin: 0 auto 40px auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		flex: 1 1 auto;
		height: 100%;
		flex-flow: column;
	}
	.option {
		width: 85%;
		height: 20%;
		max-height: 400px;
		max-width: 1000px;
		background: #292e37;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: 'Raleway', sans-serif;
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 28px;
		text-align: center;
		color: #ffffff;
		transition: all 0.3s;
	}
	.option:hover{
		box-shadow: 0px 2px 2px -1px #0071ff;
	}
</style>
