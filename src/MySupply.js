class MySupply extends CGFobject {
    SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2
    };
    /**
     * @method constructor
     * @param {CGFscene} scene MyScene obj
     */
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene);

        this.lastTime = -1;
        this.supplyState = this.SupplyStates.INACTIVE;
        this.size = 0.2;

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(3, 3, 3, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);

        this.texture = new CGFtexture(this.scene, "images/crate_side.jpg");
		this.material.setTexture(this.texture);
    }

    /**
     * @method setWhenFallenValues generates random values that are used when displaying the LANDED state
     */
    setWhenFallenValues() {
        this.fallenVals = {
            pn1: (Math.round(Math.random()) == 0 ? -1 : 1), // either -1 or 1
            pn2: (Math.round(Math.random()) == 0 ? -1 : 1),
            rot1: (Math.random() * 0.25) - 0.125, // random number between -0.125 and 0.125
            rot2: (Math.random() * 0.25) - 0.125,
            rot3: (Math.random() * 0.25) - 0.125,
            rot4: (Math.random() * 0.25) - 0.125,
            rot5: (Math.random() * 0.25) - 0.125,
            rot6: (Math.random() * 0.25) - 0.125
        }
    }

    /**
     * @method drop drops the box
     * @param {Number} pos the position in which the box was when it was dropped
     * @param {Number} vel the velocity at which the box was going when it was dropped
     * @param {Number} t the current time
     */
    drop(pos, vel, t) {
        this.setWhenFallenValues();
        this.position = pos;
        this.velocity = {
            x: vel.x*0.3,
            y: vel.y*0.3,
            z: vel.z*0.3
        };
        this.acceleration = {
            x: 0,
            y: -2*this.position.y/9, // from position equation, so that the box takes exactly 3 seconds to fall
            z: 0
        }
        this.supplyState = this.SupplyStates.FALLING;
        this.lastTime = t;
    }

    /**
     * @method fall updates the box attributes while falling
     */
    fall() {
        let val = (this.currentTime-this.lastTime)/1000;

        if (this.supplyState == this.SupplyStates.FALLING && this.position) {
            this.velocity.x += this.acceleration.x*val;
            this.velocity.y += this.acceleration.y*val;
            this.velocity.z += this.acceleration.z*val;
            this.position.x += this.velocity.x*val;
            this.position.y += this.velocity.y*val;
            this.position.z += this.velocity.z*val;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.supplyState = this.SupplyStates.LANDED;
        }
    }

    /**
     * @method update updates the box's attributes
     * @param {Number} t the current time
     */
    update(t) {
        this.currentTime = t;
        switch(this.supplyState) {
            case this.SupplyStates.FALLING:
                this.fall();
                break;
            default:
                break;
        }
        this.lastTime = this.currentTime;
    }

    /**
     * @method reset resets the box
     */
    reset() {
        this.supplyState = this.SupplyStates.INACTIVE;
    }

    /**
     * @method display displays the box
     */
    display() {
        this.scene.pushMatrix();
        switch(this.supplyState) {
            case this.SupplyStates.FALLING:
                this.displayFalling();
                break;
            case this.SupplyStates.LANDED:
                this.displayLanded();
                break;
            default:
                break;
        }
        this.scene.popMatrix();
    }

    /**
     * @method displayLanded displays the box when landed
     */
    displayLanded() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y + 0.001, this.position.z);
        this.scene.scale(this.size, this.size, this.size);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.001);
        this.scene.rotate(this.fallenVals.rot1, 0, 0, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0.002);
        this.scene.rotate(this.fallenVals.rot2, 0, 0, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0.003);
        this.scene.rotate(this.fallenVals.rot3, 0, 0, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0.004);
        this.scene.rotate(this.fallenVals.rot4, 0, 0, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0.005);
        this.scene.rotate(this.fallenVals.rot5, 0, 0, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.3*this.fallenVals.pn1, 0.4*this.fallenVals.pn2, 0.006);
        this.scene.rotate(this.fallenVals.rot6, 0, 0, 1);
        this.plane.display();
        this.scene.popMatrix();
    }

    /**
     * @method displayFalling displays the box while falling
     */
    displayFalling() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(this.size, this.size, this.size);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.pushMatrix();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();

        this.scene.popMatrix();
    }
}