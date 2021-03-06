class MyCubeMap extends CGFobject {
    /**
     * @method constructor
     * @param {CGFscene} scene - the MyScene obj 
     * @param {String} cubemap - the name of the cubemap texture to be used
     */
	constructor(scene, cubemap) {
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene);

        this.initMaterials(cubemap);
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(3, 3, 3, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        //this.material.setShininess(10.0);
    }

    /**
     * @method initMaterials
     * @param {String} cubemap - the name of the cubemap exture to be used
     */
    initMaterials(cubemap){
        this.topTexture = new CGFtexture(this.scene, 'images/'+ cubemap + '/top.png');
        this.botTexture = new CGFtexture(this.scene, 'images/'+ cubemap + '/bottom.png');
        this.frontTexture = new CGFtexture(this.scene, 'images/'+ cubemap + '/front.png');
        this.backTexture = new CGFtexture(this.scene, 'images/'+ cubemap + '/back.png');
        this.leftTexture = new CGFtexture(this.scene, 'images/'+ cubemap + '/left.png');
        this.rightTexture = new CGFtexture(this.scene, 'images/'+ cubemap + '/right.png');
    }

    /**
     * @method display displays the cubemap
     */
    display() {
        // Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.material.setTexture(this.frontTexture);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();

        // Back
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.material.setTexture(this.backTexture)
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();

        // Left
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.material.setTexture(this.leftTexture);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();

        // Right
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.material.setTexture(this.rightTexture);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();

        // Top
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.material.setTexture(this.topTexture);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();

        // Bottom
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.material.setTexture(this.botTexture);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display();
        
        this.scene.popMatrix();
    }
}