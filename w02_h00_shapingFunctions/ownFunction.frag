#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; 
uniform vec2 u_mouse;      
uniform float u_time; 

float F(float x, float p, float w) {
	return	smoothstep(p-w, p, x) - 
			smoothstep(p, p+w, x);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);

	float pct = F(st.x,abs(sin(u_time)), .01);
	pct += F(st.y,abs(sin(u_time * 0.9)), .01);
	color = vec3(pct * 0.5);
	gl_FragColor = vec4(color, 1.0);

}

// black is zero, white is one