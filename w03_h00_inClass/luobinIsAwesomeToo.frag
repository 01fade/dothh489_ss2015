// Code by Luobin
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float F1(float x){
	return pow(min(cos(PI * x /2.0), 1.0 - abs(x)), 3.0);
}

float F2(float x){
	return 1.0 - pow(max(0.0, abs(x) * 2.0 - 0.3), 0.5) * 1.0;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    float pct = F1(st.x - mousePos.x);
    pct /= F2(st.y - mousePos.y);

    vec3 color = vec3(pct* 1.0);
    
    gl_FragColor = vec4(color,1.0);
}