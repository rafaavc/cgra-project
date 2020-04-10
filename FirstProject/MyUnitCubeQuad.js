class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene);

        this.initMaterials();
    }
    initMaterials(){
        this.topTexture = new CGFtexture(this.scene, 'images/split_cubemap/top.png');
        this.botTexture = new CGFtexture(this.scene, 'images/split_cubemap/bottom.png');
        this.frontTexture = new CGFtexture(this.scene, 'images/split_cubemap/front.png');
        this.backTexture = new CGFtexture(this.scene, 'images/split_cubemap/back.png');
        this.leftTexture = new CGFtexture(this.scene, 'images/split_cubemap/left.png');
        this.rightTexture = new CGFtexture(this.scene, 'images/split_cubemap/right.png');
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
    }
    display() {

        this.scene.pushMatrix();
        this.scene.translate(0,0,-25);
        this.scene.scale(50,50,50);
        this.material.setTexture(this.frontTexture);
        this.material.apply();
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,0, 25);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(50,50,50);
        this.material.setTexture(this.backTexture)
        this.material.apply();
        this.plane.display();


        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-25, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(50,50,50);
        this.material.setTexture(this.leftTexture);
        this.material.apply();
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(25, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(50,50,50);
        this.material.setTexture(this.rightTexture);
        this.material.apply();
        this.plane.display();


        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 25, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(50,50,50);
        this.material.setTexture(this.topTexture);
        this.material.apply();
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -25, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50,50,50);
        this.material.setTexture(this.botTexture);
        this.material.apply();
        this.plane.display();
    }
}