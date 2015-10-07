#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rect (float w, float h, float x, float y){
    // black is 0, white is 1
    // always from center
    float pct = (step(0.5 - w * 0.5, x) - step(0.5 + w * 0.5, x)) *
    	(step(0.5 - h * 0.5, y) - step(0.5 + h * 0.5, y));
    return vec3(pct);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = rect(0.6, 0.6, st.x, st.y);

    gl_FragColor = vec4(color, 1.0);

}