#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; 
uniform vec2 u_mouse;      
uniform float u_time; 

float F(float x, float p, float w) {
	return smoothstep(p-w*0.5,p,x) - smoothstep(p,p+w*0.5,x);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);

	float pct = F(st.x,abs(sin(u_time)),.1);
	pct += F(st.y,abs(sin(u_time * 0.5)),.1);
	color = vec3(pct * 0.5);
	// color = vec3(step(0.8, pct));
	gl_FragColor = vec4(color, 1.0);

}

// black is zero, white is one

//try later
//vec2 p = vec2(cos(u_time*.5), sin(u_time*.5))*.5+.5
//color = vec3(step(0.7,pct)+pct)