<template>
  <div class="home">
    <div class="view-container" ref="threeDBox"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "Home",
  data() {
    return {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      axisHelper: null,
      box: null,
      timer: {},
      picList: ["left", "right", "top", "bottom", "front", "back"],
    };
  },
  // 为了真正能够让你的场景借助three.js来进行显示，我们需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。
  methods: {
    // 创建场景
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x101010);
    },

    // 创建、初始化相机
    initCamera(element) {
      // 此处选择了透视摄相机
      this.camera = new THREE.PerspectiveCamera(
        // 参数 1、fov视野范围（角度）2、长宽比 3、近截面 4、远截面
        // 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。
        45,
        element.clientWidth / element.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(50, 0, 40);
    },

    // 初始化轨道控制器  使用控制器实现移动、改变视角等效果
    initControls(element) {
      // 添加控制器
      this.controls = new OrbitControls(this.camera, element);
      // 相机移动极限
      this.controls.minDistance = 1;
      this.controls.maxDistance = 100;
      // 不启用惯性
      this.controls.enablePan = false;
    },

    // 创建、初始化渲染器
    initRenderer(element) {
      this.renderer = new THREE.WebGLRenderer();
      // 设置渲染器尺寸 让渲染器渲染出的场景填充满我们的应用程序。
      // 目前未加入商城系统中 尺寸为浏览器窗口大小，后期为了适应商城系统，可以设置大小为嵌入某一父元素中或保持全屏大小
      // 第三个参数updateStyle(true or false)可以设置渲染的分辨率
      this.renderer.setSize(element.offsetWidth, element.offsetHeight);
      // 将renderer（渲染器）的dom元素（renderer.domElement）添加到我们的HTML文档中
      element.appendChild(this.renderer.domElement);
    },

    // 初始化内容区（设置大小等）
    initContent() {
      // 立方体对象
      let boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      // 材质
      let boxMaterials = [];
      this.picList.forEach((item) => {
        let texture = new THREE.TextureLoader().load(
          require(`@/assets/image/${item}.png`)
        );
        boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
      });
      // 在计算机世界里，3D世界是由点组成，两个点能够组成一条直线，
      //                三个不在一条直线上的点就能够组成一个三角形面，无数三角形面就能够组成各种形状的物体。
      // 我们通常把这种网格模型叫做Mesh模型。
      // 网格  网格包含一个几何体以及作用在此几何体上的材质
      this.box = new THREE.Mesh(boxGeometry, boxMaterials);
      this.box.geometry.scale(10, 10, -10);
      this.scene.add(this.box);
    },

    // 渲染场景
    render() {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      // 渲染器定时刷新对场景进行绘制的循环
      // requestAnimationFrame相对于setInterval一大优点是 当用户切换到其它标签页时，会暂停，不会浪费资源
      this.timer = requestAnimationFrame(this.render);
    },

    onResize() {
      // 更新相机参数
      let element = this.$refs.threeDBox;
      this.camera.aspect = element.clientWidth / element.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(element.clientWidth, element.clientHeight);
    },
  },
  // 挂载到页面之后 进行加载
  mounted() {
    let element = this.$refs.threeDBox;
    this.initScene();
    this.initCamera(element);
    this.initControls(element);
    this.initContent();
    this.initRenderer(element);
    this.render();
    window.addEventListener("resize", this.onResize, false);
  },
  destroyed() {
    cancelAnimationFrame(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .view-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
