#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

float cubicPulse( float highPos, float width, float x ){
    x = abs(x - highPos);
    if( x>width ) return 0.0;
    x /= width;
    return 1.0 - pow(x, 2.) * (3.0 - 2.0*x);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	st *= 5.0;
	// st.y -= PI;
	st.x -= u_time;

  // float y = pow(sin(st.x * PI * 2.), 5.);
  // float y = cubicPulse(0., 0.9, sin(st.x));
  // float y = smoothstep(0.0, .1, st.x) - abs(sin(st.x));
  // float y = smoothstep(0.0, 1.0, sin(st.x));
  float y = mod(st.x, .5); // return x modulo of 0.5
  // float y = fract(st.x); // return only the fraction part of a number
  // float y = ceil(sin(st.x));  // nearest integer that is greater than or equal to x
  // float y = floor(st.x); // nearest integer less than or equal to x
  // float y = sign(sin(u_time));  // extract the sign of x
  //float y = abs(st.x);   // return the absolute value of x
  // float y = clamp(sin(st.x),0.0,1.0); // constrain x to lie between 0.0 and 1.0
  // float y = min(0.0,sin(u_time)) + 0.5;   // return the lesser of x and 0.0
  // float y = max(0.0,st.x);   // return the greater of x and 0.0     vec3 color = vec3(y);

  vec3 color = vec3(y);
  // vec3 color = mix(vec3(0.), vec3(1.), st.x);

  // float pct = plot(st,y);
  // color = (1.0-pct)*color+pct*vec3(0.0,5.0,0.0);

	gl_FragColor = vec4(color/5.,1.0);
}