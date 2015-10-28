// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HPI 3.14159265359/2.0

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

float circle(vec2 st, vec2 center){
    vec2 toCenter = center-st;
    float pct = length(toCenter) * 2.4 - 0.1 * sin(u_time);
    if (st.y > 0.5){ return step(0.0, pct) - step(1.1, pct);};
}

float circle1(vec2 st, vec2 center){
    vec2 toCenter = center-st;
    float pct = length(toCenter) * 2.;
    return 1.-step(1., pct);
}

vec2 move(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.x,2.) == 1.) {
        st.y += pow(abs(fract(u_time * 0.2)), 10.);
    }
    if (mod(st_i.x,2.) == 0.) {
        st.y -= pow(abs(fract(u_time * 0.2)), 10.);
    }
    if (mod(st_i.y,2.) == 1.) {
        st.x += pow(abs(fract(u_time * 0.2 + PI/2.)), 10.);
    }
    if (mod(st_i.y,2.) == 0.) {
        st.x -= pow(abs(fract(u_time * 0.2 + PI/2.)), 10.);
    }
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

