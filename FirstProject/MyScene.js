/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cube = new MyUnitCubeQuad(this);
        this.cylinder = new MyCylinder(this, 1, 5, 10);
        this.vehicle = new MyVehicle(this);

        //Objects connected to MyInterface
        this.displayAxis = true;

        this.sphereMaterial = new CGFappearance(this);
        this.sphereMaterial.loadTexture('images/earth.jpg');
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update();
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelarate(1);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelarate(-1);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(1);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-1);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        //this.sphereMaterial.apply();
        //this.incompleteSphere.display();
        this.cube.display();
        //this.cylinder.display();

        this.pushMatrix();
        this.popMatrix();
        this.translate(this.vehicle.position.x, this.vehicle.position.y, this.vehicle.position.z);
        this.rotate(this.vehicle.horizontalOrientation, 0, 1, 0);

        this.vehicle.display();

        // ---- END Primitive drawing section
    }
}