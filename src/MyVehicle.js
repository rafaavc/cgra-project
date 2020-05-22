class MyVehicle extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene) {
        super(scene);

        this.initTextures();
        this.initObjects();

        this.helixAngle = 0;
        this.helixTurn = 0;

        this.horizontalOrientation = 0; // Y axis angle
        this.speed = 0;
        this.position = {
            x: 0,
            y: 0, // should be 10, it's 0 just for testing
            z: 0
        };
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.lastTime = 0;
        this.apCenterPosition = {
            x: 0,
            y: 0,
            z: 0
        }
    }
  
    initTextures(){
        this.metalGrey = new CGFappearance(this.scene);
        this.metalGrey.setAmbient(0.5, 0.5, 0.5, 1);
        this.metalGrey.setDiffuse(0.5, 0.5, 0.5, 1);
        this.metalGrey.setSpecular(0.508273, 0.508273, 0.508273, 1);
        this.metalGrey.setShininess(51.2);

        this.downCylinder = new CGFappearance(this.scene);
        this.downCylinder.setAmbient(2, 2, 2, 1.0);
        this.downCylinder.setDiffuse(1, 1, 1, 1.0);
        this.downCylinder.setSpecular(1, 1, 1, 1.0);
        this.downCylinder.setShininess(10.0);
        this.downCylinder.loadTexture("images/downPattern.jpg");

        this.cylinderSpheres = new CGFappearance(this.scene);
        this.cylinderSpheres.setAmbient(2, 2, 2, 1.0);
        this.cylinderSpheres.setDiffuse(1, 1, 1, 1.0);
        this.cylinderSpheres.setSpecular(1, 1, 1, 1.0);
        this.cylinderSpheres.setShininess(10.0);
        this.cylinderSpheres.loadTexture("images/engSimpleSquare.jpg");

        this.mainSphere = new CGFappearance(this.scene);
        this.mainSphere.setAmbient(2, 2, 2, 1.0);
        this.mainSphere.setDiffuse(1, 1, 1, 1.0);
        this.mainSphere.setSpecular(1, 1, 1, 1);
        this.mainSphere.setShininess(10.0);
        this.mainSphere.loadTexture("images/mainPattern.jpg");
        this.mainSphere.setTextureWrap('REPEAT', 'REPEAT');
    }

    initObjects() {
        this.sphere = new MySphere(this.scene, 50, 30);
        this.smallSphere = new MySphere(this.scene, 28, 15);
        this.cylinder = new MyCylinder(this.scene, 0.07, 0.6, 20);
        this.helix = new MyHelix(this.scene);
        this.flag = new MyFlag(this.scene);
        this.propeller = new MyPropeller(this.scene, this.metalGrey, this.cylinderSpheres, this.smallSphere, this.helix);
    }

    display() {
        this.helixAngle += this.speed
        //super.display();
        this.scene.pushMatrix();
        
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.horizontalOrientation, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.pushMatrix();

        /**
         * Drawing the main body
         */
        this.mainSphere.apply();
        this.scene.scale(0.45, 0.45, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.sphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();


        /**
         * Drawing the cylinder in the bottom
         */
        this.downCylinder.apply();
        this.scene.translate(0, -0.45, 0);
        this.cylinder.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.cylinderSpheres.apply();
        
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

        /**
         * Drawing the bottom propellers
         */

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.09, -0.45, -0.3);
        this.propeller.display(this.helixAngle);

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.09, -0.45, -0.3);
        this.propeller.display(this.helixAngle);


        /**
         * Drawing the helixes in the back
         */
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

        /**
         * Drawing the flag
         */
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -2);
        this.flag.display();

        this.scene.popMatrix();
    }
    updateSpeedFactor(sf) {
        this.speedFactor = sf;
    }
    updateScaleFactor(sf) {
        this.scaleFactor = sf;
    }
    update(t){
        this.flag.update(t, this.speed);
        let secondsSinceLastTime = (t - this.lastTime)/1000.;
        if (!this.scene.autoPilot){
            this.position.z += this.speed * Math.cos(this.horizontalOrientation) * secondsSinceLastTime;
            this.position.x += this.speed * Math.sin(this.horizontalOrientation) * secondsSinceLastTime;
        } else {
            let angleIncrement = 2*Math.PI*secondsSinceLastTime/5; // takes 5 seconds from 0 to 2PI (T = 5s)

            this.horizontalOrientation += angleIncrement;

            this.position.x = this.apCenterPosition.x + 5*Math.sin(this.horizontalOrientation - Math.PI/2);
            this.position.z = this.apCenterPosition.z + 5*Math.cos(this.horizontalOrientation - Math.PI/2);
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
        this.startingOrientation = this.horizontalOrientation;
        this.apCenterPosition = {
            x: this.position.x + 5*Math.sin(this.horizontalOrientation + Math.PI/2),
            y: this.position.y,
            z: this.position.z + 5*Math.cos(this.horizontalOrientation + Math.PI/2)
        }
    }
    stopAutoPilot() {
        this.speed = 0;
    }
}