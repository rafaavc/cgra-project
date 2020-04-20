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
            y: 0,
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
        this.sphere = new MySphere(this.scene, 10, 10);

    }
    display() {
        super.display();
        
        this.scene.translate(0, 10, 0);
        this.scene.scale(1, 1, 2);
        this.sphere.display();

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