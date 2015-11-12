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
    // not finished
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(100., 80.);
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    float time = floor(u_time * 40. * random(st_i.x));
    // float time = random(st_i.x);
    float pct = random(st_i.y + time);
    pct = step(pct, 0.2) - step(0.6,st_f.x) - step(0.8,st_f.y);
    // pct = smoothstep(0., 0.5, st_f.y) - smoothstep(0.5, 1., st_f.y);
    // pct = 1.-pct;
    gl_FragColor = vec4(vec3(0., pct, 0.),1.0);
}