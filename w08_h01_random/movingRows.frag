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
    st *= vec2(100., 2.);
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    float time = floor(100. * (1.-pow(abs(sin(u_time * 0.4)), 2.5)) + u_time * 50.);

    float pct = 0.0;
    if (st_i.y == 1.){
	    pct = random(st_i.x + time) + 0.1;
	    pct = 1.-pct; // so it doesn't match
    } else {
    	pct = random(st_i.x - time);
    }
    pct = step(0.2, pct);
	gl_FragColor = vec4(vec3(pct),1.0);
}