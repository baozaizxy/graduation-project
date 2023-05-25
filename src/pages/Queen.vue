<template>
  <div class="queen">
    <div class="view-container" ref="threeDBox" style="height: 100vh"></div>
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
  name: "Queen",
  data() {
    return {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      axisHelper: null,
      sphere: null,
      // flat:null,
      time: {
        value: 0,
      },
      dataList: [
        {
          // 场景贴图
          image: require("@/assets/image/ROOM1.jpg"),
          tipsList: [
            // 进入展厅
            {
              position: { x: -200, y: 20, z: 120 },
              id: 0,
              content: {
                title: "展厅",
                text: "进入展厅",
                // 路径
                image: 1,
                showTip: false,
                showTitle: true,
              },
            },
            {
              position: { x: -100, y: 10, z: -120 },
              id: 0,
              content: {
                title: "更衣室",
                text: "进入更衣室",
                image: 2,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/ROOM2.jpg"),
          tipsList: [
            {
              position: { x: -100, y: -4, z: 150 },
              id: 0,
              content: {
                title: "前台",
                text: "",
                image: 0,
                showTip: false,
                showTitle: true,
              },
            },
            {
              position: { x: 98, y: 20, z: -231 },
              id: 3,
              content: {
                title: "女装",
                text: "白色上衣",
                image: 3,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 140, y: 0, z: -150 },
              id: 3,
              content: {
                title: "女装",
                text: "毛衣",
                image: 5,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 200, y: 30, z: 130 },
              id: 3,
              content: {
                title: "女装",
                text: "连衣裙",
                image: 4,
                showTip: true,
                showTitle: true,
              },
            },
            {
              position: { x: 100, y: -12, z: 140 },
              id: 3,
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
              id: 3,
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
          image: require("@/assets/image/ROOM3.jpg"),
          tipsList: [
            {
              position: { x: -100, y: -4, z: 150 },
              content: {
                title: "前台",
                text: "",
                image: 0,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/trousers.jpg"),
          tipsList: [
            {
              position: { x: 40, y: 40, z: 10 },
              id: 0,
              content: {
                title: "返回",
                text: "",
                image: 1,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/skirt.jpg"),
          tipsList: [
            {
              position: { x: 50, y: 50, z: 10 },
              id: 0,
              content: {
                title: "返回",
                text: "",
                image: 1,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/sweater.jpg"),
          tipsList: [
            {
              position: { x: 40, y: 40, z: 10 },
              id: 0,
              content: {
                title: "返回",
                text: "",
                image: 1,
                showTip: false,
                showTitle: true,
              },
            },
          ],
        },
        {
          image: require("@/assets/image/trousers.jpg"),
          tipsList: [
            {
              position: { x: 50, y: 50, z: 20 },
              id: 0,
              content: {
                title: "返回",
                text: "",
                image: 1,
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
      this.camera.position.set(50, 0, 40);
      // this.camera.position.set(-70, 20, 40);
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
      console.log("initRenderer", element, element.offsetHeight);
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
        require("@/assets/image/icon-arrow.png")
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

    // changeContentAndtips(index) {
    //   this.scene.children = this.scene.children.filter(
    //     (item) => String(item.type) !== "Sprite"
    //   );
    //   this.tipsSpriteList = [];
    //   let texture = new THREE.TextureLoader().load(this.dataList[index].image);
    //   let sphereMaterial = new THREE.MeshBasicMaterial({
    //     map: texture,
    //     transparent: true,
    //     opacity: 0,
    //   });
    //   this.sphere.material = sphereMaterial;
    //   gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });
    //   this.camera.updateProjectionMatrix();
    //   this.addTipsSprite(index);
    // },

    // 切换场景和切换到详情展示都是此段逻辑
    changeContentAndtips(index) {
      this.scene.children = this.scene.children.filter(
        (item) => String(item.type) !== "Sprite"
      );
      this.tipsSpriteList = [];
      let texture = new THREE.TextureLoader().load(this.dataList[index].image);
      if (index > 2) {
        const mat = new THREE.SpriteMaterial({ map: texture });
        const obj = new THREE.Sprite(mat);
        obj.scale.set(50, 50, 1); //只需要设置x、y两个分量就可以
        this.scene.add(obj);
      } else {
        let material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0,
        });
        this.sphere.material = material;
        gsap.to(material, { transparent: true, opacity: 1, duration: 2 });
        this.camera.updateProjectionMatrix();
      }

      // gsap.to(material, { transparent: true, opacity: 1, duration: 2 });
      // this.camera.updateProjectionMatrix();
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
      console.log("innnnnnnnnnn7789877", element)
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

    screenToWorld(x, y) {
      // 将屏幕坐标归一化为[-1, 1]的范围
      const mouseX = (x / window.innerWidth) * 2 - 1;
      const mouseY = -(y / window.innerHeight) * 2 + 1;

      // 创建一个新的三维向量，并使用unproject方法将屏幕坐标转换为三维坐标
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(this.camera);

      // 创建一条从相机位置到转换后的三维坐标的射线
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera({ x: mouseX, y: mouseY }, this.camera);

      // 获取射线与场景中的所有物体的交点，并返回距离最近的交点的坐标
      const intersects = raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0) {
        return intersects[0].point;
      }

      // 如果没有交点，则返回相机的位置
      return this.camera.position;
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

    // initPlayAudio() {
    //   // 创建一个 AudioListener 并将其添加到 camera 中
    //   const listener = new THREE.AudioListener();
    //   this.camera.add(listener);

    //   // 创建一个全局 audio 源
    //   const sound = new THREE.Audio(listener);

    //   // 加载一个 sound 并将其设置为 Audio 对象的缓冲区
    //   const audioLoader = new THREE.AudioLoader();
    //   audioLoader.load(require("@/assets/music/music1.ogg"), function (buffer) {
    //     navigator.mediaDevices.getUserMedia({ audio: true });
    //     sound.setBuffer(buffer);
    //     sound.setLoop(true);
    //     sound.setVolume(0.5);
    //     // sound.context('@/assets/music/music1.ogg')
    //     // sound.hasPlaybackControl(true);
    //     sound.autoplay(true);
    //     sound.play();
    //   });
    // },
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
    // this.initPlayAudio();
    this.render();
    window.addEventListener("resize", this.onResize, false);
    window.addEventListener("click", this.onMouseClick, false);
    window.addEventListener("itemClick", this.itemClick, false);
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
.queen {
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
