<template>
  <div class="d-flex flex-column">
    <v-card class="card-container" v-for="m in mode" :key="m" v-model="m.code">
      <v-card-item>
        <v-card-title>
          {{ m.name }}
        </v-card-title>
      </v-card-item>
      <v-card-item>
        <v-btn
          :style="`background-color:rgba(${m.color.r},${m.color.g},${m.color.b},${m.color.a})`"
          @click="
            pickColor(m.code, {
              color: m.color,
              speed: m.speed,
            })
          "
          size="small"
        >
        </v-btn>
      </v-card-item>
    </v-card>
    <v-dialog v-model="colorModel">
      <v-card>
        <v-card-title
          class="headline black"
          style="text-transform: uppercase"
          primary-title
        >
          {{ selectedMode }}
        </v-card-title>
        <colorPicker
          :ledNum="ledNum"
          :mode="selectedMode"
          :data="selectedData"
          @closeModal="closeModal"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import LedService from "../../service/service.js";
import colorPicker from "./colorPicker.vue";
export default {
  name: "AnimationPicker",
  components: { colorPicker },
  props: ["ledNum"],
  data() {
    return {
      mode: [
        {
          name: "Meteor",
          code: "meteor",
          speed: 50,
          brightness: 1,
          color: { r: 0, g: 0, b: 0, a: 0 },
        },
        {
          name: "Breathing",
          code: "breathing",
          speed: 50,
          brightness: 1,
          color: { r: 0, g: 0, b: 0, a: 0 },
        },
        {
          name: "Wave",
          code: "wave",
          speed: 50,
          brightness: 1,
          color: { r: 0, g: 0, b: 0, a: 0 },
        },
        {
          name: "Catch Up",
          code: "catchup",
          speed: 50,
          brightness: 1,
          color: { r: 0, g: 0, b: 0, a: 0 },
        },
        {
          name: "Static",
          code: "static",
          brightness: 1,
          color: { r: 0, g: 0, b: 0, a: 0 },
        },
        {
          name: "Stack",
          code: "stack",
          speed: 50,
          brightness: 1,
          color: { r: 0, g: 0, b: 0, a: 0 },
        },
      ],
      colorModel: false,
      selectedMode: null,
      selectedData: {},
    };
  },
  methods: {
    pickColor(code, data) {
      this.colorModel = true;
      this.selectedMode = code;
      console.log(data);
      this.selectedData = data;
    },
    closeModal(flag, colorVal, speedVal) {
      if (flag) this.colorModel = false;
      this.changeData(colorVal, speedVal);
    },
    changeData(color, speed) {
      for (let m of this.mode) {
        if (m.code == this.selectedMode) {
          m.color = color;
          // `${color.r.toString(16)}${color.g.toString(
          //   16
          // )}${color.b.toString(16)}`;
          m.speed = speed;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.card-container {
  margin: 10px 8px;
}
</style>
