#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random1D (float x) {
    return fract(sin(x)*10e5);
}
float noise1D (float x) {
	float i = floor(x);
	float f = fract(x);
	float y = random1D(i);
	y = mix(random1D(i), random1D(i + 1.0), f); // linear
	y = mix(random1D(i), random1D(i + 1.0), smoothstep(0.,1.,f)); //smooth
	return y;
}

float random2D (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise2D (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random2D(i);
    float b = random2D(i + vec2(1.0, 0.0));
    float c = random2D(i + vec2(0.0, 1.0));
    float d = random2D(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float rect (vec2 st, float scale, float l, float r, float t, float b) {
  st *= scale;

  vec2 n = vec2(noise1D(st.x), noise1D(st.y));
  float pct = smoothstep(n.y-5., n.y, st.x - l);
  pct *= 1.-smoothstep(n.y-5., n.y, st.x - r);
  pct *= smoothstep(n.x-5., n.x, st.y - b);
  pct *= 1.-smoothstep(n.x-5., n.x, st.y - t);
  pct *= noise2D(st/40.) + 0.8;
  pct *= noise2D(st * 1000.) + 0.99;
  return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    color += rect(st, 350., 22., 333., 345., 280.) * vec3(0.7,0.58,0.27) * 0.5;
    color += rect(st, 300., 18., 286., 235., 100.) * vec3(0.8,0.1,0.1) * 0.5;
    color += rect(st, 200., 12., 190., 65., 5.) * vec3(0.35,0.05,0.07) * 0.5;
    color += rect(st, 100., 5., 100., 101., 5.) * vec3(1.00,0.28,0.27) * 0.1;

    gl_FragColor = vec4( color ,1.0);
}