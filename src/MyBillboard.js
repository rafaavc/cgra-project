class MyBillboard extends CGFobject{
    constructor(scene, totalAmount){
        super(scene);
        this.scene = scene;
        this.plane = new MyPlane(scene, 50);
        this.initMaterials();
        this.totalAmount = totalAmount;
    }
    initMaterials(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(0, 0, 0, 1.0);
        this.appearance.setSpecular(0, 0, 0, 1.0);
        this.appearance.setShininess(10.0);
        this.shader = new CGFshader(this.scene.gl, "shaders/billboards.vert", "shaders/billboards.frag");
		this.shader.setUniformsValues({ uSampler2: 0, nSuppliesDelivered: 0 });
    }
    display(){
        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 0.5, 0);
        this.scene.scale(0.2, 1, 0.2);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.5, 0);
        this.scene.scale(0.2, 1, 0.2);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.scale(2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();
        
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