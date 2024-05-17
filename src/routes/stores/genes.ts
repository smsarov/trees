import { writable } from 'svelte/store';

export const genesStore = writable({
  height: {
    min: 10,
    max: 20,
    value: 15
  },
  width: {
    min: 20,
    max: 40,
    value: 20
  },
  height2: {
    min: 10,
    max: 20,
    value: 15
  },
  width2: {
    min: 20,
    max: 40,
    value: 20
  },
  height3: {
    min: 10,
    max: 20,
    value: 15
  },
  width3: {
    min: 20,
    max: 40,
    value: 20
  },
  height4: {
    min: 10,
    max: 20,
    value: 15
  },
  width4: {
    min: 20,
    max: 40,
    value: 20
  },
  height5: {
    min: 10,
    max: 20,
    value: 15
  },
  width5: {
    min: 20,
    max: 40,
    value: 20
  }
})