<template>
  <div class="led-controller">
    <h1>LED Controller</h1>
    <div class="led-container">
      <div class="led" :class="{ 'on': isOn }"></div>
    </div>
    <div class="button-container">
      <button @click="toggleLED" :class="{ 'active': isOn }">
        {{ isOn ? 'Turn Off' : 'Turn On' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOn: false
    };
  },
  methods: {
    toggleLED() {
      this.isOn = !this.isOn;
      // Send API request to control the LED state
    }
  }
};
</script>

<style scoped>
.led-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.led-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.led {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: #f00;
  transition: background-color 0.3s ease;
}

.led.on {
  background-color: #0f0;
}

.button-container {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.active {
  background-color: #dc3545;
}
</style>