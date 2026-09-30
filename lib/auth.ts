import {cookies} from 'next/headers';import {createHmac,timingSafeEqual} from 'node:crypto';
const name='sudvenirs_admin';
function secret(){if(!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<32)throw new Error('Configurá SESSION_SECRET con al menos 32 caracteres');return process.env.SESSION_SECRET;}
function sign(value:string){return createHmac('sha256',secret()).update(value).digest('hex');}
function equal(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
export async function isAdmin(){try{const raw=(await cookies()).get(name)?.value;if(!raw)return false;const [issued,sig]=raw.split('.');if(!issued||!sig||!/^\d+$/.test(issued)||!equal(sig,sign(issued)))return false;return Date.now()-Number(issued)<7*24*60*60*1000&&Number(issued)<=Date.now()+60000;}catch{return false;}}
export async function beginSession(){const issued=String(Date.now());(await cookies()).set(name,issued+'.'+sign(issued),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:7*24*60*60});}
export async function endSession(){(await cookies()).delete(name);}
export function validCredentials(email:string,password:string){const expectedEmail=process.env.ADMIN_EMAIL,expectedPass=process.env.ADMIN_PASSWORD;if(!expectedEmail||!expectedPass||!process.env.SESSION_SECRET)return false;return equal(email.trim().toLowerCase(),expectedEmail.toLowerCase())&&equal(password,expectedPass);}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).origin;}
