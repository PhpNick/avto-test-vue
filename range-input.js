var app = Vue.extend({
  data() {
    return {
      value: 50,
    };
  },
  template: `
  <template>
    <div>
      <h2> {{ value }}% </h2>
      <range v-model="value" ref="range" :min="0" :max="100" class="range" />
      <button class="button" @click="$refs.range.setFirst(25)">25%</button>
      <button class="button" @click="$refs.range.setFirst(50)">50%</button>
      <button class="button" @click="$refs.range.setFirst(75)">75%</button>
      <button class="button" @click="$refs.range.setFirst(100)">100%</button>
    </div>
  </template>
  `
});


var range = Vue.extend({
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      currentValue: this.value
    };
  },
  methods: {
    onInput() {
      this.$emit('input', parseInt(this.currentValue));
    },

    setFirst(value) {
      this.$emit('input', value);
      this.$refs['input'].value = value;
    }
  },
  template: `
<template>
  <div>
    <div class="range-component">
      <div class="rangecontainer">
        <input
          ref="input"
          v-model="currentValue"
          type="range"
          :min="min"
          :max="max"
          class="range"
          @input="onInput"
        >
      </div>
    </div>
  </div>
</template>
  `
});

Vue.component('app', app);
Vue.component('range', range);

new Vue({
  el: '#app',
});
