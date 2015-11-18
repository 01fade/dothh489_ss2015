// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand (float x) {
    return fract(sin(x)*10e5);
}
//when renamed to nouseOne, something weird happens
float noise1 (vec2 st) {
  float i = floor(st.x);
  float f = fract(st.x);
  float y = rand(i);
  y = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f)); //smooth
  return y;
}

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noiseTwo (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    // Four corners in 2D of a tile
    // random values
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // smooth with Cubic Hermine Curve
    vec2 u = f*f*(3.0-2.0*f);

    // interpolate, mix 4 corners percentages with fractual values
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.;
    st += noise1(st);
    st += vec2(-u_time, -u_time);
    float n = noiseTwo(st);

    gl_FragColor = vec4(vec3(n), 1.0);
}