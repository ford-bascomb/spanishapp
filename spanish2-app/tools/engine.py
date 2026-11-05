# Spanish conjugation engine used to build the template library. Verified against the built-in tables by tools/check_engine.py.
import json,os
HERE=os.path.dirname(os.path.abspath(__file__))
BUILTIN=json.load(open(os.path.join(HERE,'builtin.json')))
BV={(v['tense'],v['inf']):v for v in BUILTIN['V']}
REFL=['me','te','se','nos','se']
TL={'present':'Present','preterite':'Preterite','imperfect':'Imperfect'}
PRON=['yo','tú','él / ella / Ud.','nosotros','ellos / ellas / Uds.']
def split(inf):
    r=inf.endswith('se'); b=inf[:-2] if r else inf
    return b,r
def _change(stem,kind):
    old,new={'e>ie':('e','ie'),'o>ue':('o','ue'),'e>i':('e','i'),'u>ue':('u','ue'),'o>u':('o','u')}[kind]
    i=stem.rfind(old)
    assert i>=0,(stem,kind)
    return stem[:i]+new+stem[i+len(old):]
def _refl(forms,r): return [REFL[i]+' '+f for i,f in enumerate(forms)] if r else forms
def present(inf,change=None,yo=None,custom=None):
    b,r=split(inf); end=b[-2:]; stem=b[:-2]
    if custom: return _refl(custom,r)
    E={'ar':['o','as','a','amos','an'],'er':['o','es','e','emos','en'],'ir':['o','es','e','imos','en']}[end]
    st=[stem]*5
    if change:
        c=_change(stem,change); st=[c,c,c,stem,c]
    f=[st[i]+E[i] for i in range(5)]
    if yo: f[0]=yo
    return _refl(f,r)
def preterite(inf,change=None,custom=None):
    b,r=split(inf); end=b[-2:]; stem=b[:-2]
    if custom: return _refl(custom,r)
    if end=='ar': E=['é','aste','ó','amos','aron']
    else: E=['í','iste','ió','imos','ieron']
    f=[stem+x for x in E]
    if end=='ar':
        if stem.endswith('c'): f[0]=stem[:-1]+'qué'
        elif stem.endswith('g'): f[0]=stem+'ué'
        elif stem.endswith('z'): f[0]=stem[:-1]+'cé'
    elif stem[-1] in 'aeou' and end in('er','ir'):
        f=[stem+'í',stem+'íste',stem+'yó',stem+'ímos',stem+'yeron']
    if change:
        c=_change(stem,change); f[2]=c+'ió'; f[4]=c+'ieron'
    return _refl(f,r)
def imperfect(inf,custom=None):
    b,r=split(inf); end=b[-2:]; stem=b[:-2]
    if custom: return _refl(custom,r)
    E=['aba','abas','aba','ábamos','aban'] if end=='ar' else ['ía','ías','ía','íamos','ían']
    return _refl([stem+x for x in E],r)
