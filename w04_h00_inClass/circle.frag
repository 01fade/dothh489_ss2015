#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.;
    vec3 color = vec3(0.);
    st -= .5;

    // pct = 1.-length(st)*2.;
    // pct = pct * mod(u_time*0.5, 10.);
    // pct = fract(pct);
    // pct = step(0.5, pct);

    pct = 1.-length(st)*2.;
    pct = pct * 5.;
    pct = fract(pct * 2. + u_time);
    pct = step(0.5, pct);

    color = vec3(pct);

    gl_FragColor = vec4(color, 1.0);

}