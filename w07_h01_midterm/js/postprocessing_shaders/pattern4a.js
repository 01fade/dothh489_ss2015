// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern4a = {

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

        "float shape(float pos, float n, float b, float e, vec2 st) {",
        "  float d = 0.0;",
        "  st = st * pos -1.;",
        "  float a = atan(st.x,st.y)+pi;",
        "  float r = hpi/n;",
        "  d = cos(floor(.5+a/r)*r-a)*length(st);",
        "  return 1.0-smoothstep(b,e + 0.005,d) - (1.0-smoothstep(b - 0.005,e,d));",
        "}",

        "mat2 rotationMatrix(float a) {return mat2(vec2(cos(a),-sin(a)),vec2(sin(a),cos(a)));}",

        "//  Function from Iñigo Quiles",
        "//  www.iquilezles.org/www/articles/functions/functions.htm",
        "float pcurve( float x, float a, float b ){",
        "    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));",
        "    return k * pow( x, a ) * pow( 1.0-x, b );",
        "}",

        "float hex(vec2 st, float size, float gap, float rot, float off) {",
        "    st -= 0.5;",
        "    st *= rotationMatrix(rot);",
        "    st += 0.5;",
        "    vec2 pos = vec2(0.5)-st;",
        "    float r = length(pos)*2.0;",
        "    float a = atan(pos.y,pos.x) + 0.25;",
        "    float m = (1.-pow(sin(time * 0.3 + off), 50.));",
        "    // float m = 1.;",
        "    float f = step(m, sin(a * 6.));",
        "    float pct = smoothstep(f,f+0.1,r) * shape(2., 6., size, size, st);",
        "    return pct;",
        "}",

        "float pattern(vec2 st){",
        "    float pct = 0.0;",
        "    // squish for 16:9 ish",
        "    st.x = st.x * 2. - 0.5;",
        "    // st.y = st.y * 1.3 - 0.1;",
        "    float m = pcurve(fract(st.x), 2., 1. + abs(sin(time * 0.3))) * sin(time * 0.5);",
        "    pct += hex(st, 0.1 + 0.1* m, 10., 0.0, 0.2 );",
        "    pct += hex(st, 0.2 + 0.1* m, 10. * -1., 0.5, 0.4 );",
        "    pct += hex(st, 0.3 + 0.1* m, 10., 0.0, 0.6 );",
        "    pct += hex(st, 0.45 + 0.1* m, 10. * -1., 0.5, 0.8 );",
        "    pct += hex(st, 0.6 + 0.1* m, 10., 0.0, 1.0 );",
        "    pct += hex(st, 0.8 + 0.1* m, 10. * -1., 0.5, 1.2 );",
        "    return pct;",
        "}",

        /////////////

        "void main(){",
            "vec4 color = texture2D( tDiffuse, vUv );",
            "float average = ( color.r + color.g + color.b ) / 3.0;",

            "gl_FragColor = vec4(vec3( average + pattern(vec2(vUv.x-0.5,vUv.y))+pattern(vec2(vUv.x,vUv.y))+pattern(vec2(vUv.x+0.5,vUv.y)) ), color.a);",
    "}"

    ].join( "\n" )

};