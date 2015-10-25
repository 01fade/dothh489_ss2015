// Author _ Hang Do Thi Duc ( 22-8miles.com )
// Base Code _ https://www.shadertoy.com/view/4s2SRt

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
#define RANGE(a,b,x) ( step(a,x)*(1.0-step(b,x)) )
#define RS(a,b,x) ( smoothstep(a-1.0,a+1.0,x)*(1.0-smoothstep(b-1.0,b+1.0,x)) )
#define M_PI 3.1415926535897932384626433832795

#define blue1 vec3(0.74,0.95,1.00)
#define blue2 vec3(0.87,0.98,1.00)
#define blue3 vec3(0.05,0.26,0.30)
#define blue4 vec3(0.953,0.969,0.89)
#define green vec3(0.3,0.89,0.79)
#define green2 vec3(0.3,0.89,0.49)
#define pink vec3(1.00,0.18,0.37)
#define pink2 vec3(0.47,0.15,0.20)


#define MOV(a,b,c,d,t) (vec2(a*cos(t)+b*cos(0.1*(t)), c*sin(t)+d*cos(0.1*(t))))

float circle(vec2 uv, vec2 center, float radius, float width, float opening)
{
    vec2 d = uv - center;
    float r = sqrt( dot( d, d ) );
    d = normalize(d);
    if( d.y > opening )
        return SMOOTH(r-width/2.0,radius)-SMOOTH(r+width/2.0,radius);
    else
        return 0.0;
}

float dot(vec2 uv, vec2 center, float radius, float width, float opening)
{
    vec2 d = uv - center;
    float r = sqrt( dot( d, d ) );
    d = normalize(d);
    if( d.y > opening )
        return SMOOTH(r-width/2.0,radius);
    else
        return 0.0;
}

float F( float n, float k ){
    return 1.0 - pow(abs(sin(M_PI * u_time * n)), k);
}

float movingLine(vec2 uv, vec2 center, float radius)
{
    float f = F(.4, 1.);
    float theta0 = 150.0 * f - 180.;
    vec2 d = uv - center;
    float r = sqrt( dot( d, d ) );
    //limit to just the circle
    if(r < radius - radius*0.1)
    {
        //compute the distance to the line theta=theta0
        vec2 p = radius*vec2(cos(theta0*M_PI/150.0),
                            -sin(theta0*M_PI/150.0));
        float l = length( d - p*clamp( dot(d,p)/dot(p,p), 0.0, 0.9) );
        d = normalize(d);
        //compute gradient based on angle difference to theta0
        float theta = mod(90.0*atan(d.y,d.x)/-M_PI*0.5 - M_PI*11., 90.0);
        float gradient = clamp(1.0-theta/(50. * f),0.0,0.9);
        return SMOOTH(l,1.0)+0.5*gradient;
    }
    else return 0.0;
}

float movingLineAcc(vec2 uv, vec2 center, float radius)
{
    float f = F(0.2, 10.);
    float theta0 = 150.0 * f - 180.;
    vec2 d = uv - center;
    float r = sqrt( dot( d, d ) );
    //limit to just the circle
    if(r < radius - radius*0.1)
    {
        //compute the distance to the line theta=theta0
        vec2 p = radius*vec2(cos(theta0*M_PI/150.0),
                            -sin(theta0*M_PI/150.0));
        float l = length( d - p*clamp( dot(d,p)/dot(p,p), 0.0, 0.9) );
        d = normalize(d);
        //compute gradient based on angle difference to theta0
        float theta = mod(90.0*atan(d.y,d.x)/-M_PI*0.5 - M_PI*11., 90.0);
        float gradient = clamp(1.0-theta/(50. * f),0.0,0.9);
        return SMOOTH(l,1.0)+0.5*gradient;
    }
    else return 0.0;
}

float triangles(vec2 uv, vec2 center, float radius)
{
    vec2 d = uv - center;
    return RS(0.0, 10.0, d.x-radius) * (1.0-smoothstep( 9.0-d.x+radius,11.0-d.x+radius, abs(d.y)))
        + RS(-10.0, 0.0, d.x+radius) * (1.0-smoothstep( 9.0+d.x+radius,11.0+d.x+radius, abs(d.y)))
         ;

}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 finalColor;
    vec2 uv = gl_FragCoord.xy;
    vec2 c = u_resolution.xy * .5;

    finalColor += (0.5 + 0.45*F(0.2, 10.)) * circle(uv, c, 350.0, 3., -0.925) * green;
    finalColor += (0.5 + 0.45*F(0.2, 10.)) * circle(uv, c, 370.0, 1., -0.5) * blue2;
    finalColor += 0.9 * circle(uv, vec2(c.x, c.y * 0.5), 150.0, 1.0, -1.) * blue2;
    finalColor += movingLineAcc(uv, c, 350.0) * green;
    finalColor += movingLine(uv, vec2(c.x, c.y * 0.5), 150.0) * pink;
    finalColor += dot(uv, vec2(c.x, c.y * 0.5), 150.0, 1.0, -1.) * vec3(0.08);
    finalColor += 0.9 * circle(uv, vec2(c.x, c.y * 0.5), 90.0, 1.0, -1.) * blue3;
    finalColor += F(.5, 4.) * dot(uv, vec2(c.x * 0.35, c.y * 0.5), 20.0, 1.0, -1.) * green2;
    finalColor += F(.2, 20.) * dot(uv, vec2(c.x * 1.65, c.y * 0.5), 20.0, 1.0, -1.) * pink2;
    finalColor += triangles(uv, vec2(c.x, c.y * 0.2), 280.0 + 150.0 * F(.5,2.)) * blue2;

    gl_FragColor = vec4( finalColor, 1.0 );
}