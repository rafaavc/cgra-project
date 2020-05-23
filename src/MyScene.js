/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    /**
     * @method constructor
     */
    constructor() {
        super();
    }

    ViewingModes = {
        ALL: 0,
        ONLYVEHICLE: 1,
        CYLINDER: 2,
        SPHERE: 3
    }

    /**
     * @method init
     * @param {CGFapplication} application 
     */
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.selectedTexture = 0;
        this.textures = ['split_cubemap', 'split_cubemap2'];
        this.textureIds = { 'Texture1': 0, 'Texture2': 1};

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cube = new MyCubeMap(this, this.textures[this.selectedTexture]);
        this.vehicle = new MyVehicle(this, 10);
        this.terrain = new MyTerrain(this, 20, 50, 8);
        this.billboard = new MyBillboard(this, 5);
        this.sphere = new MySphere(this, 50, 50);
        this.cylinder = new MyCylinder(this, 1, 1, 20);
        this.supplies = [];
        for (let i = 0; i < 5; i++) {
            this.supplies.push(new MySupply(this));
        }

        this.nSuppliesDelivered = 0;
        this.releasedLKey = true;
        this.releasedPKey = true;

        /**
         * Objects connected to MyInterface
         */
        this.displayAxis = false; // display axis?
        this.scaleFactor = 1;  // scale factor
        this.speedFactor = 1;  // vehicle speed factor
        this.viewingMode = this.ViewingModes.ALL;  // viewing mode
    }

    /**
     * @method initLights
     */
    initLights() {
        this.lights[0].setPosition(-15, 20, -5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    
    /**
     * @method initCameras
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
    }

    /**
     * @method initMaterials
     * @param {*} t 
     */
    initMaterials() {
        this.material = new CGFappearance(this);
        this.material.setAmbient(3, 3, 3, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
    }

    /**
     * @method update called periodically as per set in setUpdatePeriod
     * @param {Number} t current time
     */
    update(t){
        this.checkKeys(t);
        this.vehicle.update(t);
        for (let i = 0; i < this.supplies.length; i++) {
            this.supplies[i].update(t);
        }
    }

    /**
     * @method dropSupply drops a supply
     * @param {Number} t current time
     */
    dropSupply(t) {
        if (this.nSuppliesDelivered < this.supplies.length) {
            this.supplies[this.nSuppliesDelivered].drop(
                {x: this.vehicle.position.x, y: this.vehicle.position.y, z: this.vehicle.position.z}, 
                {x: this.vehicle.speed*Math.sin(this.vehicle.horizontalOrientation), y: 0, z: this.vehicle.speed*Math.cos(this.vehicle.horizontalOrientation)},
                t);
            this.nSuppliesDelivered++;
        }
        this.billboard.updateShader(this.nSuppliesDelivered);
    }

    /**
     * @method resetR resets the scene
     */
    resetR() {
        this.vehicle.reset();
        this.autoPilot = false;
        for (let i = 0; i < this.supplies.length; i++) {
            this.supplies[i].reset();
        }
        this.nSuppliesDelivered = 0;
        this.billboard.updateShader(this.nSuppliesDelivered);
    }

    /**
     * @method checkKeys checks which keys are pressed and acts accordingly
     * @param {Number} t current time
     */
    checkKeys(t) {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyP") && this.releasedPKey){
            this.vehicle.autoPilot();
            this.releasedPKey = false;
        }
        if (!this.vehicle.autoPilotMode){
            if (this.gui.isKeyPressed("KeyW")) {
                this.vehicle.accelerate(1);
            }
            if (this.gui.isKeyPressed("KeyS")) {
                this.vehicle.accelerate(-1);
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
        }

        if (this.gui.isKeyPressed("KeyL") && this.releasedLKey) {
            this.dropSupply(t);
            this.releasedLKey = false;
        }
        if (!this.gui.isKeyPressed("KeyL") && !this.releasedLKey) {
            this.releasedLKey = true;
        }
        if (!this.gui.isKeyPressed("KeyP") && !this.releasedPKey) {
            this.releasedPKey = true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.resetR();
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

        this.lights[0].update();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();


        // ---- BEGIN Primitive drawing section

        // Scale gui
        this.pushMatrix();
        
        // Descomentar a linha abaixo para ver o cilindro
        //this.cylinder.display();

        // Descomentar as duas linhas abaixo para ver a esfera com a textura do globo
        //this.sphereMaterial.apply();
        //this.incompleteSphere.display();

        if (this.viewingMode == this.ViewingModes.ALL) {

            this.pushMatrix();
            this.vehicle.display();
            this.popMatrix();

            this.pushMatrix();
            for (let i = 0; i < this.supplies.length; i++) {
                this.supplies[i].display();
            }
            this.popMatrix();

            this.pushMatrix();
            this.rotate(-Math.PI/2, 1, 0, 0);
            this.terrain.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(0, 15, 0);
            this.scale(50, 50, 50);
            this.cube.display();
            this.popMatrix();

            this.billboard.display();

        } else if (this.viewingMode == this.ViewingModes.ONLYVEHICLE) {

            this.vehicle.display();

        } else if (this.viewingMode == this.ViewingModes.CYLINDER) {

            this.material.apply();
            this.cylinder.display();

        } else if (this.viewingMode == this.ViewingModes.SPHERE) {

            this.material.apply();
            this.sphere.display();
            
        }
        this.popMatrix();
        // ---- END Primitive drawing section
    }

    /**
     * @method updateViewingMode used by the gui
     */
    updateViewingMode() {
        if (this.viewingMode == this.ViewingModes.ONLYVEHICLE) {
            this.vehicle.setY(0);
        } else if (this.viewingMode == this.ViewingModes.ALL) {
            this.vehicle.setY(10);
        } else return;
    }
    /**
     * @method updateAppliedTexture changes the cube's texture (used in the gui)
     */
    updateAppliedTexture() {
        this.cube.initMaterials(this.textures[this.selectedTexture]);
    }

    /**
     * @method updateScaleFactor used by the gui
     */
    updateScaleFactor(){
        this.vehicle.updateScaleFactor(this.scaleFactor);
    }

    /**
     * @method updateSpeedFactor used in the gui
     */
    updateSpeedFactor() {
        this.vehicle.updateSpeedFactor(this.speedFactor);
    }

    /**
     * @method setDefaultAppearance
     */
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
}
