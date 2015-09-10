#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;     // Time in seconds since load 

void main() {
	int a;
	ivec3 b; //vector of ints
	bvec3 c; //vector of booleans

	//mouse interaction
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 mouse = u_mouse/u_resolution;
	mouse.x = 1.0-mouse.x;
	mouse.y = 1.0-mouse.y;
	gl_FragColor = vec4(st.x + mouse.x, st.y + mouse.y, 0.0, 1.0);
}

