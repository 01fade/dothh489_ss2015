// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

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

// mat3 scaleMat(vec2 f){
//     return mat3(vec3(f.x, 0., 0.), vec3( 0., f.y, 0.), vec3(0., 0., 1.));
// }

// mat3 translateMat(vec2 f){
//     return mat3(vec3(1., 0., 0.), vec3( 0., 1., 0.), vec3(f.x, f.y, 1.));
// }

// mat3 rotateMat(float a){
//     return mat3(vec3(cos(a), -sin(a), 0.),
//                 vec3(sin(a), cos(a), 0. ),
//                 vec3(0., 0., 1.));
// }
//
scale (vec2 f, vec3 pos)


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pos = vec3(st, 1.0);
    pos =
    pos = scaleMat(vec(1., 5.)) * pos;


    // Add the shape on the foreground
    color += vec3(cross(st,0.25));

    gl_FragColor = vec4(color,1.0);
}