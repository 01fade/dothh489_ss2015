#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}
//Inigo Quiles
float cubicPulse( float highPos, float width, float x ){
    x = abs(x - highPos);
    if( x>width ) return 0.0;
    x /= width;
    return 1.0 - pow(x, 2.) * (3.0 - 2.0*x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 red = vec3(1.,0.,0.);
    vec3 yellow = vec3(1.,1.,0.);
    vec3 green = vec3(0.,1.,0.);
    vec3 cyan = vec3(0.,1.,1.);
    vec3 blue = vec3(0.,0.,1.);
    vec3 magenta = vec3(1.,0.,1.);

    vec3 color = vec3(0.0);

    //thanks Luobin -- colorflag for remix/layer colors
    float w = 0.25;
    float pct1 = cubicPulse(0.97, w, st.y);
    color = mix(color, red, pct1);
    float pct2 = cubicPulse(0.8, w, st.y);
    color = mix(color, yellow, pct2);
    float pct3 = cubicPulse(0.6, w, st.y);
    color = mix(color, green, pct3);
    float pct4 = cubicPulse(0.4, w, st.y);
    color = mix(color, cyan, pct4);
    float pct5 = cubicPulse(0.2, w, st.y);
    color = mix(color, blue, pct5);
    float pct6 = cubicPulse(0.02, w, st.y);
    color = mix(color, magenta, pct6);

    gl_FragColor = vec4(color,1.0);
}