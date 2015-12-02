#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.1, pct, st.y) -
          smoothstep( pct, pct+0.1, st.y);
}

// 1D random
float rand (float x) {
    return fract(sin(x)*10e5);
}

float noise (float x) {
	float i = floor(x);
	float f = fract(x);
	float y = rand(i);
	y = mix(rand(i), rand(i + 1.0), f); // linear
	y = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f)); //smooth
	return y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 20.;
    st.x += u_time;
    float pct = plot(st, noise(st.x));
    gl_FragColor = vec4( vec3(pct) ,1.0);
}