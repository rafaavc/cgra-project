attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float speed;

void main() {
	vTextureCoord = aTextureCoord;
    vTextureCoord.x = -aTextureCoord.x;

	float val = sin((vTextureCoord.x + timeFactor*0.05 *speed)*25.);
	vec3 offset = aVertexNormal*val*0.03;


	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}