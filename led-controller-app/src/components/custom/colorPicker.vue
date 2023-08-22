<template>
  <div>
    <v-alert v-model="alertModel" color="error" icon="$error" closable>
      OOPS Something goes wrong!
    </v-alert>
    <v-card>
      <v-card-item>
        <v-card-title> Color </v-card-title>
        <v-card-text>
          <v-color-picker
            style="margin: auto"
            v-model="color"
            :modes="['rgba']"
            @update:model-value="throttledChangeColor"
          ></v-color-picker>
        </v-card-text>
      </v-card-item>
      <v-card-item v-if="this.$props.mode != 'custom'">
        <v-card-title> Speed </v-card-title>
        <v-card-text>
          <v-slider
            v-model="speed"
            @update:model-value="throttledChangeSpeed"
          ></v-slider>
        </v-card-text>
      </v-card-item>
      <v-card-actions>
        <v-btn
          block
          size="large"
          color="orange-lighten-2"
          variant="text"
          @click="saveColor"
          >Done</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { throttle } from "lodash";
import LedService from "../../service/service";
export default {
  name: "colorPicker",
  props: ["num", "mode", "ledNum", "data"],
  data() {
    return {
      color: this.$props.data.color
        ? this.$props.data.color
        : {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
          },
      speed: this.$props.data.speed ? this.$props.data.speed : 50,
      // brightness: this.$props.data.color ? this.$props.data.color['a'] : 1,
      alertModel: false,
      flag: 1,
    };
  },
  created() {
    if (this.$store.state.led) {
      if (this.$store.state.led.has(this.$props.num)) {
        this.color["r"] = this.$store.state.led.get(this.$props.num).color["r"];
        this.color["g"] = this.$store.state.led.get(this.$props.num).color["g"];
        this.color["b"] = this.$store.state.led.get(this.$props.num).color["b"];
        // this.brightness = this.$store.state.led.get(this.$props.num).color["a"];
      }
    }
    // console.log(this.$props.data);
  },
  // watch: {
  //   color() {
  //     console.log("flag" + this.flag);
  //     if (this.flag > 1) {
  //       let data =
  //         this.$props.mode == "custom"
  //           ? { color: this.color, brightness: this.brightness }
  //           : {
  //               numLights: this.$props.ledNum,
  //               color: this.color,
  //               brightness: this.brightness,
  //               mode: this.$props.mode,
  //             };

  //       const updateLed =
  //         this.$props.mode == "custom"
  //           ? LedService.customLed(this.$props.num, data)
  //           : LedService.monoLed(data);
  //       updateLed
  //         .then((res) => {
  //           if (res.data.flag == "SUCCESS") {
  //             console.log(res.data);
  //           } else {
  //             this.alertModel = true;
  //             console.log(res.data);
  //           }
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     }
  //     this.flag++;
  //   },
  // },
  methods: {
    saveColor() {
      let led = {
        color: this.color,
        num:
          this.$props.mode == "custom" ? this.$props.num : this.$props.ledNum,
        // brightness: this.brightness,
        mode: this.$props.mode,
        speed: this.speed,
      };
      this.$store.commit("updateLed", led);
      this.$emit("closeModal", true, this.color, this.speed);
    },
    throttledChangeColor: throttle(function (newColor) {
      this.color = newColor;
      let data =
        this.$props.mode == "custom"
          ? { color: this.color, brightness: this.color["a"] }
          : {
              numLights: this.$props.ledNum,
              color: this.color,
              brightness: this.color["a"],
              mode: this.$props.mode,
              speed: this.speed,
            };

      const updateLed =
        this.$props.mode == "custom"
          ? LedService.customLed(this.$props.num, data)
          : LedService.monoLed(data);
      updateLed
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
    }, 500),
    throttledChangeSpeed: throttle(function (newSpeed) {
      this.speed = newSpeed;
      let data =
        this.$props.mode == "custom"
          ? { color: this.color, brightness: this.color["a"] }
          : {
              numLights: this.$props.ledNum,
              color: this.color,
              brightness: this.color["a"],
              mode: this.$props.mode,
              speed: this.speed,
            };

      const updateLed =
        this.$props.mode == "custom"
          ? LedService.customLed(this.$props.num, data)
          : LedService.monoLed(data);
      updateLed
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
