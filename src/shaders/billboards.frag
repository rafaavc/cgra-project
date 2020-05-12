#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 coords;

uniform int nSuppliesDelivered;
uniform float totalAmount;

void main() {
	gl_FragColor.rgb = vec3(-1.*(coords.x-1.)/2., (coords.x+1.)/2., 0);
    gl_FragColor.a = 1.0;

	float space = 1. / totalAmount;
	float norm = 1. / 2.;

	if (nSuppliesDelivered == 0){
		gl_FragColor.rgb = vec3(0.5,0.5,0.5);
	} else if (nSuppliesDelivered == 1){
		if (coords.x > space - norm){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}	else if (nSuppliesDelivered == 2){
		if (coords.x > 2.*space - norm){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}	else if (nSuppliesDelivered == 3){
		if (coords.x > 3.*space - norm){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}	else if (nSuppliesDelivered == 4){
		if (coords.x > 4.*space - norm){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}
}
