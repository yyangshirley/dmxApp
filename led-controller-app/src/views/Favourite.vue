<template>
  <div class="header">
    <HeaderVue title="Favourite" />
  </div>
  <div class="container">
    <v-item-group
      v-for="type of typeList"
      :key="type"
      class="led-group d-flex justify-sm-space-between px-6 pt-2 pb-6"
    >
      <v-item>
        <v-btn @click="changeType(type)">{{ type }} </v-btn>
      </v-item>
    </v-item-group>
  </div>
  <div class="footer">
    <FooterVue />
  </div>
</template>

<script>
import FooterVue from "../components/FooterVue.vue";
import HeaderVue from "../components/HeaderVue.vue";
import LedService from "../service/service.js";
export default {
  name: "FavouritePage",
  components: { FooterVue, HeaderVue },

  data() {
    return {
      ledNum: 1,
      typeList: [],
    };
  },
  created() {
    this.ledNum = this.$store.state.pixelNum
      ? this.$store.state.pixelNum
      : this.ledNum;
    this.typeList = this.$store.state.favouriteList;
  },
  methods: {
    changeType(type) {
      const data = {
        type: type,
        numLights: this.ledNum,
      };
      LedService.createFavouriteLed(data)
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            // console.log(res.data);
          } else {
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
