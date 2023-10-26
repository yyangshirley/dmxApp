<template>
  <div>
    <div class="header">
      <Header title="Mono" />
    </div>
    <div class="container">
      <v-container class="color-container">
        <color-swatches @setColor="selectColor"></color-swatches>
      </v-container>
      <v-container class="speed-container">
        <h2 class="color-title text-h5">Speed</h2>
        <v-slider
          v-model="selectedSpeed"
          @update:model-value="throttledChangeSpeed"
        ></v-slider>
      </v-container>
      <v-container class="animation-container">
        <h2 class="color-title text-h5">Effect</h2>
        <v-select v-model="currentMode" :items="monoMode" item-title="name">
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              @click="selectEffect(item.raw.code)"
            ></v-list-item> </template
        ></v-select>
      </v-container>
    </div>
    <div class="footer">
      <FooterVue />
    </div>
  </div>
</template>

<script>
import FooterVue from "../components/FooterVue.vue";
import Header from "../components/HeaderVue.vue";
import ColorSwatches from "../components/custom/ColorSwatches.vue";
import LedService from "../service/service";
import { throttle } from "lodash";
import { rgbStringToObject } from "../utils/rgb.js";
export default {
  name: "MonoPage",
  components: { FooterVue, Header, ColorSwatches },
  data() {
    return {
      ledNum: 1,
      monoMode: [
        {
          name: "Meteor",
          code: "meteor",
          speed: 50,
          brightness: 1,
          color: "rgb(255,0,0)",
        },
        {
          name: "Breathing",
          code: "breathing",
          speed: 50,
          brightness: 1,
          color: "rgb(255,0,0)",
        },
        {
          name: "Wave",
          code: "wave",
          speed: 50,
          brightness: 1,
          color: "rgb(255,0,0)",
        },
        {
          name: "Catch Up",
          code: "catchup",
          speed: 50,
          brightness: 1,
          color: "rgb(255,0,0)",
        },
        {
          name: "Static",
          code: "static",
          brightness: 1,
          color: "rgb(255,0,0)",
        },
        {
          name: "Stack",
          code: "stack",
          speed: 50,
          brightness: 1,
          color: "rgb(255,0,0)",
        },
      ],
      selectedColor: "rgb(255,0,0)",
      selectedEffect: null,
      selectedSpeed: 50,
      currentMode: {
        name: "Meteor",
        code: "meteor",
        speed: 50,
        brightness: 1,
        color: "rgb(255,0,0)",
      },
    };
  },

  created() {
    this.ledNum = this.$store.state.pixelNum
      ? this.$store.state.pixelNum
      : this.ledNum;
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color;
      if (this.selectedEffect) {
        this.updateMono(this.selectedEffect);
      } else {
        this.updateMono(this.currentMode.code);
      }
    },
    selectEffect(effect) {
      this.selectedEffect = effect;
      this.updateMono(effect);
    },
    updateMono(effect) {
      const data = {
        numLights: this.ledNum,
        color: rgbStringToObject(this.selectedColor),
        mode: effect,
        speed: this.selectedSpeed,
      };
      LedService.monoLed(data)
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            //
          } else {
            this.alertModel = true;
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    throttledChangeSpeed: throttle(function (newSpeed) {
      this.selectedSpeed = newSpeed;
      let data = {
        numLights: this.ledNum,
        color: rgbStringToObject(this.selectedColor),
        mode: this.selectedEffect ? this.selectedEffect : this.currentMode.code,
        speed: this.selectedSpeed,
      };
      LedService.monoLed(data)
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            //
          } else {
            this.alertModel = true;
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 500),
  },
};
</script>
<style lang="scss">
.animation-card {
  margin: 10px 0;
}
</style>
