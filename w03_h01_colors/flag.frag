// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 red = vec3(0.900,0.,0.300);
    vec3 yellow = vec3(1.,1.,0.);
    vec3 green = vec3(0.10,0.750,0.100);
    vec3 cyan = vec3(0.,0.980,0.900);
    vec3 color = vec3(1.0);

    //thanks Luobin -- colorflag for remix/layer colors
    float pct1 = step(0.5, st.y) - step(0.8, st.y);
    color = mix(color, red, pct1);
    float pct2 = step(0.4, st.y) - step(0.5, st.y);
    color = mix(color, green, pct2);
    float pct3 = step(0.8, st.y) - step(0.9, st.y);
    color = mix(color, yellow, pct3);
    float pct4 = step(0.0, st.y) - step(0.2, st.y);
    color = mix(color, cyan, pct4);

    gl_FragColor = vec4(color,1.0);
}