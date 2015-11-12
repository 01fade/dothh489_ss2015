// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x) {
    return fract(sin(x)*10e5);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(200., 60.);
    st += random(u_time) * 3.;
    vec2 st_i = floor(st);
    float time = floor(u_time * 100. * random(st_i.x));
    float pct = random(st_i.y + time);
    pct = step(0.1, pct);
    pct = 1.-pct;
	gl_FragColor = vec4(vec3(pct),1.0);
}