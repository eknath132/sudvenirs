import { neon } from '@neondatabase/serverless';
export type Product={id:string;name:string;description:string;hours:number;grams:number;loss:number;cost:number;retail:number|null;wholesale:number|null;image:string|null;published:number};
export function db(){if(!process.env.DATABASE_URL)throw new Error('Falta configurar DATABASE_URL');return neon(process.env.DATABASE_URL);}
let ready:Promise<void>|undefined;
export function ensureDb(){return ready??=(async()=>{const sql=db();await sql`CREATE TABLE IF NOT EXISTS products (id text PRIMARY KEY,name text NOT NULL,description text NOT NULL DEFAULT '',hours double precision NOT NULL DEFAULT 0,grams double precision NOT NULL DEFAULT 0,loss double precision NOT NULL DEFAULT 10,cost double precision NOT NULL DEFAULT 0,retail double precision,wholesale double precision,image text,published integer NOT NULL DEFAULT 0)`;await sql`CREATE TABLE IF NOT EXISTS settings (key text PRIMARY KEY,value text NOT NULL)`;})().catch(e=>{ready=undefined;throw e;});}
export async function allProducts(){await ensureDb();const sql=db();return await sql`SELECT * FROM products ORDER BY name ASC` as Product[];}
export async function filamentKg(){await ensureDb();const sql=db();const rows=await sql`SELECT value FROM settings WHERE key='filament_kg'`;return Number(rows[0]?.value||20000);}
export const retailSuggestion=(wholesale:number|null)=>wholesale==null?null:Math.round(wholesale*1.3/500)*500;
export const calculate=(hours:number,grams:number,loss:number,kg:number)=>{const cost=Math.round((hours*200+grams*kg/1000*(1+loss/100))*100)/100;return {cost,wholesale:cost>0?Math.round(cost*3/500)*500:null};};
