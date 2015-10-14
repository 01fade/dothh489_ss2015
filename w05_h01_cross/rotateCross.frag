#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    st -= vec2(0.5);
    // rotate the space
    st = rotate2d( pow(abs(sin(u_time * 0.08))*PI, .5) ) * st;
    st = scale( vec2(sin(u_time * 0.05)) ) * st;

    //something hanging in wind breeze
    float f = sin(u_time * .5) + sin(u_time*.2)*.5 + sin(u_time*4.)*.2;
    vec2 translate = vec2(f * 0.7 + 0.5, sin(u_time * 0.1) + 0.3);
    st += translate * sin(st.x) * 0.1;

    // move it back to the original place
    st += vec2(0.5);

    color += vec3(cross(st,0.25));
    gl_FragColor = vec4(color,1.0);
}