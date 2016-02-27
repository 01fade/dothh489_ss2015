// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.x,2.) == 0.) {st.y = 1.-st.y;} // face 1
    if (mod(st_i.y,2.) == 1. && mod(st_i.x,2.) == 1.) {st.y = 1.-st.y; st.x = 1.-st.x;} // face 2
    if (mod(st_i.y,2.) == 0. && mod(st_i.x,2.) == 0.) {st.y = 1.-st.y;} // face 4
    if (mod(st_i.y,2.) == 0. && mod(st_i.x,2.) == 1.) {st.x = 1.-st.x;} // face 4
    return st;
}

mat2 rotationMatrix(float a) {return mat2(vec2(cos(a),-sin(a)),vec2(sin(a),cos(a)));}

float circle (float sc, float r, float sm, vec2 st){
    vec2 toCenter = vec2(0.5)-st;
    float pct = length(toCenter) * sc;
    pct = smoothstep(r-sm, r+sm, pct);
    return pct;
}

float pattern (vec2 st) {
    st = truchet(st*2.);
    float t = u_time * 0.05;
    vec2 st_f = fract(st) * 50.;
    st_f = rotationMatrix(PI*0.25)*st_f;
    float pct = pow(sin(st_f.x + u_time * 2.), 500.);
    pct = step(0.01, pct);

    return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = pattern(st);
    float circle = 1.-circle(2.5, 0.5, 0.8, st);
    pct *= circle;
    gl_FragColor = vec4( vec3(pct) ,1.0);
}

