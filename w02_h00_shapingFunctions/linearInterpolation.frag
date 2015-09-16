#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; 
uniform vec2 u_mouse;      
uniform float u_time; 

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);

	//linear interpolation
	float pct = st.x;
	color = vec3(pct);
	// gl_FragColor = vec4(st.x, st.x, st.x, 1.0);
	// gl_FragColor = vec4(pct, pct, pct, 1.0);
	//same as above
	gl_FragColor = vec4(color, 1.0);
}