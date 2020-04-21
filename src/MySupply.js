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
        /*
        MY SUPPLY NEEDS TO REACH THE GROUND IN 3 SECONDS (WTF!!!)
        */
        this.velocity = {
            x: 0,
            y: 0,
            z: 0
        }

        this.acceleration = {
            x: 0,
            y: -30,
            z: 0
        }

        this.lastTime = -1;
        this.supplyState = this.SupplyStates.INACTIVE;

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(3, 3, 3, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
    }

    drop(posX, posY, posZ) {
        // hello
        this.position = {
            x: posX,
            y: posY,
            z: posZ
        }
        this.velocity = {
            x: 0,
            y: 0,
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
    }

    displayLanded() {
        let mx = this.scene.getMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);

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

        this.scene.setMatrix(mx);
    }

    displayFalling() {
        let mx = this.scene.getMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);

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

        this.scene.setMatrix(mx);
    }
}