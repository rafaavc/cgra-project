class MyTerrain extends CGFobject{
	constructor(scene, nrDivs, sideSize, maxHeight, minS, maxS, minT, maxT) {
        super(scene);
        this.scene = scene;
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
        this.patchLength = Math.abs(sideSize) / nrDivs;
        this.startCoord = Math.abs(sideSize)/2;
        this.maxHeight = Math.abs(maxHeight);
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
        this.w = (this.maxT - this.minT) / this.nrDivs;
        this.initMaterials();
        this.initShaders();
		this.initBuffers();
    }
    initMaterials() {
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        // este heightmap tem um plano com ~20 unidades de tamanho 
        // (assumindo que o tamanho do heightmap será 50 unidades corresponte a 0.4*128 pixeis de largura na textura)
        this.heightMap = new CGFtexture(this.scene, "images/heightmapMod.jpg");
    }
    initShaders() {
		this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues({ uSampler2: 1, offsetSize: this.maxHeight });
    }
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var yCoord = this.startCoord;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -this.startCoord;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		// Generating indices
		this.indices = [];

		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
    }
    
    display() {
		this.scene.get
		this.appearance.apply();
        this.scene.setActiveShader(this.shader);
        this.heightMap.bind(1);
		super.display();
		this.heightMap.unbind(1);
		this.scene.setActiveShader(this.scene.defaultShader);
    }

}