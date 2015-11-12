#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 200.;
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    float pct = mix(random(st_i), random(st_i+1.), smoothstep(0., 1., st_f.x));

    gl_FragColor = vec4( vec3(pct) ,1.0);

}