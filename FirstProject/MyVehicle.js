class MyVehicle extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * 
     */
    constructor(scene) {
        super(scene);
        this.initBuffers();
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
}