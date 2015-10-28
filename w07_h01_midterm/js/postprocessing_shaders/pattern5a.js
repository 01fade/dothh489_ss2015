// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern5a = {

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

        "float circle(vec2 st, vec2 center, float size){",
        "    vec2 toCenter = center-st;",
        "    float pct = length(toCenter) * 2.8 * size;",
        "    pct = step(0.0, pct) - step(1.1, pct);",
        "    pct *= step(0.3, st.y);",
        "    return pct;",
        "}",

        "float circle1(vec2 st, vec2 center){",
        "    vec2 toCenter = center-st;",
        "    float pct = length(toCenter) * 1.9 - 0.1 * pow(abs(sin(time)), 4.);",
        "    return 1.-step(1., pct);",
        "}",

        "float pattern(vec2 st) {",
        "    st *= scale;",
        "    float m = pow(abs(sin(time)), 2.);",
        "    st.x *= 2.0;",
        "    vec2 st_i = floor(st);",
        "    if (mod(st_i.y, 2.) == 0.) { st.x += time * 0.02; };",
        "    if (mod(st_i.y, 2.) == 1.) { st.x -= time * 0.02; };",
        "    vec2 st_f = fract(st);",
        "    float pct = 0.0;",
        "    pct += circle(st_f, vec2(0.5, 0.5), 1.0 + 0.4*m) - circle(st_f, vec2(0.5, 0.48), 1.0 + 0.4*m);",
        "    pct += circle(st_f, vec2(0.5, 0.45), 1.1 +0.35*m) - circle(st_f, vec2(0.5, 0.43), 1.1 +0.35*m);",
        "    pct += circle(st_f, vec2(0.5, 0.40), 1.2 +0.3*m) - circle(st_f, vec2(0.5, 0.38), 1.2 +0.3*m);",
        "    pct += circle(st_f, vec2(0.5, 0.35), 1.3 +0.25*m) - circle(st_f, vec2(0.5, 0.33), 1.3 +0.25*m);",
        "    pct += circle(st_f, vec2(0.5, 0.25), 1.4 +0.2*m) - circle(st_f, vec2(0.5, 0.23), 1.4 +0.2*m);",
        "    pct += circle(st_f, vec2(0.5, 0.15), 1.5 +0.15*m) - circle(st_f, vec2(0.5, 0.13), 1.5 +0.15*m);",
        "    pct += circle(st_f, vec2(0.5, 0.05), 1.9 +0.1*m) - circle(st_f, vec2(0.5, 0.03), 1.9 +0.1*m);",
        "    float cut = circle1(st_f, vec2(0.0, 0.0));",
        "    cut += circle1(st_f, vec2(0.0, 0.0)) - circle1(st_f, vec2(0.0, 0.01));",
        "    cut += circle1(st_f, vec2(1.0, 0.0));",
        "    cut += circle1(st_f, vec2(1.0, 0.0)) - circle1(st_f, vec2(1.0, 0.01));",
        "    return pct - cut;",
        "}",

        /////////////

        "void main(){",
            "vec4 color = texture2D( tDiffuse, vUv );",
            "float average = ( color.r + color.g + color.b ) / 3.0;",

            "gl_FragColor = vec4(vec3(average * 2.5 * pattern(vUv) ), color.a);",
    "}"

    ].join( "\n" )

};