// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float pct = 0.0;

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    vec3 colorA = vec3( 1.-smoothstep(f,f+0.02,r) );

    vec2 toCenter = vec2(0.5)-st;
    pct = length(toCenter) * 2.;
    pct = step(0.1, pct);
    vec3 colorB = vec3(pct);

    color = mix(colorA, colorB, .5);
    color = vec3(step(0.8, color));

    gl_FragColor = vec4(color, 1.0);
}