// based on Luobin's combining functions code
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float ver(float x, float k){
  return pow(min(cos(PI * x /2.0), 1.0 - abs(x)), k);
}

float hor(float x){
  return 1. - pow(max(0.0, abs(x) - .1), 0.8) * .5;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x -= .8;
    st.y -= .6;

    float pct = ver(st.x, sin(u_time * PI * 1.2) + 0.8);
    pct /= hor(st.y);

    vec3 color = vec3(pct* 1.0);
    
    gl_FragColor = vec4(color,1.0);
}