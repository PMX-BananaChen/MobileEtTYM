<template>
  <div
    v-if="
      $route.name == 'App' ||
        $route.name == 'pages' ||
        $route.name == 'pages'
        "
  >
    <van-tabbar v-model="active" inactive-color="#666666" active-color="#000000" fixed placeholder>
      <van-tabbar-item replace v-for="(item, index) in tabbarList" :key="index" :to="item.path">
        <span>{{ item.title }}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      active: 0,
      tabbarList: [
        {
          path: "/",
          title: "首页",
          normal:
            "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-fx2.png",
          active:
            "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-fx.png",
        },
        {
          path: "/pages",
          title: "学习",
          normal:
            "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-xx.png",
          active:
            "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-xx2.png",
        },
        {
          path: "/pages",
          title: "我的",
          normal:
            "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd.png",
          active:
            "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd2.png",
        },
      ],
    };
  },

  //监听路由变化
  watch: {
    $route(to) {
      this.activeTab(to.path);
    },
  },

  methods: {
    activeTab(path) {
      var index = this.tabbarList.map((item) => item.path).indexOf(path);
      if (index != -1) {
        this.active = index;
      }
    },
  },
};
</script>