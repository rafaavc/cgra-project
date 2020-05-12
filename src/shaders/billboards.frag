#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 coords;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform int nSuppliesDelivered;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);

	gl_FragColor.rgb = vec3(-coords.x/5.0 + 0.5, (0.5 + coords.x/5.0), 0);
    gl_FragColor.a = 1.0;

	if (nSuppliesDelivered == 0){
		gl_FragColor.rgb = vec3(0.5,0.5,0.5);
	} else if (nSuppliesDelivered == 1){
		if (coords.x > -1.8){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}	else if (nSuppliesDelivered == 2){
		if (coords.x > -0.6){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}	else if (nSuppliesDelivered == 3){
		if (coords.x > 0.6){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}	else if (nSuppliesDelivered == 4){
		if (coords.x > 1.8){
			gl_FragColor.rgb = vec3(0.5,0.5,0.5);
		}
	}
}
