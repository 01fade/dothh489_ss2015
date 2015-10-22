
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float stripes(vec2 st) {
    return step(st.y, st.x);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);

    st *= 10.;

    vec2 st_i = floor(st);
    if (mod(st_i.y, 2.) == 1. ) {
        st.x -= .5 * sin(u_time);
    }

    if (mod(st_i.y, 2.) == 0. ) {
        st.x += .5 * sin(u_time);
    }

    vec2 st_f = fract(st);
    if (mod(st_i.y, 2.) == 1. ) {
        st_f *= -1.;
    }
    // color.rb = st_f;

    float pct = stripes(st_f);
    color += pct;


	gl_FragColor = vec4(color,1.0);
}

