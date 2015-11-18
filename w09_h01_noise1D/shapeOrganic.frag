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

vec2 shape( vec2 st , float x, float y, float size, float speed){
  vec2 pos = vec2(x, y);
  st -= pos;
  st = rotate2d( noise(u_time * 0.1) * speed) * st;
  st += pos;
  pos = pos-st;
  float r = length(pos)*2.0;
  float a = atan(pos.y,pos.x * noise(u_time * 0.1));
  return vec2(smoothstep(-.5,1., noise(a*10.) ) * 0.1 + (size + 0.1*noise(u_time)), r);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  vec2 f = shape(st, 0.5, 0.5, 0.6, 0.55);
  color.r = 1.-smoothstep(f.x,f.x+0.02, f.y);
  f = shape(st, 0.5, 0.5, 0.6, 0.56);
  color.g = 1.-smoothstep(f.x,f.x+0.02, f.y);
  f = shape(st, 0.5, 0.5, 0.6, 0.57);
  color.b = 1.-smoothstep(f.x,f.x+0.02, f.y);

  gl_FragColor = vec4(color, 1.0);
}