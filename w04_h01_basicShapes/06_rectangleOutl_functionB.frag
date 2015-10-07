//no rounded corners
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rect (float w, float h, float border, float x, float y){
    //border relative to width and height
    border = w * h * 0.5 * border;
    float hor = step(0.5 - w*0.5, x);
    hor -= step(0.5 - w*0.5 + border, x);
    hor += step(0.5 + w*0.5 - border, x);
    hor -= step( 0.5 + w*0.5, x);
    hor *= step(0.5 - h*0.5, y) - step(0.5 + h*0.5, y);
    float ver = step(0.5 - h*0.5, y);
    ver -= step(0.5 - h*0.5 + border, y);
    ver += step( 0.5 + h*0.5 - border, y);
    ver -= step( 0.5 + h*0.5, y);
    ver *= step(0.5 - w*0.5, x) - step(0.5 + w*0.5, x);
    return vec3(hor + ver);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.;
    vec3 color = vec3(0.);

    color = rect(0.4, 0.8, 0.05, st.x, st.y);
    gl_FragColor = vec4(color, 1.0);
}