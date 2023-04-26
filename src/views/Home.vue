<template>
  <div class="home">
    <div class="view-container" ref="threeDBox"></div>
    <div class="tooltip-box" :style="tooltipPosition" ref="tooltipBox">
      <div class="container">
        <div class="title">标题：{{ tooltopContent.title }}</div>
        <div class="explain">说明：{{ tooltopContent.text }}</div>
      </div>
    </div>
    <p class="title-text" ref="titleBox" :style="titlePosition">
      {{ tooltopContent.title }}
    </p>
  </div>
</template>

<script>
import * as THREE from "three";
// 轨道控制器 使用控制器实现移动、改变视角等效果
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
export default {
  name: "Home",
  data() {
    return {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      axisHelper: null,
      sphere: null,
      time: {
        value: 0,
      },
      dataList: [
        {
          // 场景贴图
          image: require("@/assets/image/livingRoom.jpg"),
          tipsList: [
            // 标签数据
            {
              position: { x: -50, y: -4, z: 150 },
              content: {
                title: "信息点1",
                text: "这是商品1",
                image: 1,
                showTip: false,
                showTitle: true,
              },
            },
            {
              position: { x: -100, y: 0, z: -231 },
              content: {
                title: "墙纸",
                text: "墙纸",
                image: 2,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 150, y: -50, z: -198 },
              content: {
                title: "床",
                text: "床",
                image: 3,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 210, y: 11, z: -140 },
              content: {
                title: "小熊",
                text: "小熊",
                image: 4,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 208, y: -12, z: 140 },
              content: {
                title: "衣柜",
                text: "衣柜",
                image: 5,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 86, y: -9, z: 236 },
              content: {
                title: "信息点5",
                text: "口红",
                image: 6,
                showTip: true,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/kitchen.jpg"),
          tipsList: [
            {
              position: { x: -100, y: -4, z: 150 },
              content: {
                title: "进入卧室",
                text: "",
                image: 0,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/wall.jpg"),
          tipsList: [
            {
              position: { x: -90, y: 50 },
              content: {
                title: "返回",
                text: "",
                image: 0,
                showTip: true,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/bed.jpg"),
          tipsList: [
            {
              position: { x: 150, y: -50, z: -198 },
              content: {
                title: "返回",
                text: "",
                image: 0,
                showTip: true,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/bear.jpg"),
          tipsList: [
            {
              position: { x: 210, y: 11, z: -140 },
              content: {
                title: "返回",
                text: "",
                image: 0,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/wardrobe.jpg"),
          tipsList: [
            {
              position: { x: 208, y: -12, z: 140 },
              content: {
                title: "返回",
                text: "",
                image: 0,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/liptips.jpg"),
          tipsList: [
            {
              position: { x: 86, y: -9, z: 236 },
              content: {
                title: "返回",
                text: "",
                image: 0,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
      ],
      tipsSpriteList: [],
      tooltipPosition: {
        top: "-100%",
        left: "-100%",
      },
      titlePosition: {
        top: "-100%",
        left: "-100%",
      },
      tooltopContent: {},
    };
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x101010);
    },

    initCamera(element) {
      this.camera = new THREE.PerspectiveCamera(
        45, //角度
        element.clientWidth / element.clientHeight,
        0.1,
        1000
      );
      // 拿着相机站在房间里面，看到的是房间内部，站在房子外面看到的是房子外面效果
      // x减小视角向右  y增加视角向下 z增加视角向左
      // this.camera.position.set(50, 0, 40);
      this.camera.position.set(-70, 20, 40);
    },

    initControls(element) {
      this.controls = new OrbitControls(this.camera, element);
      this.controls.minDistance = 1;
      this.controls.maxDistance = 100;
      this.controls.enablePan = false;
    },

    initRenderer(element) {
      this.renderer = new THREE.WebGLRenderer();
      //页面上呈现大小，没事别改
      this.renderer.setSize(element.offsetWidth, element.offsetHeight);
      element.appendChild(this.renderer.domElement);
    },

    // 初始化 添加一个球体并将全景图贴到球体上
    initContent(index = 0) {
      // 16：球体半径   50：水平、垂直分段数
      let sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
      // 把视觉放入球内 贴图反转 否则展示的就是球形
      // scale继承自bufferGeometry-->object3D.scale-->vector3
      // 因此 此处是在缩放比例 xy轴放大16倍 z轴缩小16倍--》呈现贴图效果
      sphereGeometry.scale(16, 16, -16);
      let texture = new THREE.TextureLoader().load(this.dataList[index].image);
      // 使用threejs自带的meshbasicmaterial材质 网格模型
      let sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      this.scene.add(this.sphere);
      this.addTipsSprite();
    },

    addTipsSprite(index = 0) {
      let tipTexture = new THREE.TextureLoader().load(
        require("@/assets/image/tip.png")
      );
      // 根据需要选择Sprite或矩形Mesh标注场景
      // 如果希望矩形始终平行于canvas画布，就选择Sprite，如果希望矩形标注姿态角度能跟着场景旋转，就使用矩形Mesh标注场景
      let material = new THREE.SpriteMaterial({ map: tipTexture });
      this.tipsSpriteList = [];
      this.dataList[index].tipsList.forEach((item) => {
        let sprite = new THREE.Sprite(material);
        // 标签的缩放范围 和物品差不多大小的数量级即可
        sprite.scale.set(10, 10, 10);
        // 标签位置即物品位置
        sprite.position.set(item.position.x, item.position.y, item.position.z);
        sprite.content = item.content; // 设置标签内容
        this.tipsSpriteList.push(sprite); // 储存标签
        this.scene.add(sprite); // 添加到场景中
      });
    },

    changeContentAndtips(index) {
      this.scene.children = this.scene.children.filter(
        (item) => String(item.type) !== "Sprite"
      );
      this.tipsSpriteList = [];
      let texture = new THREE.TextureLoader().load(this.dataList[index].image);
      let sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
      });
      this.sphere.material = sphereMaterial;
      gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });
      this.camera.updateProjectionMatrix();
      this.addTipsSprite(index);
    },

    render() {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.renderer.sortObjects = false;
      // 能够自动旋转起来
      this.timer = requestAnimationFrame(this.render);
      // 旋转速度
      this.time.value += 0.015;
    },

    onResize() {
      let element = this.$refs.threeDBox;
      this.camera.aspect = element.clientWidth / element.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(element.clientWidth, element.clientHeight);
    },

    onMouseClick(e) {
      e.preventDefault();
      let element = this.$refs.threeDBox;
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
      mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      let intersects = raycaster.intersectObjects(this.tipsSpriteList, true);
      if (intersects.length > 0 && intersects[0].object.content.showTitle) {
        this.changeContentAndtips(intersects[0].object.content.image);
        this.handleTooltipHide(e);
      }
    },

    onMousemove(e) {
      e.preventDefault();
      let element = this.$refs.threeDBox;
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
      mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      let intersects = raycaster.intersectObjects(this.tipsSpriteList, true);
      if (intersects.length > 0) {
        let elementWidth = element.clientWidth / 2;
        let elementHeight = element.clientHeight / 2;
        let worldVector = new THREE.Vector3(
          intersects[0].object.position.x,
          intersects[0].object.position.y,
          intersects[0].object.position.z
        );
        let position = worldVector.project(this.camera);
        this.tooltopContent = intersects[0].object.content;
        if (intersects[0].object.content.showTip) {
          let left = Math.round(
            elementWidth * position.x +
              elementWidth -
              this.$refs.tooltipBox.clientWidth / 2
          );
          let top = Math.round(
            -elementHeight * position.y +
              elementHeight -
              this.$refs.tooltipBox.clientHeight / 2
          );
          this.tooltipPosition = {
            left: `${left}px`,
            top: `${top}px`,
          };
        } else if (intersects[0].object.content.showTitle) {
          let left = Math.round(
            elementWidth * position.x +
              elementWidth -
              this.$refs.titleBox.clientWidth / 2
          );
          let top = Math.round(-elementHeight * position.y + elementHeight);
          this.titlePosition = {
            left: `${left}px`,
            top: `${top}px`,
          };
        }
      } else {
        this.handleTooltipHide(e);
      }
    },

    handleTooltipHide(e) {
      e.preventDefault();
      this.tooltipPosition = {
        top: "-100%",
        left: "-100%",
      };
      this.titlePosition = {
        top: "-100%",
        left: "-100%",
      };
      this.tooltopContent = {};
    },
  },
  // itemClick(){
  //       // this.$router.push(item)
  //        this.$router.push({
  //         path:'/Item',
  //         // query:{
  //         //   iid:this.goodsItem.iid
  //         // }
  //       })
  // },
  mounted() {
    let element = this.$refs.threeDBox;
    this.initScene();
    this.initCamera(element);
    this.initControls(element);
    this.initContent();
    this.initRenderer(element);
    this.render();
    window.addEventListener("resize", this.onResize, false);
    window.addEventListener("click", this.onMouseClick, false);
    // window.addEventListener("itemClick", this.itemClick, false);
    this.renderer.domElement.addEventListener(
      "mousemove",
      this.onMousemove,
      false
    );
    this.$refs.tooltipBox.addEventListener(
      "mouseleave",
      this.handleTooltipHide,
      false
    );
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
  .title-text {
    position: absolute;
    width: 66px;
    color: #382129;
  }
  .tooltip-box {
    position: absolute;
    padding: 0px 0px 40px 0px;
    line-height: 30px;
    border-radius: 4px;
    color: #ffffff;
    z-index: 100;
    cursor: pointer;
    .container {
      position: relative;
      width: 240px;
      max-height: 200px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.6);
      // &::before {
      //   content: "";
      //   position: absolute;
      //   bottom: -16px;
      //   left: 20%;
      //   border-top: 16px solid rgba(0, 0, 0, 0.8);
      //   border-left: 10px solid transparent;
      //   border-right: 10px solid transparent;
      // }
      .title {
        width: 100%;
        padding: 6px 0;
      }
      .explain {
        width: 100%;
        max-height: 100px;
        font-size: 14px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-track {
          background: #353535;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb {
          background: #cdcdcd;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #9c9c9c;
        }
        &::-webkit-scrollbar-corner {
          background: #f6f6f6;
        }
      }
    }
  }
}
</style>
