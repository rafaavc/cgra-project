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

		this.stringAppearance = new CGFappearance(this.scene);
        this.stringAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.stringAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.stringAppearance.setSpecular(0.508273, 0.508273, 0.508273, 1);
		this.stringAppearance.setShininess(51.2);

		this.timeF = 0;
		this.speed = 0;
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
		this.timeF = t / 100 % 1000;
		this.speed = Math.max(Math.abs(vehicleSpeed), 0.3);
        this.flagShader.setUniformsValues({ timeFactor: this.timeF, speed: this.speed });
        this.flagShader2.setUniformsValues({ timeFactor: this.timeF, speed: this.speed });
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
		this.scene.pushMatrix();
		
		/**
		 * Draw strings connecting vehicle to flag
		 * 
		 * 1st - Down left side
		 * 2nd - Up left side
		 * 3rd - Down right side
		 * 4th - Up right side
		 */
		this.stringAppearance.apply();
		this.scene.translate(0, -0.1, 0.774);
		this.scene.translate(0, 0, 0.3);
		this.scene.rotate(-Math.sin(0.075 + this.timeF*0.05*this.speed*25)/20, 0, 1, 0);
		this.scene.translate(0, 0, -0.30);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0 , 0);
		this.scene.scale(0.005, 0.55, 1);
		this.plane.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();

		this.scene.translate(0, 0.1, 0.774);
		this.scene.translate(0, 0, 0.3);
		this.scene.rotate(-Math.sin(0.075 + this.timeF*0.05*this.speed*25)/20, 0, 1, 0);
		this.scene.translate(0, 0, -0.30);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0 , 0);
		this.scene.scale(0.005, 0.55, 1);
		this.plane.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();

		this.scene.translate(0, -0.1, 0.774);
		this.scene.translate(0, 0, 0.3);
		this.scene.rotate(-Math.sin(0.075 + this.timeF*0.05*this.speed*25)/20, 0, 1, 0);
		this.scene.translate(0, 0, -0.30);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0 , 0);
		this.scene.scale(0.005, 0.55, 1);
		this.plane.display();

		this.scene.popMatrix();
		this.scene.pushMatrix();

		this.scene.translate(0, 0.1, 0.774);
		this.scene.translate(0, 0, 0.3);
		this.scene.rotate(-Math.sin(0.075 + this.timeF*0.05*this.speed*25)/20, 0, 1, 0);
		this.scene.translate(0, 0, -0.30);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0 , 0);
		this.scene.scale(0.005, 0.55, 1);
		this.plane.display();

		this.scene.popMatrix();
	}

}