<script>
	// @ts-nocheck
	import Gene from './Gene.svelte';
	import { genesStore } from './stores/genes.ts';

	$: entries = Object.entries($genesStore);

	function delay(index) {
		const pairIndex = Math.floor(index / 2);
		return Math.floor((entries.length - 2 - pairIndex * 2) / 2) * 1000;
	}
</script>

<div class="container">
	<div class="genes">
		{#each entries as [name, gene], index}
			<Gene {...gene} delay={delay(index)} bind:value={$genesStore[name].value}></Gene>
		{/each}
	</div>
	<div>
		{#each entries as [name, gene]}
			<h1>{name} : {gene.value.toFixed(2)}</h1>
		{/each}
	</div>
</div>

<style>
	.genes > :global(:nth-child(odd)) {
		transform: scaleX(-1);
	}
	.genes > :global(:nth-child(4n + 1)),
	:global(:nth-child(4n)) {
		color: rgba(85, 39, 223);
	}
	.genes {
		color: rgba(34, 83, 229);
	}

	.genes {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 60vh;
	}

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
    height: 100vh;
	}
</style>
