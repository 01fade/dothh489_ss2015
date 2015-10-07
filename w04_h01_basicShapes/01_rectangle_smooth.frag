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

    //smooth
    vec2 smoothbl = vec2(clamp(abs(cos(u_time)), 0.2, 0.5));
    vec2 smoothtr = vec2(clamp(abs(sin(u_time)), 0.4, 0.7));

    // bottom-left
    vec2 bl = smoothstep(vec2(0.1), smoothbl ,st);
    float pct = bl.x * bl.y;

    // top-right
    vec2 tr = smoothstep(vec2(0.1), smoothtr ,1.0-st);
    pct *= tr.x * tr.y;

    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}