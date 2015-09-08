#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;     // Time in seconds since load 

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	// vec2 mousePos = gl_FragCoord.xy/u_mouse;
	gl_FragColor = vec4(st.x + u_mouse.x,st.y + u_mouse.y,0.0,1.0);
}