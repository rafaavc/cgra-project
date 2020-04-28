class MySupply extends CGFobject {
    SupplyStates = {
        INACTIVE: 0,
        FALLING: 1,
        LANDED: 2
    };
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
        console.log(this.fallenVals);
    }

    drop(pos, vel) {
        this.setWhenFallenValues();
        this.position = pos;
        this.velocity = vel;
        this.acceleration = {
            x: 0,
            y: -2*this.position.y/9, // from position equation, so that the box takes exactly 3 seconds to fall
            z: 0
        }
        this.supplyState = this.SupplyStates.FALLING;
        this.lastTime = performance.now();
    }

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

    update() {
        this.currentTime = performance.now();
        switch(this.supplyState) {
            case this.SupplyStates.FALLING:
                this.fall();
                break;
            default:
                break;
        }
        this.lastTime = this.currentTime;
    }

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