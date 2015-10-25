// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Robert Penner
float circularInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))
    : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
}

// Iñigo Quiles
float pcurve( float x, float a, float b ){
  float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
  return k * pow( x, a ) * pow( 1.0-x, b );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
	vec3 colorA = vec3(0.,1.,1.);
	vec3 colorB = vec3(0.049,0.691,0.612);
	vec3 colorC = vec3(0.900,0.023,0.024);

  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
	float t = sin(u_time * 5.);
	float pct = smoothstep(0.8, 1.0, sin(u_time * 0.5));

	if (u_time <= 3.) {
	    color = mix(colorA, colorB, pct);
	} else {
		pct = circularInOut(abs(sin(t)));
		pct *= pcurve(t, 10., 0.);
    color = mix(colorB, colorC, pct);
	}

  gl_FragColor = vec4(color,1.0);
}