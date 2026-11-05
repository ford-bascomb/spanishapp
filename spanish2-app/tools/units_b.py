from tlib import *
def imperfecto():
    u=Unit('imperfecto','El pasado: el imperfecto','Imperfect endings and uses, childhood memories, and imperfect versus preterite.')
    u.v("""de niño=as a child (boy)
de niña=as a girl
cuando era pequeño=when I was little
antes=before, in the past
a menudo=often
todos los días=every day
cada verano=every summer
mientras=while
generalmente=usually
con frecuencia=frequently
muchas veces=many times
siempre=always
nunca=never
a veces=sometimes
de repente=suddenly
la infancia=childhood
el recuerdo=memory
el juguete=toy
la muñeca=doll
el juego=game
el columpio=swing
la bicicleta=bicycle
la escuela primaria=elementary school
el recreo=recess
el cuento=story
el dibujo animado=cartoon
las vacaciones=vacation
la playa=beach
el parque=park
el maestro=teacher
jugar=to play
montar en bicicleta=to ride a bike
nadar=to swim
hacer travesuras=to get into mischief
portarse bien=to behave well
llorar=to cry
reír=to laugh
soñar=to dream
visitar=to visit""")
    u.n('Imperfect endings','Drop the -ar, -er or -ir and add the endings.\n- -ar verbs: -aba, -abas, -aba, -ábamos, -aban (jugar: jugaba, jugabas, jugaba, jugábamos, jugaban)\n- -er and -ir verbs: -ía, -ías, -ía, -íamos, -ían (comer: comía, comías, comía, comíamos, comían)\nThere are no stem changes in the imperfect.')
    u.n('The three irregulars','- ser: era, eras, era, éramos, eran\n- ir: iba, ibas, iba, íbamos, iban\n- ver: veía, veías, veía, veíamos, veían')
    u.n('When to use the imperfect','Use the imperfect for:\n- habits and repeated actions (De niño, jugaba en el parque todos los días.)\n- descriptions of people, places, feelings in the past (Mi abuela era simpática.)\n- ongoing actions with no clear start or end (Mientras ella dormía, yo leía.)\n- age, time and weather in the past (Tenía diez años. Eran las ocho.)\nClue words: siempre, a menudo, todos los días, mientras, generalmente, de niño.')
    u.n('Imperfect or preterite?','The preterite tells what happened (a completed event at a specific time). The imperfect sets the scene or tells what used to happen.\nOften they work together: Yo dormía (background) cuando sonó el teléfono (interrupting event).\nClue words for the preterite: ayer, anoche, el año pasado, de repente, una vez.')
    I='imperfect'
    u.cs('De niño, yo',I,'jugar',0,'en el parque.')
    u.cs('Mi abuela siempre',I,'cocinar',2,'los domingos.')
    u.cs('Nosotros',I,'vivir',3,'en una casa pequeña.')
    u.cs('Cuando eras pequeña, tú',I,'ver',1,'dibujos animados.')
    u.cs('Mis primos',I,'ir',4,'a la playa cada verano.')
    u.cs('Yo',I,'ser',0,'muy tímido de niño.')
    u.cs('Nosotros',I,'ser',3,'buenos amigos.')
    u.cs('Mi hermano',I,'tener',2,'un perro.')
    u.cs('Ellos',I,'hacer',4,'travesuras a menudo.')
    u.cs('Tú',I,'nadar',1,'todos los veranos.')
    u.cs('Yo',I,'leer',0,'cuentos antes de dormir.')
    u.cs('Mis padres',I,'trabajar',4,'mucho entonces.')
    u.cs('Nosotros',I,'comer',3,'en casa de mi abuela.')
    u.cs('Yo',I,'ir',0,'a la escuela en autobús.')
    u.cs('Ella',I,'montar',2,'en bicicleta todos los días.')
    u.cs('Mi mamá',I,'ver',2,'la tele mientras cocinaba.')
    u.cs('Nosotros',I,'visitar',3,'a los abuelos cada domingo.')
    u.cs('Tú',I,'querer',1,'una bicicleta nueva.')
    u.cs('Ella',I,'escribir',2,'cartas a su abuelo cada mes.')
    u.cs('Yo',I,'estudiar',0,'en la biblioteca todos los días.')
    u.cs('Ustedes',I,'poder',4,'jugar afuera siempre.')
    u.cs('Nosotros',I,'dar',3,'un paseo cada tarde.')
    u.hs('Cuando yo ____ (tener) diez años, vivía en Ohio.','tenía','Age in the past uses the imperfect.','imperfect')
    u.hs('Mientras ella ____ (dormir), yo leía un libro.','dormía','An ongoing action in the background: imperfect.','imperfect')
    u.hs('Ayer yo ____ (ir) al parque con mi hermano.','fui','Ayer points to a completed event: preterite of ir.','preterite')
    u.hs('Mi abuela ____ (ser) simpática y siempre nos daba dulces.','era','Describing a person in the past: imperfect of ser.','imperfect')
    u.hs('De repente, el teléfono ____ (sonar).','sonó','De repente signals a sudden completed event: preterite.','preterite')
    u.hs('Ayer nosotros ____ (comer) pizza.','comimos','Ayer: preterite, nosotros of comer.','preterite')
    return u
def salud():
    u=Unit('salud','La salud y el cuerpo','Parts of the body, illness, doler, tener expressions, and giving advice.')
    u.v("""el cuerpo=body
la cabeza=head
el cuello=neck
el brazo=arm
la mano=hand
el dedo=finger
la pierna=leg
el pie=foot
la rodilla=knee
la espalda=back
el estómago=stomach
la garganta=throat
el oído=inner ear
el corazón=heart
el pecho=chest
el hombro=shoulder
la nariz=nose
la boca=mouth
la salud=health
la enfermedad=illness
el médico=doctor
la enfermera=nurse
el hospital=hospital
la farmacia=pharmacy
la medicina=medicine
el resfriado=cold
la gripe=flu
la tos=cough
la fiebre=fever
el dolor=pain
la alergia=allergy
la herida=wound
enfermo=sick
sano=healthy
cansado=tired
mareado=dizzy
doler=to hurt
toser=to cough
estornudar=to sneeze
respirar=to breathe
descansar=to rest
cuidarse=to take care of oneself
la cita=appointment
la tableta=pill
el jarabe=syrup""")
    u.n('Doler','Doler (o→ue) works like gustar: the body part is the subject and the person is an indirect object.\n- Me duele la cabeza. (singular → duele)\n- Me duelen los pies. (plural → duelen)\n- A Ana le duele el estómago. A mis amigos les duelen las piernas.\nPronouns: me, te, le, nos, les. Use el, la, los, las before the body part, not mi.')
    u.n('Tener + illness','Spanish uses tener for many illnesses and symptoms: Tengo gripe. Tengo tos. Tiene fiebre. Tenemos un resfriado. Tengo dolor de cabeza.\nUse estar for conditions: Estoy enfermo, estoy cansado, estoy mareado.')
    u.n('Giving advice','- deber + infinitive: Debes descansar.\n- tener que + infinitive: Tienes que tomar la medicina.\n- hay que + infinitive: Hay que beber mucha agua.\n- es importante + infinitive: Es importante dormir.')
    u.n('Sentirse','Sentirse (e→ie) is reflexive: me siento, te sientes, se siente, nos sentimos, se sienten. Me siento mal. Se siente mejor.')
    P='present';T='preterite'
    u.hs('Me ____ (doler) la cabeza.','duele','Singular thing that hurts: duele.')
    u.hs('Me ____ (doler) los pies.','duelen','Plural thing that hurts: duelen.')
    u.hs('A Ana le ____ (doler) el estómago.','duele','Singular thing that hurts: duele.')
    u.hs('A mis amigos les ____ (doler) las piernas.','duelen','Plural thing that hurts: duelen.')
    u.hs('¿Te ____ (doler) la garganta?','duele','Singular thing that hurts: duele.')
    u.hs('A nosotros nos ____ (doler) los oídos.','duelen','Plural thing that hurts: duelen.')
    u.hs('Me duele ____ espalda.','la','Use el, la, los or las with body parts. Espalda is feminine.')
    u.hs('A mi madre le duelen ____ manos.','las','Use el, la, los or las with body parts. Manos is feminine plural.')
    u.cs('Yo',P,'tener',0,'fiebre y tos.')
    u.cs('Mi hermano',P,'tener',2,'gripe.')
    u.cs('Nosotros',P,'tener',3,'una cita con el médico.')
    u.cs('Tú',P,'tener',1,'alergias, ¿verdad?')
    u.cs('Mis primos',P,'tener',4,'un resfriado.')
    u.cs('Yo',P,'sentirse',0,'mal hoy.')
    u.cs('Ana',P,'sentirse',2,'mejor.')
    u.cs('Nosotros',P,'sentirse',3,'cansados.')
    u.cs('Tú',P,'sentirse',1,'mareado.')
    u.cs('Tú',P,'deber',1,'descansar.')
    u.cs('Ustedes',P,'deber',4,'tomar más agua.')
    u.cs('Yo',P,'deber',0,'dormir más.')
    u.cs('Nosotros',P,'deber',3,'comer verduras.')
    u.cs('Yo',P,'respirar',0,'con dificultad.')
    u.cs('Mi tía',P,'cuidarse',2,'mucho.')
    u.cs('Ayer yo',T,'ir',0,'al médico.')
    u.cs('Anoche mi hermano',T,'toser',2,'mucho.')
    u.cs('Ella',T,'tomar',2,'la medicina ayer.')
    u.cs('Ayer yo',T,'dormir',0,'diez horas.')
    u.hs('Estoy enfermo. Tengo ____ (a cold).','un resfriado','Tener + resfriado: tengo un resfriado.')
    return u
def viajes():
    u=Unit('viajes','Los viajes','Travel vocabulary, the preterite, por and para, and "hace" for ago.')
    u.v("""el viaje=trip
las vacaciones=vacation
el pasaporte=passport
el boleto=ticket
el aeropuerto=airport
el avión=airplane
el vuelo=flight
la maleta=suitcase
el equipaje=luggage
la salida=departure
la llegada=arrival
el tren=train
la estación de tren=train station
el autobús=bus
el barco=boat
el taxi=taxi
el hotel=hotel
la habitación=room
la reserva=reservation
el turista=tourist
el guía=guide
el mapa=map
la playa=beach
la montaña=mountain
el museo=museum
la ciudad=city
el pueblo=town
el país=country
el extranjero=abroad
la aduana=customs
facturar=to check in
hacer la maleta=to pack
viajar=to travel
volar=to fly
aterrizar=to land
reservar=to reserve
quedarse=to stay
visitar=to visit
sacar fotos=to take photos
alquilar=to rent
el recuerdo=souvenir
la agencia de viajes=travel agency
anteayer=the day before yesterday
el verano pasado=last summer
hace dos años=two years ago""")
    u.n('Preterite review','- -ar: -é, -aste, -ó, -amos, -aron\n- -er/-ir: -í, -iste, -ió, -imos, -ieron\n- yo spelling changes: -car → -qué (saqué), -gar → -gué (llegué, pagué), -zar → -cé (empecé)\n- irregular: ir/ser (fui, fuiste, fue, fuimos, fueron), hacer (hice, hiciste, hizo, hicimos, hicieron), tener (tuve), estar (estuve), ver (vi, viste, vio, vimos, vieron), dar (di, diste, dio, dimos, dieron)')
    u.n('Por or para','PARA: destination (Salimos para el aeropuerto), deadline, purpose (para descansar), recipient (un regalo para ti), opinion.\nPOR: through or along (caminé por la playa), duration (estudié por tres horas), means (viajamos por avión), exchange (pagué veinte dólares por el boleto), cause (por la lluvia).')
    u.n('Hace for ago','Hace + time means ago: Hace dos años viajé a Perú. = Viajé a Perú hace dos años.\nOther time words for the preterite: ayer, anteayer, anoche, el verano pasado, el año pasado, la semana pasada.')
    u.n('Reflexive verbs in the preterite','Put the pronoun before the verb as usual: Me quedé en un hotel. Nos quedamos tres noches. Se quedaron en casa de sus abuelos.')
    T='preterite'
    u.cs('El verano pasado yo',T,'viajar',0,'a México.')
    u.cs('Mi familia',T,'visitar',2,'Madrid.')
    u.cs('Nosotros',T,'llegar',3,'al aeropuerto temprano.')
    u.cs('Tú',T,'hacer',1,'la maleta anoche.')
    u.cs('Yo',T,'reservar',0,'el hotel por internet.')
    u.cs('Ellos',T,'volar',4,'a Chile.')
    u.cs('Ana',T,'sacar',2,'muchas fotos.')
    u.cs('Yo',T,'sacar',0,'un boleto de tren.')
    u.cs('Mis amigos',T,'alquilar',4,'un coche.')
    u.cs('Nosotros',T,'quedarse',3,'en un hotel cerca de la playa.')
    u.cs('Yo',T,'ir',0,'a la montaña con mis primos.')
    u.cs('El vuelo',T,'salir',2,'a las ocho.')
    u.cs('Tú',T,'pagar',1,'la cuenta del hotel.')
    u.cs('Yo',T,'pagar',0,'con tarjeta.')
    u.cs('Mis padres',T,'comprar',4,'recuerdos.')
    u.cs('Nosotros',T,'ver',3,'el museo.')
    u.cs('El avión',T,'aterrizar',2,'tarde.')
    u.cs('Yo',T,'perder',0,'mi pasaporte.')
    u.cs('Ustedes',T,'conducir',4,'por la costa.')
    u.cs('Hace dos años mi familia',T,'viajar',2,'a Perú.')
    u.cs('Anteayer nosotros',T,'reservar',3,'los boletos.')
    u.cs('El año pasado yo',T,'hacer',0,'un viaje largo.')
    u.hs('Salimos ____ el aeropuerto a las seis.','para','Para shows destination.')
    u.hs('Viajamos ____ avión.','por','Por shows the means of transportation.')
    u.hs('Compré un recuerdo ____ mi madre.','para','Para shows the recipient.')
    u.hs('Caminé ____ la playa.','por','Por means through or along.')
    u.hs('Estudié ____ tres horas.','por','Por shows duration.')
    u.hs('Este regalo es ____ ti.','para','Para shows the recipient.')
    return u
def escuela():
    u=Unit('escuela','La escuela y las clases','School vocabulary, present tense (regular and stem-changing), telling time.')
    u.v("""la escuela=school
la clase=class
la materia=subject
las matemáticas=math
las ciencias=science
la historia=history
el inglés=English
el español=Spanish
la educación física=physical education
el arte=art
la música=music
la biblioteca=library
la cafetería=cafeteria
el gimnasio=gym
el laboratorio=laboratory
el salón de clase=classroom
el profesor=teacher (male)
la profesora=teacher (female)
el estudiante=student
el compañero de clase=classmate
la tarea=homework
el examen=exam
la prueba=quiz
la nota=grade
el cuaderno=notebook
el libro=book
el lápiz=pencil
el bolígrafo=pen
la pizarra=whiteboard
la calculadora=calculator
la mochila=backpack
el horario=schedule
el recreo=recess
aprender=to learn
enseñar=to teach
estudiar=to study
entender=to understand
preguntar=to ask
contestar=to answer
aprobar=to pass
reprobar=to fail
sacar buenas notas=to get good grades
fácil=easy
difícil=hard
aburrido=boring
interesante=interesting""")
    u.n('Regular present tense','Drop -ar, -er or -ir and add:\n- -ar: -o, -as, -a, -amos, -an (estudiar: estudio, estudias, estudia, estudiamos, estudian)\n- -er: -o, -es, -e, -emos, -en (aprender: aprendo, aprendes, aprende, aprendemos, aprenden)\n- -ir: -o, -es, -e, -imos, -en (escribir: escribo, escribes, escribe, escribimos, escriben)')
    u.n('Stem-changing verbs (boot verbs)','The stem vowel changes in yo, tú, él/ella and ellos. Nosotros keeps the original stem.\n- e→ie: empezar (empiezo), entender (entiendo), pensar (pienso), preferir (prefiero)\n- o→ue: volver (vuelvo), almorzar (almuerzo), poder (puedo), dormir (duermo)\n- e→i: pedir (pido), repetir (repito), servir (sirvo)')
    u.n('Telling time','Use ser. Es la una. Son las dos. Son las tres y media. Es la una y cuarto.\nFor the time of an event use a: La clase empieza a las ocho. ¿A qué hora es la clase de arte?\nAdd de la mañana, de la tarde or de la noche to say a.m. or p.m.: Son las dos de la tarde.')
    P='present'
    u.cs('Yo',P,'estudiar',0,'español todas las noches.')
    u.cs('Mi maestra',P,'enseñar',2,'muy bien.')
    u.cs('Nosotros',P,'aprender',3,'mucho.')
    u.cs('Tú',P,'escribir',1,'ensayos largos.')
    u.cs('Ellos',P,'leer',4,'un libro interesante.')
    u.cs('Yo',P,'entender',0,'la lección.')
    u.cs('Tú no',P,'entender',1,'el ejercicio.')
    u.cs('Mi clase',P,'empezar',2,'a las ocho.')
    u.cs('Nosotros',P,'empezar',3,'la tarea temprano.')
    u.cs('Yo',P,'pensar',0,'que el examen es fácil.')
    u.cs('Ellos',P,'pensar',4,'estudiar en la biblioteca.')
    u.cs('Mi amigo',P,'volver',2,'a casa a las tres.')
    u.cs('Yo',P,'volver',0,'a la escuela mañana.')
    u.cs('Nosotros',P,'almorzar',3,'en la cafetería.')
    u.cs('La profesora',P,'repetir',2,'la pregunta.')
    u.cs('Yo',P,'repetir',0,'las palabras nuevas.')
    u.cs('Ustedes',P,'preguntar',4,'mucho en clase.')
    u.cs('Yo',P,'contestar',0,'las preguntas.')
    u.cs('Tú',P,'poder',1,'usar la calculadora.')
    u.cs('Mis compañeros',P,'tener',4,'un examen hoy.')
    u.cs('Yo',P,'ir',0,'al laboratorio.')
    u.cs('La clase de arte',P,'ser',2,'divertida.')
    u.cs('Nosotros',P,'ser',3,'buenos estudiantes.')
    u.cs('Yo',P,'sacar',0,'buenas notas.')
    u.cs('Mi hermana',P,'sacar',2,'buenas notas en ciencias.')
    u.hs('Son ____ dos de la tarde.','las','Use las for any hour after one o’clock.')
    u.hs('Es ____ una y media.','la','Use la for one o’clock: es la una.')
    u.hs('La clase empieza ____ las nueve.','a','Use a + las to say the time of an event.')
    return u
