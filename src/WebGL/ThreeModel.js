import React, { Component } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import PropTypes from 'prop-types';

export default class ThreeModel extends Component {
  componentDidMount() {
    const ThreeDom = this.containerId;
    const id = `three${Math.random()}`;
    ThreeDom.id = id;
    const {
      width = 300,
      height = 300,
      modelType,
      modelPath,
      pointLightColor,
      pointLightPosition,
      ambientLightColor,
      cameraY,
      cameraZ,
      isOnMouseMove = false,
      rotatateY,
      onProgress: onProgressProp,
      onError: onErrorProp,
    } = this.props;
    let container;
    let camera;
    let scene;
    let renderer;
    let model;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = width / 2;
    const windowHalfY = height / 2;
    modelType &&
      console.warn('[deep-viz] ThreeModel: `modelType` is no longer supported, use `modelPath`.');
    // const modelConfig = {
    //   male: require('../assets/model/male02.obj'),
    //   female: require('../assets/model/female02.obj'),
    // };
    // const modelFile = modelPath || modelConfig[modelType || 'male'];
    const modelFile = modelPath;

    const init = () => {
      container = document.getElementById(id);
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
      camera.position.z = cameraZ || 250;

      // scene
      scene = new THREE.Scene();

      // 0x82CBFF
      const ambient = new THREE.AmbientLight(ambientLightColor || 'rgb(245,222,179)');
      scene.add(ambient);

      // const directionalLight = new THREE.DirectionalLight( 'rgb(0 197 205)' );
      const directionalLight = new THREE.PointLight(pointLightColor || 'rgb(0, 197, 205)', 1, 100);
      if (pointLightPosition) {
        directionalLight.position.set(
          pointLightPosition[0],
          pointLightPosition[1],
          pointLightPosition[2],
        );
      } else {
        directionalLight.position.set(50, 50, 60);
      }
      scene.add(directionalLight);

      // texture

      const manager = new THREE.LoadingManager();
      // Progress and failures are surfaced through props rather than logged,
      // so the component stays quiet inside a host application.
      manager.onProgress = function (item, loaded, total) {
        onProgressProp && onProgressProp(loaded, total, item);
      };

      // const texture = new THREE.Texture();

      const onProgress = function (xhr) {
        if (xhr.lengthComputable && onProgressProp) {
          onProgressProp(xhr.loaded, xhr.total);
        }
      };

      const onError = function (error) {
        if (onErrorProp) {
          onErrorProp(error);
        } else {
          console.error('[deep-viz] ThreeModel failed to load the model:', error);
        }
      };

      // 加载皮肤
      // var loader = new THREE.ImageLoader( manager );
      // loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {
      //   texture.image = image;
      //   texture.needsUpdate = true;
      // } );

      // model

      const loader = new OBJLoader(manager);
      loader.load(
        modelFile,
        (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // child.material.map = texture;
            }
          });

          model = object;
          model.position.y = cameraY || -80;
          scene.add(model);
        },
        onProgress,
        onError,
      );

      // renderer

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0xffffff, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      document.addEventListener('mousemove', onDocumentMouseMove, false);

      //

      window.addEventListener('resize', onWindowResize, false);
    };

    const onWindowResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 2;
      mouseY = (event.clientY - windowHalfY) / 2;
    };

    //

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      if (isOnMouseMove) {
        camera.position.x += (mouseX - camera.position.x) * 0.1;
        camera.position.y += (-mouseY - camera.position.y) * 0.1;
      }
      // camera.position.x += (97.25 - camera.position.x) * 0.05;
      // camera.position.y += (-9.25 - camera.position.y) * 0.05;
      if (model) model.rotation.y += rotatateY || 0.05;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    init();
    animate();
  }

  render() {
    return <div ref={(ref) => (this.containerId = ref)} style={this.props.style} />;
  }
}

ThreeModel.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modelType: PropTypes.string,
  modelPath: PropTypes.string,
  pointLightColor: PropTypes.string,
  pointLightPosition: PropTypes.array,
  ambientLightColor: PropTypes.string,
  cameraY: PropTypes.number,
  cameraZ: PropTypes.number,
  isOnMouseMove: PropTypes.bool,
  rotatateY: PropTypes.number,
  onProgress: PropTypes.func,
  onError: PropTypes.func,
};
