#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;     // Time in seconds since load 

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 mouse = u_resolution/u_mouse;
	gl_FragColor = vec4(abs(sin(u_time*mouse.x)),abs(sin(u_time*mouse.y)),pow(st.x,2.0),1.0);
}

