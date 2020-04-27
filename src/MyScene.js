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
        this.cylinder = new MyCylinder(this, 1, 5, 10);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this, 20, 50, 8);
        this.supply = new MySupply(this);


        this.selectedTexture = 0;
        this.textures = ['split_cubemap', 'split_cubemap2'];
        this.textureIds = { 'Texture1': 0, 'Texture2': 1};
        this.cube = new MyUnitCubeQuad(this, this.textures[this.selectedTexture]);

        //Objects connected to MyInterface
        this.displayAxis = true;
        //Scale factor
        this.scaleFactor = 1;
        //Speed factor
        this.speedFactor = 1;

        this.sphereMaterial = new CGFappearance(this);
        this.sphereMaterial.loadTexture('images/earth.jpg');
    }
    dropSupply() {
        this.supply.drop(
            {x: this.vehicle.position.x, y: this.vehicle.position.y, z: this.vehicle.position.z}, 
            {x: this.vehicle.speed*Math.sin(this.vehicle.horizontalOrientation), y: 0, z: this.vehicle.speed*Math.cos(this.vehicle.horizontalOrientation)}
        );
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
        this.supply.update();
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

        if (!this.gui.isKeyPressed("KeyD") && !this.gui.isKeyPressed("KeyA")){
            this.vehicle.resetTurn();
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
        }
        if (this.gui.isKeyPressed("KeyL")) {
            this.dropSupply();
        }
    }

    //Function that changes texture in cube map
    updateAppliedTexture() {
        this.cube.initMaterials(this.textures[this.selectedTexture]);
    }

    updateScaleFactor(){
        this.vehicle.updateScaleFactor(this.scaleFactor);
    }

    updateSpeedFactor() {
        this.vehicle.updateSpeedFactor(this.speedFactor);
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


        // ---- BEGIN Primitive drawing section

        // Scale gui
        this.pushMatrix();
        

        /*this.vehicle.display();
        this.popMatrix();*/

        //This sphere does not have defined texture coordinates
        //this.sphereMaterial.apply();
        //this.incompleteSphere.display();


        this.pushMatrix();
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();


        this.pushMatrix();
        this.vehicle.display();
        this.popMatrix();


        this.pushMatrix();
        this.supply.display();
        this.popMatrix();


        //this.cube.display();

        //this.cylinder.display();


        // ---- END Primitive drawing section
    }
}