#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float stripes(vec2 st) {
    return smoothstep(st.y * 0.1, st.y,st.x);
}

mat2 rotationMatrix(float a) {
    return mat2(vec2(cos(a),-sin(a)),vec2(sin(a),cos(a)));
}

mat2 scaleMatrix(vec2 _scale){
    return mat2(_scale.x,0.0,0.0,_scale.y);
}

float pattern(vec2 st, float number){
    float d = distance(st,vec2(.5));
    d = pow(sin(d*3.14*5.-u_time), 10.);
    st *= number;

    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {st.x += .5;}
    vec2 st_f = fract(st);
    st_f -= .5;
    st_f = rotationMatrix(d*3.14)*st_f;
    st_f += .5;
    float pct = stripes(st_f);

    return pct;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    // skew
    // st.x -= .5;
    // st = scaleMatrix(vec2(2., 1.))*st;
    // st.x += .5;

	gl_FragColor = vec4(vec3(pattern(st, 100.)),1.0);
}

