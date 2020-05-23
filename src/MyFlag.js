class MyFlag extends CGFobject {
	/**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
	 */
	constructor(scene) {
		super(scene);
		this.initObjects();
		this.initTextures();
	}

	/**
	 * @method initTextures initializes the textures for the flag
	 */
	initTextures() {
		this.flagAppearance = new CGFappearance(this.scene);
        this.flagTexture = new CGFtexture(this.scene, "images/feup.jpg");
        this.flagAppearance.setTexture(this.flagTexture);
		this.flagAppearance.setTextureWrap('REPEAT', 'REPEAT');
		
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
		this.flagShader.setUniformsValues({ timeFactor: 0, speed: 0.3 });
		
		this.flagShader2 = new CGFshader(this.scene.gl, "shaders/flag2.vert", "shaders/flag.frag");
		this.flagShader2.setUniformsValues({ timeFactor: 0, speed: 0.3 });
	}

	/**
	 * @method initObjects initializes the objects needed for the flag
	 */
	initObjects() {
		this.plane = new MyPlane(this.scene, 100);
	}

	/**
	 * @method update updates the flag's shaders' uniforms values
	 * @param {Number} t - current time
	 * @param {Number} vehicleSpeed - the speed of the vehicle
	 */
	update(t, vehicleSpeed) {
		let timeF = t / 100 % 1000;
		let speed = Math.max(Math.abs(vehicleSpeed), 0.3);
        this.flagShader.setUniformsValues({ timeFactor: timeF, speed: speed });
        this.flagShader2.setUniformsValues({ timeFactor: timeF, speed: speed });
	}

	/**
	 * @method display displays the flag
	 */
	display() {
		this.scene.pushMatrix();

        this.scene.scale(1, 0.25, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.flagAppearance.apply();
		
        this.scene.setActiveShader(this.flagShader);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.scale(1, 0.25, -1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.flagAppearance.apply();
        this.scene.setActiveShader(this.flagShader2);
        this.plane.display();
		this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
	}

}