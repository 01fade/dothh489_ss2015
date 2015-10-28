// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HPI 3.14159265359/2.0

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st, vec2 center){
    vec2 toCenter = center-st;
    float pct = length(toCenter) * 3. + .3 * sin(u_time);
    if (st.y > 0.5){ return step(0.0, pct) - step(1.1, pct);};
}

float circle1(vec2 st, vec2 center){
    vec2 toCenter = center - st;
    toCenter.y += 0.1 * sin(u_time);
    float pct = length(toCenter) * (2.1 - .1 * sin(u_time));
    return 1.-step(1., pct);
}

vec2 move(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 0.) {st.x += 0.05 * (1.-pow(abs(cos(u_time)), 20.));}
    return st;
}

float pattern(vec2 st) {
    st *= 10.0;
    st.x *= 3.;
    st = move(st);
    vec2 st_f = fract(st);
    float pct = 0.0;
    pct += circle(st_f, vec2(.5, .5)) - circle(st_f, vec2(0.5, 0.49));
    pct -= circle1(st_f, vec2(0.0, 0.0)) - circle1(st_f, vec2(0.0, 0.01));
    pct -= circle1(st_f, vec2(1.0, 0.0)) - circle1(st_f, vec2(1.0, 0.01));
    return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4( vec3(pattern(st)) ,1.0);
}

