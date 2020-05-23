class MyPlane extends CGFobject{
	/**
	 * @method constructor
	 * @param {CGFscene} scene MyScene obj
	 * @param {Number} nrDivs number of divisions in the plane
	 * @param {Number} minS texCoords S min
	 * @param {Number} maxS texCoords S max
	 * @param {Number} minT texCoords T min
	 * @param {Number} maxT texCoords T max
	 */
	constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;  // texCoords S variation from div to div
		this.w = (this.maxT - this.minT) / this.nrDivs;  // texCoords T variation from div to div
		this.initBuffers();
	}

	/**
	 * @method initBuffers
	 */
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var yCoord = 0.5;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
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

	/**
	 * @method setFillMode
	 */
	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	/**
	 * @method setLineMode
	 */
	setLineMode() 
	{ 
		this.primitiveType=this.scene.gl.LINES;
	};

}