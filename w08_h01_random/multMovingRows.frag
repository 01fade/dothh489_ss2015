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
    st *= vec2(200., 100.);
    vec2 st_i = floor(st);
    float time = floor(u_time * 100. * random(st_i.y));
    float pct = 0.0;
    if (mod(st_i.y, 5.) == 0.){
        pct = random(st_i.x + time);
    } else {
        pct = random(st_i.x - time);
    }

    pct = step(min(u_mouse.x / 1000. + 0.2, 0.8), pct);
    pct = 1.-pct;
	gl_FragColor = vec4(vec3(pct),1.0);
}