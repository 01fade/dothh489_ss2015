// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html
float pattern(vec2 st){
  float d = 0.0;
  st = st * 2.-1.;
  st.y += 0.25;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/3.;
  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  float t = .3 - 0.3 * abs(sin(u_time));
  return 1.-(1.-smoothstep(t,t,d) + smoothstep(.4,.4,d));
}


void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  gl_FragColor = vec4(vec3(pattern(st)),1.0);
}
