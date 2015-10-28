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

float pattern (vec2 st) {
    st *= 1.0; // scale
    vec2 st_i = floor(st); // rows and columns
    st = truchet(st*2.);
    float t = u_time * 0.05;
    if (mod(st_i.y, 2.) == 1. || mod(st_i.y, 2.) == 0.) {st.x += t;}
    if (mod(st_i.x, 2.) == 1. || mod(st_i.x, 2.) == 0.) {st.y += t;}
    vec2 st_f = fract(st); // mult 1. by number (scale)
    st_f = rotationMatrix(PI*0.25)*st_f;
    return sin(st_f.x * sin(st_f.x * 200.) * st_f.x) * 2.;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    gl_FragColor = vec4( vec3(pattern(st) ) ,1.0);
}

