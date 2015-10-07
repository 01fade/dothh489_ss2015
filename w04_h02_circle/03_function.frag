#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle (float sc, float r, float sm, vec2 st){

    vec2 toCenter = vec2(0.5)-st;
    float pct = length(toCenter) * sc;
    pct = smoothstep(r-sm, r+sm, pct);
    return pct;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = circle(2., 0.9, 0.1, st);

    // inverse
    pct = 1.-pct;
    vec3 color = vec3(pct);
	gl_FragColor = vec4( color, 1.0 );
}