// Author _ Hang Do Thi Duc ( 22-8miles.com )

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
    float si = abs(sin(u_time * 3.14));
    float co = abs(sin(u_time * 3.14 * .5));
    pct = circle(2., si, co, st);

    vec3 color = vec3(0.0);
    vec3 colorA = vec3(si, 0.3, co);
    color = mix(colorA, color, pct);

	gl_FragColor = vec4( color, 1.0 );
}