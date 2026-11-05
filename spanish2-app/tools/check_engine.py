import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from engine import *
# regular / pattern verbs the engine must reproduce exactly from the built-in tables
CHK=[('preterite',i,{}) for i in 'hablar comprar bailar trabajar estudiar comer beber aprender vivir escribir abrir salir correr buscar sacar pagar llegar empezar jugar leer creer'.split()]
CHK+=[('preterite','dormir',{'change':'o>u'}),('preterite','morir',{'change':'o>u'}),('preterite','pedir',{'change':'e>i'}),('preterite','preferir',{'change':'e>i'}),('preterite','servir',{'change':'e>i'}),('preterite','repetir',{'change':'e>i'}),('preterite','sentir',{'change':'e>i'})]
CHK+=[('present','pensar',{'change':'e>ie'}),('present','querer',{'change':'e>ie'}),('present','empezar',{'change':'e>ie'}),('present','preferir',{'change':'e>ie'}),('present','cerrar',{'change':'e>ie'}),('present','entender',{'change':'e>ie'}),('present','poder',{'change':'o>ue'}),('present','dormir',{'change':'o>ue'}),('present','volver',{'change':'o>ue'}),('present','encontrar',{'change':'o>ue'}),('present','almorzar',{'change':'o>ue'}),('present','mostrar',{'change':'o>ue'}),('present','pedir',{'change':'e>i'}),('present','servir',{'change':'e>i'}),('present','repetir',{'change':'e>i'}),('present','seguir',{'change':'e>i','yo':'sigo'})]
CHK+=[('imperfect',i,{}) for i in 'hablar bailar trabajar estudiar comer vivir escribir salir'.split()]
bad=0
for t,inf,kw in CHK:
    got={'present':present,'preterite':preterite,'imperfect':imperfect}[t](inf,**kw)
    want=BV[(t,inf)]['forms']
    if got!=want: bad+=1; print('MISMATCH',t,inf,got,want)
print(len(CHK),'checked,',bad,'mismatches')
sys.exit(1 if bad else 0)
