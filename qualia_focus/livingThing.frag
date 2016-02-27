// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 st2 = gl_FragCoord.xy/u_resolution;
    st *= 5.;
    st -= 1.6;
    float pct = 0.0;
    float a = 1. - (abs(cos(u_time * 0.1)) * 0.3);
    vec2 b;
    b.x = sin(u_time * 0.5) + 0.5;
    b.y = cos(u_time * 0.9) + 0.5;
    pct = distance(st,vec2(a));
    pct = distance(st2,b);
    pct = pow(distance(st,vec2(a)),distance(st,b));
    pct = step(0.2, 1.-pct)-step(0.21, 1.-pct);

	gl_FragColor = vec4( vec3(pct) , 1.0 );
}