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

vec3 clr(vec2 st, float size, float rays, float smoothstart, float smoothend, float strength, float speed, vec2 mouse) {
    vec3 color = vec3(0.);
    st -= mouse;
    float r = length(st);
    float a = atan(st.y,st.x);
    a += noise(vec2(u_time*0.01));
    float pct = size + noise(vec2(sin(a)*rays,cos(a))) * (.2*(sin(a+u_time*speed)*strength));
    color += smoothstep(pct, pct+smoothstart,r)-smoothstep(pct, pct+smoothend,r);
    return color;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution;

    vec3 pct = clr(st, 0.2, 100., 0.2 + 0.08*noise(st+u_time*0.5), 0.5, 0.2, 2., mouse);
    vec2 offset = vec2(pct);
    vec3 colorA = texture2D(u_tex0,st).rgb;
    vec3 colorB = texture2D(u_tex0,st+offset).rgb;

    vec3 color = mix(colorA, colorB, 0.8);
    // uncomment to just see shader
    // color = pct;

    gl_FragColor = vec4(color, 1.0);
}