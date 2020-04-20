class MyVehicle extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene) {
        super(scene);

        this.initBuffers();
        this.initObjects();

        this.horizontalOrientation = 0; // Y axis angle
        this.speed = 0;
        this.position = {
            x: 0,
            y: 0, // should be 10, it's 0 just for testing
            z: 0
        };
        this.speedFactor = 1;
    }
  
    /**
     * @method initBuffers
     * Initializes the vehicle buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initObjects() {
        this.sphere = new MySphere(this.scene, 50, 50);
        this.smallSphere = new MySphere(this.scene, 28, 28);
        this.cylinder = new MyCylinder(this.scene, 0.07, 0.6, 28);
    }
    display() {
        super.display();

        this.scene.popMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.pushMatrix();

        this.scene.scale(0.45, 0.45, 1);
        this.sphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y-(0.5), this.position.z);
        this.cylinder.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y-(0.5), this.position.z);
        this.scene.translate(0, 0, -0.3);
        this.scene.scale(0.07, 0.07, 0.07);
        this.smallSphere.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y-(0.5), this.position.z);
        this.scene.translate(0, 0, 0.3);
        this.scene.scale(0.07, 0.07, 0.07);
        this.smallSphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
    updateSpeedFactor(sf) {
        this.speedFactor = sf;
    }
    update(){
        this.position.z += this.speed * this.speedFactor * Math.cos(this.horizontalOrientation);
        this.position.x += this.speed * this.speedFactor * Math.sin(this.horizontalOrientation);
    }
    turn(val){
        this.horizontalOrientation += val*0.1;
    }
    accelarate(val){
        this.speed += val*this.speedFactor;
    }
    reset(){
        this.horizontalOrientation = 0;
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.speed = 0;
    }
}