#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Leo Villareal version3
// https://vimeo.com/137666974

void main() {
    vec3 dirt = vec3(0.7, 0.45, 0.39);
    vec3 brown = vec3(0.38, 0.25, 0.19);
    vec3 orange = vec3(0.8, 0.45, 0.2);
    vec3 green = vec3(0.43, 0.4, 0.2);

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.1, 0.1, 0.1);
    vec3 pct = vec3(st.y);
    float sinU = abs(sin(u_time * 0.3));
    float cosU = abs(cos(u_time * 0.3));

    pct = vec3(pow(sin(st.y * 9.), 20. * sin(st.y * 0.4) + sinU));
    color = mix(dirt, orange, pct);
    pct = vec3(pow(sin(st.y * 2. + 0.3), 20.) * sinU);
    color = mix(color, green, pct);
    pct = vec3(pow(sin(st.y * 9. - 1.4), 10. * sin(st.y * .2 * sinU) + cosU + 0.5));
    color = mix(color, brown, pct);

    gl_FragColor = vec4(color,1.0);
}