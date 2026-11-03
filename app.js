/* ============ DATA ============ */
var PRON=[['yo','I'],['tú','you (informal)'],['él / ella / Ud.','he / she / you (formal)'],['nosotros','we'],['ellos / ellas / Uds.','they / you all']];
var TL={present:'Present',preterite:'Preterite',imperfect:'Imperfect'};
var GROUPS={
 present:{
  stem:{label:'Stem-changers (e→ie, o→ue, e→i)',note:'Boot verbs: the stem vowel changes in yo, tú, él/ella/Ud. and ellos/ellas/Uds. The nosotros form keeps the original stem.'},
  irreg:{label:'Irregular & yo-go verbs',note:'Many verbs have an irregular yo form (hago, pongo, salgo, conozco). Tener, venir and decir also change their stem. Ser, ir, estar and dar are fully irregular.'}
 },
 preterite:{
  regular:{label:'Regular verbs',note:'-ar verbs take é, aste, ó, amos, aron. -er and -ir verbs take í, iste, ió, imos, ieron. Accents on yo and él/ella/Ud. forms matter.'},
  spelling:{label:'Spelling changes',note:'Yo forms of -car, -gar and -zar verbs change (c→qu, g→gu, z→c) to keep the sound. Leer, creer and oír change ió/ieron to yó/yeron and need accents on the tú and nosotros forms.'},
  irregular:{label:'Irregular stems',note:'Irregular stems take -e, -iste, -o, -imos, -ieron with no accents. A stem ending in j takes -eron (dijeron, trajeron). Ser and ir share forms. Dar and ver use -er/-ir endings without accents.'},
  stemir:{label:'-ir stem changes',note:'-ir verbs change e→i or o→u only in the él/ella/Ud. and ellos/ellas/Uds. forms.'}
 },
 imperfect:{
  regular:{label:'Regular verbs',note:'-ar verbs take aba, abas, aba, ábamos, aban. -er and -ir verbs take ía, ías, ía, íamos, ían. Stems never change.'},
  irregular:{label:'Irregular verbs',note:'Only three verbs are irregular in the imperfect: ser, ir and ver.'}
 }
};
var V=[];
function addV(tense,group,inf,en,forms){V.push({tense:tense,group:group,inf:inf,en:en,forms:forms.split(',').map(function(s){return s.trim();})});}
function gen(tense,group,inf,en,ar,er,over){
  var s=inf.slice(0,-2),e=inf.slice(-2)==='ar'?ar:er;
  var f=e.map(function(x){return s+x;});
  if(over)f[0]=over;
  V.push({tense:tense,group:group,inf:inf,en:en,forms:f});
}
var P_AR=['é','aste','ó','amos','aron'],P_ER=['í','iste','ió','imos','ieron'];
var I_AR=['aba','abas','aba','ábamos','aban'],I_ER=['ía','ías','ía','íamos','ían'];

/* present: stem-changers */
[['pensar','to think','pienso,piensas,piensa,pensamos,piensan'],
 ['querer','to want','quiero,quieres,quiere,queremos,quieren'],
 ['empezar','to begin','empiezo,empiezas,empieza,empezamos,empiezan'],
 ['preferir','to prefer','prefiero,prefieres,prefiere,preferimos,prefieren'],
 ['cerrar','to close','cierro,cierras,cierra,cerramos,cierran'],
 ['entender','to understand','entiendo,entiendes,entiende,entendemos,entienden'],
 ['poder','to be able to','puedo,puedes,puede,podemos,pueden'],
 ['dormir','to sleep','duermo,duermes,duerme,dormimos,duermen'],
 ['volver','to return','vuelvo,vuelves,vuelve,volvemos,vuelven'],
 ['encontrar','to find','encuentro,encuentras,encuentra,encontramos,encuentran'],
 ['almorzar','to eat lunch','almuerzo,almuerzas,almuerza,almorzamos,almuerzan'],
 ['mostrar','to show','muestro,muestras,muestra,mostramos,muestran'],
 ['jugar','to play','juego,juegas,juega,jugamos,juegan'],
 ['pedir','to ask for, to order','pido,pides,pide,pedimos,piden'],
 ['servir','to serve','sirvo,sirves,sirve,servimos,sirven'],
 ['repetir','to repeat','repito,repites,repite,repetimos,repiten'],
 ['seguir','to follow','sigo,sigues,sigue,seguimos,siguen']
].forEach(function(r){addV('present','stem',r[0],r[1],r[2]);});
/* present: irregular / yo-go */
[['tener','to have','tengo,tienes,tiene,tenemos,tienen'],
 ['venir','to come','vengo,vienes,viene,venimos,vienen'],
 ['hacer','to do, to make','hago,haces,hace,hacemos,hacen'],
 ['poner','to put','pongo,pones,pone,ponemos,ponen'],
 ['salir','to leave, to go out','salgo,sales,sale,salimos,salen'],
 ['traer','to bring','traigo,traes,trae,traemos,traen'],
 ['decir','to say, to tell','digo,dices,dice,decimos,dicen'],
 ['ver','to see','veo,ves,ve,vemos,ven'],
 ['saber','to know (a fact)','sé,sabes,sabe,sabemos,saben'],
 ['conocer','to know (a person), to meet','conozco,conoces,conoce,conocemos,conocen'],
 ['oír','to hear','oigo,oyes,oye,oímos,oyen'],
 ['ir','to go','voy,vas,va,vamos,van'],
 ['ser','to be','soy,eres,es,somos,son'],
 ['estar','to be (location, state)','estoy,estás,está,estamos,están'],
 ['dar','to give','doy,das,da,damos,dan']
].forEach(function(r){addV('present','irreg',r[0],r[1],r[2]);});

/* preterite: regular */
[['hablar','to speak'],['comprar','to buy'],['bailar','to dance'],['trabajar','to work'],['estudiar','to study'],
 ['comer','to eat'],['beber','to drink'],['aprender','to learn'],['vivir','to live'],['escribir','to write'],['abrir','to open'],['salir','to leave'],['correr','to run']
].forEach(function(r){gen('preterite','regular',r[0],r[1],P_AR,P_ER);});
/* preterite: spelling changes */
gen('preterite','spelling','buscar','to look for',P_AR,P_ER,'busqué');
gen('preterite','spelling','sacar','to take out',P_AR,P_ER,'saqué');
gen('preterite','spelling','pagar','to pay',P_AR,P_ER,'pagué');
gen('preterite','spelling','llegar','to arrive',P_AR,P_ER,'llegué');
gen('preterite','spelling','empezar','to begin',P_AR,P_ER,'empecé');
gen('preterite','spelling','jugar','to play',P_AR,P_ER,'jugué');
addV('preterite','spelling','leer','to read','leí,leíste,leyó,leímos,leyeron');
addV('preterite','spelling','creer','to believe','creí,creíste,creyó,creímos,creyeron');
addV('preterite','spelling','oír','to hear','oí,oíste,oyó,oímos,oyeron');
/* preterite: irregular */
[['ser','to be','fui,fuiste,fue,fuimos,fueron'],
 ['ir','to go','fui,fuiste,fue,fuimos,fueron'],
 ['hacer','to do, to make','hice,hiciste,hizo,hicimos,hicieron'],
 ['tener','to have','tuve,tuviste,tuvo,tuvimos,tuvieron'],
 ['estar','to be','estuve,estuviste,estuvo,estuvimos,estuvieron'],
 ['poder','to be able to','pude,pudiste,pudo,pudimos,pudieron'],
 ['poner','to put','puse,pusiste,puso,pusimos,pusieron'],
 ['venir','to come','vine,viniste,vino,vinimos,vinieron'],
 ['decir','to say, to tell','dije,dijiste,dijo,dijimos,dijeron'],
 ['querer','to want','quise,quisiste,quiso,quisimos,quisieron'],
 ['saber','to know','supe,supiste,supo,supimos,supieron'],
 ['traer','to bring','traje,trajiste,trajo,trajimos,trajeron'],
 ['conducir','to drive','conduje,condujiste,condujo,condujimos,condujeron'],
 ['dar','to give','di,diste,dio,dimos,dieron'],
 ['ver','to see','vi,viste,vio,vimos,vieron']
].forEach(function(r){addV('preterite','irregular',r[0],r[1],r[2]);});
/* preterite: -ir stem changers */
[['dormir','to sleep','dormí,dormiste,durmió,dormimos,durmieron'],
 ['morir','to die','morí,moriste,murió,morimos,murieron'],
 ['pedir','to ask for, to order','pedí,pediste,pidió,pedimos,pidieron'],
 ['preferir','to prefer','preferí,preferiste,prefirió,preferimos,prefirieron'],
 ['servir','to serve','serví,serviste,sirvió,servimos,sirvieron'],
 ['repetir','to repeat','repetí,repetiste,repitió,repetimos,repitieron'],
 ['seguir','to follow','seguí,seguiste,siguió,seguimos,siguieron'],
 ['sentir','to feel','sentí,sentiste,sintió,sentimos,sintieron']
].forEach(function(r){addV('preterite','stemir',r[0],r[1],r[2]);});

/* imperfect */
[['hablar','to speak'],['jugar','to play'],['bailar','to dance'],['trabajar','to work'],['estudiar','to study'],['estar','to be'],['dar','to give'],
 ['comer','to eat'],['vivir','to live'],['tener','to have'],['hacer','to do, to make'],['poder','to be able to'],['querer','to want'],
 ['escribir','to write'],['salir','to leave'],['dormir','to sleep'],['pedir','to ask for, to order'],['leer','to read']
].forEach(function(r){gen('imperfect','regular',r[0],r[1],I_AR,I_ER);});
[['ser','to be','era,eras,era,éramos,eran'],
 ['ir','to go','iba,ibas,iba,íbamos,iban'],
 ['ver','to see','veía,veías,veía,veíamos,veían']
].forEach(function(r){addV('imperfect','irregular',r[0],r[1],r[2]);});

/* vocabulary: "spanish (alternates split by /) | english" */
var VOCAB={
 routine:{title:'La rutina diaria',raw:[
  'despertarse|to wake up','levantarse|to get up','ducharse|to take a shower','bañarse|to take a bath','lavarse la cara|to wash one\'s face',
  'cepillarse los dientes|to brush one\'s teeth','peinarse|to comb one\'s hair','maquillarse|to put on makeup','afeitarse|to shave','vestirse|to get dressed',
  'acostarse|to go to bed','dormirse|to fall asleep','quitarse|to take off (clothing)','ponerse|to put on (clothing)','sentarse|to sit down']},
 food:{title:'En el restaurante',raw:[
  'el camarero|waiter','la camarera|waitress','la cuenta|the check','la propina|tip','el menú|menu','pedir|to order','el plato principal|main course',
  'la sopa|soup','la ensalada|salad','el postre|dessert','el tenedor|fork','la cuchara|spoon','el cuchillo|knife','la servilleta|napkin','delicioso|delicious']},
 travel:{title:'De viaje',raw:[
  'el aeropuerto|airport','el boleto/el billete|ticket','el pasaporte|passport','la maleta|suitcase','el equipaje|luggage','el vuelo|flight','la salida|departure',
  'la llegada|arrival','la aduana|customs','la estación de tren|train station','el hotel|hotel','la reserva|reservation','hacer las maletas|to pack','viajar|to travel','el viaje|trip']},
 health:{title:'La salud',raw:[
  'la cabeza|head','el estómago|stomach','la garganta|throat','la espalda|back','el brazo|arm','la pierna|leg','el pie|foot','doler|to hurt','la fiebre|fever',
  'la tos|cough','el resfriado|cold','la gripe|flu','el médico|doctor','la medicina|medicine','estornudar|to sneeze','la cita|appointment']},
 house:{title:'La casa',raw:[
  'la cocina|kitchen','la sala|living room','el comedor|dining room','el dormitorio/la habitación|bedroom','el baño|bathroom','el garaje|garage','el jardín|yard',
  'la escalera|stairs','la ventana|window','la puerta|door','el sofá|couch','la cama|bed','el armario|closet','la lámpara|lamp']},
 town:{title:'En la ciudad',raw:[
  'la biblioteca|library','el banco|bank','el correo|post office','la farmacia|pharmacy','el supermercado|supermarket','la plaza|town square','la iglesia|church',
  'el museo|museum','la esquina|corner','la cuadra|city block','a la derecha|to the right','a la izquierda|to the left','derecho/todo recto|straight ahead','cruzar|to cross','doblar/girar|to turn']},
 clothes:{title:'La ropa',raw:[
  'la camisa|shirt','los pantalones|pants','el vestido|dress','la falda|skirt','la chaqueta|jacket','el abrigo|coat','los zapatos|shoes','las botas|boots',
  'los calcetines|socks','el sombrero|hat','la gorra|cap','las gafas|glasses','el cinturón|belt','la bufanda|scarf','los guantes|gloves']},
 time:{title:'Palabras del tiempo',raw:[
  'ayer|yesterday','anoche|last night','anteayer|the day before yesterday','la semana pasada|last week','el año pasado|last year','hace dos días|two days ago',
  'de repente|suddenly','una vez|once','siempre|always','a menudo|often','a veces|sometimes','todos los días|every day','mientras|while','nunca|never','cada verano|every summer']},
 feelings:{title:'Emociones y estados',raw:[
  'alegre|cheerful','cansado|tired','enojado|angry','nervioso|nervous','aburrido|bored','contento|happy','preocupado|worried','ocupado|busy','triste|sad','simpático|nice, friendly']}
};
var ALLV=[];
Object.keys(VOCAB).forEach(function(k){
  VOCAB[k].items=VOCAB[k].raw.map(function(r){
    var p=r.split('|'),alts=p[0].split('/').map(function(s){return s.trim();});
    var it={cat:k,alts:alts,es:alts.join(' / '),en:p[1],key:'v|'+alts[0]};
    ALLV.push(it);return it;
  });
});

/* sentences: tense is decided by the student; the tag shows only after answering */
var SENT=[
 ['Ayer nosotros ____ (ir) al cine.','fuimos','preterite','“Ayer” points to one completed event, so use the preterite.'],
 ['Cuando yo era niña, ____ (jugar) en el parque todos los días.','jugaba','imperfect','A habit in the past (“todos los días”) takes the imperfect.'],
 ['Anoche ellos ____ (hacer) la tarea.','hicieron','preterite','“Anoche” marks a completed action.'],
 ['La semana pasada tú ____ (ver) una película de terror.','viste','preterite','A single finished event last week: preterite. Ver has no accent in viste.'],
 ['Todos los veranos nosotros ____ (viajar) a México.','viajábamos','imperfect','“Todos los veranos” signals repeated past action. The nosotros form needs the accent on ába.'],
 ['De repente, el teléfono ____ (sonar).','sonó','preterite','“De repente” interrupts the scene with a sudden, completed event.'],
 ['Ayer Ana ____ (pedir) una ensalada.','pidió','preterite','Completed action. Pedir is an -ir stem changer: e→i in the él/ella form.'],
 ['Mi hermano ____ (ser) muy travieso cuando era pequeño.','era','imperfect','Describing how someone used to be: imperfect.'],
 ['El año pasado mi familia ____ (estar) en Madrid.','estuvo','preterite','A completed stay with a time frame (“el año pasado”): preterite. Estar uses the irregular stem estuv-.'],
 ['Todos los sábados yo ____ (ir) al mercado con mi abuela.','iba','imperfect','“Todos los sábados” signals a habit: imperfect of ir.'],
 ['Anoche yo ____ (dormir) ocho horas.','dormí','preterite','Completed action with a stated amount of time: preterite.'],
 ['Ayer los chicos ____ (decir) la verdad.','dijeron','preterite','Decir has the stem dij-, and a j stem takes -eron, not -ieron.'],
 ['Mientras tú ____ (estudiar), yo preparaba la cena.','estudiabas','imperfect','“Mientras” introduces an ongoing action: imperfect.'],
 ['Ayer tú ____ (leer) un libro entero.','leíste','preterite','Leer is a spelling-change verb. The tú form is leíste, with an accent on the í.'],
 ['Cuando éramos jóvenes, nosotros ____ (vivir) en Chile.','vivíamos','imperfect','Describing past circumstances with no clear end: imperfect.'],
 ['Anoche ella ____ (poner) la mesa antes de la cena.','puso','preterite','Completed action. Poner uses the irregular stem pus-, and the él/ella ending is -o.'],
 ['El sábado pasado yo ____ (buscar) mis llaves por una hora.','busqué','preterite','Completed action. The yo form of -car verbs changes c→qu.'],
 ['Ellos siempre ____ (comer) en casa de sus abuelos.','comían','imperfect','“Siempre” signals a repeated past habit.'],
 ['Hace dos días Luis ____ (tener) que estudiar.','tuvo','preterite','“Hace dos días” frames a completed event. Tener uses the stem tuv-.'],
 ['Ayer yo ____ (venir) a la escuela en autobús.','vine','preterite','Completed action. Venir uses the stem vin- and the yo ending -e, with no accent.'],
 ['Cuando éramos niños, nosotros ____ (ir) a la playa cada domingo.','íbamos','imperfect','“Cada domingo” is a habit. Ir is irregular in the imperfect, and nosotros needs the accent on í.'],
 ['Esta mañana yo ____ (dar) un regalo a mi madre.','di','preterite','Completed action. Dar takes -er/-ir preterite endings with no accent: di.'],
 ['Mi hermano ____ (dormir) mucho los fines de semana.','duerme','present','Present habit. Dormir is a boot verb (o→ue) in the él/ella form.'],
 ['Yo ____ (hacer) la tarea todas las noches.','hago','present','Present tense. Hacer is a yo-go verb.'],
 ['Nosotros ____ (pedir) pizza todos los viernes.','pedimos','present','Nosotros keeps the original stem in the present: pedimos, not pidimos.'],
 ['Ellos no ____ (poder) venir hoy.','pueden','present','“Hoy” points to now. Poder is a boot verb (o→ue) and ellos is in the boot.'],
 ['Ahora mismo tú ____ (querer) comer algo, ¿verdad?','quieres','present','Present tense. Querer is a boot verb (e→ie) in the tú form.']
].map(function(r,i){return {i:i,s:r[0],alts:[r[1]],t:r[2],why:r[3],key:'s|'+i};});


/* ============ HELPERS ============ */
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const clean=s=>String(s).normalize('NFC').trim().toLowerCase().replace(/\s+/g,' ');
const strip=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'');
function grade(input,answers){
  const a=clean(input);if(!a)return 'empty';
  const ans=answers.map(clean);
  if(ans.includes(a))return 'ok';
  const sa=strip(a);
  return ans.some(x=>strip(x)===sa)?'close':'no';
}
function wpick(arr,wf){
  let tot=0;const w=arr.map(x=>{const v=wf(x);tot+=v;return v;});let r=Math.random()*tot;
  for(let i=0;i<arr.length;i++){r-=w[i];if(r<=0)return arr[i];}
  return arr[arr.length-1];
}
const pct=(a,c)=>a?Math.round(100*c/a):0;
function ago(ts){if(!ts)return 'never';const d=Math.floor((Date.now()-ts)/864e5);return d<=0?'today':d===1?'yesterday':d+' days ago';}
const dueEnd=due=>new Date(due+'T23:59:59').getTime();
function dueText(due){try{return new Date(due+'T00:00:00').toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});}catch(e){return due;}}
const isoDay=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const TENSEWORD={present:'present',presente:'present',preterite:'preterite',preterit:'preterite','pretérito':'preterite',preterito:'preterite',imperfect:'imperfect',imperfecto:'imperfect'};

/* ============ PROGRESS ============ */
const LSK='spanish2.guest.v1';
const blank=()=>({name:'',xp:0,answered:0,correct:0,streak:0,best:0,lastDay:null,areas:{},units:{},hw:{},items:{}});
let P=blank();
let role=null,previewStudent=false,ME=null,SETUP_OPEN=false;
let UNITS=[],ASSIGN=[],CLASSES=[],CUR=null,ROSTER=[];
let guestMode=false,booted=false;
const mode=()=>role==='teacher'?(previewStudent?'student':'teacher'):role==='student'?'student':guestMode?'guest':'home';
const normUnit=u=>({id:String(u.id),title:u.title||'Untitled unit',order:+u.order||0,vocab:u.vocab||[],notes:u.notes||[],verbs:u.verbs||[],sentences:u.sentences||[]});
const normAssign=a=>Object.assign({},a,{id:String(a.id),unitId:String(a.unitId)});

/* --- talking to the server --- */
async function api(method,url,body){
  let r;
  try{
    r=await fetch(url,{method,headers:Object.assign({'X-Requested-With':'spanish2'},body?{'Content-Type':'application/json'}:{}),body:body?JSON.stringify(body):undefined,credentials:'same-origin',keepalive:method==='POST'&&url==='/api/answers'});
  }catch(e){const er=new Error('Could not reach the server. Check your internet connection.');er.offline=true;throw er;}
  let data=null;try{data=await r.json();}catch(e){}
  if(!r.ok){
    const er=new Error((data&&data.error)||'Something went wrong ('+r.status+').');er.status=r.status;
    if(r.status===401&&role&&!/auth\//.test(url)){sessionExpired();}
    throw er;
  }
  return data;
}
function sessionExpired(){
  if(!role)return;
  role=null;ME=null;previewStudent=false;P=blank();
  flash('You were signed out. Please sign in again.');
  location.hash='';show();
}
let flashMsg='';
function flash(m){flashMsg=m;}

/* --- guest progress lives in this browser only --- */
function loadGuest(){try{const raw=localStorage.getItem(LSK);if(raw){const o=JSON.parse(raw);if(o&&typeof o==='object'&&o.items)P=Object.assign(blank(),o);}}catch(e){}}
function bumpStreak(){
  const now=new Date(),t=isoDay(now);
  if(P.lastDay===t)return;
  const y=new Date(now);y.setDate(y.getDate()-1);
  P.streak=(P.lastDay===isoDay(y))?P.streak+1:1;
  P.lastDay=t;if(P.streak>P.best)P.best=P.streak;
}
function pruneItems(){
  const keys=Object.keys(P.items);
  if(keys.length<=400)return;
  keys.sort((a,b)=>{const x=P.items[a],y=P.items[b];return (y.w-y.c)-(x.w-x.c);});
  keys.slice(300).forEach(k=>delete P.items[k]);
}
function saveGuest(){pruneItems();try{localStorage.setItem(LSK,JSON.stringify(P));}catch(e){}}

/* --- answers: shown at once, sent to the server in small batches --- */
let QUEUE=[],qTimer=null,sending=false,syncOk=true;
function queueAnswer(a){QUEUE.push(a);clearTimeout(qTimer);qTimer=setTimeout(flush,2000);if(QUEUE.length>=20)flush();}
async function flush(){
  clearTimeout(qTimer);
  if(sending||!QUEUE.length||role!=='student')return;
  sending=true;const batch=QUEUE.splice(0,100);
  try{await api('POST','/api/answers',{answers:batch});syncOk=true;}
  catch(e){if(e.status!==401&&e.status!==403)QUEUE=batch.concat(QUEUE);syncOk=false;if(!e.status)qTimer=setTimeout(flush,15000);}
  sending=false;setNote();
  if(QUEUE.length&&syncOk)flush();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)flush();});
window.addEventListener('pagehide',()=>{
  if(role==='student'&&QUEUE.length){try{fetch('/api/answers',{method:'POST',keepalive:true,credentials:'same-origin',headers:{'Content-Type':'application/json','X-Requested-With':'spanish2'},body:JSON.stringify({answers:QUEUE.splice(0,100)})});}catch(e){}}
});
function record(area,key,label,ok,unitId){
  P.answered++;if(ok){P.correct++;P.xp+=10;}
  const a=P.areas[area]||(P.areas[area]={a:0,c:0});a.a++;if(ok)a.c++;
  if(unitId){const u=P.units[unitId]||(P.units[unitId]={a:0,c:0});u.a++;if(ok)u.c++;}
  const it=P.items[key]||(P.items[key]={c:0,w:0,l:label});
  if(ok)it.c++;else it.w++;
  bumpStreak();
  if(role==='student')queueAnswer({area,key,label,ok:!!ok,unitId:unitId||null,day:isoDay(new Date())});
  else if(role===null)saveGuest();
  renderChips();
}
function weight(k){
  const it=P.items[k];if(!it)return 1.5;
  const net=it.w-it.c;
  if(net>=1)return 1+2*net;
  if(net<=-3)return 0.5;
  return 1;
}
function renderChips(){
  const m=mode();
  $('#chips').innerHTML=(m==='teacher'||m==='home')?'':
   '<div class="chip"><b>'+P.xp+'</b><span>XP</span></div>'+
   '<div class="chip"><b>'+P.streak+'</b><span>Day streak</span></div>'+
   '<div class="chip"><b>'+(P.answered?pct(P.answered,P.correct)+'%':'–')+'</b><span>Accuracy</span></div>';
}
function setNote(){
  const n=$('#syncnote');if(!n)return;
  const m=mode();let t='';
  if(m==='guest')t='You are practicing without signing in. Progress is saved in this browser only and your teacher cannot see it.';
  else if(m==='teacher')t='Signed in as a teacher. Students appear in Class after they join with your class code.';
  else if(role==='teacher')t='Previewing as a student. Nothing you do here is recorded.';
  else if(m==='student')t=syncOk?'Your progress is saved to your class and visible to your teacher.':'Your latest answers have not reached the server yet. They will be sent when your connection is back.';
  n.textContent=t;
}

/* --- loading class data --- */
async function loadMine(){
  if(role==='student'){
    const [u,a,p]=await Promise.all([api('GET','/api/units'),api('GET','/api/assignments'),api('GET','/api/progress')]);
    UNITS=u.map(normUnit);ASSIGN=a.map(normAssign);
    const keep=QUEUE.length?P:null;
    P=Object.assign(blank(),p);P.hw=p.hw||{};
    if(keep&&keep.answered>P.answered)P.answered=keep.answered;
  }else if(role==='teacher'){
    const [u,c]=await Promise.all([api('GET','/api/units'),api('GET','/api/classes')]);
    UNITS=u.map(normUnit);CLASSES=c;
    if(!CLASSES.some(x=>x.id===CUR))CUR=CLASSES.length?CLASSES[0].id:null;
    await loadClassData();
  }
}
async function loadClassData(){
  if(CUR==null){ASSIGN=[];ROSTER=[];return;}
  const [a,r]=await Promise.all([api('GET','/api/assignments?classId='+CUR),api('GET','/api/classes/'+CUR+'/students')]);
  ASSIGN=a.map(normAssign);ROSTER=r;
}
async function reloadUnits(){UNITS=(await api('GET','/api/units')).map(normUnit);}
async function pollOnce(){
  if(document.hidden||!role)return;
  if(role==='student'&&(HW.a||QUEUE.length))return;
  try{
    if(role==='student'){const [u,a]=await Promise.all([api('GET','/api/units'),api('GET','/api/assignments')]);UNITS=u.map(normUnit);ASSIGN=a.map(normAssign);}
    else if(role==='teacher'){
      if(tab==='units'&&UN.mode==='edit')return;
      await reloadUnits();CLASSES=await api('GET','/api/classes');await loadClassData();
    }
    refresh();
  }catch(e){}
}
setInterval(pollOnce,30000);

async function signedIn(){
  const me=await api('GET','/api/me');
  role=me.role;ME=me.role?me:null;
  if(role){guestMode=false;P=blank();try{await loadMine();}catch(e){}}
}
async function signOut(){
  try{await flush();await api('POST','/api/auth/logout');}catch(e){}
  role=null;ME=null;previewStudent=false;guestMode=false;QUEUE=[];P=blank();UNITS=[];ASSIGN=[];CLASSES=[];ROSTER=[];CUR=null;
  HW.a=null;UN.mode='list';ED.draft=null;
  location.hash='';renderWho();renderChips();setNote();show();
}

/* ============ SOURCES (built-in library or a teacher's unit) ============ */
let SRC='';
const curUnit=()=>SRC?UNITS.find(u=>u.id===SRC)||null:null;
function mkItem(cat,esRaw,en){const alts=String(esRaw).split('/').map(s=>s.trim()).filter(Boolean);return {cat,alts,es:alts.join(' / '),en,key:'v|'+alts[0]};}
function resolveVerb(x){
  if(x&&Array.isArray(x.forms)&&x.forms.length===5)return {tense:x.t,group:'custom',inf:x.inf,en:x.en||'',forms:x.forms};
  return V.find(v=>x&&v.tense===x.t&&v.inf===x.inf)||null;
}
const unitVerbs=u=>(u.verbs||[]).map(resolveVerb).filter(Boolean);
const unitVocab=u=>(u.vocab||[]).map(p=>mkItem('unit',p.es,p.en)).filter(i=>i.alts.length&&i.en);
function unitSents(u){return (u.sentences||[]).map((x,i)=>({i,s:x.s,alts:String(x.a).split('/').map(s=>s.trim()).filter(Boolean),t:x.t||'',why:x.why||'',key:'s|'+u.id+'|'+i})).filter(x=>x.alts.length);}
const poolVerbs=()=>{const u=curUnit();return u?unitVerbs(u):V;};
const poolVocab=()=>{const u=curUnit();return u?unitVocab(u):(VC.cat==='all'?ALLV:VOCAB[VC.cat].items);};
const poolSent=()=>{const u=curUnit();return u?unitSents(u):SENT;};
const noteFor=v=>(GROUPS[v.tense]&&GROUPS[v.tense][v.group]&&GROUPS[v.tense][v.group].note)||'';

/* ============ SHARED UI BITS ============ */
const KEYS=['á','é','í','ó','ú','ñ','ü','¿','¡'];
const keysHtml=()=>'<div class="keys" role="group" aria-label="Spanish characters">'+KEYS.map(k=>'<button type="button" class="key" data-k="'+k+'" aria-label="insert '+k+'">'+k+'</button>').join('')+'</div>';
function bindKeys(root,input){
  root.querySelectorAll('.key').forEach(b=>{
    b.addEventListener('mousedown',e=>e.preventDefault());
    b.addEventListener('click',()=>{
      if(input.disabled)return;
      const s=input.selectionStart==null?input.value.length:input.selectionStart,e2=input.selectionEnd==null?s:input.selectionEnd;
      input.setRangeText(b.dataset.k,s,e2,'end');input.focus();
    });
  });
}
const selHtml=(id,label,opts,val)=>'<label for="'+id+'">'+label+'<select id="'+id+'">'+opts.map(o=>'<option value="'+esc(o[0])+'"'+(o[0]===val?' selected':'')+'>'+esc(o[1])+'</option>').join('')+'</select></label>';
const formsTable=(v,hit)=>'<div class="scroll"><table class="forms"><tbody>'+v.forms.map((f,i)=>'<tr'+(i===hit?' class="hit"':'')+'><th scope="row">'+esc(PRON[i][0])+'</th><td>'+esc(f)+'</td></tr>').join('')+'</tbody></table></div>';
const fbHtml=(kind,title,body)=>'<div class="fb '+kind+'" role="status"><h3>'+title+'</h3>'+body+'</div>';
const emptyHtml=t=>'<div class="empty">'+t+'</div>';
function sentHtml(s){
  let h=esc(s).replace('____','<span class="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>');
  return h.replace(/\(([^)]*)\)/,'<span class="verbhint">$1</span>');
}
function grammarHtml(txt){
  const out=[];let para=[],list=[];
  const flushP=()=>{if(para.length){out.push('<p>'+para.join(' ')+'</p>');para=[];}};
  const flushL=()=>{if(list.length){out.push('<ul>'+list.map(x=>'<li>'+x+'</li>').join('')+'</ul>');list=[];}};
  String(txt||'').split('\n').forEach(raw=>{
    const ln=raw.trim();
    if(!ln){flushP();flushL();return;}
    if(ln.startsWith('# ')){flushP();flushL();out.push('<h4>'+esc(ln.slice(2))+'</h4>');return;}
    if(ln.startsWith('- ')){flushP();list.push(esc(ln.slice(2)));return;}
    flushL();para.push(esc(ln));
  });
  flushP();flushL();
  return out.join('');
}
function verbTables(verbs){
  const by={};verbs.forEach(v=>(by[v.tense]=by[v.tense]||[]).push(v));
  return Object.keys(by).map(t=>'<h4>'+TL[t]+'</h4><div class="scroll"><table class="forms"><thead><tr><th>Verb</th>'+PRON.map(p=>'<th>'+esc(p[0])+'</th>').join('')+'</tr></thead><tbody>'+
    by[t].map(v=>'<tr><th scope="row">'+esc(v.inf)+(v.en?'<br><span class="note" style="font-weight:400">'+esc(v.en)+'</span>':'')+'</th>'+v.forms.map(f=>'<td>'+esc(f)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>').join('');
}

/* ============ CONJUGATIONS ============ */
const C={tense:'present',group:'all',q:null,done:false,s:{a:0,c:0},last:null};
function nextConj(){
  const cands=[];
  poolVerbs().forEach(v=>{
    if((C.tense==='all'||v.tense===C.tense)&&(C.group==='all'||v.group===C.group)){
      for(let i=0;i<5;i++)cands.push({v,i,key:'c|'+v.tense+'|'+v.inf+'|'+v.group+'|'+i});
    }
  });
  if(!cands.length){C.q=null;return;}
  let c;
  for(let n=0;n<5;n++){c=wpick(cands,x=>weight(x.key));if(c.key!==C.last)break;}
  C.q=c;C.last=c.key;C.done=false;
}
function sessUpdate(){
  const s=$('#sess');if(!s)return;
  const S=tab==='conjugate'?C.s:tab==='vocab'?VC.s:SS.s;
  s.textContent='This session: '+S.c+' / '+S.a;
}
function viewConj(){
  const u=curUnit();if(u)C.group='all';
  nextConjIfNeeded();
  const pv=$('#pv');
  const tOpts=[['present','Present'],['preterite','Preterite'],['imperfect','Imperfect'],['all','All tenses mixed']];
  const gOpts=[['all','All types']];
  if(!u&&C.tense!=='all')Object.keys(GROUPS[C.tense]).forEach(g=>gOpts.push([g,GROUPS[C.tense][g].label]));
  const ctl='<div class="controls">'+selHtml('selT','Tense',tOpts,C.tense)+(u?'':selHtml('selG','Verb type',gOpts,C.group))+'<span class="sess" id="sess"></span></div>';
  const bindSel=()=>{
    $('#selT').onchange=e=>{C.tense=e.target.value;C.group='all';C.q=null;viewConj();};
    const g=$('#selG');if(g)g.onchange=e=>{C.group=e.target.value;C.q=null;viewConj();};
  };
  const q=C.q;
  if(!q){pv.innerHTML='<section class="card">'+ctl+emptyHtml(u?'This unit has no verbs for that tense. Pick another tense or source.':'No verbs match.')+'</section>';bindSel();return;}
  pv.innerHTML='<section class="card" aria-label="Conjugation practice">'+ctl+
   '<div><span class="tag">'+TL[q.v.tense]+'</span></div>'+
   '<div class="ask"><div class="inf">'+esc(q.v.inf)+'<small>'+esc(q.v.en)+'</small></div>'+
   '<div class="pron">'+esc(PRON[q.i][0])+'<small>'+esc(PRON[q.i][1])+'</small></div></div>'+
   '<input id="ans" class="answer" type="text" lang="es" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Type the conjugated verb" aria-label="Your answer">'+
   keysHtml()+'<div class="row"><button class="btn" id="go">Check</button></div><div id="fb"></div></section>';
  bindSel();
  const inp=$('#ans');bindKeys(pv,inp);
  $('#go').onclick=()=>{if(C.done){nextConj();viewConj();}else checkConj();};
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#go').click();}});
  sessUpdate();inp.focus();
}
function nextConjIfNeeded(){if(C.done||!C.q||!poolVerbs().some(v=>v===C.q.v||(v.inf===C.q.v.inf&&v.tense===C.q.v.tense)))nextConj();}
function checkConj(){
  const q=C.q,inp=$('#ans'),ans=q.v.forms[q.i],r=grade(inp.value,[ans]);
  if(r==='empty'){inp.focus();return;}
  const ok=r==='ok';C.done=true;C.s.a++;if(ok)C.s.c++;
  record(q.v.tense,q.key,TL[q.v.tense].toLowerCase()+' · '+q.v.inf+' · '+PRON[q.i][0],ok,SRC||null);
  inp.disabled=true;
  const typed=esc(inp.value.trim());
  const body=ok?'<p class="ans-show">'+esc(ans)+'</p>':
    (r==='close'?'<p>Check the accent marks or ñ. This counts as a miss.</p>':'')+'<p>Correct: <span class="ans-show">'+esc(ans)+'</span> &nbsp; You typed: <span class="ans-show">'+typed+'</span></p>';
  const n=noteFor(q.v);
  $('#fb').innerHTML=fbHtml(ok?'ok':r==='close'?'close':'no',ok?'Correcto. +10 XP':r==='close'?'Almost':'Not quite',body+(n?'<p class="note">'+esc(n)+'</p>':'')+formsTable(q.v,q.i));
  $('#go').textContent='Next';$('#go').focus();sessUpdate();
}

/* ============ VOCABULARY ============ */
const VC={cat:'routine',mode:'flash',dir:'es-en',deck:null,pos:0,flipped:false,known:0,q:null,done:false,s:{a:0,c:0}};
function newDeck(){VC.deck=shuffle(poolVocab());VC.pos=0;VC.flipped=false;VC.known=0;}
function viewVocab(){
  const u=curUnit();
  const cOpts=[['all','All categories']].concat(Object.keys(VOCAB).map(k=>[k,VOCAB[k].title]));
  const lab=t=>'<div class="note" style="margin-bottom:3px;text-transform:uppercase;font-size:12px;letter-spacing:.06em">'+t+'</div>';
  const head='<div class="controls">'+(u?'':selHtml('selC','Category',cOpts,VC.cat))+
   '<div>'+lab('Mode')+'<div class="seg" role="group" aria-label="Mode">'+[['flash','Flashcards'],['mc','Multiple choice'],['type','Type it']].map(m=>'<button type="button" data-m="'+m[0]+'" aria-pressed="'+(VC.mode===m[0])+'">'+m[1]+'</button>').join('')+'</div></div>'+
   (VC.mode!=='type'?'<div>'+lab('Direction')+'<div class="seg" role="group" aria-label="Direction">'+[['es-en','Spanish → English'],['en-es','English → Spanish']].map(m=>'<button type="button" data-d="'+m[0]+'" aria-pressed="'+(VC.dir===m[0])+'">'+m[1]+'</button>').join('')+'</div></div>':'')+
   '<span class="sess" id="sess"></span></div>';
  const items=poolVocab();
  $('#pv').innerHTML='<section class="card" aria-label="Vocabulary practice">'+head+(items.length?'<div id="vbody"></div>':emptyHtml('This unit has no vocabulary yet.'))+'</section>';
  const c=$('#selC');if(c)c.onchange=e=>{VC.cat=e.target.value;VC.deck=null;VC.q=null;viewVocab();};
  $('#pv').querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{VC.mode=b.dataset.m;VC.q=null;VC.deck=null;viewVocab();});
  $('#pv').querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{VC.dir=b.dataset.d;VC.q=null;VC.deck=null;viewVocab();});
  if(items.length){if(VC.mode==='flash')paintFlash();else if(VC.mode==='mc')paintMC();else paintType();}
  sessUpdate();
}
function paintFlash(){
  if(!VC.deck||!VC.deck.length)newDeck();
  const b=$('#vbody');
  if(VC.pos>=VC.deck.length){
    b.innerHTML='<div class="fb ok"><h3>Deck complete</h3><p>You knew '+VC.known+' of '+VC.deck.length+' cards on the way through.</p></div><div class="row"><button class="btn" id="again">Shuffle and go again</button></div>';
    $('#again').onclick=()=>{newDeck();paintFlash();};return;
  }
  const it=VC.deck[VC.pos],front=VC.dir==='es-en'?it.es:it.en,back=VC.dir==='es-en'?it.en:it.es;
  b.innerHTML='<div class="note">Card '+(VC.pos+1)+' of '+VC.deck.length+'</div>'+
   '<button type="button" class="flash'+(VC.flipped?' back':'')+'" id="card" aria-live="polite"><div><div class="big">'+esc(VC.flipped?back:front)+'</div><div class="hint">'+(VC.flipped?'Did you know it?':'Tap to reveal')+'</div></div></button>'+
   (VC.flipped?'<div class="row"><button class="btn bad" id="miss">Missed it</button><button class="btn good" id="got">Got it</button></div>':'');
  $('#card').onclick=()=>{if(!VC.flipped){VC.flipped=true;paintFlash();}};
  if(VC.flipped){
    const mk=ok=>()=>{
      VC.s.a++;if(ok){VC.s.c++;VC.known++;}
      record('vocab',it.key,it.es+' — '+it.en,ok,SRC||null);
      if(!ok)VC.deck.push(it);
      VC.pos++;VC.flipped=false;paintFlash();sessUpdate();
    };
    $('#miss').onclick=mk(false);$('#got').onclick=mk(true);
  }
}
function paintMC(){
  const items=poolVocab(),b=$('#vbody');
  if(!VC.q||VC.done){
    let it,n=0;do{it=wpick(items,x=>weight(x.key));n++;}while(VC.q&&items.length>1&&it.key===VC.q.it.key&&n<5);
    const pool=items.length>=4?items:items.concat(ALLV),field=VC.dir==='es-en'?'en':'es';
    const correct=it[field],seen={},opts=[];
    shuffle(pool.filter(x=>x[field]!==correct)).forEach(x=>{if(opts.length<3&&!seen[x[field]]){seen[x[field]]=1;opts.push(x[field]);}});
    VC.q={it,correct,opts:shuffle(opts.concat([correct]))};VC.done=false;
  }
  const q=VC.q,prompt=VC.dir==='es-en'?q.it.es:q.it.en;
  b.innerHTML='<div class="ask"><div class="inf">'+esc(prompt)+'</div></div>'+
   '<div class="opts" role="group" aria-label="Choices">'+q.opts.map((o,i)=>'<button type="button" class="opt" data-i="'+i+'">'+esc(o)+'</button>').join('')+'</div><div id="fb"></div><div class="row"><button class="btn" id="nx" hidden>Next</button></div>';
  b.querySelectorAll('.opt').forEach(btn=>btn.onclick=()=>{
    if(VC.done)return;VC.done=true;
    const pick=q.opts[+btn.dataset.i],ok=pick===q.correct;
    VC.s.a++;if(ok)VC.s.c++;
    record('vocab',q.it.key,q.it.es+' — '+q.it.en,ok,SRC||null);
    b.querySelectorAll('.opt').forEach(o=>{o.disabled=true;if(q.opts[+o.dataset.i]===q.correct)o.classList.add('right');});
    if(!ok)btn.classList.add('wrong');
    $('#fb').innerHTML=fbHtml(ok?'ok':'no',ok?'Correcto. +10 XP':'Not quite','<p class="ans-show">'+esc(q.it.es)+' = '+esc(q.it.en)+'</p>');
    $('#nx').hidden=false;$('#nx').focus();sessUpdate();
  });
  $('#nx').onclick=()=>{VC.q=null;paintMC();};
}
function paintType(){
  const items=poolVocab(),b=$('#vbody');
  if(!VC.q||VC.done){
    let it,n=0;do{it=wpick(items,x=>weight(x.key));n++;}while(VC.q&&items.length>1&&it.key===VC.q.it.key&&n<5);
    VC.q={it};VC.done=false;
  }
  const it2=VC.q.it;
  b.innerHTML='<div class="ask"><div class="inf">'+esc(it2.en)+'<small>Type it in Spanish. Include el / la / los / las for nouns.</small></div></div>'+
   '<input id="ans" class="answer" type="text" lang="es" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Escribe en español" aria-label="Your answer">'+keysHtml()+
   '<div class="row"><button class="btn" id="go">Check</button></div><div id="fb"></div>';
  const inp=$('#ans');bindKeys(b,inp);
  $('#go').onclick=()=>{
    if(VC.done){VC.q=null;paintType();return;}
    const r=grade(inp.value,it2.alts);if(r==='empty'){inp.focus();return;}
    const ok=r==='ok';VC.done=true;VC.s.a++;if(ok)VC.s.c++;
    record('vocab',it2.key,it2.es+' — '+it2.en,ok,SRC||null);inp.disabled=true;
    const body=ok?'<p class="ans-show">'+esc(it2.es)+'</p>':
      (r==='close'?'<p>Check the accent marks or ñ. This counts as a miss.</p>':'')+'<p>Correct: <span class="ans-show">'+esc(it2.es)+'</span> &nbsp; You typed: <span class="ans-show">'+esc(inp.value.trim())+'</span></p>';
    $('#fb').innerHTML=fbHtml(ok?'ok':r==='close'?'close':'no',ok?'Correcto. +10 XP':r==='close'?'Almost':'Not quite',body);
    $('#go').textContent='Next';$('#go').focus();sessUpdate();
  };
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#go').click();}});
  inp.focus();
}

/* ============ SENTENCES ============ */
const SS={filter:'all',q:null,done:false,s:{a:0,c:0},last:null};
function nextSent(){
  const pool=poolSent().filter(x=>SS.filter==='all'||x.t===SS.filter);
  if(!pool.length){SS.q=null;return;}
  let c;for(let n=0;n<5;n++){c=wpick(pool,x=>weight(x.key));if(c.key!==SS.last)break;}
  SS.q=c;SS.last=c.key;SS.done=false;
}
function viewSent(){
  if(SS.done||!SS.q||!poolSent().some(x=>x.key===SS.q.key))nextSent();
  const q=SS.q;
  const ctl='<div class="controls">'+selHtml('selS','Tenses',[['all','Mixed (you choose the tense)'],['preterite','Preterite only'],['imperfect','Imperfect only'],['present','Present only']],SS.filter)+'<span class="sess" id="sess"></span></div>';
  const bindSel=()=>{$('#selS').onchange=e=>{SS.filter=e.target.value;SS.q=null;viewSent();};};
  if(!q){$('#pv').innerHTML='<section class="card">'+ctl+emptyHtml(curUnit()?'This unit has no sentences for that filter.':'No sentences match.')+'</section>';bindSel();return;}
  $('#pv').innerHTML='<section class="card" aria-label="Sentence practice">'+ctl+
   '<p class="note" style="margin:0">Fill the blank with the right form of the verb in parentheses. Decide the tense from the clues in the sentence.</p>'+
   '<div class="sentence">'+sentHtml(q.s)+'</div>'+
   '<input id="ans" class="answer" type="text" lang="es" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Type the missing verb" aria-label="Your answer">'+keysHtml()+
   '<div class="row"><button class="btn" id="go">Check</button></div><div id="fb"></div></section>';
  bindSel();
  const inp=$('#ans');bindKeys($('#pv'),inp);
  $('#go').onclick=()=>{
    if(SS.done){nextSent();viewSent();return;}
    const r=grade(inp.value,q.alts);if(r==='empty'){inp.focus();return;}
    const ok=r==='ok';SS.done=true;SS.s.a++;if(ok)SS.s.c++;
    record('sentences',q.key,q.s.replace('____','___'),ok,SRC||null);inp.disabled=true;
    const body=(ok?'<p class="ans-show">'+esc(q.alts[0])+'</p>':(r==='close'?'<p>Check the accent marks or ñ. This counts as a miss.</p>':'')+'<p>Correct: <span class="ans-show">'+esc(q.alts.join(' / '))+'</span> &nbsp; You typed: <span class="ans-show">'+esc(inp.value.trim())+'</span></p>')+
      (q.t?'<p><span class="tag">'+TL[q.t]+'</span></p>':'')+(q.why?'<p class="note">'+esc(q.why)+'</p>':'');
    $('#fb').innerHTML=fbHtml(ok?'ok':r==='close'?'close':'no',ok?'Correcto. +10 XP':r==='close'?'Almost':'Not quite',body);
    $('#go').textContent='Next';$('#go').focus();sessUpdate();
  };
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#go').click();}});
  sessUpdate();inp.focus();
}

/* ============ REFERENCE ============ */
const R={tense:'present',group:'all',q:''};
function viewRef(){
  const u=curUnit();if(u)R.group='all';
  const gOpts=[['all','All types']];
  if(!u)Object.keys(GROUPS[R.tense]).forEach(g=>gOpts.push([g,GROUPS[R.tense][g].label]));
  $('#pv').innerHTML='<section class="card" aria-label="Conjugation reference"><div class="controls">'+
   selHtml('rT','Tense',[['present','Present'],['preterite','Preterite'],['imperfect','Imperfect']],R.tense)+(u?'':selHtml('rG','Verb type',gOpts,R.group))+
   '<label for="rQ">Find a verb<input id="rQ" class="search" type="search" placeholder="e.g. hacer" value="'+esc(R.q)+'" autocomplete="off"></label></div>'+
   '<div id="rBody"></div></section>';
  $('#rT').onchange=e=>{R.tense=e.target.value;R.group='all';viewRef();};
  const g=$('#rG');if(g)g.onchange=e=>{R.group=e.target.value;paintRef();};
  $('#rQ').oninput=e=>{R.q=e.target.value;paintRef();};
  paintRef();
}
function paintRef(){
  const q=clean(R.q),sq=strip(q);
  const list=poolVerbs().filter(v=>v.tense===R.tense&&(R.group==='all'||v.group===R.group)&&(!q||strip(v.inf).includes(sq)||v.en.toLowerCase().includes(q)));
  const note=(!curUnit()&&R.group!=='all')?'<p class="note" style="margin:0 0 10px">'+esc(GROUPS[R.tense][R.group].note)+'</p>':'';
  $('#rBody').innerHTML=note+(list.length?'<div class="scroll"><table class="forms"><thead><tr><th>Verb</th>'+PRON.map(p=>'<th>'+esc(p[0])+'</th>').join('')+'</tr></thead><tbody>'+
   list.map(v=>'<tr><th scope="row">'+esc(v.inf)+'<br><span class="note" style="font-weight:400">'+esc(v.en)+'</span></th>'+v.forms.map(f=>'<td>'+esc(f)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':
   emptyHtml('No verbs match. Try a shorter search or another verb type.'));
}

/* ============ PRACTICE FRAME ============ */
const PRACTICE=['conjugate','vocab','sentences','reference'];
function viewPractice(){
  const subs=[['conjugate','Conjugations'],['vocab','Vocabulary'],['sentences','Sentences'],['reference','Reference']];
  if(SRC&&!curUnit())SRC='';
  const srcOpts=[['','Built-in library']].concat(UNITS.map(u=>[u.id,u.title]));
  $('#view').innerHTML='<div class="subbar"><div class="seg" role="group" aria-label="Practice type">'+subs.map(s=>'<button type="button" data-s="'+s[0]+'" aria-pressed="'+(tab===s[0])+'">'+s[1]+'</button>').join('')+'</div>'+
    (UNITS.length?selHtml('selSrc','Practice from',srcOpts,SRC):'')+'</div><div id="pv"></div>';
  $('#view').querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{location.hash=b.dataset.s;});
  const s=$('#selSrc');
  if(s)s.onchange=e=>{SRC=e.target.value;C.q=null;VC.deck=null;VC.q=null;SS.q=null;viewPractice();};
  if(tab==='conjugate')viewConj();else if(tab==='vocab')viewVocab();else if(tab==='sentences')viewSent();else viewRef();
}

/* ============ PROGRESS BLOCKS (student's own view and teacher's detail view) ============ */
const AREAS=[['present','Present'],['preterite','Preterite'],['imperfect','Imperfect'],['vocab','Vocabulary'],['sentences','Sentences']];
const barRow=(label,x)=>'<div class="area"><span>'+esc(label)+'</span><div class="bar" role="img" aria-label="'+esc(label)+' accuracy '+pct(x.a,x.c)+' percent"><i style="width:'+pct(x.a,x.c)+'%"></i></div><em>'+(x.a?pct(x.a,x.c)+'% of '+x.a:'no data')+'</em></div>';
function hwStatus(a,h){
  if(h&&h.attempts>0){
    const late=h.at&&a.due&&h.at>dueEnd(a.due);
    return {cls:late?'late':'ok',text:(late?'Done late':'Done')+' · best '+h.best+'/'+h.bestN};
  }
  if(a.due&&Date.now()>dueEnd(a.due))return {cls:'no',text:'Overdue'};
  return {cls:'idle',text:'Not started'};
}
function progressBlocks(r,forTeacher){
  r=r||blank();
  const weak=Object.keys(r.items||{}).map(k=>{const it=r.items[k];return {l:it.l,n:it.w-it.c,w:it.w};}).filter(x=>x.w>0&&x.n>0).sort((a,b)=>b.n-a.n).slice(0,8);
  const unitIds=Object.keys(r.units||{});
  const hwRows=ASSIGN.map(a=>{const h=(r.hw||{})[a.id],st=hwStatus(a,h);
    return '<tr><th scope="row">'+esc(a.title)+'<br><span class="note" style="font-weight:400">Due '+esc(dueText(a.due))+'</span></th><td><span class="pill '+st.cls+'">'+esc(st.text)+'</span></td><td>'+(h?h.attempts||0:0)+'</td><td class="wrapcell">'+(forTeacher&&h&&h.missed&&h.missed.length?esc(h.missed.join('; ')):'')+'</td></tr>';}).join('');
  return '<div class="grid"><div class="stat"><b>'+(r.answered||0)+'</b><span>Answered</span></div><div class="stat"><b>'+(r.correct||0)+'</b><span>Correct</span></div>'+
   '<div class="stat"><b>'+(r.answered?pct(r.answered,r.correct)+'%':'–')+'</b><span>Accuracy</span></div><div class="stat"><b>'+(r.best||0)+'</b><span>Best streak (days)</span></div></div>'+
   '<h3>By area</h3><div style="display:grid;gap:10px">'+AREAS.map(a=>barRow(a[1],(r.areas||{})[a[0]]||{a:0,c:0})).join('')+'</div>'+
   (unitIds.length?'<h3>By unit</h3><div style="display:grid;gap:10px">'+unitIds.map(id=>{const u=UNITS.find(x=>x.id===id);return barRow(u?u.title:'Removed unit',r.units[id]);}).join('')+'</div>':'')+
   '<h3>Homework</h3>'+(ASSIGN.length?'<div class="scroll"><table class="forms"><thead><tr><th>Assignment</th><th>Status</th><th>Tries</th><th>'+(forTeacher?'Missed on last try':'')+'</th></tr></thead><tbody>'+hwRows+'</tbody></table></div>':emptyHtml('No homework assigned yet.'))+
   '<h3>Needs work</h3>'+(weak.length?'<ul class="weak">'+weak.map(w=>'<li><span>'+esc(w.l)+'</span><b>'+w.w+' missed</b></li>').join('')+'</ul>':emptyHtml('Nothing flagged yet. Items missed more often than answered correctly show up here.'));
}
function viewProg(){
  $('#view').innerHTML='<section class="card" aria-label="Your progress">'+progressBlocks(P,false)+
   (role===null?'<div class="row"><button class="btn ghost" id="reset">'+(resetArmed?'Click again to erase all progress':'Reset my progress')+'</button></div>':'')+'</section>';
  const rs=$('#reset');
  if(rs)rs.onclick=()=>{if(!resetArmed){resetArmed=true;viewProg();return;}resetArmed=false;P=blank();saveGuest();renderChips();viewProg();};
}
let resetArmed=false;

/* ============ HOMEWORK (student) ============ */
const HW={a:null,qs:[],i:0,c:0,done:false,missed:[],fin:false};
function paintHW(){
  const b=$('#hwlist');if(!b)return;
  if(!ASSIGN.length){b.innerHTML=emptyHtml('No homework yet. When your teacher assigns some, it shows up here.');return;}
  b.innerHTML=ASSIGN.map(a=>{
    const h=(P.hw||{})[a.id],st=hwStatus(a,h),u=UNITS.find(x=>x.id===a.unitId),m=a.mix||{};
    const parts=[m.vocab?m.vocab+' vocab':'',m.conj?m.conj+' conjugation':'',m.sent?m.sent+' sentence':''].filter(Boolean).join(' · ');
    return '<article class="ucard"><div class="between"><h3>'+esc(a.title)+'</h3><span class="pill '+st.cls+'">'+esc(st.text)+'</span></div>'+
     '<div class="note">'+(u?esc(u.title):'Unit removed')+' · Due '+esc(dueText(a.due))+' · '+esc(parts||'no questions')+'</div>'+
     (a.note?'<p style="margin:0">'+esc(a.note)+'</p>':'')+
     '<div class="row"><button class="btn" data-hw="'+esc(a.id)+'"'+(u?'':' disabled')+'>'+(h&&h.attempts?'Try again':'Start')+'</button></div></article>';
  }).join('');
  b.querySelectorAll('[data-hw]').forEach(btn=>btn.onclick=()=>startHW(ASSIGN.find(a=>a.id===btn.dataset.hw)));
}
function viewHW(){
  $('#view').innerHTML='<section class="card" aria-label="Homework"><div class="between"><h2>Homework</h2></div>'+
   
   '<div id="hwlist" style="display:grid;gap:12px"></div></section>';
  paintHW();
}
function buildHW(a){
  const u=UNITS.find(x=>x.id===a.unitId);if(!u)return [];
  const m=a.mix||{},qs=[];
  shuffle(unitVocab(u)).slice(0,m.vocab||0).forEach(it=>qs.push({t:'vocab',it,key:it.key,area:'vocab'}));
  const combos=[];unitVerbs(u).forEach(v=>{for(let i=0;i<5;i++)combos.push({v,i});});
  shuffle(combos).slice(0,m.conj||0).forEach(c=>qs.push({t:'conj',v:c.v,i:c.i,key:'c|'+c.v.tense+'|'+c.v.inf+'|'+c.v.group+'|'+c.i,area:c.v.tense}));
  shuffle(unitSents(u)).slice(0,m.sent||0).forEach(s=>qs.push({t:'sent',s,key:s.key,area:'sentences'}));
  return qs;
}
function startHW(a){
  if(!a)return;
  Object.assign(HW,{a,qs:buildHW(a),i:0,c:0,done:false,missed:[],fin:false});
  if(!HW.qs.length){HW.a=null;const b=$('#hwlist');if(b)b.insertAdjacentHTML('afterbegin',emptyHtml('This assignment has no questions available right now. Ask your teacher.'));return;}
  paintHWQ();
}
function hwLabel(q){return q.t==='vocab'?q.it.es+' — '+q.it.en:q.t==='conj'?TL[q.v.tense].toLowerCase()+' · '+q.v.inf+' · '+PRON[q.i][0]:q.s.s.replace('____','___');}
function hwAnswers(q){return q.t==='vocab'?q.it.alts:q.t==='conj'?[q.v.forms[q.i]]:q.s.alts;}
function paintHWQ(){
  const a=HW.a;
  if(HW.i>=HW.qs.length)return finishHW();
  const q=HW.qs[HW.i],n=HW.qs.length;
  let ask;
  if(q.t==='vocab')ask='<div class="ask"><div class="inf">'+esc(q.it.en)+'<small>Type it in Spanish. Include el / la / los / las for nouns.</small></div></div>';
  else if(q.t==='conj')ask='<div><span class="tag">'+TL[q.v.tense]+'</span></div><div class="ask"><div class="inf">'+esc(q.v.inf)+'<small>'+esc(q.v.en)+'</small></div><div class="pron">'+esc(PRON[q.i][0])+'<small>'+esc(PRON[q.i][1])+'</small></div></div>';
  else ask='<p class="note" style="margin:0">Fill the blank with the right form of the verb in parentheses.</p><div class="sentence">'+sentHtml(q.s.s)+'</div>';
  $('#view').innerHTML='<section class="card" id="hwbox" aria-label="Homework question"><div class="between"><h2>'+esc(a.title)+'</h2><button class="btn ghost" id="quit">'+(HW.quit?'Click again to quit':'Quit')+'</button></div>'+
   '<div class="note">Question '+(HW.i+1)+' of '+n+'</div><div class="bar" role="img" aria-label="Progress"><i style="width:'+Math.round(100*HW.i/n)+'%"></i></div>'+
   ask+'<input id="ans" class="answer" type="text" lang="es" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Type your answer" aria-label="Your answer">'+keysHtml()+
   '<div class="row"><button class="btn" id="go">Check</button></div><div id="fb"></div></section>';
  const inp=$('#ans');bindKeys($('#hwbox'),inp);
  $('#quit').onclick=()=>{if(!HW.quit){HW.quit=true;$('#quit').textContent='Click again to quit (this try will not count)';return;}HW.quit=false;HW.a=null;show();};
  $('#go').onclick=()=>{
    if(HW.done){HW.i++;HW.done=false;paintHWQ();return;}
    const r=grade(inp.value,hwAnswers(q));if(r==='empty'){inp.focus();return;}
    const ok=r==='ok';HW.done=true;if(ok)HW.c++;else HW.missed.push((q.t==='vocab'?q.it.en:hwLabel(q))+' → '+hwAnswers(q)[0]);
    record(q.area,q.key,hwLabel(q),ok,a.unitId);inp.disabled=true;
    const body=ok?'<p class="ans-show">'+esc(hwAnswers(q)[0])+'</p>':(r==='close'?'<p>Check the accent marks or ñ. This counts as a miss.</p>':'')+'<p>Correct: <span class="ans-show">'+esc(hwAnswers(q).join(' / '))+'</span> &nbsp; You typed: <span class="ans-show">'+esc(inp.value.trim())+'</span></p>'+(q.t==='sent'&&q.s.why?'<p class="note">'+esc(q.s.why)+'</p>':'');
    $('#fb').innerHTML=fbHtml(ok?'ok':r==='close'?'close':'no',ok?'Correcto':r==='close'?'Almost':'Not quite',body);
    $('#go').textContent=HW.i+1>=n?'Finish':'Next';$('#go').focus();
  };
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#go').click();}});
  inp.focus();
}
let ATT_MSG='';
async function sendAttempt(a,c,n,missed,tries){
  if(role!=='student')return;
  ATT_MSG='Sending your score to your teacher…';paintAtt();
  try{
    await flush();
    const p=await api('POST','/api/attempts',{assignmentId:+a.id,correct:c,total:n,missed});
    P.hw=p.hw||P.hw;ATT_MSG='Score sent to your teacher.';
  }catch(e){ATT_MSG='Your score was not sent: '+e.message;ATT_RETRY=()=>sendAttempt(a,c,n,missed);}
  paintAtt();
}
let ATT_RETRY=null;
function paintAtt(){
  const el=$('#attmsg');if(!el)return;
  el.innerHTML=esc(ATT_MSG)+(ATT_RETRY&&/not sent/.test(ATT_MSG)?' <button class="btn ghost small" id="attretry" type="button">Try again</button>':'');
  const r=$('#attretry');if(r)r.onclick=()=>{const f=ATT_RETRY;ATT_RETRY=null;f();};
}
function finishHW(){
  const a=HW.a,n=HW.qs.length;
  const h=P.hw[a.id]||(P.hw[a.id]={attempts:0,best:-1,bestN:n});
  h.attempts++;if(!h.at)h.at=Date.now();
  h.lastC=HW.c;h.lastN=n;h.missed=HW.missed.slice(0,10).map(s=>s.slice(0,120));
  if(h.best<0||HW.c/n>h.best/(h.bestN||n)){h.best=HW.c;h.bestN=n;}
  HW.fin=true;sendAttempt(a,HW.c,n,HW.missed.slice(0,10).map(s=>s.slice(0,120)));
  $('#view').innerHTML='<section class="card"><h2>'+esc(a.title)+'</h2><div class="fb '+(HW.c===n?'ok':'close')+'"><h3>You got '+HW.c+' of '+n+'</h3>'+
   (HW.missed.length?'<p class="note">Missed:</p><ul class="weak">'+HW.missed.map(m=>'<li><span>'+esc(m)+'</span></li>').join('')+'</ul>':'<p>Perfect score.</p>')+'</div>'+
   '<div class="note" id="attmsg" role="status"></div><div class="row"><button class="btn" id="again">Try again</button><button class="btn ghost" id="back">Back to homework</button></div></section>';paintAtt();
  $('#again').onclick=()=>startHW(a);
  $('#back').onclick=()=>{HW.a=null;show();};
}

/* ============ UNITS (students read, teachers edit) ============ */
const UN={mode:'list',sel:null};
function viewUnits(){
  if(UN.mode==='edit'&&mode()==='teacher')return viewEditor();
  UN.mode=UN.mode==='detail'?'detail':'list';
  $('#view').innerHTML='<div id="ubody" style="display:grid;gap:16px"></div>';
  paintUnits();
}
function paintUnits(){
  const b=$('#ubody');if(!b)return;
  const teacher=mode()==='teacher';
  if(UN.mode==='detail'){
    const u=UNITS.find(x=>x.id===UN.sel);
    if(!u){UN.mode='list';return paintUnits();}
    b.innerHTML='<section class="card"><div class="between"><h2>'+esc(u.title)+'</h2><div class="row"><button class="btn ghost" id="ub">All units</button>'+(teacher?'<button class="btn ghost" id="ue">Edit</button>':'')+'</div></div>'+
     '<div class="row"><button class="btn" data-go="vocab">Practice vocabulary</button><button class="btn" data-go="conjugate">Practice conjugations</button><button class="btn" data-go="sentences">Practice sentences</button></div>'+unitBody(u)+'</section>';
    $('#ub').onclick=()=>{UN.mode='list';paintUnits();};
    const ue=$('#ue');if(ue)ue.onclick=()=>openEditor(u.id);
    b.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>{SRC=u.id;C.q=null;VC.deck=null;VC.q=null;SS.q=null;location.hash=x.dataset.go;});
    return;
  }
  const list=UNITS.length?UNITS.map(u=>'<article class="ucard"><div class="between"><h3>'+esc(u.title)+'</h3><div class="row"><button class="btn ghost" data-open="'+esc(u.id)+'">Open</button>'+(teacher?'<button class="btn" data-edit="'+esc(u.id)+'">Edit</button>':'')+'</div></div>'+
    '<div class="note">'+unitVocab(u).length+' vocab · '+unitVerbs(u).length+' verbs · '+unitSents(u).length+' sentences'+(u.notes.length?' · '+u.notes.length+' note'+(u.notes.length===1?'':'s'):'')+'</div></article>').join(''):
    emptyHtml(teacher?'No units yet. Create your first unit to add vocabulary, grammar notes and verbs for your students.':'Your teacher has not added any units yet.');
  b.innerHTML='<section class="card"><div class="between"><h2>Units</h2>'+(teacher?'<div class="row"><button class="btn ghost" id="impu" type="button">Import unit file</button><button class="btn" id="newu">New unit</button></div><input type="file" id="impf" accept=".json,application/json" hidden>':'')+'</div><div class="note" id="impmsg" role="status"></div><div style="display:grid;gap:12px">'+list+'</div></section>';
  b.querySelectorAll('[data-open]').forEach(x=>x.onclick=()=>{UN.mode='detail';UN.sel=x.dataset.open;paintUnits();});
  b.querySelectorAll('[data-edit]').forEach(x=>x.onclick=()=>openEditor(x.dataset.edit));
  const nu=$('#newu');if(nu)nu.onclick=()=>openEditor(null);
  const ip=$('#impu');
  if(ip){
    ip.onclick=()=>$('#impf').click();
    $('#impf').onchange=async e=>{
      const f=e.target.files[0],m=$('#impmsg');if(!f)return;
      try{
        const d=JSON.parse(await f.text());
        if(!d||typeof d!=='object'||Array.isArray(d)||!d.title)throw new Error('That file is not a unit file.');
        m.textContent='Importing…';
        await api('POST','/api/units',d);await reloadUnits();paintUnits();
        const m2=$('#impmsg');m2.textContent='Imported “'+d.title+'”. Open it to check, then assign it.';m2.style.color='var(--good)';
      }catch(er){m.textContent=er instanceof SyntaxError?'That file is not valid JSON.':er.message;m.style.color='var(--bad)';}
    };
  }
}
/* ============ TEACHER HELPERS ============ */
function regularForms(tense,inf,reflexive){
  inf=String(inf||'').trim().toLowerCase();
  const refl=!!reflexive&&inf.endsWith('se');
  const base=refl?inf.slice(0,-2):inf;
  const end=base.slice(-2),stem=base.slice(0,-2);
  if(!['ar','er','ir'].includes(end)||!stem)return null;
  let f;
  if(tense==='present'){
    const e={ar:['o','as','a','amos','an'],er:['o','es','e','emos','en'],ir:['o','es','e','imos','en']}[end];
    f=e.map(x=>stem+x);
  }else if(tense==='preterite'){
    f=(end==='ar'?P_AR:P_ER).map(x=>stem+x);
    if(end==='ar'){
      if(stem.endsWith('c'))f[0]=stem.slice(0,-1)+'qué';
      else if(stem.endsWith('g'))f[0]=stem+'ué';
      else if(stem.endsWith('z'))f[0]=stem.slice(0,-1)+'cé';
    }
  }else f=(end==='ar'?I_AR:I_ER).map(x=>stem+x);
  return refl?f.map((x,i)=>['me ','te ','se ','nos ','se '][i]+x):f;
}
function bulkVocab(txt){
  const out=[],bad=[];
  String(txt).split('\n').forEach((ln,i)=>{
    ln=ln.trim();if(!ln)return;
    let p=null;
    if(ln.includes('\t'))p=ln.split('\t');
    else if(ln.includes('='))p=ln.split('=');
    else if(/\s[-–—]\s/.test(ln))p=ln.split(/\s[-–—]\s/);
    else if(ln.includes(','))p=[ln.slice(0,ln.indexOf(',')),ln.slice(ln.indexOf(',')+1)];
    const es=p&&p[0].trim(),en=p&&p.slice(1).join(' ').trim();
    if(!es||!en){bad.push(i+1);return;}
    out.push({es,en});
  });
  return {out,bad};
}

/* ============ UNIT BODY (shared by students and the editor preview) ============ */
function unitBody(u){
  const verbs=unitVerbs(u),vocab=unitVocab(u),sents=unitSents(u),notes=u.notes||[];
  return (notes.length?'<h3>Grammar notes</h3>'+notes.map(n=>'<h4>'+esc(n.h||'Note')+'</h4><div class="grammar">'+grammarHtml(n.b)+'</div>').join(''):'')+
   '<h3>Vocabulary ('+vocab.length+')</h3>'+(vocab.length?'<div class="scroll"><table class="forms"><thead><tr><th>Español</th><th>English</th></tr></thead><tbody>'+vocab.map(i=>'<tr><td>'+esc(i.es)+'</td><td>'+esc(i.en)+'</td></tr>').join('')+'</tbody></table></div>':emptyHtml('No vocabulary in this unit yet.'))+
   '<h3>Verbs ('+verbs.length+')</h3>'+(verbs.length?verbTables(verbs):emptyHtml('No verbs in this unit yet.'))+
   (sents.length?'<h3>Sentences ('+sents.length+')</h3><ul class="weak">'+sents.map(s=>'<li><span>'+sentHtml(s.s)+'</span></li>').join('')+'</ul>':'');
}

/* ============ UNIT EDITOR ============ */
const ED={id:null,armed:false,draft:null,sec:'vocab',dirty:false,pt:'present',pg:'all',backArmed:false,cv:null,open:{}};
const SECS=[['vocab','Vocabulary'],['notes','Grammar notes'],['verbs','Verbs'],['sents','Sentences'],['preview','Preview']];
const TENSE_OPTS=[['present','Present'],['preterite','Preterite'],['imperfect','Imperfect']];
const NOTE_TPL=[{h:'Reflexive verbs',b:'A reflexive verb shows that the subject does the action to itself. The infinitive ends in -se.\n- yo → me\n- tú → te\n- él / ella / Ud. → se\n- nosotros → nos\n- ellos / ellas / Uds. → se\nPut the pronoun before the conjugated verb: Yo me levanto.'}];
Object.keys(GROUPS).forEach(t=>Object.keys(GROUPS[t]).forEach(g=>NOTE_TPL.push({h:TL[t]+': '+GROUPS[t][g].label,b:GROUPS[t][g].note})));
const sentOut=x=>({s:x.hint.trim()?x.s.replace('____','____ ('+x.hint.trim()+')'):x.s,a:x.a.trim(),t:x.t||'',why:x.why.trim()});
function openEditor(id){Object.assign(ED,{id:id,draft:null,sec:'vocab',dirty:false,armed:false,backArmed:false,cv:null,pt:'present',pg:'all',open:{}});UN.mode='edit';viewEditor();}
function draftFromUnit(u){
  return {
    title:u?u.title:'',
    vocab:(u?u.vocab:[]).map(x=>({es:x.es,en:x.en})),
    notes:(u?u.notes:[]).map(x=>({h:x.h||'',b:x.b||''})),
    verbs:(u?u.verbs:[]).map(v=>v.forms?{t:v.t,inf:v.inf,en:v.en||'',forms:v.forms.slice()}:{t:v.t,inf:v.inf}),
    sents:(u?u.sentences:[]).map(x=>{const m=String(x.s).match(/____ \(([^)]*)\)/);return {s:m?String(x.s).replace(m[0],'____'):String(x.s),hint:m?m[1]:'',a:String(x.a||''),t:x.t||'',why:x.why||''};})
  };
}
function draftToUnit(d){
  return {id:ED.id||'draft',title:d.title||'Untitled unit',vocab:d.vocab.filter(v=>v.es.trim()&&v.en.trim()),notes:d.notes.filter(n=>n.h.trim()||n.b.trim()),verbs:d.verbs,
    sentences:d.sents.filter(x=>x.s.includes('____')&&x.a.trim()).map(sentOut)};
}
function setDirty(){
  ED.dirty=true;ED.backArmed=false;
  const s=$('#edState');if(s){s.textContent='Unsaved changes';s.className='pill late';}
  const b=$('#eback');if(b)b.textContent='Back to units';
  updateCounts();
}
function updateCounts(){
  const d=ED.draft;if(!d)return;
  const c={vocab:d.vocab.filter(v=>v.es.trim()&&v.en.trim()).length,notes:d.notes.length,verbs:d.verbs.length,sents:d.sents.filter(x=>x.s.trim()||x.a.trim()).length};
  document.querySelectorAll('[data-sec]').forEach(b=>{const i=b.querySelector('i');if(i&&c[b.dataset.sec]!==undefined)i.textContent=c[b.dataset.sec];});
}
function viewEditor(){
  const u=ED.id?UNITS.find(x=>x.id===ED.id):null;
  if(!ED.draft)ED.draft=draftFromUnit(u);
  const d=ED.draft;
  $('#view').innerHTML='<section class="card editor" aria-label="Unit editor"><div class="between"><h2>'+(ED.id?'Edit unit':'New unit')+'</h2><button class="btn ghost" id="eback" type="button">Back to units</button></div>'+
   '<div class="field"><label for="edT">Unit title</label><input id="edT" class="text" type="text" maxlength="80" placeholder="e.g. Unidad 3: La comida" value="'+esc(d.title)+'"></div>'+
   '<div class="seg" role="group" aria-label="Unit sections">'+SECS.map(s=>'<button type="button" data-sec="'+s[0]+'" aria-pressed="'+(ED.sec===s[0])+'">'+s[1]+(s[0]==='preview'?'':' <i class="cnt">0</i>')+'</button>').join('')+'</div>'+
   '<div id="edBody"></div>'+
   '<div class="savebar"><span class="pill '+(ED.dirty?'late':'ok')+'" id="edState">'+(ED.dirty?'Unsaved changes':(ED.id?'All changes saved':'Not saved yet'))+'</span><div class="row"><button class="btn" id="esave" type="button">Save unit</button>'+(ED.id?'<button class="btn ghost" id="edel" type="button">Delete unit</button>':'')+'</div></div><div id="emsg" class="note" role="status"></div></section>';
  $('#edT').addEventListener('input',e=>{d.title=e.target.value;setDirty();});
  $('#view').querySelectorAll('[data-sec]').forEach(b=>b.onclick=()=>{ED.sec=b.dataset.sec;paintSec();});
  $('#eback').onclick=()=>{
    if(ED.dirty&&!ED.backArmed){ED.backArmed=true;$('#eback').textContent='Discard unsaved changes?';return;}
    ED.draft=null;ED.dirty=false;UN.mode='list';viewUnits();
  };
  $('#esave').onclick=saveUnit;
  const del=$('#edel');
  if(del)del.onclick=()=>{
    if(!ED.armed){ED.armed=true;del.textContent='Click again to delete this unit';return;}
    api('DELETE','/api/units/'+ED.id).then(()=>reloadUnits()).then(()=>{ED.draft=null;ED.dirty=false;UN.mode='list';viewUnits();},e=>{$('#emsg').textContent=e.message||'Could not delete.';});
  };
  paintSec();
}
function paintSec(){
  const b=$('#edBody');if(!b)return;
  document.querySelectorAll('[data-sec]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.sec===ED.sec)));
  ({vocab:secVocab,notes:secNotes,verbs:secVerbs,sents:secSents,preview:secPreview})[ED.sec](b);
  updateCounts();
}
function saveUnit(){
  const d=ED.draft,m=$('#emsg');
  const fail=t=>{m.textContent=t;m.style.color='var(--bad)';};
  d.title=d.title.trim();
  if(!d.title)return fail('Give the unit a title.');
  if(d.vocab.some(v=>(v.es.trim()&&!v.en.trim())||(!v.es.trim()&&v.en.trim())))return fail('A vocabulary row is missing its Spanish or its English. Fill it in or remove it.');
  const bad=d.sents.findIndex(x=>(x.s.trim()||x.a.trim())&&(!x.s.includes('____')||!x.a.trim()));
  if(bad>-1)return fail('Sentence '+(bad+1)+' needs ____ where the verb goes and a correct answer.');
  const out={title:d.title,
    vocab:d.vocab.filter(v=>v.es.trim()&&v.en.trim()).map(v=>({es:v.es.trim(),en:v.en.trim()})),
    notes:d.notes.filter(n=>n.h.trim()||n.b.trim()).map(n=>({h:n.h.trim(),b:n.b})),
    verbs:d.verbs,sentences:d.sents.filter(x=>x.s.trim()&&x.a.trim()).map(sentOut)};
  m.textContent='Saving…';m.style.color='var(--muted)';
  const req=ED.id?api('PUT','/api/units/'+ED.id,out):api('POST','/api/units',out);
  req.then(r=>{ED.id=String(r.id);return reloadUnits();}).then(()=>{
    ED.dirty=false;
    const s=$('#edState');if(s){s.textContent='All changes saved';s.className='pill ok';}
    const h=$('#view h2');if(h)h.textContent='Edit unit';
    m.textContent='Saved. Students see the new version right away.';m.style.color='var(--good)';
  },e=>fail('Could not save: '+e.message));
}

/* --- vocabulary --- */
const vocabRowHtml=(v,i)=>'<div class="vrow" data-i="'+i+'"><input class="text vs" type="text" lang="es" placeholder="Español" aria-label="Spanish word '+(i+1)+'" value="'+esc(v.es)+'"><input class="text ve" type="text" placeholder="English" aria-label="English meaning '+(i+1)+'" value="'+esc(v.en)+'"><button type="button" class="x" data-rm="'+i+'" aria-label="Remove word '+(i+1)+'">×</button></div>';
function secVocab(b){
  const d=ED.draft;
  if(!d.vocab.length)d.vocab.push({es:'',en:''});
  b.innerHTML='<p class="note">Type each word and its meaning. Press Enter in the English box to start the next word. Write the article for nouns (el, la). If two spellings are both correct, put / between them.</p>'+
   '<div class="vhead"><span>Español</span><span>English</span></div><div id="vrows" class="vrows">'+d.vocab.map(vocabRowHtml).join('')+'</div>'+
   '<div class="row"><button class="btn ghost" id="vadd" type="button">Add a word</button></div>'+
   '<details class="more"><summary>Paste a whole list</summary><p class="note">One word per line. Separate the Spanish and the English with a tab (copy two columns from a spreadsheet), =, a dash or a comma.</p><textarea id="vpaste" class="edit" rows="6" placeholder="el camarero = waiter&#10;la cuenta = the check"></textarea><div class="row"><button class="btn ghost" id="vpadd" type="button">Add pasted words</button></div><div class="note" id="vpmsg" role="status"></div></details>'+
   '<details class="more"><summary>Add a built-in set</summary><div class="controls">'+selHtml('vset','Set',Object.keys(VOCAB).map(k=>[k,VOCAB[k].title+' ('+VOCAB[k].items.length+')']),'food')+'<button class="btn ghost" id="vsadd" type="button">Add this set</button></div></details>';
  const rows=$('#vrows');
  const redraw=focusLast=>{rows.innerHTML=d.vocab.map(vocabRowHtml).join('');if(focusLast){const l=rows.querySelectorAll('.vs');l[l.length-1].focus();}updateCounts();};
  const dropBlank=()=>{d.vocab=d.vocab.filter(v=>v.es.trim()||v.en.trim());};
  rows.addEventListener('input',e=>{const r=e.target.closest('.vrow');if(!r)return;const i=+r.dataset.i;if(e.target.classList.contains('vs'))d.vocab[i].es=e.target.value;else d.vocab[i].en=e.target.value;setDirty();});
  rows.addEventListener('keydown',e=>{
    if(e.key!=='Enter'||!e.target.classList.contains('ve'))return;
    e.preventDefault();
    const i=+e.target.closest('.vrow').dataset.i;
    if(i===d.vocab.length-1){d.vocab.push({es:'',en:''});redraw(true);}
    else rows.querySelectorAll('.vs')[i+1].focus();
  });
  rows.addEventListener('click',e=>{const x=e.target.closest('[data-rm]');if(!x)return;d.vocab.splice(+x.dataset.rm,1);if(!d.vocab.length)d.vocab.push({es:'',en:''});setDirty();redraw(false);});
  $('#vadd').onclick=()=>{d.vocab.push({es:'',en:''});redraw(true);};
  $('#vpadd').onclick=()=>{
    const r=bulkVocab($('#vpaste').value),m=$('#vpmsg');
    if(r.out.length){dropBlank();d.vocab=d.vocab.concat(r.out);setDirty();redraw(false);$('#vpaste').value='';}
    m.textContent=r.out.length?('Added '+r.out.length+' word'+(r.out.length===1?'':'s')+'.'+(r.bad.length?' Skipped line'+(r.bad.length===1?'':'s')+' '+r.bad.join(', ')+' (no separator found).':'')):'Nothing added. Put a tab, =, a dash or a comma between the Spanish and the English.';
    m.style.color=r.out.length?'var(--muted)':'var(--bad)';
  };
  $('#vsadd').onclick=()=>{
    const k=$('#vset').value,have=new Set(d.vocab.map(v=>clean(v.es)));
    dropBlank();
    VOCAB[k].items.forEach(i=>{if(!have.has(clean(i.es)))d.vocab.push({es:i.es,en:i.en});});
    setDirty();redraw(false);
  };
}

/* --- grammar notes --- */
const noteCardHtml=(n,i,last)=>'<div class="notecard" data-i="'+i+'"><div class="between"><input class="text nh" type="text" placeholder="Heading, e.g. Reflexive verbs" aria-label="Note heading '+(i+1)+'" value="'+esc(n.h)+'"><div class="row"><button type="button" class="x" data-up="'+i+'" aria-label="Move note up"'+(i===0?' disabled':'')+'>↑</button><button type="button" class="x" data-down="'+i+'" aria-label="Move note down"'+(last?' disabled':'')+'>↓</button><button type="button" class="x" data-rm="'+i+'" aria-label="Remove note">×</button></div></div>'+
  '<textarea class="edit nb" rows="5" aria-label="Note text '+(i+1)+'" placeholder="Explain the rule. Start a line with - for a bullet. Leave a blank line between paragraphs.">'+esc(n.b)+'</textarea></div>';
function secNotes(b){
  const d=ED.draft;
  b.innerHTML='<p class="note">Short explanations students read before practicing. Each note has a heading and some text.</p><div id="nlist" class="stack"></div>'+
   '<div class="row"><button class="btn ghost" id="nadd" type="button">Add a note</button></div>'+
   '<details class="more"><summary>Start from a template</summary><div class="controls">'+selHtml('ntpl','Template',NOTE_TPL.map((t,i)=>[String(i),t.h]),'0')+'<button class="btn ghost" id="ntadd" type="button">Add this note</button></div><p class="note">The text is a starting point. Edit it to match what you teach.</p></details>';
  const list=$('#nlist');
  const redraw=()=>{list.innerHTML=d.notes.length?d.notes.map((n,i)=>noteCardHtml(n,i,i===d.notes.length-1)).join(''):emptyHtml('No notes yet. Add one, or start from a template.');updateCounts();};
  redraw();
  list.addEventListener('input',e=>{const c=e.target.closest('.notecard');if(!c)return;const i=+c.dataset.i;if(e.target.classList.contains('nh'))d.notes[i].h=e.target.value;else d.notes[i].b=e.target.value;setDirty();});
  list.addEventListener('click',e=>{
    const t=e.target.closest('button[data-rm],button[data-up],button[data-down]');if(!t||t.disabled)return;
    if(t.dataset.rm!==undefined)d.notes.splice(+t.dataset.rm,1);
    else if(t.dataset.up!==undefined){const i=+t.dataset.up;[d.notes[i-1],d.notes[i]]=[d.notes[i],d.notes[i-1]];}
    else{const i=+t.dataset.down;[d.notes[i+1],d.notes[i]]=[d.notes[i],d.notes[i+1]];}
    setDirty();redraw();
  });
  $('#nadd').onclick=()=>{d.notes.push({h:'',b:''});setDirty();redraw();const hs=list.querySelectorAll('.nh');hs[hs.length-1].focus();};
  $('#ntadd').onclick=()=>{const t=NOTE_TPL[+$('#ntpl').value];d.notes.push({h:t.h,b:t.b});setDirty();redraw();};
}

/* --- verbs --- */
function secVerbs(b){
  const d=ED.draft;
  const have=new Set(d.verbs.map(v=>v.t+'|'+v.inf));
  const list=V.filter(v=>v.tense===ED.pt&&(ED.pg==='all'||v.group===ED.pg));
  const gOpts=[['all','All types']].concat(Object.keys(GROUPS[ED.pt]).map(g=>[g,GROUPS[ED.pt][g].label]));
  const by={};d.verbs.forEach((v,i)=>{(by[v.t]=by[v.t]||[]).push([v,i]);});
  const enOf=v=>{const r=resolveVerb(v);return r?r.en:'';};
  b.innerHTML='<p class="note">These are the verbs students will conjugate in this unit. Pick from the built-in verbs, or add your own.</p>'+
   '<div id="vlist">'+(d.verbs.length?['present','preterite','imperfect'].filter(t=>by[t]).map(t=>'<h4>'+TL[t]+'</h4><ul class="vl">'+by[t].map(p=>{const v=p[0],i=p[1];return '<li><span><b>'+esc(v.inf)+'</b> '+esc(enOf(v))+(v.forms?'<span class="note"> · '+esc(v.forms.join(', '))+'</span>':'')+'</span><span class="row">'+(v.forms?'<button type="button" class="btn ghost small" data-edit="'+i+'">Edit</button>':'')+'<button type="button" class="btn ghost small" data-rm="'+i+'" aria-label="Remove '+esc(v.inf)+'">Remove</button></span></li>';}).join('')+'</ul>').join(''):emptyHtml('No verbs yet. Pick some below.'))+'</div>'+
   '<details class="more" data-k="pick"'+((ED.open.pick!==undefined?ED.open.pick:!d.verbs.length)?' open':'')+'><summary>Pick from the built-in verbs</summary><div class="controls">'+selHtml('pt','Tense',TENSE_OPTS,ED.pt)+selHtml('pg','Verb type',gOpts,ED.pg)+'</div>'+
   '<div class="chklist" id="chk">'+list.map(v=>'<label class="chk"><input type="checkbox" value="'+esc(v.tense+'|'+v.inf)+'"'+(have.has(v.tense+'|'+v.inf)?' checked disabled':'')+'> <span>'+esc(v.inf)+'</span><small>'+esc(v.en)+(have.has(v.tense+'|'+v.inf)?' · added':'')+'</small></label>').join('')+'</div>'+
   '<div class="row"><button class="btn ghost" id="chkall" type="button">Select all</button><button class="btn" id="chkadd" type="button">Add selected</button></div></details>'+
   '<details class="more" id="cvbox" data-k="cv"'+(ED.open.cv?' open':'')+'><summary>Add your own verb</summary><p class="note">For a verb that is not in the built-in list, or when you want reflexive forms such as <i>me despierto</i>. Type the infinitive, press Fill in regular forms, then fix any stem changes or irregular forms.</p>'+
   '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">'+selHtml('cvT','Tense',TENSE_OPTS,'present')+
   '<div class="field"><label for="cvI">Infinitive</label><input id="cvI" class="text" type="text" lang="es" placeholder="e.g. bañarse"></div>'+
   '<div class="field"><label for="cvE">English</label><input id="cvE" class="text" type="text" placeholder="e.g. to take a bath"></div></div>'+
   '<label class="chk"><input type="checkbox" id="cvR"> <span>Reflexive (adds me, te, se, nos, se)</span></label>'+
   '<div class="row"><button class="btn ghost" id="cvFill" type="button">Fill in regular forms</button></div>'+
   '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">'+PRON.map((p,i)=>'<div class="field"><label for="cvF'+i+'">'+esc(p[0])+'</label><input id="cvF'+i+'" class="text" type="text" lang="es" autocomplete="off"></div>').join('')+'</div>'+
   '<div class="row"><button class="btn" id="cvAdd" type="button">Add this verb</button></div><div class="note" id="cvMsg" role="status"></div></details>';
  b.querySelectorAll('details[data-k]').forEach(el=>el.addEventListener('toggle',()=>{ED.open[el.dataset.k]=el.open;}));
  $('#pt').onchange=e=>{ED.pt=e.target.value;ED.pg='all';ED.open.pick=true;secVerbs(b);};
  $('#pg').onchange=e=>{ED.pg=e.target.value;ED.open.pick=true;secVerbs(b);};
  $('#chkall').onclick=()=>b.querySelectorAll('#chk input:not(:disabled)').forEach(c=>{c.checked=true;});
  $('#chkadd').onclick=()=>{
    const picked=[...b.querySelectorAll('#chk input:checked:not(:disabled)')].map(c=>c.value.split('|'));
    if(!picked.length)return;
    picked.forEach(p=>d.verbs.push({t:p[0],inf:p[1]}));
    ED.open.pick=true;setDirty();secVerbs(b);
  };
  $('#vlist').addEventListener('click',e=>{
    const t=e.target.closest('button[data-rm],button[data-edit]');if(!t)return;
    if(t.dataset.rm!==undefined){d.verbs.splice(+t.dataset.rm,1);setDirty();secVerbs(b);return;}
    const i=+t.dataset.edit,v=d.verbs[i];
    ED.cv={t:v.t,inf:v.inf,en:v.en||'',forms:v.forms.slice()};ED.open.cv=true;
    d.verbs.splice(i,1);setDirty();secVerbs(b);
  });
  const cv=ED.cv;
  if(cv){
    $('#cvbox').open=true;$('#cvT').value=cv.t;$('#cvI').value=cv.inf;$('#cvE').value=cv.en;cv.forms.forEach((f,i)=>{$('#cvF'+i).value=f;});
    $('#cvMsg').textContent='Edit the forms, then press Add this verb to put it back.';ED.cv=null;
  }
  $('#cvFill').onclick=()=>{
    const f=regularForms($('#cvT').value,$('#cvI').value,$('#cvR').checked),m=$('#cvMsg');
    if(!f){m.textContent='Could not work out the forms. Type an infinitive ending in -ar, -er or -ir (or -arse, -erse, -irse if reflexive), or type the forms yourself.';m.style.color='var(--bad)';return;}
    f.forEach((x,i)=>{$('#cvF'+i).value=x;});
    m.textContent='Filled in the regular forms. Check for stem changes (pienso, duermo) and irregular forms.';m.style.color='var(--muted)';
  };
  $('#cvAdd').onclick=()=>{
    const t=$('#cvT').value,inf=$('#cvI').value.trim().toLowerCase(),en=$('#cvE').value.trim(),forms=PRON.map((p,i)=>$('#cvF'+i).value.trim()),m=$('#cvMsg');
    const fail=x=>{m.textContent=x;m.style.color='var(--bad)';};
    if(!inf)return fail('Type the infinitive.');
    if(forms.some(f=>!f))return fail('Fill in all five forms (yo, tú, él/ella/Ud., nosotros, ellos/ellas/Uds.).');
    const k=d.verbs.findIndex(v=>v.t===t&&v.inf===inf);
    const entry={t,inf,en,forms};
    if(k>-1)d.verbs[k]=entry;else d.verbs.push(entry);
    ED.open.cv=true;setDirty();secVerbs(b);const ni=$('#cvI');if(ni)ni.focus();
  };
}

/* --- sentences --- */
const sentCardHtml=(x,i)=>'<div class="notecard" data-i="'+i+'"><div class="between"><b>Sentence '+(i+1)+'</b><button type="button" class="x" data-rm="'+i+'" aria-label="Remove sentence '+(i+1)+'">×</button></div>'+
  '<div class="field"><label for="ss'+i+'">Sentence (type ____ where the verb goes)</label><input id="ss'+i+'" class="text sf" data-f="s" type="text" lang="es" placeholder="Ayer nosotros ____ al cine." value="'+esc(x.s)+'"></div>'+
  '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))"><div class="field"><label for="sh'+i+'">Verb to show (infinitive)</label><input id="sh'+i+'" class="text sf" data-f="hint" type="text" lang="es" placeholder="ir" value="'+esc(x.hint)+'"></div>'+
  '<div class="field"><label for="sa'+i+'">Correct answer</label><input id="sa'+i+'" class="text sf" data-f="a" type="text" lang="es" placeholder="fuimos" value="'+esc(x.a)+'"></div>'+
  '<div class="field"><label for="st'+i+'">Tense</label><select id="st'+i+'" class="sf" data-f="t">'+[['','Not shown'],['present','Present'],['preterite','Preterite'],['imperfect','Imperfect']].map(o=>'<option value="'+o[0]+'"'+(x.t===o[0]?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div></div>'+
  '<div class="field"><label for="sw'+i+'">Explanation shown after answering (optional)</label><input id="sw'+i+'" class="text sf" data-f="why" type="text" placeholder="Ayer marks one finished event." value="'+esc(x.why)+'"></div></div>';
function secSents(b){
  const d=ED.draft;
  b.innerHTML='<p class="note">Fill-in-the-blank sentences. Type the whole sentence with ____ where the verb goes, then the verb students should conjugate. If two answers are both correct, separate them with /.</p><div id="slist" class="stack"></div><div class="row"><button class="btn ghost" id="sadd" type="button">Add a sentence</button></div>';
  const list=$('#slist');
  const redraw=()=>{list.innerHTML=d.sents.length?d.sents.map(sentCardHtml).join(''):emptyHtml('No sentences yet. They are optional.');updateCounts();};
  redraw();
  const upd=e=>{const c=e.target.closest('.notecard');if(!c||!e.target.dataset.f)return;d.sents[+c.dataset.i][e.target.dataset.f]=e.target.value;setDirty();};
  list.addEventListener('input',upd);list.addEventListener('change',upd);
  list.addEventListener('click',e=>{const t=e.target.closest('[data-rm]');if(!t)return;d.sents.splice(+t.dataset.rm,1);setDirty();redraw();});
  $('#sadd').onclick=()=>{d.sents.push({s:'',hint:'',a:'',t:'',why:''});redraw();const f=list.querySelectorAll('.sf[data-f="s"]');f[f.length-1].focus();};
}

/* --- preview --- */
function secPreview(b){
  b.innerHTML='<p class="note">This is what students see when they open the unit. Save to publish your changes.</p><div class="previewbox">'+unitBody(draftToUnit(ED.draft))+'</div>';
}

/* ============ ASSIGNMENTS (teacher) ============ */
let AS_DEL=null,AS_OPEN=null,AS_STATUS={};
function classBar(){
  if(!CLASSES.length)return '';
  const c=CLASSES.find(x=>x.id===CUR)||CLASSES[0];
  return '<div class="classbar">'+selHtml('selClass','Class',CLASSES.map(x=>[String(x.id),x.name]),String(c.id))+'<div class="codebox"><span class="note">Class code</span><b class="code" aria-label="Class code">'+esc(c.code)+'</b></div></div>';
}
function bindClassBar(rerender){
  const s=$('#selClass');
  if(s)s.onchange=async e=>{CUR=+e.target.value;CL_SEL=null;DETAIL=null;AS_OPEN=null;AS_STATUS={};try{await loadClassData();}catch(er){}rerender();};
}
function viewAssign(){
  const t=new Date();t.setDate(t.getDate()+7);
  if(!CLASSES.length){$('#view').innerHTML='<section class="card"><h2>Assignments</h2>'+emptyHtml('Create a class first (Class tab), then assign practice to it.')+'</section>';return;}
  $('#view').innerHTML='<section class="card" aria-label="New assignment"><h2>New assignment</h2>'+
   (UNITS.length?'<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">'+
   '<div class="field"><label for="aT">Title</label><input id="aT" class="text" type="text" maxlength="80" placeholder="e.g. Preterite review"></div>'+
   '<div class="field">'+selHtml('aU','Unit',UNITS.map(u=>[u.id,u.title]),UNITS[0].id)+'</div>'+
   '<div class="field"><label for="aD">Due date</label><input id="aD" class="text" type="date" value="'+isoDay(t)+'"></div></div>'+
   '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr))">'+
   '<div class="field"><label for="aV">Vocab questions</label><input id="aV" class="text" type="number" min="0" max="50" value="10"></div>'+
   '<div class="field"><label for="aC">Conjugation questions</label><input id="aC" class="text" type="number" min="0" max="50" value="10"></div>'+
   '<div class="field"><label for="aS">Sentence questions</label><input id="aS" class="text" type="number" min="0" max="50" value="5"></div></div>'+
   '<div class="field"><label for="aN">Note to students (optional)</label><input id="aN" class="text" type="text" maxlength="200"></div>'+
   '<fieldset class="chk"><legend>Assign to</legend>'+CLASSES.map(c=>'<label><input type="checkbox" name="aCls" value="'+c.id+'"'+(c.id===CUR?' checked':'')+'> '+esc(c.name)+'</label>').join('')+'</fieldset>'+
   '<div class="note" id="ahint"></div><div class="row"><button class="btn" id="acreate">Assign</button></div><div class="note" id="amsg" role="status"></div>':
   emptyHtml('Create a unit first, then assign practice from it.'))+'</section>'+
   '<section class="card"><div class="between"><h2>Assignments</h2></div>'+classBar()+'<div id="alist" style="display:grid;gap:12px"></div></section>';
  bindClassBar(()=>{AS_DEL=null;paintAssign();const cb=document.querySelectorAll('[name=aCls]');cb.forEach(x=>{x.checked=+x.value===CUR;});});
  if(UNITS.length){
    const hint=()=>{const u=UNITS.find(x=>x.id===$('#aU').value);if(!u)return;$('#ahint').textContent='This unit has '+unitVocab(u).length+' vocab words, '+unitVerbs(u).length*5+' verb forms and '+unitSents(u).length+' sentences. Counts above that are capped.';};
    $('#aU').onchange=hint;hint();
    $('#acreate').onclick=async()=>{
      const m=$('#amsg'),title=$('#aT').value.trim(),unitId=$('#aU').value,due=$('#aD').value;
      const mix={vocab:Math.max(0,Math.min(50,+$('#aV').value||0)),conj:Math.max(0,Math.min(50,+$('#aC').value||0)),sent:Math.max(0,Math.min(50,+$('#aS').value||0))};
      const u=UNITS.find(x=>x.id===unitId);
      const classIds=[...document.querySelectorAll('[name=aCls]:checked')].map(x=>+x.value);
      const fail=t=>{m.textContent=t;m.style.color='var(--bad)';};
      if(!title)return fail('Give the assignment a title.');
      if(!due)return fail('Choose a due date.');
      if(!mix.vocab&&!mix.conj&&!mix.sent)return fail('Ask at least one question.');
      if(!classIds.length)return fail('Choose at least one class.');
      if(mix.vocab&&!unitVocab(u).length)return fail('This unit has no vocabulary. Set vocab questions to 0 or add words.');
      if(mix.conj&&!unitVerbs(u).length)return fail('This unit has no verbs. Set conjugation questions to 0 or add verbs.');
      if(mix.sent&&!unitSents(u).length)return fail('This unit has no sentences. Set sentence questions to 0 or add some.');
      m.textContent='Assigning…';m.style.color='var(--muted)';
      try{
        await api('POST','/api/assignments',{title,unitId:+unitId,due,mix,note:$('#aN').value.trim(),classIds});
        await loadClassData();
        m.textContent='Assigned. Students see it in Homework now.';m.style.color='var(--good)';$('#aT').value='';paintAssign();
      }catch(e){fail(e.message);}
    };
  }
  paintAssign();
}
async function toggleStatus(id){
  if(AS_OPEN===id){AS_OPEN=null;paintAssign();return;}
  AS_OPEN=id;paintAssign();
  try{AS_STATUS[id]=await api('GET','/api/assignments/'+id+'/status');}catch(e){AS_STATUS[id]=[];}
  paintAssign();
}
function paintAssign(){
  const b=$('#alist');if(!b)return;
  if(!ASSIGN.length){b.innerHTML=emptyHtml('No assignments for this class yet.');return;}
  b.innerHTML=ASSIGN.map(a=>{
    const u=UNITS.find(x=>x.id===a.unitId),m=a.mix||{};
    const st0=AS_STATUS[a.id],done=st0?st0.filter(r=>r.attempts>0).length:null;
    const open=AS_OPEN===a.id;
    let det='';
    if(open){
      det=!st0?emptyHtml('Loading…'):st0.length?'<div class="scroll"><table class="forms"><thead><tr><th>Student</th><th>Status</th><th>Tries</th><th>Missed on last try</th></tr></thead><tbody>'+
       st0.map(r=>{const h=r.attempts?r:null,st=hwStatus(a,h);return '<tr><th scope="row">'+esc(r.name)+'</th><td><span class="pill '+st.cls+'">'+esc(st.text)+'</span></td><td>'+(r.attempts||0)+'</td><td class="wrapcell">'+(h&&h.missed&&h.missed.length?esc(h.missed.join('; ')):'')+'</td></tr>';}).join('')+'</tbody></table></div>':emptyHtml('No students have joined this class yet.');
    }
    return '<article class="ucard"><div class="between"><h3>'+esc(a.title)+'</h3>'+(done!=null?'<span class="pill idle">'+done+' of '+st0.length+' done</span>':'')+'</div>'+
     '<div class="note">'+(u?esc(u.title):'Unit removed')+' · Due '+esc(dueText(a.due))+' · '+(m.vocab||0)+' vocab, '+(m.conj||0)+' conjugation, '+(m.sent||0)+' sentence</div>'+
     '<div class="row"><button class="btn ghost" data-tog="'+esc(a.id)+'">'+(open?'Hide students':'See students')+'</button><button class="btn ghost" data-del="'+esc(a.id)+'">'+(AS_DEL===a.id?'Click again to delete':'Delete')+'</button></div>'+det+'</article>';
  }).join('');
  b.querySelectorAll('[data-tog]').forEach(x=>x.onclick=()=>toggleStatus(x.dataset.tog));
  b.querySelectorAll('[data-del]').forEach(x=>x.onclick=async()=>{
    if(AS_DEL!==x.dataset.del){AS_DEL=x.dataset.del;paintAssign();return;}
    AS_DEL=null;
    try{await api('DELETE','/api/assignments/'+x.dataset.del);await loadClassData();}catch(e){}
    paintAssign();
  });
}

/* ============ CLASS (teacher) ============ */
let CL_SEL=null,DETAIL=null,CL_DEL=null,CL_NEW=false,CL_ARM=null;
function viewClass(){
  $('#view').innerHTML='<section class="card" aria-label="Classes"><div class="between"><h2>Class</h2><button class="btn ghost small" id="clnew" type="button">New class</button></div>'+
   '<div id="clform"></div>'+classBar()+'<div id="clshare"></div></section>'+
   '<section class="card" aria-label="Class progress"><h2>Progress</h2><div id="clsum"></div><div id="roster"></div></section><section class="card" id="cldetail" hidden></section>';
  $('#clnew').onclick=()=>{CL_NEW=!CL_NEW;paintClassForm();};
  bindClassBar(()=>viewClass());
  paintClassForm();paintClass();
}
function paintClassForm(){
  const f=$('#clform');if(!f)return;
  if(!CL_NEW&&CLASSES.length){f.innerHTML='';return;}
  f.innerHTML='<div class="field"><label for="clName">'+(CLASSES.length?'New class name':'Name your first class')+'</label><div class="row"><input id="clName" class="text" type="text" maxlength="60" placeholder="e.g. Period 3"><button class="btn" id="clmake" type="button">Create class</button></div></div><div class="note" id="clmsg" role="status"></div>';
  const go=async()=>{
    const name=$('#clName').value.trim(),m=$('#clmsg');
    if(!name){m.textContent='Give the class a name.';m.style.color='var(--bad)';return;}
    try{const c=await api('POST','/api/classes',{name});CLASSES.push(c);CUR=c.id;CL_NEW=false;CL_SEL=null;DETAIL=null;await loadClassData();viewClass();}
    catch(e){m.textContent=e.message;m.style.color='var(--bad)';}
  };
  $('#clmake').onclick=go;$('#clName').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});
}
async function selectStudent(id){
  CL_SEL=id;DETAIL=null;CL_ARM=null;paintClass();
  try{DETAIL=await api('GET','/api/students/'+id);}catch(e){CL_SEL=null;}
  paintClass();
}
function paintClass(){
  const b=$('#roster');if(!b)return;
  const cur=CLASSES.find(x=>x.id===CUR);
  const sh=$('#clshare');
  if(sh)sh.innerHTML=cur?'<div class="share"><b>How students join:</b> open <span class="mono">'+esc(location.host)+'</span>, choose <i>Student</i>, and type the class code <span class="mono code-inline">'+esc(cur.code)+'</span>, their name and a PIN they pick. They only need the PIN the first time to create it, and again to sign back in.</div>'+
    '<div class="row"><button class="btn ghost small" id="clcopy" type="button">Copy link and code</button><button class="btn ghost small" id="cldel" type="button">'+(CL_DEL===cur.id?'Click again to delete this class and its data':'Delete class')+'</button></div><div class="note" id="clnote" role="status"></div>':'';
  const cc=$('#clcopy');if(cc)cc.onclick=()=>{const t='Spanish II practice: '+location.origin+'  Class code: '+cur.code;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>{$('#clnote').textContent='Copied.';},()=>{$('#clnote').textContent=t;});};
  const cd=$('#cldel');if(cd)cd.onclick=async()=>{
    if(CL_DEL!==cur.id){CL_DEL=cur.id;paintClass();return;}
    CL_DEL=null;try{await api('DELETE','/api/classes/'+cur.id);CLASSES=await api('GET','/api/classes');CUR=CLASSES.length?CLASSES[0].id:null;CL_SEL=null;DETAIL=null;await loadClassData();viewClass();}catch(e){$('#clnote').textContent=e.message;}
  };
  const rs=ROSTER.slice().sort((a,b2)=>(b2.lastTs||0)-(a.lastTs||0)||a.name.localeCompare(b2.name));
  const acc=rs.filter(r=>r.answered).map(r=>pct(r.answered,r.correct));
  $('#clsum').innerHTML=cur?'<div class="grid"><div class="stat"><b>'+rs.length+'</b><span>Students</span></div><div class="stat"><b>'+(acc.length?Math.round(acc.reduce((x,y)=>x+y,0)/acc.length)+'%':'–')+'</b><span>Average accuracy</span></div>'+
    '<div class="stat"><b>'+ASSIGN.length+'</b><span>Assignments</span></div><div class="stat"><b>'+UNITS.length+'</b><span>Units</span></div></div>':'';
  if(!cur){b.innerHTML=emptyHtml('Create a class to get a join code for your students.');$('#cldetail').hidden=true;return;}
  if(!rs.length)b.innerHTML=emptyHtml('No students yet. Give them the class code above. Each student appears here after they sign in.');
  else b.innerHTML='<div class="scroll"><table class="forms"><thead><tr><th>Student</th><th>Last active</th><th>Answered</th><th>Accuracy</th><th>Homework done</th></tr></thead><tbody>'+
    rs.map(r=>'<tr class="clickrow'+(r.id===CL_SEL?' hit':'')+'" tabindex="0" role="button" data-r="'+r.id+'"><th scope="row">'+esc(r.name)+(r.pinReset?' <span class="pill late">PIN reset</span>':'')+'</th><td>'+esc(ago(r.lastTs))+'</td><td>'+r.answered+'</td><td>'+(r.answered?pct(r.answered,r.correct)+'%':'–')+'</td><td>'+r.hwDone+' of '+ASSIGN.length+'</td></tr>').join('')+'</tbody></table></div>';
  b.querySelectorAll('[data-r]').forEach(x=>{const go=()=>selectStudent(+x.dataset.r);x.onclick=go;x.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}};});
  const d=$('#cldetail'),r=ROSTER.find(x=>x.id===CL_SEL);
  if(r){
    d.hidden=false;
    d.innerHTML='<div class="between"><h2>'+esc(r.name)+'</h2><span class="note">Last active '+esc(ago(r.lastTs))+'</span></div>'+
      (DETAIL?progressBlocks(DETAIL,true):emptyHtml('Loading…'))+
      '<h3>Account</h3><div class="row"><button class="btn ghost" id="stpin" type="button">'+(CL_ARM==='pin'?'Click again to reset PIN':'Reset PIN')+'</button><button class="btn ghost" id="stdel" type="button">'+(CL_ARM==='del'?'Click again to remove student':'Remove student')+'</button></div>'+
      '<div class="note" id="stnote" role="status">Resetting a PIN signs the student out. Next time they sign in with their name, they choose a new PIN.</div>';
    $('#stpin').onclick=async()=>{if(CL_ARM!=='pin'){CL_ARM='pin';paintClass();return;}CL_ARM=null;try{await api('POST','/api/students/'+r.id+'/reset-pin');ROSTER=await api('GET','/api/classes/'+CUR+'/students');paintClass();$('#stnote').textContent='PIN reset. Tell '+r.name+' to sign in and choose a new one.';}catch(e){$('#stnote').textContent=e.message;}};
    $('#stdel').onclick=async()=>{if(CL_ARM!=='del'){CL_ARM='del';paintClass();return;}CL_ARM=null;try{await api('DELETE','/api/students/'+r.id);CL_SEL=null;DETAIL=null;ROSTER=await api('GET','/api/classes/'+CUR+'/students');paintClass();}catch(e){$('#stnote').textContent=e.message;}};
  }else d.hidden=true;
}

/* ============ SETTINGS (teacher) ============ */
async function viewSettings(){
  $('#view').innerHTML='<section class="card"><h2>Settings</h2><div class="empty">Loading…</div></section>';
  let st;try{st=await api('GET','/api/settings');}catch(e){$('#view').innerHTML='<section class="card"><h2>Settings</h2>'+emptyHtml(esc(e.message))+'</section>';return;}
  let html='<section class="card" aria-label="Change password"><h2>Change my password</h2><form id="fPw" class="stack" novalidate>'+
   '<div class="field"><label for="pwC">Current password</label><input id="pwC" class="text" type="password" autocomplete="current-password"></div>'+
   '<div class="field"><label for="pwN">New password (8+ characters)</label><input id="pwN" class="text" type="password" autocomplete="new-password"></div>'+
   '<div class="row"><button class="btn" type="submit">Change password</button></div><div class="note" id="pwM" role="status"></div></form></section>';
  if(st.admin)html+='<section class="card" aria-label="Teacher sign-up"><h2>Teacher sign-up</h2>'+
   '<p class="note" style="margin:0">Teachers need this school code to create their own account. Leave it empty to turn sign-up off. Anyone with the code can join, so only share it with teachers you trust.</p>'+
   '<div class="field"><label for="scC">School code</label><div class="row"><input id="scC" class="text" type="text" maxlength="60" autocomplete="off" value="'+esc(st.schoolCode||'')+'"><button class="btn" id="scS" type="button">Save</button></div></div><div class="note" id="scM" role="status"></div></section>'+
   '<section class="card" aria-label="Teachers"><h2>Teachers</h2><div id="tlist"></div></section>';
  $('#view').innerHTML=html;
  $('#fPw').onsubmit=async e=>{
    e.preventDefault();const m=$('#pwM');m.style.color='var(--muted)';m.textContent='Saving…';
    try{await api('POST','/api/auth/password',{current:$('#pwC').value,password:$('#pwN').value});m.textContent='Password changed.';m.style.color='var(--good)';$('#pwC').value='';$('#pwN').value='';}
    catch(er){m.textContent=er.message;m.style.color='var(--bad)';}
  };
  if(!st.admin)return;
  $('#scS').onclick=async()=>{
    const m=$('#scM');m.style.color='var(--muted)';m.textContent='Saving…';
    try{const v=$('#scC').value.trim();await api('PUT','/api/settings/school-code',{code:v});m.textContent=v?'Saved. Teachers can now sign up with this code.':'Sign-up is turned off.';m.style.color='var(--good)';}
    catch(er){m.textContent=er.message;m.style.color='var(--bad)';}
  };
  paintTeachers();
}
let TR_OPEN=null;
async function paintTeachers(){
  const b=$('#tlist');if(!b)return;
  let list;try{list=await api('GET','/api/teachers');}catch(e){b.innerHTML=emptyHtml(esc(e.message));return;}
  b.innerHTML='<div class="scroll"><table class="forms"><thead><tr><th>Teacher</th><th>Username</th><th>Classes</th><th>Students</th><th></th></tr></thead><tbody>'+
   list.map(t=>'<tr><th scope="row">'+esc(t.name)+'</th><td>'+esc(t.username)+'</td><td>'+t.classes+'</td><td>'+t.students+'</td><td>'+(t.id===ME.id?'<span class="note">you</span>':'<button class="btn ghost small" data-rp="'+t.id+'" type="button">Reset password</button>')+'</td></tr>'+
   (TR_OPEN===t.id?'<tr><td colspan="5"><div class="row"><input class="text" id="rpN" type="text" autocomplete="off" placeholder="New password for '+esc(t.name)+' (8+ characters)"><button class="btn" id="rpGo" type="button">Set password</button></div><div class="note" id="rpM" role="status"></div></td></tr>':'')).join('')+'</tbody></table></div>';
  b.querySelectorAll('[data-rp]').forEach(x=>x.onclick=()=>{TR_OPEN=+x.dataset.rp;paintTeachers();});
  const go=$('#rpGo');if(go)go.onclick=async()=>{
    const m=$('#rpM');
    try{await api('POST','/api/teachers/'+TR_OPEN+'/reset-password',{password:$('#rpN').value});TR_OPEN=null;await paintTeachers();$('#tlist').insertAdjacentHTML('beforeend','<div class="note" style="color:var(--good)">Password set. Tell the teacher the new password in person.</div>');}
    catch(er){m.textContent=er.message;m.style.color='var(--bad)';}
  };
}

/* ============ HOME / SIGN IN ============ */
let SETUP_MODE=false,SIGNUP_OPEN=false,TEA_MODE='in';
async function refreshStatus(){
  try{const st=await api('GET','/api/status');const changed=st.setupOpen!==SETUP_OPEN||!!st.signupOpen!==SIGNUP_OPEN;SETUP_OPEN=st.setupOpen;SIGNUP_OPEN=!!st.signupOpen;if(!SIGNUP_OPEN)TEA_MODE='in';return changed;}catch(e){return false;}
}
let statusChecked=false;
function viewHome(){
  $('#tabs').innerHTML='';
  if(!statusChecked){statusChecked=true;refreshStatus().then(ch=>{statusChecked=false;if(ch&&mode()==='home'&&!document.querySelector('#view input:focus')){statusChecked=true;viewHome();setTimeout(()=>{statusChecked=false;},0);}});}
  const lastCode=(()=>{try{return localStorage.getItem('spanish2.code')||'';}catch(e){return '';}})();
  const setup=SETUP_OPEN&&SETUP_MODE;
  $('#view').innerHTML=(flashMsg?'<div class="banner" role="status">'+esc(flashMsg)+'</div>':'')+
   '<section class="hero"><h2>Practice Spanish II</h2><p>Conjugations, vocabulary and fill-in sentences. Sign in to see your homework and let your teacher see your progress.</p></section>'+
   '<div class="signin">'+
   '<section class="card" aria-labelledby="hs"><h2 id="hs">I’m a student</h2>'+
   '<form id="fStu" autocomplete="off" novalidate>'+
   '<div class="field"><label for="sCode">Class code</label><input id="sCode" class="text mono big" type="text" maxlength="9" autocapitalize="characters" autocorrect="off" spellcheck="false" placeholder="ABC123" value="'+esc(lastCode)+'"></div>'+
   '<div class="field"><label for="sName">Your name</label><input id="sName" class="text" type="text" maxlength="40" autocomplete="off" placeholder="First name and last initial, like Ana T."></div>'+
   '<div class="field"><label for="sPin">PIN (4 to 12 letters or numbers)</label><input id="sPin" class="text" type="password" maxlength="12" autocomplete="off" autocapitalize="none" placeholder="Pick one you will remember"></div>'+
   '<label class="inl"><input type="checkbox" id="sShow"> Show PIN</label>'+
   '<p class="note" style="margin:0">First time? Pick any PIN and sign in. That creates your spot in the class. Next time, use the same name and PIN.</p>'+
   '<div class="row"><button class="btn" type="submit">Sign in</button></div><div class="note err" id="sMsg" role="alert"></div></form></section>'+
   '<section class="card" aria-labelledby="ht"><h2 id="ht">I’m a teacher</h2>'+
   (setup?
    '<form id="fSet" autocomplete="off" novalidate><p class="note" style="margin:0">Create the teacher account. The setup code is in your hosting settings (<span class="mono">TEACHER_SETUP_CODE</span>) or printed in the server log.</p>'+
    '<div class="field"><label for="tCode">Setup code</label><input id="tCode" class="text" type="password" autocomplete="off"></div>'+
    '<div class="field"><label for="tDisp">Name students will see</label><input id="tDisp" class="text" type="text" maxlength="60" placeholder="e.g. Sra. Ruiz"></div>'+
    '<div class="field"><label for="tUser">Username</label><input id="tUser" class="text" type="text" autocomplete="username" autocapitalize="none" maxlength="40"></div>'+
    '<div class="field"><label for="tPass">Password (8+ characters)</label><input id="tPass" class="text" type="password" autocomplete="new-password"></div>'+
    '<div class="row"><button class="btn" type="submit">Create account</button><button class="btn ghost" type="button" id="tBack">Back</button></div><div class="note err" id="tMsg" role="alert"></div></form>':
    (SIGNUP_OPEN?'<div class="seg" role="group" aria-label="Teacher account"><button type="button" data-tm="in" aria-pressed="'+(TEA_MODE==='in')+'">Sign in</button><button type="button" data-tm="up" aria-pressed="'+(TEA_MODE==='up')+'">Create account</button></div>':'')+
    (SIGNUP_OPEN&&TEA_MODE==='up'?
    '<form id="fTea" novalidate><p class="note" style="margin:0">Ask the first teacher for the school code.</p>'+
    '<div class="field"><label for="tCode">School code</label><input id="tCode" class="text" type="password" autocomplete="off"></div>'+
    '<div class="field"><label for="tDisp">Name students will see</label><input id="tDisp" class="text" type="text" maxlength="60" placeholder="e.g. Sra. Ruiz"></div>'+
    '<div class="field"><label for="tUser">Username</label><input id="tUser" class="text" type="text" autocomplete="username" autocapitalize="none" maxlength="40"></div>'+
    '<div class="field"><label for="tPass">Password (8+ characters)</label><input id="tPass" class="text" type="password" autocomplete="new-password"></div>'+
    '<div class="row"><button class="btn" type="submit">Create account</button></div><div class="note err" id="tMsg" role="alert"></div>':
    '<form id="fTea" novalidate>'+
    '<div class="field"><label for="tUser">Username</label><input id="tUser" class="text" type="text" autocomplete="username" autocapitalize="none" maxlength="40"></div>'+
    '<div class="field"><label for="tPass">Password</label><input id="tPass" class="text" type="password" autocomplete="current-password"></div>'+
    '<div class="row"><button class="btn" type="submit">Sign in</button></div><div class="note err" id="tMsg" role="alert"></div>'+
    (SETUP_OPEN?'<p class="note" style="margin:0">No teacher account exists yet. <button type="button" class="link" id="tFirst">Set it up</button></p>':''))+'</form>')+
   '</section></div>'+
   '<p class="guest"><button class="btn ghost" id="gGuest" type="button">Practice without signing in</button><span class="note">Your progress stays on this device and your teacher will not see it.</span></p>';
  flashMsg='';
  const busy=(f,on)=>f.querySelectorAll('button[type=submit]').forEach(b=>{b.disabled=on;});
  const say=(id,t)=>{const m=$('#'+id);m.textContent=t;};
  $('#sShow').onchange=e=>{$('#sPin').type=e.target.checked?'text':'password';};
  $('#sCode').addEventListener('input',e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9 -]/g,'');});
  $('#fStu').onsubmit=async e=>{
    e.preventDefault();const f=e.target;say('sMsg','');
    const code=$('#sCode').value,name=$('#sName').value,pin=$('#sPin').value;
    if(code.replace(/[^A-Za-z0-9]/g,'').length!==6){say('sMsg','Class codes have 6 letters and numbers.');return $('#sCode').focus();}
    if(name.trim().length<2){say('sMsg','Type your name (at least two letters).');return $('#sName').focus();}
    if(!/^[A-Za-z0-9]{4,12}$/.test(pin)){say('sMsg','Your PIN needs 4 to 12 letters or numbers, with no spaces.');return $('#sPin').focus();}
    busy(f,true);
    try{
      const r=await api('POST','/api/auth/student',{code,name,pin});
      try{localStorage.setItem('spanish2.code',code.toUpperCase().replace(/[^A-Z0-9]/g,''));}catch(er){}
      await signedIn();location.hash='';
      if(r.created)flash('Welcome, '+r.name+'! Remember your PIN. You will need it to sign in next time.');
      renderWho();renderChips();setNote();show();
    }catch(er){say('sMsg',er.message);busy(f,false);}
  };
  const tf=$('#fTea')||$('#fSet');
  tf.onsubmit=async e=>{
    e.preventDefault();say('tMsg','');
    const username=$('#tUser').value.trim(),password=$('#tPass').value;
    if(!username||!password){say('tMsg','Enter your username and password.');return;}
    busy(tf,true);
    try{
      if(setup)await api('POST','/api/auth/setup',{setupCode:$('#tCode').value,displayName:$('#tDisp').value,username,password});
      else if(SIGNUP_OPEN&&TEA_MODE==='up'){
        if(!$('#tDisp').value.trim()){say('tMsg','Enter the name students will see.');busy(tf,false);return;}
        await api('POST','/api/auth/signup',{schoolCode:$('#tCode').value,displayName:$('#tDisp').value,username,password});
      }else await api('POST','/api/auth/teacher',{username,password});
      SETUP_OPEN=false;SETUP_MODE=false;
      await signedIn();location.hash='';renderWho();renderChips();setNote();show();
    }catch(er){say('tMsg',er.message);busy(tf,false);}
  };
  document.querySelectorAll('[data-tm]').forEach(b=>b.onclick=()=>{TEA_MODE=b.dataset.tm;viewHome();});
  const first=$('#tFirst');if(first)first.onclick=()=>{SETUP_MODE=true;viewHome();$('#tCode').focus();};
  const back=$('#tBack');if(back)back.onclick=()=>{SETUP_MODE=false;viewHome();};
  $('#gGuest').onclick=()=>{guestMode=true;loadGuest();location.hash='conjugate';renderWho();renderChips();setNote();show();};
}

/* ============ ROUTER + SHELL ============ */
function tabsFor(){
  const m=mode();
  if(m==='teacher')return [['class','Class'],['units','Units'],['assign','Assignments'],['conjugate','Practice'],['settings','Settings']];
  if(m==='student')return [['homework','Homework'],['units','Units'],['conjugate','Practice'],['progress','Progress']];
  return [['conjugate','Practice'],['progress','Progress']];
}
function allowed(){
  const m=mode(),base=PRACTICE.slice();
  if(m==='teacher')return base.concat(['class','units','assign','settings']);
  if(m==='student')return base.concat(['homework','units','progress']);
  return base.concat(['progress']);
}
const defaultTab=()=>mode()==='teacher'?'class':mode()==='student'?'homework':'conjugate';
let tab='conjugate';
function renderWho(){
  const w=$('#who');if(!w)return;
  const m=mode();
  if(m==='home'){w.innerHTML='';return;}
  if(m==='guest'){w.innerHTML='<span class="badge">Guest</span><button class="btn ghost small" id="goin" type="button">Sign in</button>';$('#goin').onclick=()=>{guestMode=false;P=blank();location.hash='';renderWho();renderChips();setNote();show();};return;}
  w.innerHTML='<span class="badge">'+(role==='teacher'?'Teacher':'Student')+'</span><span id="whoName"></span>'+
    (role==='teacher'?'<button class="btn ghost small" id="prev" type="button">'+(previewStudent?'Back to teacher view':'Preview as student')+'</button>':'')+
    '<button class="btn ghost small" id="sout" type="button">Sign out</button>';
  $('#whoName').textContent=ME?ME.name:'';
  const p=$('#prev');if(p)p.onclick=()=>{previewStudent=!previewStudent;HW.a=null;UN.mode='list';if(previewStudent)P=blank();renderWho();renderChips();setNote();location.hash='';show();};
  $('#sout').onclick=signOut;
}
function show(){
  if(!booted){$('#tabs').innerHTML='';$('#view').innerHTML='<div class="empty">Loading…</div>';return;}
  const m=mode();
  if(m==='home')return viewHome();
  const h=(location.hash||'').slice(1);
  tab=allowed().includes(h)?h:defaultTab();
  const main=PRACTICE.includes(tab)?'conjugate':tab;
  $('#tabs').innerHTML=tabsFor().map(t=>'<button class="tab" role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===main)+'">'+t[1]+'</button>').join('');
  $('#tabs').querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
    if(b.dataset.t==='units')UN.mode='list';
    if(location.hash==='#'+b.dataset.t)show();else location.hash=b.dataset.t;
  });
  resetArmed=false;
  if(PRACTICE.includes(tab))viewPractice();
  else if(tab==='homework'){if(HW.a&&HW.qs.length&&!HW.fin)paintHWQ();else{HW.a=null;viewHW();}}
  else if(tab==='units')viewUnits();
  else if(tab==='assign')viewAssign();
  else if(tab==='class')viewClass();
  else if(tab==='settings')viewSettings();
  else viewProg();
}
function refresh(){
  if(mode()==='home')return;
  if(tab==='units'){if(UN.mode==='list'||UN.mode==='detail')paintUnits();}
  else if(tab==='assign'){if(!$('#alist'))viewAssign();else paintAssign();}
  else if(tab==='class'){if(!$('#roster'))viewClass();else{paintClass();}}
  else if(tab==='homework'){if(!HW.a)paintHW();}
}
window.addEventListener('hashchange',show);
(async function boot(){
  try{const st=await api('GET','/api/status');SETUP_OPEN=st.setupOpen;SIGNUP_OPEN=!!st.signupOpen;}catch(e){}
  try{await signedIn();}catch(e){}
  booted=true;renderWho();renderChips();setNote();show();
})();
