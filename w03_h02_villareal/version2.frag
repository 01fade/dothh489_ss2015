#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Leo Villareal version2
// https://vimeo.com/123895401

void main() {
    vec3 magenta = vec3(0.909, 0.061, 0.982);
    vec3 red = vec3(0.960, 0.233, 0.204);
    vec3 white = vec3(1.0);
    vec3 white2 = vec3(1.0);
    vec3 yellow = vec3(0.900, 0.850, 0.200);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = magenta;
    vec3 pct = vec3(st.y);
    float sinU = abs(sin(u_time * 0.3));

    vec3 colorA = mix(red, magenta, pow(sin(st.y), 2.));
    vec3 colorB = colorA;

    pct = vec3(pow(sin(st.y * 2.), 12.));
    colorA = mix(colorA, white, pct);
    pct = vec3(pow(sin(st.y * PI + 1.), 20.));
    colorA = mix(colorA, yellow, pct);

    pct = vec3(pow(sin(st.y * 2. + 1.5 - clamp(sinU, 0.6, 1.0)), 12.));
    colorB = mix(colorB, white2, pct);
    colorB = mix(colorB, yellow, pct);
    pct = vec3(pow(sin(st.y * 2. + 2.5 - clamp(sinU, 0.6, 1.0)), 12.));
    colorB = mix(colorB, magenta, pct);

    color = mix(colorA, colorB, sinU);

    gl_FragColor = vec4(color,1.0);
}