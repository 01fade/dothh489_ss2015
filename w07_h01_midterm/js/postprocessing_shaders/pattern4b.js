// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern4b = {

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
        "uniform vec2 resolution;",
        "varying vec2 vUv;",

        ////////////

        "float shape(float pos, float n, float b, float e, vec2 st) {",
        "  float d = 0.0;",
        "  st = st * pos -1.;",
        "  float a = atan(st.x,st.y)+pi;",
        "  float r = hpi/n;",
        "  d = cos(floor(.5+a/r)*r-a)*length(st);",
        "  return 1.0-smoothstep(b,e,d) - (1.0-smoothstep(b - 0.02,e,d));",
        "}",

        "vec2 move(vec2 st){",
        "    vec2 st_i = floor(st);",
        "    if (mod(st_i.y,2.) == 1.) {st.x += 0.5;}",
        "    return st;",
        "}",

        "float hex(vec2 st, float size, float gap, float rot) {",
        "    vec2 d = gl_FragCoord.xy - resolution.xy/2.0;",
        "    float r = sqrt( dot( d, d ) );",
        "    d = normalize(d);",
        "    float theta = 180.0*(atan(d.y,d.x)/pi) + 60. * rot;",
        "    float pct = smoothstep(gap, gap + 0.1, abs(mod(theta+gap,30.0)-gap)) * shape(2., 6., size, size, st);",
        "    return pct;",
        "}",

        "//  Function from Iñigo Quiles",
        "//  www.iquilezles.org/www/articles/functions/functions.htm",
        "float pcurve( float x, float a, float b ){",
        "    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));",
        "    return k * pow( x, a ) * pow( 1.0-x, b );",
        "}",

        "float pattern(vec2 st){",
        "    // squish for 16:9 video",
        "    st.y *= 9. * scale;",
        "    st.x *= 16. * scale;",
        "    st = move(st);",
        "    vec2 st_f = fract(st);",
        "    float pct = 0.0;",
        "    float m = pcurve(fract(st_f.x), 2., 1. + abs(sin(time * 0.5))) * sin(time * 0.5);",
        "    pct += hex(st_f, 0.1, 10. * m, 0.5 );",
        "    pct += hex(st_f, 0.3, 10. * m * -1., 0.5 );",
        "    pct += hex(st_f, 0.5, 10. * m, 0.5 );",
        "    pct += hex(st_f, 0.7, 10. * m * -1., 0.5 );",
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