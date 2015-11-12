#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 xy) {
    return fract(sin(dot(xy,vec2(12.9898,78.233)))*43758.5453123);
}

float noise (vec2 st){
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    // float time = floor(u_time);
    float A = random(st_i);
    float B = random(st_i+vec2(1.,0.));
    float C = random(st_i+vec2(1.,1.));
    float D = random(st_i+vec2(0.,1.));

    st_f = smoothstep(vec2(0.), vec2(1.), st_f);
    float rtn = mix(A, B, st_f.x);
    rtn += (C - A)*st_f.y+1.-st_f.x;
    rtn += (D - B)*st_f.x+1.-st_f.y;

    return rtn;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(10.);

    float pct = noise(st);

    gl_FragColor = vec4(vec3(pct),1.0);
}