class MyVehicle extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * 
     */
    constructor(scene) {
        super(scene);
        this.initBuffers();

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
        this.vertices = [
            0.5, 0, -0.3,
            -0.5, 0, -0.3,
            0, 0, -0.5,
            0, 0, 0.5,
            0, 0.5, -0.3,
            0, -0.5, -0.3
        ];
        this.indices = [
            2, 1, 0,
            0, 2, 4,
            2, 1, 4,
            2, 0, 5,
            1, 2, 5,
            3, 0, 4,
            1, 3, 4,
            5, 3, 1,
            5, 0, 3
        ];
        this.normals = [
            1, 0, 0,
            -1, 0, 0,
            0, 0, -1,
            0, 0, 1,
            0, 1, 0,
            0, 1, 0
        ];
        this.texCoords = [];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
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