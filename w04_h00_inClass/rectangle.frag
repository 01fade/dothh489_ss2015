#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rect (float w, float h, float x, float y){
	float start = 1.0 - w * 0.5;
	float end = 1.0 - h * 0.5;

	float start = 1.0 - w * 0.5;
	float end = 1.0 - h * 0.5;

    // black is 0, white is 1
    float pct = (step(start, x) - step(end, x)) *
    	(step(start, y) - step(end, y));
    return vec3(pct);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);

    color = rect(0.6, 0.6, st.x, st.y);

    gl_FragColor = vec4(color, 1.0);

}