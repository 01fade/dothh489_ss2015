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
	gl_FragColor = vec4(0.0,abs(sin(u_time * 99.0)),0.0,1.0);
}

