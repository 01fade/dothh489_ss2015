// Author _ Hang Do Thi Duc ( 22-8miles.com )

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}
//Inigo Quiles
float cubicPulse( float highPos, float width, float x ){
    x = abs(x - highPos);
    if( x>width ) return 0.0;
    x /= width;
    return 1.0 - pow(x, 2.) * (3.0 - 2.0*x);
}

// William Turner Sunset
// http://www.tate.org.uk/art/artworks/turner-red-sunset-on-lake-d36200

void main() {
    vec3 colorA = vec3(0.909, 0.961, 0.982);
    vec3 colorB = vec3(0.760, 0.533, 0.404);
    vec3 colorC = vec3(0.050, 0.000, 0.140);
    vec3 colorD = vec3(0.050, 0.0, 0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(1.0);
    vec3 pct = vec3(st.y);

    pct.r = 1.2 * cubicPulse(0.44, 0.09, st.y) - .2;
    pct.g = 1.2 * (smoothstep(.28,.5, st.y) - smoothstep(.5,.8, st.y));
    pct.b = 1.1 * (smoothstep(.2,.6, st.y) - smoothstep(.6,.9, st.y));

    vec3 colorDay = mix(colorA, colorB, pct);
    float pct2 = cubicPulse(0.55, 0.4, st.y);
    vec3 colorNight = mix(colorD, colorC, pct2);

    float fade = pow(sin(u_time * 0.5), 2.);
    color = mix(colorDay, colorNight, fade);

    gl_FragColor = vec4(color,1.0);
}