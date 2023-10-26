<template>
  <h2 class="color-title text-h5">Color</h2>
  <v-row class="justify-space-around">
    <v-chip-group filter v-model="selected" class="color-group">
      <v-chip
        v-for="color in colorList"
        :key="color"
        :style="{ backgroundColor: color.rgb }"
        class="color-swatch-btn"
        @click="handleClick(color.rgb)"
      />
    </v-chip-group>
  </v-row>
</template>

<script>
export default {
  name: "ColorSwatches",
  data() {
    return {
      colorList: [
        { name: "red", rgb: "rgb(255, 0, 0)" },
        { name: "orange", rgb: "rgb(255, 128, 0)" },
        { name: "yellow", rgb: "rgb(255, 255, 0)" },
        { name: "lime", rgb: "rgb(0, 255, 0)" },
        { name: "green", rgb: "rgb(0, 128, 0)" },
        { name: "olive", rgb: "rgb(128, 128, 0)" },
        { name: "aqua", rgb: "rgb(0, 255, 255)" },
        { name: "navy", rgb: "rgb(0, 0, 128)" },
        { name: "blue", rgb: "rgb(0, 0, 255)" },
        { name: "purple", rgb: "rgb(128, 0, 128)" },
        { name: "fuchsia", rgb: "rgb(255, 0, 255)" },
        { name: "gray", rgb: "rgb(128, 128, 128)" },
        { name: "black", rgb: "rgb(0, 0, 0)" },
        { name: "white", rgb: "rgb(255, 255, 255)" },
      ],
      selected: 0,
    };
  },
  methods: {
    handleClick(color) {
      this.$emit("setColor", color);
    },
  },
};
</script>

<style scoped>
.color-title {
  margin-bottom: 10px;
}
.color-group {
  justify-content: center;
}
.color-swatch-btn {
  width: 40px !important;
  height: 40px !important;
  max-height: 40px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
