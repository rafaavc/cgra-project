attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float offsetSize;

void main() {
	vTextureCoord = aTextureCoord;

    float val = texture2D(uSampler2, vTextureCoord).b;
	vec3 offset = aVertexNormal*val*offsetSize;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

