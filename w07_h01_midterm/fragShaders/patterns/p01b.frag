// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HPI 3.14159265359/2.0

uniform vec2 u_resolution;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
	if (mod(st_i.x,3.) == 0.) {st.y = 1.-st.y;}
	if (mod(st_i.y,2.) == 0. && mod(st_i.y,4.) == 0.) {st.y = 1.-st.y;}
    return st;
}

float pattern(vec2 st) {
    st *= 5.0;
    st = truchet(st*2.);
    vec2 st_f = fract(st);
    float pct = 0.0;
    pct = plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5))) * sin(u_time * 0.5) * 0.1 + 0.1);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5))) * sin(u_time * 0.5) * 0.2 + 0.3);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5))) * sin(u_time * 0.5) * 0.3 + 0.5);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5))) * sin(u_time * 0.5) * 0.4 + 0.7);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5))) * sin(u_time * 0.5) * 0.4 + 0.9);
    return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    gl_FragColor = vec4( vec3(pattern(st)) ,1.0);
}

