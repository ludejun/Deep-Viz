'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _threeObjLoader = require('three-obj-loader');

var _threeObjLoader2 = _interopRequireDefault(_threeObjLoader);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _threeObjLoader2.default)(THREE);

var ThreeModel = function (_Component) {
  _inherits(ThreeModel, _Component);

  function ThreeModel() {
    _classCallCheck(this, ThreeModel);

    return _possibleConstructorReturn(this, (ThreeModel.__proto__ || Object.getPrototypeOf(ThreeModel)).apply(this, arguments));
  }

  _createClass(ThreeModel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var ThreeDom = this.containerId;
      var id = 'three' + Math.random();
      ThreeDom.id = id;
      var _props = this.props,
          _props$width = _props.width,
          width = _props$width === undefined ? 300 : _props$width,
          _props$height = _props.height,
          height = _props$height === undefined ? 300 : _props$height,
          modelType = _props.modelType,
          modelPath = _props.modelPath,
          pointLightColor = _props.pointLightColor,
          pointLightPosition = _props.pointLightPosition,
          ambientLightColor = _props.ambientLightColor,
          cameraY = _props.cameraY,
          cameraZ = _props.cameraZ,
          _props$isOnMouseMove = _props.isOnMouseMove,
          isOnMouseMove = _props$isOnMouseMove === undefined ? false : _props$isOnMouseMove,
          rotatateY = _props.rotatateY;

      var container = void 0;
      var camera = void 0;
      var scene = void 0;
      var renderer = void 0;
      var model = void 0;
      var mouseX = 0;
      var mouseY = 0;
      var windowHalfX = width / 2;
      var windowHalfY = height / 2;
      var modelConfig = {
        male: require('../assets/model/male02.obj'),
        female: require('../assets/model/female02.obj')
      };
      var modelFile = modelPath || modelConfig[modelType || 'male'];

      var init = function init() {
        console.log('init...');

        container = document.getElementById(id);
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
        camera.position.z = cameraZ || 250;

        // scene
        scene = new THREE.Scene();

        // 0x82CBFF
        var ambient = new THREE.AmbientLight(ambientLightColor || 'rgb(245,222,179)');
        scene.add(ambient);

        // const directionalLight = new THREE.DirectionalLight( 'rgb(0 197 205)' );
        var directionalLight = new THREE.PointLight(pointLightColor || 'rgb(0, 197, 205)', 1, 100);
        if (pointLightPosition) {
          directionalLight.position.set(pointLightPosition[0], pointLightPosition[1], pointLightPosition[2]);
        } else {
          directionalLight.position.set(50, 50, 60);
        }
        scene.add(directionalLight);

        // texture

        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
          console.log(item, loaded, total);
        };

        // const texture = new THREE.Texture();

        var onProgress = function onProgress(xhr) {
          if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
          }
        };

        var onError = function onError(xhr) {
          console.log(xhr);
        };

        // 加载皮肤
        // var loader = new THREE.ImageLoader( manager );
        // loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {
        //   texture.image = image;
        //   texture.needsUpdate = true;
        // } );

        // model

        var loader = new THREE.OBJLoader(manager);
        loader.load(modelFile, function (object) {
          object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {

              // child.material.map = texture;

            }
          });

          model = object;
          model.position.y = cameraY || -80;
          scene.add(model);
        }, onProgress, onError);

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

      var onWindowResize = function onWindowResize() {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      var onDocumentMouseMove = function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
      };

      //

      var animate = function animate() {
        requestAnimationFrame(animate);
        render();
      };

      var render = function render() {
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
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', { ref: function ref(_ref) {
          return _this2.containerId = _ref;
        }, style: this.props.style });
    }
  }]);

  return ThreeModel;
}(_react.Component);

exports.default = ThreeModel;


ThreeModel.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  modelType: _propTypes2.default.string,
  modelPath: _propTypes2.default.string,
  pointLightColor: _propTypes2.default.string,
  pointLightPosition: _propTypes2.default.array,
  ambientLightColor: _propTypes2.default.string,
  cameraY: _propTypes2.default.number,
  cameraZ: _propTypes2.default.number,
  isOnMouseMove: _propTypes2.default.bool,
  rotatateY: _propTypes2.default.number
};