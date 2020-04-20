#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float filterValue;

uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = color;
}