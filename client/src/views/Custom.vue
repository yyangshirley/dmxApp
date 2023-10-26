<template>
  <div class="header">
    <HeaderVue title="Custom" />
  </div>
  <div class="led-container">
    <v-container>
      <v-btn
        class="clear-btn text-none text-subtitle-1"
        color="#5865f2"
        variant="flat"
        block
        style="color: white"
        @click="clearEffect"
      >
        Clear Effect
      </v-btn>
    </v-container>
    <v-container>
      <color-swatches @setColor="setCurrentColor"></color-swatches>
    </v-container>
    <v-container>
      <v-chip-group class="led-group">
        <v-chip
          class="d-flex justify-sm-space-between px-4 pt-4 pb-4 ml-4"
          v-for="led in ledNum"
          :key="led"
          :style="`background-color:${colors[led - 1]}`"
          @click="setLightColor(led)"
        >
          #{{ led < 10 ? "0" + led : led }}
        </v-chip>
      </v-chip-group>
    </v-container>
  </div>
  <div class="footer">
    <FooterVue />
  </div>
</template>

<script>
import FooterVue from "../components/FooterVue.vue";
import HeaderVue from "../components/HeaderVue.vue";
import LedService from "../service/service.js";
import ColorSwatches from "../components/custom/ColorSwatches.vue";
import { rgbStringToObject } from "../utils/rgb.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CustomPage",
  components: { FooterVue, HeaderVue, ColorSwatches },
  computed: {
    ...mapGetters(["customLed"]),
  },
  data() {
    return {
      ledNum: 1,
      selected: -1,
      colorModel: false,
      colors: Array.from({ length: this.$store.state.pixelNum }, () => {
        return "rgb(255,255,255)";
      }),
      selectedData: {},
      selectedList: [],
      selectedColor: "rgb(255,0,0)",
    };
  },
  created() {
    this.ledNum = this.$store.state.pixelNum
      ? this.$store.state.pixelNum
      : this.ledNum;

    if (this.customLed.length > 0) {
      this.customLed.forEach((led) => {
        this.colors[led.index] = led.color;
      });
    }
  },
  methods: {
    ...mapActions(["updateLed"]),
    clearEffect() {
      LedService.closeAll(this.ledNum)
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            this.colors.forEach((value, index, array) => {
              array[index] = "rgb(255,255,255)";
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setCurrentColor(color) {
      this.selectedColor = color;
    },
    pickColor(led, data) {
      this.selected = led;
      this.colorModel = true;
      this.selectedData = data;
    },
    closeModal(flag, val) {
      if (flag) this.colorModel = false;
      this.changeColor(val);
    },
    setLightColor(index) {
      this.colors[index - 1] =
        this.selectedColor == "rgb(0, 0, 0)"
          ? "rgb(255,255,255)"
          : this.selectedColor;
      const data = { color: rgbStringToObject(this.selectedColor) };
      this.updateLed({ index: index - 1, color: this.selectedColor });
      LedService.customLed(index, data)
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            // console.log(res.data);
          } else {
            this.alertModel = true;
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style lang="scss">
.led-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
