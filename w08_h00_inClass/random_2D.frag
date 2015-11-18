#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D random
float random (vec2 xy) {
    return fract(sin(dot(xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(10.);
    vec2 st_i = floor(st);
    float time = floor(u_time);
    float pct = random(st_i + vec2(0.,time));
    gl_FragColor = vec4(vec3(pct),1.0);
}