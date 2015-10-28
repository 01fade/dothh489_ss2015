// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern1b = {

    uniforms: {

        "time":     { type: "f", value: 10.0},
        "tDiffuse": { type: "t", value: null },
        "scale":    { type: "f", value: 5.0 },
        "pi":       { type: "f", value: 3.14159265359},
        "hpi":       { type: "f", value: 3.14159265359/2.0}

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join( "\n" ),

    fragmentShader: [

        "uniform float time;",
        "uniform float scale;",
        "uniform float pi;",
        "uniform float hpi;",
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",

        ////////////

        "float plot (vec2 st, float pct){",
        "  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);",
        "}",

        "//  Function from Iñigo Quiles",
        "//  www.iquilezles.org/www/articles/functions/functions.htm",
        "float pcurve( float x, float a, float b ){",
        "    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));",
        "    return k * pow( x, a ) * pow( 1.0-x, b );",
        "}",

        "vec2 truchet(vec2 st){",
        "    vec2 st_i = floor(st);",
        "    if (mod(st_i.x,3.) == 0.) {st.y = 1.-st.y;}",
        "    if (mod(st_i.y,2.) == 0. && mod(st_i.y,4.) == 0.) {st.y = 1.-st.y;}",
        "    return st;",
        "}",

        "float pattern(vec2 st) {",
        "    st *= scale;",
        "    st = truchet(st*2.);",
        "    vec2 st_f = fract(st);",
        "    float pct = 0.0;",
        "    pct = plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(time * 0.5))) * sin(time * 0.5) * 0.1 + 0.1);",
        "    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(time * 0.5))) * sin(time * 0.5) * 0.2 + 0.3);",
        "    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(time * 0.5))) * sin(time * 0.5) * 0.3 + 0.5);",
        "    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(time * 0.5))) * sin(time * 0.5) * 0.4 + 0.7);",
        "    pct += plot(st_f, pcurve(fract(st.x), 2., 1. + abs(sin(time * 0.5))) * sin(time * 0.5) * 0.4 + 0.9);",
        "    return pct;",
        "}",

        /////////////

        "void main(){",
            "vec4 color = texture2D( tDiffuse, vUv );",
            "float average = ( color.r + color.g + color.b ) / 3.0;",

            "gl_FragColor = vec4(vec3( average * 1.2 + pattern(vUv) ), color.a);",
    "}"

    ].join( "\n" )

};