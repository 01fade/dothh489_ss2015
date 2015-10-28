// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html
float triangle(vec2 st, float width, float size, float off, float shift){
  float d = 0.0;
  st *= 2.;
  vec2 st_f = fract(st);
  st_f = st_f * 2.-1.;
  st_f.x += 0.03 * cos(u_time*0.8 + off) - shift;
  st_f.y += 0.42 + 0.01 * sin(u_time*0.8 + off);
  float a = atan(st_f.x,st_f.y)+PI;
  float r = TWO_PI/3.;
  d = cos(floor(.5+a/r)*r-a)*length(st_f);
  float t = size - width;
  return 1.-(1.-smoothstep(t,t,d) + smoothstep(size,size,d));
}

vec2 move(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {st.x += 0.5;}
    return st;
}

float pattern(vec2 st, float pos){
  float pct = 0.0;
  st.y *= 9./5.;
  st.x *= 16./5.;
  st = move(st);
  vec2 st_f = fract(st);
  float o = 0.7;
  if (pos != 0.0){
   st_f = 1.-st_f;
  }
  pct += triangle(st_f*0.5, 0.01, 0.5, o * 0., pos);
  pct += triangle(st_f*0.5, 0.015, 0.4, o * 1., pos);
  pct += triangle(st_f*0.5, 0.02, 0.3, o * 2., pos);
  pct += triangle(st_f*0.5, 0.025, 0.2, o * 3., pos);
  pct += triangle(st_f*0.5, 0.03, 0.1, o * 4., pos);
  pct += triangle(st_f*0.5, 0.05, 0.02, o * 5., pos);
  return pct;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  gl_FragColor = vec4(vec3( pattern(st, 0.0)+pattern(st, 1.0)+pattern(st, -1.0) ),1.0);
}
