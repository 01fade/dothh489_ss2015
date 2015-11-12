// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

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

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float pattern(vec2 st) {
    st *= 12.0;
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);
    float pct = 0.0;
    float rnd = random(st_i);
    pct = plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5 * rnd))) * sin(u_time * 0.5 * rnd) * 0.1 * rnd + 0.1);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5 * rnd))) * sin(u_time * 0.5 * rnd) * 0.2 * rnd + 0.3);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5 * rnd))) * sin(u_time * 0.5 * rnd) * 0.3 * rnd + 0.5);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5 * rnd))) * sin(u_time * 0.5 * rnd) * 0.4 * rnd + 0.7);
    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(u_time * 0.5 * rnd))) * sin(u_time * 0.5 * rnd) * 0.5 * rnd + 0.9);
    return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    gl_FragColor = vec4( vec3(pattern(st)) ,1.0);
}

