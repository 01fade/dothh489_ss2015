// Author _ Hang Do Thi Duc ( 22-8miles.com )
// Base Code _ http://thndl.com/square-shaped-shaders.html

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 shape(float pos, float n, float b, float e, vec2 st){
  float d = 0.0;
    // Remap the space to -1. to 1.
  st = st * pos -1.;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/n;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);

  return vec3(1.0-smoothstep(b,e,d));
}


void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);

  //position, corners, smooth beginning, smooth end
  color = shape(4.0, 6.0, 0.7, 0.7, st) - shape(4.0, 6.0, 0.6, 0.6, st);

  gl_FragColor = vec4(color,1.0);
}