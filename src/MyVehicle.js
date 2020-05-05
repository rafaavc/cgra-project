class MyVehicle extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene) {
        super(scene);

        this.initBuffers();
        this.initObjects();
        this.initTexture();

        this.horizontalOrientation = 0; // Y axis angle
        this.speed = 0;
        this.position = {
            x: 0,
            y: 10, // should be 10, it's 0 just for testing
            z: 0
        };
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.lastTime = 0;
    }
  
    initTexture(){
        this.metalGrey = new CGFappearance(this.scene);
        this.metalGrey.setAmbient(0.19225, 0.19225, 0.19225, 1);
        this.metalGrey.setDiffuse(0.50754, 0.50754, 0.50754, 1);
        this.metalGrey.setSpecular(0.508273, 0.508273, 0.508273, 1);
        this.metalGrey.setShininess(51.2);

        this.lightBlue = new CGFappearance(this.scene);
        this.lightBlue.setAmbient(1, 1, 1, 1);
        this.lightBlue.setDiffuse(1, 1, 255/255, 1);
        this.lightBlue.setSpecular(0, 0, 0, 1.0);
        this.lightBlue.setShininess(100.0);


        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.blue.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.blue.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.blue.setShininess(10.0);

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
        this.helixAngle = 0;
        this.helixTurn = 0;
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initObjects() {
        this.sphere = new MySphere(this.scene, 50, 50);
        this.smallSphere = new MySphere(this.scene, 28, 28);
        this.cylinder = new MyCylinder(this.scene, 0.07, 0.6, 28);
        this.helix = new MyHelix(this.scene);
    }
    display() {
        this.helixAngle += this.speed
        //super.display();
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.horizontalOrientation, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.pushMatrix();

        this.lightBlue.apply();
        this.scene.scale(0.45, 0.45, 1);
        this.sphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.blue.apply();
        this.scene.translate(0, -0.45, 0);
        this.cylinder.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, -0.45, 0);
        this.scene.translate(0, 0, -0.3);
        this.scene.scale(0.07, 0.07, 0.07);
        this.smallSphere.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, -0.45, 0);
        this.scene.translate(0, 0, 0.3);
        this.scene.scale(0.07, 0.07, 0.07);
        this.smallSphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.metalGrey.apply();
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(0, -0.5, -2);
        this.scene.rotate(this.helixTurn, 0, 1, 0);
        this.scene.translate(0, -0.5, -1.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(0, 0.5, -2);
        this.scene.rotate(this.helixTurn, 0, 1, 0);
        this.scene.translate(0, 0.5, -1.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(1, 0, -3.5);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(-1, 0, -3.5);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.blue.apply();
        this.scene.translate(0.10, -0.45, -0.35);
        this.scene.scale(0.05, 0.02, 0.06);
        this.sphere.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.metalGrey.apply();
        this.scene.translate(0.10, -0.45, -0.40);
        this.scene.scale(0.02, 0.02, 0.02);
        this.scene.rotate(Math.PI/2 + this.helixAngle, 0, 0, 1);
        this.scene.translate(1.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.10, -0.45, -0.40);
        this.scene.scale(0.02, 0.02 , 0.02);
        this.scene.rotate(-Math.PI/2 + this.helixAngle, 0, 0, 1);
        this.scene.translate(1.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.blue.apply();
        this.scene.translate(-0.10, -0.45, -0.35);
        this.scene.scale(0.05, 0.02, 0.06);
        this.sphere.display();


        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.metalGrey.apply();
        this.scene.translate(-0.10, -0.45, -0.40);
        this.scene.scale(0.02, 0.02, 0.02);
        this.scene.rotate(Math.PI/2 + this.helixAngle, 0, 0, 1);
        this.scene.translate(1.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.10, -0.45, -0.40);
        this.scene.scale(0.02, 0.02 , 0.02);
        this.scene.rotate(-Math.PI/2 + this.helixAngle, 0, 0, 1);
        this.scene.translate(1.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.popMatrix();
    }
    updateSpeedFactor(sf) {
        this.speedFactor = sf;
    }
    updateScaleFactor(sf) {
        this.scaleFactor = sf;
    }
    update(t){
        if (!this.scene.autoPilot){
            let secondsSinceLastTime = (t - this.lastTime)/1000.;
            this.position.z += this.speed * Math.cos(this.horizontalOrientation) * secondsSinceLastTime;
            this.position.x += this.speed * Math.sin(this.horizontalOrientation) * secondsSinceLastTime;
        } else {
            this.seconds += (t - this.lastTime)/1000;
            //console.log(this.seconds);
            this.horizontalOrientation += 2*Math.PI*((t- this.lastTime)/5000);
            this.position.x += this.speed * Math.sin(this.horizontalOrientation);
            this.position.z += this.speed * Math.cos(this.horizontalOrientation);
        }
        this.lastTime = t;
    }
    turn(val){
        this.horizontalOrientation += val*0.1;
        if (val < 0) this.helixTurn = Math.PI/20;
        else this.helixTurn = -Math.PI/20;
    }
    accelerate(val){
        this.speed += val*this.speedFactor;
        if (this.speed < 0) this.speed = 0;
    }
    reset(){
        this.horizontalOrientation = 0;
        this.position.x = 0;
        this.position.y = 10;
        this.position.z = 0;
        this.speed = 0;
        this.helixAngle = 0;
        this.helixTurn = 0;
    }
    resetTurn(){
        this.helixTurn = 0;
    }
    autoPilot(){
        this.speed = 1/5;
        this.startingOrientation = this.horizontalOrientation;
        this.seconds = 0;
    }
}