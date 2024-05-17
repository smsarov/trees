<script lang="ts">
	import { onMount } from 'svelte';
	import { expand } from '../transitions/expand';
	import { draw, fade } from 'svelte/transition';
	import { circInOut, circOut, expoIn } from 'svelte/easing';
	import { spring } from 'svelte/motion';

	export let min = 0;
	export let max = 100;
	export let defaultValue = min;
	export let value = defaultValue;
	export let delay = 0;

	const R = 8;
	const strokeWidth = 8;
	const animationDuration = 400;

	let path: SVGGeometryElement;
	const curve = `M${strokeWidth},${100 - strokeWidth} C50,75 50,25 ${strokeWidth},${strokeWidth}`;
	let svg: SVGElement;
	let active = false;

	$: pathLength = path?.getTotalLength();

	$: ratio = (value - min) / (max - min);
	$: currentPoint = path?.getPointAtLength(R / 2 + (pathLength - R) * ratio);

	const handleTouch = (e: PointerEvent) => {
		if (!active) return;
		const totalHeight = svg.clientHeight;
		const mouseY = e.offsetY;

		const _ratio = Math.min(Math.max(0, (totalHeight - mouseY) / totalHeight), 1);

		value = min + (max - min) * _ratio;
	};
</script>

<svg
	bind:this={svg}
	height="100%"
	viewBox="0 0 100 100"
	fill="none"
	on:pointerdown={(e) => {
		active = true;
		handleTouch(e);
	}}
	on:pointermove={handleTouch}
	on:pointerup={(e) => {
		handleTouch(e);
		active = false;
	}}
	on:pointerleave={() => (active = false)}
>
	{#if svg}
		{#if active}
			<path
				transition:fade={{duration: animationDuration / 2}}
				d={curve}
				stroke-width={strokeWidth * 1.5}
				stroke-linecap="round"
				stroke="pink"
			/>
		{/if}
		<path
			bind:this={path}
			transition:draw={{ duration: animationDuration, delay: delay, easing: circInOut }}
			d={curve}
			stroke-width={strokeWidth}
			stroke="currentColor"
			stroke-linecap="round"
		/>
	{/if}

	{#if currentPoint}
		<circle
			in:expand={{ duration: 1500, delay: delay + animationDuration }}
			fill="#D9D9D9"
			r={R}
			cx={currentPoint.x}
			cy={currentPoint.y}
		></circle>
	{/if}
</svg>

<style>
</style>
