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

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec3 shape(vec2 pos, float n, float smoo, float size, vec2 st){
  float d = 0.0;
  st *= 0.9;
  st -= 0.45;
  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/n;
  // Shaping function that modulate the distance
  d = cos(floor((.5+a/r))*r-a)  * length(st * noise(st+u_time*0.5));
  return vec3(1.0-smoothstep(size, size+smoo,d));
}


void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = shape(vec2(0.5, 0.5), 4.0, 0.001, 0.05, st)-shape(vec2(0.5, 0.5), 4.0, 0.001, 0.0496, st);
  color = step(0.1, color);
  gl_FragColor = vec4(color,1.0);
}