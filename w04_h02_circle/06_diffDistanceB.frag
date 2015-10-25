// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    float a = 1. - (abs(cos(u_time * 0.3)) * 0.3);
    float b = abs(mod(u_time * 0.3, 3.)) * 0.3;

    pct = max(distance(st,vec2(sin(u_time))),distance(st,vec2(a)));
    pct *= min(distance(st,vec2(cos(u_time))),distance(st,vec2(b)));

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}