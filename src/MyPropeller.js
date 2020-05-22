class MyPropeller extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {CGFappearance} bladeAppearance - the appearance of the propeller blades
     * @param  {CGFappearance} ellipseAppearance - the appearance of the propeller ellipse
     * @param  {CGFobject} smallSphere - the sphere object for the ellipse
     * @param  {CGFobject} helix - the helix object for the blades
     */
    constructor(scene, bladeAppearance, ellipseAppearance, smallSphere, helix) {
        super(scene);
        this.bladeAppearance = bladeAppearance;
        this.ellipseAppearance = ellipseAppearance;
        this.smallSphere = smallSphere;
        this.helix = helix;
    }

    display(helixAngle) {
        //this.scene.popMatrix();
        this.scene.pushMatrix();

        /**
         *  Drawing the Propeller ellipse
         */
        this.ellipseAppearance.apply();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.03, 0.02, 0.06);
        this.smallSphere.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        /**
         *  Drawing the Propeller blades
         */
        this.bladeAppearance.apply();
        this.scene.translate(0, 0, -0.05);
        this.scene.scale(0.02, 0.02, 0.02);
        this.scene.rotate(Math.PI/2 + helixAngle, 0, 0, 1);
        this.scene.translate(1.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.helix.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.05);
        this.scene.scale(0.02, 0.02 , 0.02);
        this.scene.rotate(-Math.PI/2 + helixAngle, 0, 0, 1);
        this.scene.translate(1.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.helix.display();

        this.scene.popMatrix();
    }
}