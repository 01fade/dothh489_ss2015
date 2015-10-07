#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rect (float a, float b, vec2 st){
    // float c = 1. - a;
    // float d = 1. - a + b;
    //
    float c = 0.2;
    float d = 0.5;

    // bottom-left
    vec2 bl = smoothstep(vec2(c), vec2(d) ,st);
    float pct = bl.x * bl.y;

    // top-right
    vec2 tr = smoothstep(vec2(c), vec2(d) ,1.0-st);
    pct *= tr.x * tr.y;

    return vec3(pct);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = rect(0.8, 0.1, st);

    gl_FragColor = vec4(color, 1.0);

}