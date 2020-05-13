#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 coords;

uniform float nSuppliesDelivered;
uniform float totalAmount;

#define MAX_ITER 100.

void main() {
	gl_FragColor.rgb = vec3(-1.*(coords.x-1.)/2., (coords.x+1.)/2., 0);
    gl_FragColor.a = 1.0;

	float space = 1. / totalAmount;
	float norm = 1. / 2.;

	for (float i = 0.; i < MAX_ITER; i++) {
		if (i == totalAmount) break;
		if (nSuppliesDelivered == i) {
			if (coords.x >= i * space - norm) {
				gl_FragColor.rgb = vec3(0.5, 0.5, 0.5);
			}
		}
	}
}
