#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.;
    vec3 color = vec3(0.);

    st = st * 2. - 1.;

    pct = 1.-length(abs(st)-.3);
    pct = 1.-length(max(abs(st)-0.3, 0.0));
    // pct = pct * 5.; //make smaller
    // pct = fract(pct * 10.);
    // pct = step(0.9, pct); //add when no border

    float final = step(0.9, pct) - step(0.92, pct);
    float shadow = smoothstep(0.9, 0.2, pct) + step(0.92, pct);
    final += (1.0 - shadow) * 0.4;

    color = vec3( 1.0 - final );
    // color = vec3(pct);

    gl_FragColor = vec4(color, 1.0);

}