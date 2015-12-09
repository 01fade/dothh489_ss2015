// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e4);
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 colorA = vec3(st.x,st.y,0.0);

    vec2 offset = vec2(0.);

    offset.x = random(st.y);
    colorA.r = texture2D(u_tex0,st+offset).r;
    // offset.x = u_time*0.2*random(st.y);
    colorA.g = texture2D(u_tex0,st+offset).g;
    // offset.x = u_time*0.2*random(st.y);
    colorA.b = texture2D(u_tex0,st+offset).b;
    vec3 colorB = texture2D(u_tex0,st+vec2(smoothstep(0.0, 0.5, st.x))).rgb;
    vec3 color = mix(colorA, colorB, 0.5);

    gl_FragColor = vec4(color, 1.0);
}