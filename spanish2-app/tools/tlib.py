import json,os,re
from engine import *
EN={'despertarse':'to wake up','levantarse':'to get up','ducharse':'to take a shower','bañarse':'to take a bath','lavarse':'to wash oneself','cepillarse':'to brush (one’s teeth/hair)','peinarse':'to comb one’s hair','vestirse':'to get dressed','ponerse':'to put on (clothing)','sentarse':'to sit down','acostarse':'to go to bed','dormirse':'to fall asleep','divertirse':'to have fun','quitarse':'to take off (clothing)','afeitarse':'to shave','irse':'to leave, to go away','llamarse':'to be called','sentirse':'to feel','perderse':'to get lost','quedarse':'to stay','cuidarse':'to take care of oneself',
'probar':'to taste, to try','cocinar':'to cook','preparar':'to prepare','recomendar':'to recommend','cenar':'to have dinner','desayunar':'to have breakfast','ayudar':'to help','visitar':'to visit','cuidar':'to take care of','limpiar':'to clean','barrer':'to sweep','lavar':'to wash','cortar':'to cut','pasar':'to pass, to spend (time)','nadar':'to swim','montar':'to ride','soñar':'to dream','viajar':'to travel','reservar':'to reserve','volar':'to fly','alquilar':'to rent','aterrizar':'to land','perder':'to lose','facturar':'to check in','enseñar':'to teach','preguntar':'to ask','contestar':'to answer','practicar':'to practice','cantar':'to sing','tocar':'to play (an instrument), to touch','pasear':'to take a walk','ganar':'to win, to earn','bailar':'to dance','correr':'to run','toser':'to cough','respirar':'to breathe','descansar':'to rest','tomar':'to take, to drink','deber':'should, to owe','cruzar':'to cross','doblar':'to turn','caminar':'to walk','bajar':'to go down, to get off','subir':'to go up, to get on','necesitar':'to need','llegar':'to arrive','aprender':'to learn','escribir':'to write','leer':'to read','abrir':'to open','beber':'to drink','vivir':'to live','trabajar':'to work','estudiar':'to study','hablar':'to speak','comer':'to eat','sacar':'to take out, to get','quedar':'to be located, to remain','esperar':'to wait','jugar':'to play','dar':'to give','pagar':'to pay','comprar':'to buy','buscar':'to look for','empezar':'to begin','regalar':'to give (a gift)','mostrar':'to show','prestar':'to lend','enviar':'to send','ofrecer':'to offer','devolver':'to return (something)','gastar':'to spend','ahorrar':'to save'}
PRES_KW={'despertarse':dict(change='e>ie'),'dormirse':dict(change='o>ue'),'acostarse':dict(change='o>ue'),'sentarse':dict(change='e>ie'),'vestirse':dict(change='e>i'),'divertirse':dict(change='e>ie'),'sentirse':dict(change='e>ie'),'perderse':dict(change='e>ie'),'probar':dict(change='o>ue'),'recomendar':dict(change='e>ie'),'perder':dict(change='e>ie'),'volar':dict(change='o>ue'),
'ponerse':dict(custom=['pongo','pones','pone','ponemos','ponen']),'irse':dict(custom=['voy','vas','va','vamos','van'])}
PRET_KW={'sentirse':dict(change='e>i'),'vestirse':dict(change='e>i'),'divertirse':dict(change='e>i'),'dormirse':dict(change='o>u')}
TENSE_FN={'present':present,'preterite':preterite,'imperfect':imperfect}
KWS={'present':PRES_KW,'preterite':PRET_KW,'imperfect':{}}
def forms(t,inf):
    if (t,inf) in BV: return BV[(t,inf)]['forms'],BV[(t,inf)].get('group','')
    kw=KWS[t].get(inf,{})
    return TENSE_FN[t](inf,**kw),'engine'
def verb_entry(t,inf):
    if (t,inf) in BV: return {'t':t,'inf':inf}
    f,_=forms(t,inf)
    en=EN[inf] if inf in EN else None
    assert en,('no gloss',inf)
    return {'t':t,'inf':inf,'en':en,'forms':f}
def tip(t,inf,i,ans,grp):
    if t=='present':
        kw=PRES_KW.get(inf,{})
        if kw.get('change') or grp=='stem':
            return ' Boot verb: the stem changes except in nosotros.' if i!=3 else ' Nosotros keeps the original stem (no boot change).'
        if grp=='irreg': return ' Irregular verb: learn this form.'
        return ''
    if t=='preterite':
        if grp in('spelling',) or (i==0 and inf.endswith(('car','gar','zar'))): 
            if i==0: return ' Spelling change in the yo form (c→qu, g→gu, z→c).'
        if grp=='irregular': return ' Irregular stem with endings -e, -iste, -o, -imos, -ieron (no accents).'
        if grp=='stemir' or inf in PRET_KW: return ' Stem change (e→i or o→u) only in the él/ella and ellos forms.'
        if i in (2,4) and ans.endswith(('yó','yeron')): return ' The i between vowels becomes y.'
        return ''
    if t=='imperfect':
        if grp=='irregular': return ' Ser, ir and ver are the only irregular imperfect verbs.'
        return ' Imperfect: ongoing or repeated action in the past.'
    return ''
class Unit:
    def __init__(s,slug,title,desc): s.slug=slug;s.title=title;s.desc=desc;s.vocab=[];s.notes=[];s.sents=[];s.verbs=[];s._seen=set()
    def v(s,block):
        for ln in block.strip().splitlines():
            ln=ln.strip()
            if not ln: continue
            es,en=ln.split('=',1); s.vocab.append({'es':es.strip(),'en':en.strip()})
    def n(s,h,b): s.notes.append({'h':h,'b':b.strip()})
    def addverb(s,t,inf):
        if (t,inf) not in s._seen: s._seen.add((t,inf)); s.verbs.append(verb_entry(t,inf))
    def cs(s,pre,t,inf,i,tail=''):
        f,grp=forms(t,inf); ans=f[i]
        text=(pre+' ' if pre else '')+'____ ('+inf+')'+((' '+tail if not tail.startswith('.') else tail) if tail else '')
        why=TL[t]+', '+PRON[i]+' form of '+inf+': '+ans+'.'+tip(t,inf,i,ans,grp)
        s.sents.append({'s':text,'a':ans,'t':t,'why':why}); s.addverb(t,inf)
    def hs(s,text,ans,why,t=''): s.sents.append({'s':text,'a':ans,'t':t,'why':why})
    def verbs_only(s,t,infs):
        for inf in infs.split(): s.addverb(t,inf)
    def out(s):
        assert len(set(x['es'] for x in s.vocab))==len(s.vocab),'dup vocab in '+s.slug
        for x in s.sents: assert '____' in x['s'] and x['a'],x
        return {'id':'t:'+s.slug,'title':s.title,'desc':s.desc,'vocab':s.vocab,'notes':s.notes,'verbs':s.verbs,'sentences':s.sents}
