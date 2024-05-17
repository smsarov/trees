import { elasticOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

export function expand(
	node: SVGCircleElement,
	params: Partial<{ delay: number; duration: number; easing: EasingFunction }>
) {
	const { delay = 0, duration = 400, easing =  elasticOut} = params;

  const R = node.r.baseVal.value;

	return {
		delay,
		duration,
		easing,
		css: (t: number) => `r: ${t * R}`
	};
}
