<template>
  <div>
    <div class="header">
      <Header title="Mono" />
    </div>
    <div class="container">
      <div class="animationContainer">
        <AnimationPicker :ledNum="ledNum" />
      </div>
    </div>
    <div class="footer">
      <FooterVue />
    </div>
  </div>
</template>

<script>
import FooterVue from "../components/FooterVue.vue";
import Header from "../components/HeaderVue.vue";
import AnimationPicker from "../components/custom/animation.vue";

export default {
  name: "MonoPage",
  components: { FooterVue, Header, AnimationPicker },
  data() {
    return {
      ledNum: 1,
    };
  },
  created() {
    this.ledNum = this.$store.state.pixelNum
      ? this.$store.state.pixelNum
      : this.ledNum;
  },
  methods: {},
};
</script>
<style lang="scss"></style>
