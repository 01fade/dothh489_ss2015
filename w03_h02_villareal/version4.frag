#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Leo Villareal version4
// https://vimeo.com/32823553

//Inigo Quiles
float cubicPulse( float highPos, float width, float x ){
    x = abs(x - highPos);
    if( x>width ) return 0.0;
    x /= width;
    return 1.0 - pow(x, 2.) * (3.0 - 2.0*x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= .2;
    st.x += abs(sin(u_time * 0.2));

    vec3 red = vec3(1.,0.,0.);
    vec3 yellow = vec3(1.,1.,0.);
    vec3 green = vec3(0.,1.,0.);
    vec3 cyan = vec3(0.,1.,1.);
    vec3 blue = vec3(0.,0.,1.);
    vec3 magenta = vec3(1.,0.,1.);

    vec3 color = vec3(0.0);

    float w = 0.25;
    float pct1 = cubicPulse(0.97, w, st.x);
    color = mix(color, red, pct1);
    float pct2 = cubicPulse(0.8, w, st.x);
    color = mix(color, yellow, pct2);
    float pct3 = cubicPulse(0.6, w, st.x);
    color = mix(color, green, pct3);
    float pct4 = cubicPulse(0.4, w, st.x);
    color = mix(color, cyan, pct4);
    float pct5 = cubicPulse(0.2, w, st.x);
    color = mix(color, blue, pct5);
    float pct6 = cubicPulse(0.02, w, st.x);
    color = mix(color, magenta, pct6);
    // float pct = pow(sin(st.x * 10.), 8.);
    // color = mix(color, vec3(1.0), pct);

    gl_FragColor = vec4(color,1.0);
}