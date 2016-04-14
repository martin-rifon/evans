(function() {

  'use strict';

  angular.module('evansClient.viewer', [])
    .service('viewerService', viewerService);

  viewerService.$inject = [];

  function viewerService() {
    var service = {};

    var lesson7 = {
      scene: null,
      camera: null,
      renderer: null,
      container: null,
      controls: null,
      clock: null,

      init: function(modelURL) { // Initialization

        // create main scene
        this.scene = new THREE.Scene();
        // this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);

        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;

        // prepare camera
        var VIEW_ANGLE = 60, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add(this.camera);
        this.camera.position.set(-27, 15, -25);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        // prepare renderer
        this.renderer = new THREE.WebGLRenderer({ antialias:true });
        this.renderer.setSize(640, 480);
        // this.renderer.setClearColor(this.scene.fog.color);
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        // prepare container
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        // events
        THREEx.WindowResize(this.renderer, this.camera);

        // prepare controls (OrbitControls)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.maxDistance = 3000;

        // prepare clock
        this.clock = new THREE.Clock();

        this.scene.add( new THREE.AmbientLight(0x606060) );

        // light
        var dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(200, 200, 1000).normalize();
        this.camera.add(dirLight);
        this.camera.add(dirLight.target);

        // load models
        this.loadModels(modelURL);
      },
      loadModels: function(modelURL) {

        // here we will load all the models ...
        // prepare PLY loader and load the model
        var oPlyLoader = new THREE.PLYLoader();
        oPlyLoader.load(modelURL, function(geometry) {

          var material = new THREE.MeshBasicMaterial({color: 0xff4444});
          var mesh = new THREE.Mesh(geometry, material);
          mesh.rotation.set( - Math.PI / 2 - 0.2, 0, - Math.PI / 2 + 0.2);
          mesh.position.set(-20, 15, 10);
          mesh.scale.set(2, 2, 2);
          lesson7.scene.add(mesh);
        });
      }
    };

    service.loadModel = loadModel;
    service.lesson7 = lesson7;

    return service;

    

    // Animate the scene
    function animate() {
      requestAnimationFrame(animate);
      render();
      update();
    }

    // Update controls
    function update() {
      lesson7.controls.update(lesson7.clock.getDelta());
    }

    // Render the scene
    function render() {
      if (lesson7.renderer) {
        lesson7.renderer.render(lesson7.scene, lesson7.camera);
      }
    }

    // Initialize lesson on page load
    function initializeLesson(modelURL) {
      lesson7.init(modelURL);
      animate();
    }

    function loadModel(modelURL) {
      initializeLesson(modelURL);
    }
  }

})();
