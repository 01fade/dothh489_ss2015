// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 2.;
    st -= 0.2;
    float pct = 0.0;
    float a = 1. - (abs(cos(u_time * 0.1)) * 0.3);
    vec2 b;
    b.x = sin(u_time) + 0.5;
    b.y = cos(u_time * 0.7) + 0.5;

    pct = pow(distance(st,vec2(a)),distance(st,b));
    pct = 1.-pct;

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}