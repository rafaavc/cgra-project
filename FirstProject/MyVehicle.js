class MyVehicle extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * 
     */
    constructor(scene) {
        super(scene);
        this.initBuffers();

        this.horizontalOrientation = Math.PI/4; // Y axis angle
        this.speed = 0;
        this.position = [0, 0, 0]; // Position [X, Y, Z]
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
    update(){
        this.position[0] += this.speed * Math.sin(this.horizontalOrientation);
        this.position[2] += this.speed * Math.cos(this.horizontalOrientation);
    }
}