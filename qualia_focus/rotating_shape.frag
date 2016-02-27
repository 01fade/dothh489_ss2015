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

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float shape(float n, float s, vec2 st){
  st = st * 2. - 1.;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/n;
  float d = cos(floor(.5+a/r)*r-a)*length(st);
  float pct = step(s-0.004,d)-step(s,d);
  return pct;
}


void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  float pct = 0.0;

  // move space from the center to the vec2(0.0)
  st -= vec2(0.5);
  // rotate the space
  // st = rotate2d( noise(st + u_time * 2.) ) * st;
  st = rotate2d( noise(vec2(pow(u_time * 0.03, 2.)))*TWO_PI*4. ) * st;
  // move it back to the original place
  st += vec2(0.5);

  // corners, size, st
  pct = shape(6.0, 0.2, st);

  gl_FragColor = vec4(vec3(pct),1.0);
}