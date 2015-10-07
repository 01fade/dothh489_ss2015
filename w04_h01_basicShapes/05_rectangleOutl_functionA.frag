//rounded corners
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float rect (float w, float h, float s, float x, float y){
    float sth = s * 0.5;
    float hor = smoothstep(0.5 - w*0.5, 0.5 - w*0.5 + sth, x);
    hor -= smoothstep(0.5 + w*0.5 - sth, 0.5 + w*0.5, x);
    float ver = smoothstep(0.5 - h*0.5, 0.5 - h*0.5 + sth, y);
    ver -= smoothstep(0.5 + h*0.5 - sth, 0.5 + h*0.5, y);
    return hor * ver;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.;
    vec3 color = vec3(0.);

    pct = rect(0.5, 0.8, 0.1, st.x, st.y);
    pct = fract(pct);
    float border = 0.9;
    pct = step(1.-border, pct);

    color = vec3(pct);

    gl_FragColor = vec4(color, 1.0);
}