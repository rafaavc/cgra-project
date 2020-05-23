
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float speed;
uniform float timeFactor;

void main() {
	vTextureCoord = aTextureCoord;

	//float val = texture2D(uSampler2, vec2(0.0, timeFactor*0.02) + vTextureCoord).b;
	float val = sin((vTextureCoord.x + timeFactor*0.05*speed)*25.);//*sin(timeFactor);
	vec3 offset = aVertexNormal*val*0.03;


	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

