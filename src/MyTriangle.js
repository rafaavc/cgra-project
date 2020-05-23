/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTriangle extends CGFobject {
	/**
	 * @method constructor
	 * @param {CGFscene} scene MyScene obj
	 */
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	/**
	 * @method initBuffers
	 */
    initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

		this.normals = [];
		for (var i = 0; i < 3; i++){
			this.normals.push(0,0,1);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}