<template>
  <div class="header">
    <HeaderVue title="Favourite" />
  </div>
  <div class="container">
    <v-card v-for="type of typeList" :key="type" style="margin: 10px">
      <v-card-actions>
        <v-btn @click="changeType(type)">{{ type }} </v-btn>
        <v-btn color="orange" @click="deleteType(type)">Delete</v-btn>
      </v-card-actions>
    </v-card>
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
    this.getFavouriteLed();
  },
  methods: {
    getFavouriteLed() {
      LedService.getFavouriteLed()
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            this.typeList = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    deleteType(type) {
      LedService.deleteFavouriteLed(type)
        .then((res) => {
          if (res.data.flag == "SUCCESS") {
            this.getFavouriteLed();
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
