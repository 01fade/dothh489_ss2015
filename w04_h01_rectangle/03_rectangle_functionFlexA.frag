// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rect (float w, float h, float s, float x, float y){
	float sth = s * 0.5;
    //left
    float l = 0.5 - w*0.5;
    float hor = smoothstep(l, l + sth, x);
    //right
    float r = 0.5 + w*0.5;
    hor -= smoothstep(r - sth, r, x);
    //bottom
    float b = 0.5 - h*0.5;
    float ver = smoothstep(b, b + sth, y);
    //top
    float t = 0.5 + h*0.5;
    ver -= smoothstep(t - sth, t, y);

    return vec3(hor * ver);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    //smooth will be applied inside the width
    vec3 color = rect(.9, .5, 0.05, st.x, st.y);

    gl_FragColor = vec4(color, 1.0);

}