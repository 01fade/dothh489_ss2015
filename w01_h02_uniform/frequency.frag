#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;     // Time in seconds since load 

void main() {
	//fast
	// gl_FragColor = vec4(0.0,abs(sin(u_time * 25.0)),0.0,1.0);

	//slow
	// gl_FragColor = vec4(0.0,abs(sin(u_time * 0.5)),0.0,1.0);

	//towards framerate
	gl_FragColor = vec4(0.0,abs(sin(u_time * 99.0)),0.0,1.0);
}

