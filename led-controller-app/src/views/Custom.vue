<template>
  <div class="header">
    <HeaderVue title="Custom" />
  </div>
  <div class="led-container">
    <v-item-group
      v-for="led in ledNum"
      :key="led"
      class="led-group d-flex justify-sm-space-between px-6 pt-2 pb-6"
    >
      <v-item>
        <!-- :style="`backgroundColor: #${colors[led - 1]} `" -->
        <v-btn
          :style="`background-color:rgba(${colors[led - 1].r},${
            colors[led - 1].g
          },${colors[led - 1].b},${colors[led - 1].a})`"
          @click="pickColor(led, { color: colors[led - 1] })"
          :ref="`btn${led}`"
          >#{{ led }}
        </v-btn>
      </v-item>
    </v-item-group>
  </div>
  <v-dialog v-model="colorModel">
    <v-card>
      <v-card-title class="headline black" primary-title> Color </v-card-title>
      <colorPicker
        :mode="'custom'"
        :num="selected"
        @closeModal="closeModal"
        :data="selectedData"
      />
    </v-card>
  </v-dialog>
  <div class="footer">
    <FooterVue />
  </div>
</template>

<script>
import FooterVue from "../components/FooterVue.vue";
import HeaderVue from "../components/HeaderVue.vue";
import colorPicker from "../components/custom/colorPicker";
import LedService from "../service/service.js";
export default {
  name: "CustomPage",
  components: { FooterVue, HeaderVue, colorPicker },

  data() {
    return {
      ledNum: 1,
      selected: -1,
      colorModel: false,
      color: { r: 0, g: 0, b: 0, a: 0 },
      colors: Array.from({ length: this.$store.state.pixelNum }, () => {
        return { r: 0, g: 0, b: 0, a: 0 };
      }),
      selectedData: {},
    };
  },
  created() {
    this.ledNum = this.$store.state.pixelNum
      ? this.$store.state.pixelNum
      : this.ledNum;
    LedService.closeAll(this.ledNum)
      .then((res) => {
        if (res.data.flag != "SUCCESS") {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.$store.state.led) {
      if (this.$store.state.led[this.selected - 1]) {
        this.color["r"] = this.$store.state.led[this.selected].color[0];
        this.color["g"] = this.$store.state.led[this.selected].color[1];
        this.color["b"] = this.$store.state.led[this.selected].color[2];
        // this.brightness = this.$store.state.led[this.selected].brightness;
      }
    }
  },
  methods: {
    pickColor(led, data) {
      this.selected = led;
      this.colorModel = true;
      this.selectedData = data;
    },
    closeModal(flag, val) {
      if (flag) this.colorModel = false;
      this.changeColor(val);
    },
    changeColor(color) {
      // this.color = `${color.r.toString(16)}${color.g.toString(
      //   16
      // )}${color.b.toString(16)}`;
      this.color = color;
      this.colors[this.selected - 1] = this.color;
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
