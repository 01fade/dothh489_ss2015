#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.;
    vec3 color = vec3(0.);

    st -=  0.5;
    float r = length(st)*2.;
    float a = atan(st.y, st.x)/6.283+0.5;

    color = vec3(1.0 - step(0.5, r));

    gl_FragColor = vec4(color, 1.0);

}