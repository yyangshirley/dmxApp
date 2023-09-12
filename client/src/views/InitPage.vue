<template>
  <div>
    <v-app>
      <v-container>
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="require('../assets/house.jpg')"
            height="200px"
            cover
          ></v-img>

          <v-card-title> DMX512 Controller </v-card-title>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                Pixels: <span>{{ inputNumber }}</span>
                <!-- pixels number 25 -->
                <v-slider
                  v-model="inputNumber"
                  track-color="grey"
                  min="1"
                  max="25"
                  :step="1"
                >
                  <template v-slot:prepend>
                    <v-btn
                      size="small"
                      variant="text"
                      icon="mdi-minus"
                      @click="decrement"
                    ></v-btn>
                  </template>

                  <template v-slot:append>
                    <v-btn
                      size="small"
                      variant="text"
                      icon="mdi-plus"
                      @click="increment"
                    ></v-btn>
                  </template>
                </v-slider>
              </v-card-text>
            </div>
          </v-expand-transition>
          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
              @click="to(inputNumber)"
            >
              ENTER
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import LedService from "../service/service.js";
export default {
  name: "InitPage",
  components: {},
  data() {
    return {
      show: false,
      inputNumber: 1,
      ifInput: false,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
  },
  methods: {
    decrement() {
      this.inputNumber--;
    },
    increment() {
      this.inputNumber++;
    },
    to(num) {
      this.$store.commit("updateLight", num);
      this.$router.push(`/mono`);
    },
  },
  created() {
    this.inputNumber = this.$store.state.pixelNum
      ? this.$store.state.pixelNum
      : this.inputNumber;
    console.log(this.inputNumber);
    LedService.closeAll();
  },
};
</script>
