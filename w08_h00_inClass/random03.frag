#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x) {
    return fract(sin(x)*10e5);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(20.,2);
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    float time = floor(u_time*8.);
    float pct = random(time-st_i.x);
    if (st_i.y == 1.){
        st_f.y = 1.-st_f.y;
    }
    pct = step(pct,st_f.y)-step(0.8,st_f.x);
    gl_FragColor = vec4(vec3(pct),1.0);
}