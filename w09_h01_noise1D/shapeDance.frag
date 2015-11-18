// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float rand (float x) {
    return fract(sin(x)*10e5);
}

float noise (float x) {
  float i = floor(x);
  float f = fract(x);
  float y = rand(i);
  y = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f)); //smooth
  return y;
}

vec2 shape( vec2 st , float x, float y, float size, float num, float dir){
  vec2 pos = vec2(x, y);
  st -= pos;
  st = rotate2d( (noise(u_time) * 0.8 * 1./size) * dir ) * st;
  st += pos;
  pos = pos-st;
  float r = length(pos)*2.0;
  float a = atan(pos.y,pos.x);
  return vec2(smoothstep(-.5,1., cos(a*num))*0.03 + (size - 0.005), r);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  // top right
  vec2 f = shape(st, 0.65, 0.65, 0.5, 36., 1.);
  color = vec3( 1.-smoothstep(f.x,f.x+0.02, f.y) );
  // bottom left
  f = shape(st, 0.31, 0.3, 0.4, 30., -1.);
  color += vec3( 1.-smoothstep(f.x,f.x+0.02, f.y) );
  // bottom right
  f = shape(st, 0.75, 0.26, 0.22, 19., -1.);
  color += vec3( 1.-smoothstep(f.x,f.x+0.02, f.y) );
  // top left
  f = shape(st, 0.29, 0.7, 0.15, 12., -1.);
  color += vec3( 1.-smoothstep(f.x,f.x+0.02, f.y) );
  // top
  f = shape(st, 0.4, 0.88, 0.1, 8., -1.);
  color += vec3( 1.-smoothstep(f.x,f.x+0.02, f.y) );

  gl_FragColor = vec4(color, 1.0);
}