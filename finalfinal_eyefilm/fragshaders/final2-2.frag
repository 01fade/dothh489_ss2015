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

float circle (float sc, float r, float sm, vec2 st, vec2 mouse){
    vec2 toCenter = mouse-st;
    float pct = length(vec2(toCenter.x * 2., toCenter.y)) * sc;
    pct = smoothstep(r-sm, r+sm, pct);
    return pct;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution;

    // based on http://glslsandbox.com/e#29336.0
    float d=min(distance(st,vec2(0.9*noise(st+u_time*0.2)))*2.0,200.0);
    float a=(atan(st.y-mouse.y,st.x-mouse.x)+3.14159)/6.28318;
    a*=50.0;
    a-=floor(a);
    a=abs(a-0.5)*1.;
    d-=a*0.3;

   vec3 colorC = vec3(circle(4., 1.5, 0.5 + noise(st+u_time*0.9) * 0.001, st, mouse));
    vec2 offset = vec2((cos(d*3.14159)+1.0));
    vec3 colorA = texture2D(u_tex0,st).rgb;
    vec3 colorB = vec3(offset.x);

   vec3 color = mix(colorA, colorB, 0.2);
    color = colorA + colorB/4.;
    color -= 1.-colorC;
    color = max(color, colorA);
    gl_FragColor = vec4(color, 1.0);
}