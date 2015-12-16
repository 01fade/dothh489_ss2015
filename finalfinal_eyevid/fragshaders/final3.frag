// Author _ Hang Do Thi Duc ( 22-8miles.com )
// Base Code _ http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( dot( random(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float circle (float sc, float r, float sm, vec2 st, vec2 mouse){
    st -= vec2(0.5);
    st = rotate2d( sin(u_time)*0.1 + 0.05*noise(st+u_time) ) * st;
    st += 0.5;
    vec2 toCenter = mouse-st;
    float pct = length(toCenter + 0.5*noise(st+u_time*0.01)) * sc;
    pct = smoothstep(r-sm, r+sm, pct);
    return pct;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution;
    vec2 offset = vec2(circle(2., 1.2, 0.7, st, mouse+0.05*noise(st+u_time*0.2) ));
    vec3 colorB = texture2D(u_tex0,st+offset).rgb;
    vec3 colorA = texture2D(u_tex0,st).rgb;
    vec3 color = max(colorA,colorB);
    color = color * (1.-circle(2., 0.7, 0.2, st, mouse ) * 0.7);
    color *= 1.-circle(2., 1.2, 0.2, st, mouse ) * 0.5;
    gl_FragColor = vec4(color, 1.0);
}