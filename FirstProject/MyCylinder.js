class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param {float} radius - Radius of the cilinder
     * @param  {float} height - Height of the cilinder
     * @param {int} nSlices  Number of slices
     */
    constructor(scene, radius, height, nSlices) {
        super(scene);
        this.height = Math.abs(height);
        this.radius = Math.abs(radius);
        this.nSlices = Math.abs(nSlices);
        this.initBuffers();
    }
  
    /**
     * @method initBuffers
     * Initializes the cilinder buffers
     */
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        let alpha = 2*Math.PI / this.nSlices;

        let currentAngle = 0;
        while(currentAngle <= 2*Math.PI) {
            let sinA = Math.sin(currentAngle);
            let cosA = Math.cos(currentAngle);
            
            this.vertices.push(cosA*this.radius, sinA*this.radius, this.height/2);
            this.texCoords.push(currentAngle/(2*Math.PI), 0);
            this.normals.push(cosA, sinA, 0);
            this.vertices.push(cosA*this.radius, sinA*this.radius, -this.height/2);
            this.texCoords.push(currentAngle/(2*Math.PI), 1);
            this.normals.push(cosA, sinA, 0);

            currentAngle += alpha;
        }

        console.log(this.vertices);

        for (let i = 0; i <= this.vertices.length/3 - 3; i++) {
            if (i%2 == 0) {
                this.indices.push(i, i+1, i+2);
            } else {
                this.indices.push(i+1, i, i+2);
            }
        }

        console.log(this.indices);

    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}