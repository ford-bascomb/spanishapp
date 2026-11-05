from tlib import *
def deporte():
    u=Unit('deporte','El tiempo libre y los deportes','Sports, hobbies, jugar and tocar, gustar-type verbs, and ir a + infinitive.')
    u.v("""el tiempo libre=free time
el pasatiempo=hobby
el deporte=sport
el fútbol=soccer
el fútbol americano=football
el baloncesto=basketball
el béisbol=baseball
el voleibol=volleyball
el tenis=tennis
la natación=swimming
el ciclismo=cycling
el equipo=team
el partido=game, match
el campo=field
la cancha=court
el entrenador=coach
el jugador=player
el gimnasio=gym
el concierto=concert
la película=movie
el cine=movie theater
el videojuego=video game
la guitarra=guitar
el baile=dance
la fiesta=party
el parque=park
jugar=to play
practicar=to practice
correr=to run
nadar=to swim
bailar=to dance
cantar=to sing
tocar=to play (an instrument)
pasear=to take a walk
montar en bicicleta=to ride a bike
ganar=to win
perder=to lose
salir con amigos=to go out with friends
ver una película=to watch a movie
a menudo=often
nunca=never
casi nunca=almost never
todos los fines de semana=every weekend
los sábados=on Saturdays""")
    u.n('Jugar and tocar','Jugar (u→ue) is used with a + el/la for sports: Juego al baloncesto. Juegan al fútbol. (a + el = al)\nForms: juego, juegas, juega, jugamos, juegan.\nFor instruments use tocar: Toco la guitarra. Practicar means to practice or play a sport: Practico natación.')
    u.n('Gustar and similar verbs','Gustar, encantar, interesar and molestar use indirect object pronouns (me, te, le, nos, les).\n- Singular noun or infinitive: me gusta el tenis, me gusta nadar\n- Plural noun: me gustan los deportes\nAdd a + name or pronoun for clarity or emphasis: A Pedro le interesa la música. A mí me gusta el voleibol.')
    u.n('Ir a + infinitive','Use ir a + infinitive to say what is going to happen: voy a jugar, vas a nadar, va a bailar, vamos a salir, van a ver.\nVoy a jugar al fútbol mañana. Nosotros vamos a ver una película.\nTime words: mañana, esta noche, este fin de semana, el sábado.')
    u.n('How often','siempre, a menudo, a veces, casi nunca, nunca, todos los días, los sábados (on Saturdays). Place nunca before the verb, or use no before the verb and nunca after: Nunca juego. No juego nunca.')
    P='present';T='preterite'
    u.cs('Yo',P,'jugar',0,'al baloncesto.')
    u.cs('Mi hermano',P,'jugar',2,'al fútbol.')
    u.cs('Nosotros',P,'jugar',3,'al tenis los sábados.')
    u.cs('Tú',P,'jugar',1,'videojuegos.')
    u.cs('Ellos',P,'jugar',4,'al béisbol en el parque.')
    u.cs('Yo',P,'practicar',0,'natación.')
    u.cs('Ella',P,'correr',2,'en el parque todos los días.')
    u.cs('Nosotros',P,'nadar',3,'en la piscina.')
    u.cs('Tú',P,'bailar',1,'muy bien.')
    u.cs('Mi prima',P,'cantar',2,'en un coro.')
    u.cs('Yo',P,'tocar',0,'la guitarra.')
    u.cs('Mis amigos',P,'pasear',4,'por el parque.')
    u.cs('Nuestro equipo siempre',P,'ganar',2,'.')
    u.cs('Ellos',P,'perder',4,'el partido.')
    u.cs('Yo',P,'preferir',0,'el cine.')
    u.cs('Tú',P,'querer',1,'ir al concierto.')
    u.cs('Yo',P,'salir',0,'con mis amigos.')
    u.cs('Ustedes',P,'poder',4,'venir a la fiesta.')
    u.cs('Yo',P,'ir',0,'a jugar al fútbol mañana.')
    u.cs('Nosotros',P,'ir',3,'a ver una película.')
    u.cs('Ella',P,'ir',2,'a practicar la guitarra.')
    u.cs('Mis amigos',P,'ir',4,'a nadar.')
    u.cs('Tú',P,'ir',1,'a bailar en la fiesta.')
    u.cs('Ayer nosotros',T,'jugar',3,'un partido.')
    u.cs('El sábado yo',T,'jugar',0,'al tenis.')
    u.hs('A mí ____ gusta el voleibol.','me','Me = to me.')
    u.hs('A mis amigos ____ encantan los deportes.','les','Les = to them.')
    u.hs('A Pedro ____ interesa la música.','le','Le = to him.')
    u.hs('A nosotros ____ gusta cantar.','nos','Nos = to us.')
    return u
def ciudad():
    u=Unit('ciudad','La ciudad y las direcciones','Places in town, giving directions, affirmative commands, and quedar.')
    u.v("""la ciudad=city
el centro=downtown
el barrio=neighborhood
la calle=street
la avenida=avenue
la esquina=corner
la cuadra=block
el semáforo=traffic light
el puente=bridge
la plaza=square
el parque=park
la iglesia=church
el banco=bank
el correo=post office
la biblioteca=library
el museo=museum
el cine=movie theater
el supermercado=supermarket
la panadería=bakery
la farmacia=pharmacy
el hospital=hospital
la estación=station
el edificio=building
la tienda=store
las direcciones=directions
derecho=straight ahead
a la derecha=to the right
a la izquierda=to the left
el norte=north
el sur=south
el este=east
el oeste=west
cruzar=to cross
doblar=to turn
seguir=to continue, to follow
subir=to go up
bajar=to go down
caminar=to walk
perderse=to get lost
el mapa=map
enfrente de=across from
cerca de=near
lejos de=far from
hasta=until
quedar=to be located""")
    u.n('Affirmative tú commands','For regular verbs, the tú command is the same as the él/ella form of the present tense: habla, come, escribe, camina, abre.\nEight verbs are irregular: di (decir), haz (hacer), ve (ir), pon (poner), sal (salir), sé (ser), ten (tener), ven (venir).\nStem changers keep their change: sigue (seguir), vuelve (volver), piensa (pensar).')
    u.n('Formal (Ud.) commands','Take the yo form of the present, drop -o, and add the opposite ending: -ar verbs take -e, -er and -ir verbs take -a.\n- doblar → doble, caminar → camine, subir → suba, bajar → baje\n- seguir → siga, ir → vaya\n- Spelling changes keep the sound: cruzar → cruce, llegar → llegue, sacar → saque\nUse these with usted: Doble a la derecha. Siga derecho.')
    u.n('Giving directions','Doble a la derecha / a la izquierda. Siga derecho hasta la esquina. Cruce la calle. Está enfrente de, cerca de, lejos de.\nQuedar means to be located: ¿Dónde queda el banco? Queda enfrente del parque. Use estar or quedar for places.')
    u.n('Ir a places','Ir a + place: Voy al banco (a + el = al). Vamos a la biblioteca. Van a los museos.')
    P='present'
    u.hs('Para llegar al banco, ____ (doblar, Ud.) a la derecha.','doble','Ud. command of doblar: take the yo form (doblo), drop -o, add -e.')
    u.hs('____ (Seguir, Ud.) derecho dos cuadras.','Siga','Ud. command of seguir: sigo → siga.')
    u.hs('____ (Cruzar, Ud.) la calle en el semáforo.','Cruce','Ud. command of cruzar: z changes to c before e.')
    u.hs('____ (Caminar, tú) hasta la esquina.','Camina','Regular tú command = él form: camina.')
    u.hs('____ (Ir, tú) a la biblioteca.','Ve','Irregular tú command of ir: ve.')
    u.hs('____ (Hacer, tú) la tarea ahora.','Haz','Irregular tú command of hacer: haz.')
    u.hs('____ (Decir, tú) la verdad.','Di','Irregular tú command of decir: di.')
    u.hs('____ (Poner, tú) la mesa.','Pon','Irregular tú command of poner: pon.')
    u.hs('____ (Salir, tú) de la casa temprano.','Sal','Irregular tú command of salir: sal.')
    u.hs('____ (Ser, tú) amable con todos.','Sé','Irregular tú command of ser: sé (with an accent).')
    u.hs('____ (Venir, tú) a mi casa.','Ven','Irregular tú command of venir: ven.')
    u.hs('____ (Tener, tú) cuidado.','Ten','Irregular tú command of tener: ten.')
    u.hs('____ (Subir, Ud.) por la avenida.','Suba','Ud. command of subir: subo → suba (-ir takes -a).')
    u.hs('____ (Bajar, Ud.) por esta calle.','Baje','Ud. command of bajar: bajo → baje (-ar takes -e).')
    u.hs('____ (Llegar, Ud.) hasta la plaza.','Llegue','Ud. command of llegar: g changes to gu before e.')
    u.hs('____ (Comer, tú) más verduras.','Come','Regular tú command = él form: come.')
    u.hs('____ (Escribir, Ud.) su nombre aquí.','Escriba','Ud. command of escribir: escribo → escriba.')
    u.hs('____ (Abrir, tú) la puerta.','Abre','Regular tú command = él form: abre.')
    u.hs('____ (Esperar, Ud.) un momento.','Espere','Ud. command of esperar: espero → espere.')
    u.cs('Yo',P,'ir',0,'al banco ahora.')
    u.cs('Nosotros',P,'caminar',3,'al centro.')
    u.cs('Ellos',P,'seguir',4,'derecho.')
    u.cs('Yo',P,'seguir',0,'las direcciones del mapa.')
    u.cs('Tú',P,'perderse',1,'en la ciudad grande.')
    u.cs('Mi casa',P,'quedar',2,'cerca del parque.')
    u.cs('La farmacia',P,'quedar',2,'enfrente del banco.')
    u.cs('El museo',P,'estar',2,'a la izquierda.')
    u.cs('Nosotros',P,'encontrar',3,'la estación.')
    return u
def presente():
    u=Unit('presente','El presente: repaso de verbos','A big review of present-tense verbs: regular, stem-changing, yo-go and irregular.')
    u.v("""ser=to be (identity, traits)
estar=to be (location, state)
tener=to have
ir=to go
hacer=to do, to make
querer=to want
poder=to be able, can
decir=to say, to tell
venir=to come
saber=to know (facts, how to)
conocer=to know (people, places)
poner=to put
salir=to leave, to go out
traer=to bring
ver=to see
dar=to give
oír=to hear
pensar=to think
entender=to understand
volver=to return
dormir=to sleep
pedir=to ask for, to order
seguir=to follow, to continue
empezar=to begin
almorzar=to have lunch
jugar=to play
hablar=to speak
comer=to eat
vivir=to live
trabajar=to work
estudiar=to study
ayudar=to help
necesitar=to need
ahora=now
hoy=today
siempre=always
a veces=sometimes
nunca=never
todos los días=every day
mañana=tomorrow
esta noche=tonight""")
    u.n('Regular verbs','- -ar: -o, -as, -a, -amos, -an\n- -er: -o, -es, -e, -emos, -en\n- -ir: -o, -es, -e, -imos, -en\nAdd the endings to the stem (infinitive without -ar/-er/-ir): hablar → hablo; comer → comes; vivir → vivimos.')
    u.n('Stem-changing (boot) verbs','Change in yo, tú, él/ella, ellos. Not in nosotros.\n- e→ie: pensar, querer, empezar, entender, preferir, cerrar\n- o→ue: poder, dormir, volver, encontrar, almorzar, mostrar\n- u→ue: jugar\n- e→i: pedir, servir, repetir, seguir')
    u.n('Irregular yo forms','These verbs are regular except in yo: hago, pongo, salgo, traigo, veo, doy, sé, conozco, oigo.\nTener, venir and decir also have an irregular yo and a stem change: tengo, vengo, digo (tienes, vienes, dices).')
    u.n('Fully irregular verbs','- ser: soy, eres, es, somos, son\n- estar: estoy, estás, está, estamos, están\n- ir: voy, vas, va, vamos, van\n- dar: doy, das, da, damos, dan\nSaber is for facts and skills (Sé la respuesta. Sé nadar). Conocer is for people and places (Conozco a tu hermano. Conozco Madrid).')
    P='present'
    u.cs('Yo',P,'hacer',0,'la tarea después de clases.')
    u.cs('Yo',P,'poner',0,'mis libros en la mochila.')
    u.cs('Yo',P,'salir',0,'de casa a las siete.')
    u.cs('Yo',P,'traer',0,'mi almuerzo a la escuela.')
    u.cs('Yo',P,'ver',0,'la televisión por la noche.')
    u.cs('Yo',P,'dar',0,'un regalo a mi amigo.')
    u.cs('Yo',P,'saber',0,'la respuesta.')
    u.cs('Yo',P,'conocer',0,'a tu hermano.')
    u.cs('Yo',P,'oír',0,'música en mi cuarto.')
    u.cs('Yo',P,'decir',0,'la verdad.')
    u.cs('Yo',P,'tener',0,'quince años.')
    u.cs('Yo',P,'venir',0,'a la escuela en autobús.')
    u.cs('Tú',P,'ser',1,'mi mejor amigo.')
    u.cs('Tú',P,'estar',1,'en la biblioteca.')
    u.cs('Tú',P,'ir',1,'al cine con nosotros.')
    u.cs('Mi madre',P,'ser',2,'doctora.')
    u.cs('Mi madre',P,'estar',2,'en el trabajo.')
    u.cs('Mi madre',P,'ir',2,'al mercado.')
    u.cs('Nosotros',P,'dar',3,'una fiesta.')
    u.cs('Nosotros',P,'saber',3,'bailar.')
    u.cs('Ellos',P,'ser',4,'muy simpáticos.')
    u.cs('Ellos',P,'estar',4,'en el parque.')
    u.cs('Ellos',P,'ir',4,'a la playa.')
    u.cs('Mi equipo',P,'querer',2,'ganar el partido.')
    u.cs('Nosotros',P,'poder',3,'ayudar.')
    u.cs('Yo',P,'dormir',0,'ocho horas.')
    u.cs('Ellos',P,'volver',4,'a casa a las cuatro.')
    u.cs('Yo',P,'encontrar',0,'mis llaves.')
    u.cs('Mis amigos',P,'almorzar',4,'a la una.')
    u.cs('Nosotros',P,'jugar',3,'al fútbol.')
    u.cs('Yo',P,'pedir',0,'ayuda.')
    u.cs('Ella',P,'seguir',2,'las instrucciones.')
    u.cs('Ellos',P,'cerrar',4,'la puerta.')
    u.cs('Tú',P,'preferir',1,'el té.')
    u.cs('Ellos',P,'servir',4,'la cena.')
    u.cs('Yo',P,'hablar',0,'español en clase.')
    u.cs('Tú',P,'comer',1,'mucha fruta.')
    u.cs('Nosotros',P,'vivir',3,'en la ciudad.')
    u.cs('Ellos',P,'trabajar',4,'los sábados.')
    u.cs('Yo',P,'escribir',0,'cartas a mi abuela.')
    u.cs('Ella',P,'abrir',2,'la tienda a las nueve.')
    u.cs('Nosotros',P,'necesitar',3,'más tiempo.')
    u.cs('Tú',P,'ayudar',1,'a tu hermano.')
    return u
