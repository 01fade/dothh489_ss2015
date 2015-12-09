// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noiseTwo (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution;

    vec2 toCenter = vec2(mouse)-st;
    float pct = length(toCenter) * 0.6 + 0.05 * sin(u_time);
    pct = smoothstep(0.1, 0.5, pct);


    vec2 offset = vec2(pct);
    vec3 colorA = texture2D(u_tex0,st).rgb;
    vec3 colorB = texture2D(u_tex0,st+offset).rgb;

    vec3 color = mix(colorA, colorB, 0.8);
    // color = colorA+colorB;      // Add
    // color = colorA-colorB;      // Diff
    // color = abs(colorA-colorB); // Abs Diff
    // color = colorA*colorB;      // Mult
    // color = colorA/colorB;      // Div
    // color = max(colorA,colorB); // Ligther
    // color = min(colorA,colorB); // Darker
    // vec4 color = vec4(n, n, n, 1.0);
    gl_FragColor = vec4(color, 1.0);
}