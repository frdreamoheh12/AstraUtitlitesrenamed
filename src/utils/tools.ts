import { Palette, Blend, Sparkles, Type, Smile, FileCode2, Terminal, Coffee, LayoutGrid, SlidersHorizontal, Package, Box, Archive, type LucideIcon } from 'lucide-react';

export type Tool = { slug: string; name: string; description: string; category: string; icon: LucideIcon; tag?: string };
export const tools: Tool[] = [
  {slug:'colors',name:'Minecraft Colors',description:'Legacy codes, formatting styles, and precise color references.',category:'Color & Text',icon:Palette},
  {slug:'gradients',name:'Gradient Generator',description:'Turn ordinary text into character-perfect color gradients.',category:'Color & Text',icon:Blend,tag:'POPULAR'},
  {slug:'rgb',name:'Minecraft RGB',description:'Generate HEX, RGB, legacy and MiniMessage color strings.',category:'Color & Text',icon:Sparkles,tag:'POPULAR'},
  {slug:'fonts',name:'Font Utility',description:'Explore Unicode glyphs for custom resource pack fonts.',category:'Color & Text',icon:Type},
  {slug:'emoji',name:'Emoji Utility',description:'Find and copy Minecraft-friendly symbols and characters.',category:'Color & Text',icon:Smile},
  {slug:'plugin',name:'Plugin Descriptor',description:'Generate validated plugin.yml and paper-plugin.yml files.',category:'Development',icon:FileCode2},
  {slug:'compiler',name:'Minecraft Compiler',description:'Inspect projects and compile compatible plain Java sources.',category:'Development',icon:Terminal,tag:'NEW'},
  {slug:'java-converter',name:'Java Converter',description:'Inspect packages, classes and Java version compatibility.',category:'Development',icon:Coffee},
  {slug:'resource-pack',name:'Resource Pack Tools',description:'Validate namespaces, assets and pack metadata.',category:'Resource Pack',icon:Package},
  {slug:'sprite',name:'Sprite Model Generator',description:'Create ready-to-use Minecraft item model JSON.',category:'Resource Pack',icon:Box},
  {slug:'gui',name:'GUI Builder',description:'Design inventories visually and export menu YAML.',category:'GUI & Config',icon:LayoutGrid,tag:'POPULAR'},
  {slug:'config',name:'Config Generator',description:'Build and validate structured Minecraft YAML configs.',category:'GUI & Config',icon:SlidersHorizontal},
  {slug:'zip',name:'ZIP Project Analyzer',description:'Explore a safe file tree and detect project technologies.',category:'Project Utilities',icon:Archive},
];
export const categories = ['Color & Text','Development','Resource Pack','GUI & Config','Project Utilities'];
export const hexOk = (s:string) => /^#?[\da-fA-F]{6}$/.test(s.trim());
export const normalizeHex = (s:string) => '#'+s.replace('#','').toUpperCase();
export const rgb = (hex:string) => { const h=normalizeHex(hex); return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)); };
export const blend = (a:string,b:string,t:number) => '#'+rgb(a).map((v,i)=>Math.round(v+(rgb(b)[i]-v)*t).toString(16).padStart(2,'0')).join('').toUpperCase();
export const gradient = (text:string,stops:string[]) => [...text].map((char,i)=>{const p=text.length<2?0:i/(text.length-1);const scaled=p*(stops.length-1);return {char,color:blend(stops[Math.floor(scaled)],stops[Math.min(stops.length-1,Math.floor(scaled)+1)],scaled%1)};});
export const miniGradient=(text:string,stops:string[])=>gradient(text,stops).map(({char,color})=>`<${color}>${char}`).join('');
export const legacyGradient=(text:string,stops:string[])=>gradient(text,stops).map(({char,color})=>`§x${color.slice(1).split('').map(c=>'§'+c).join('')}${char}`).join('');
export const download = (name:string,content:string,type='text/plain') => {const a=document.createElement('a');const url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
export const apiBase = (typeof import.meta !== 'undefined' && (import.meta as unknown as {env?:{VITE_API_URL?:string}}).env?.VITE_API_URL) || '';
export async function apiPost(endpoint:string,body:unknown|FormData){if((import.meta as unknown as {env?:{BASE_URL?:string}}).env?.BASE_URL && !apiBase)throw new Error('Backend is currently unavailable. Configure VITE_API_URL.');const response=await fetch(apiBase?`${apiBase}/api/${endpoint}`:`/api/process?endpoint=${encodeURIComponent(endpoint)}`,{method:'POST',...(body instanceof FormData?{body}:{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})});let result;try{result=await response.json()}catch{throw new Error('Backend is currently unavailable.')}if(!response.ok||!result.success)throw new Error(result.message||'Request failed');return result.data;}
