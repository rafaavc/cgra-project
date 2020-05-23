class MyHelix extends CGFobject{
    /**
     * @method constructor
     * @param {CGFscene} scene MyScene obj
     */
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene);
        this.triangle = new MyTriangle(scene);
    }

    /**
     * @method display displays the helix
     */
    display(){
        this.plane.display();

        this.scene.pushMatrix();

        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(0.5,0.5,0.5);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI, 1, 0, 0);
        this.plane.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.triangle.display();
        this.scene.popMatrix();

    }
}