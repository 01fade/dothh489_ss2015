#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // b. The LENGTH of the vector from the pixel to the center
    vec2 toCenter = vec2(0.5)-st;
    pct = length(toCenter) * 2.;
    pct = step(0.5, pct);
    // inverse
    pct = 1.-pct;

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}