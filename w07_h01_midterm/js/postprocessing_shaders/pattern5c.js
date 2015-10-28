// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern5c = {

    uniforms: {

        "time":     { type: "f", value: 10.0},
        "tDiffuse": { type: "t", value: null },
        "scale":    { type: "f", value: 10.0 },
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

        "//  Function from Iñigo Quiles",
        "//  www.iquilezles.org/www/articles/functions/functions.htm",
        "float pcurve( float x, float a, float b ){",
        "    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));",
        "    return k * pow( x, a ) * pow( 1.0-x, b );",
        "}",

        "float circle(vec2 st, vec2 center){",
        "    vec2 toCenter = center-st;",
        "    float pct = length(toCenter) * 2.4 - 0.1 * sin(time);",
        "    if (st.y > 0.5){ return step(0.0, pct) - step(1.1, pct);};",
        "}",

        "float circle1(vec2 st, vec2 center){",
        "    vec2 toCenter = center-st;",
        "    float pct = length(toCenter) * 2.;",
        "    return 1.-step(1., pct);",
        "}",

        "vec2 move(vec2 st){",
        "    vec2 st_i = floor(st);",
        "    if (mod(st_i.x,2.) == 1.) {",
        "        st.y += pow(abs(fract(time * 0.2)), 10.);",
        "    }",
        "    if (mod(st_i.x,2.) == 0.) {",
        "        st.y -= pow(abs(fract(time * 0.2)), 10.);",
        "    }",
        "    if (mod(st_i.y,2.) == 1.) {",
        "        st.x += pow(abs(fract(time * 0.2 + pi/2.)), 10.);",
        "    }",
        "    if (mod(st_i.y,2.) == 0.) {",
        "        st.x -= pow(abs(fract(time * 0.2 + pi/2.)), 10.);",
        "    }",
        "    return st;",
        "}",

        "float pattern(vec2 st) {",
        "    st *= scale;",
        "    st.x *= 3.;",
        "    st = move(st);",
        "    vec2 st_f = fract(st);",
        "    float pct = 0.0;",
        "    pct += circle(st_f, vec2(.5, .5)) - circle(st_f, vec2(0.5, 0.49));",
        "    pct -= circle1(st_f, vec2(0.0, 0.0)) - circle1(st_f, vec2(0.0, 0.01));",
        "    pct -= circle1(st_f, vec2(1.0, 0.0)) - circle1(st_f, vec2(1.0, 0.01));",
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