class MyRudders extends CGFobject {
    /**
     * @method constructor
     * @param {CGFscene} scene - MyScene object
     * @param {CGFobject} helix - the helix object
     * @param {CGFappearance} helixAppearance - the appearance of the helix
     */
    constructor(scene, helix, helixAppearance) {
        super(scene);
        this.helix = helix;
        this.helixAppearance = helixAppearance;
    }

    /**
     * @method display displays the rudders
     * @param {Number} helixAngle angle of the helix turn in the rudders
     */
    display(helixAngle) {
        this.scene.pushMatrix();

        /**
         * Drawing vertical rudders
         */
        this.helixAppearance.apply();
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(helixAngle, 0, 1, 0);
        this.scene.translate(0, -0.5, -1.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(helixAngle, 0, 1, 0);
        this.scene.translate(0, 0.5, -1.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        /**
         * Drawing horizontal rudders
         */
        
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(1, 0, -1.5);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.scale(0.3, 0.3, 0.3);
        this.scene.translate(-1, 0, -1.5);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.helix.display();

        this.scene.popMatrix();
    }


}