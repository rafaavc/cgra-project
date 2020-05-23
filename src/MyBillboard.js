class MyBillboard extends CGFobject{
    constructor(scene, totalAmount){
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene, 50);
        this.totalAmount = totalAmount;
        this.initMaterials();
    }
    initMaterials(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.02, 1.02, 1.02, 1.0);
        this.appearance.setDiffuse(0, 0, 0, 1.0);
        this.appearance.setSpecular(0, 0, 0, 1.0);
        this.appearance.setShininess(10.0);
        this.shader = new CGFshader(this.scene.gl, "shaders/billboards.vert", "shaders/billboards.frag");
        this.shader.setUniformsValues({ nSuppliesDelivered: 0, totalAmount: this.totalAmount });
        
        this.billBoardAppearance = new CGFappearance(this.scene);
        this.billBoardAppearance.setAmbient(10, 10, 10, 1.0);
        this.billBoardAppearance.setDiffuse(0, 0, 0, 1.0);
        this.billBoardAppearance.setSpecular(0, 0, 0, 1.0);
        this.billBoardAppearance.setShininess(10.0);
        this.billBoardAppearance.loadTexture("images/BillBoard.png");
    }
    display(){
        this.appearance.apply();

        //Display left stand front and backwards
        this.scene.pushMatrix();
        this.scene.translate(-0.9, 0.5, 0);
        this.scene.scale(0.2, 1, 0.2);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 0.5, 0);
        this.scene.scale(-0.2, 1, 0.2);
        this.plane.display();
        this.scene.popMatrix();

        //Display right stand front and backwards
        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.5, 0);
        this.scene.scale(0.2, 1, 0.2);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.5, 0);
        this.scene.scale(-0.2, 1, 0.2);
        this.plane.display();
        this.scene.popMatrix();

        //Display the base backwards then front
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.scale(-2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.billBoardAppearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.scale(2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();
        
        //Display the counting parts
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.scene.translate(0, 1.3, 0.01);
        this.scene.scale(1.8, 0.5, 1);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
    updateShader(n){
        this.shader.setUniformsValues({ nSuppliesDelivered: n, totalAmount: this.totalAmount });
    }
}