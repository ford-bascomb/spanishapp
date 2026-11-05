from tlib import *
def rutina():
    u=Unit('rutina','La rutina diaria','Reflexive verbs, stem-changing reflexives, and putting your day in order.')
    u.v("""el despertador=alarm clock
la mañana=morning
la tarde=afternoon
la noche=night
temprano=early
tarde=late
el cepillo de dientes=toothbrush
la pasta de dientes=toothpaste
el jabón=soap
el champú=shampoo
la toalla=towel
el peine=comb
el espejo=mirror
el pelo=hair
los dientes=teeth
la cara=face
las manos=hands
el baño=bathroom
la ducha=shower
el desayuno=breakfast
el almuerzo=lunch
la cena=dinner
primero=first
luego=then
después=afterward
finalmente=finally
antes de=before
después de=after
siempre=always
a veces=sometimes
nunca=never
todos los días=every day
la rutina=routine
el pijama=pajamas
la mochila=backpack
la tarea=homework
el autobús=bus
despertarse=to wake up
levantarse=to get up
acostarse=to go to bed""")
    u.n('Reflexive verbs','A reflexive verb shows that the subject does the action to itself. The infinitive ends in -se (levantarse, ducharse).\nPut the reflexive pronoun before the conjugated verb:\n- yo → me\n- tú → te\n- él / ella / Ud. → se\n- nosotros → nos\n- ellos / ellas / Uds. → se\nExample: Yo me levanto a las siete. Ellos se duchan por la mañana.')
    u.n('Stem-changing reflexives','Conjugate the verb as usual, then add the pronoun. Boot verbs still change in yo, tú, él/ella and ellos, and nosotros keeps the original stem.\n- despertarse (e→ie): me despierto, te despiertas, se despierta, nos despertamos, se despiertan\n- acostarse (o→ue): me acuesto, te acuestas, se acuesta, nos acostamos, se acuestan\n- vestirse (e→i): me visto, te vistes, se viste, nos vestimos, se visten\nPonerse has an irregular yo form: me pongo. Irse: me voy, te vas, se va, nos vamos, se van.')
    u.n('Body parts and clothing','With reflexive verbs, use el, la, los or las instead of mi or tu.\nMe lavo las manos. Se cepilla los dientes. Nos ponemos los zapatos.')
    u.n('Reflexive or not?','Without the pronoun, the action goes to someone else. Compare: Ana se acuesta (Ana puts herself to bed) and Ana acuesta a su hermano (Ana puts her brother to bed).')
    u.n('Putting your day in order','Sequence words: primero, luego, después, finalmente.\nUse antes de and después de with an infinitive. Reflexive pronouns attach to the infinitive and match the subject: Antes de acostarme, me cepillo los dientes. Después de ducharnos, desayunamos.')
    P='present'
    u.cs('Yo',P,'levantarse',0,'a las seis y media.')
    u.cs('Mi hermana',P,'ducharse',2,'por la mañana.')
    u.cs('Nosotros',P,'acostarse',3,'tarde los sábados.')
    u.cs('Tú',P,'despertarse',1,'muy temprano.')
    u.cs('Mis padres',P,'vestirse',4,'antes de desayunar.')
    u.cs('Yo',P,'ponerse',0,'el abrigo cuando hace frío.')
    u.cs('Ana',P,'cepillarse',2,'los dientes después de comer.')
    u.cs('Nosotros',P,'peinarse',3,'delante del espejo.')
    u.cs('Tú',P,'dormirse',1,'en el autobús.')
    u.cs('Mis amigos',P,'divertirse',4,'mucho en la fiesta.')
    u.cs('Yo',P,'sentarse',0,'en la primera fila.')
    u.cs('Mi padre',P,'afeitarse',2,'todas las mañanas.')
    u.cs('Nosotros',P,'lavarse',3,'las manos antes de comer.')
    u.cs('Tú',P,'llamarse',1,'Carlos, ¿verdad?')
    u.cs('Yo',P,'irse',0,'de la escuela a las tres.')
    u.cs('Ellos',P,'bañarse',4,'por la noche.')
    u.cs('Yo',P,'quitarse',0,'los zapatos en casa.')
    u.cs('Mi hermano',P,'dormirse',2,'a las diez.')
    u.cs('Nosotros',P,'despertarse',3,'con el despertador.')
    u.cs('Ellos',P,'sentirse',4,'cansados.')
    u.hs('Después de ____ (comer), me cepillo los dientes.','comer','Después de + infinitive: the verb stays in the infinitive.')
    u.hs('Me lavo ____ manos.','las','With body parts, use el, la, los or las, not mi.')
    u.hs('Primero me ducho y ____ me visto.','luego / después','Sequence words: primero, luego, después.')
    u.hs('Ellos ____ levantan a las siete.','se','Ellos uses the reflexive pronoun se.')
    u.hs('Nosotros ____ divertimos en el parque.','nos','Nosotros uses the reflexive pronoun nos.')
    u.hs('Tú ____ acuestas temprano.','te','Tú uses the reflexive pronoun te.')
    u.hs('Yo ____ ducho por la mañana.','me','Yo uses the reflexive pronoun me.')
    u.hs('Antes de ____ (acostarse), me cepillo los dientes.','acostarme','The pronoun attaches to the infinitive and matches the subject (yo → me): acostarme.')
    return u
def comida():
    u=Unit('comida','La comida y el restaurante','Food and restaurant vocabulary, ordering, object pronouns, and stem-changing verbs.')
    u.v("""la comida=food, meal
el restaurante=restaurant
el camarero=waiter
la camarera=waitress
el menú=menu
la cuenta=bill
la propina=tip
la mesa=table
el plato=dish, plate
el vaso=glass
la taza=cup
el tenedor=fork
la cuchara=spoon
el cuchillo=knife
la servilleta=napkin
el pollo=chicken
la carne=meat
el pescado=fish
los mariscos=seafood
el arroz=rice
los frijoles=beans
la ensalada=salad
la sopa=soup
el queso=cheese
el huevo=egg
el pan=bread
la fruta=fruit
la verdura=vegetable
las papas=potatoes
el jugo=juice
la leche=milk
el agua=water
el refresco=soft drink
el postre=dessert
el helado=ice cream
la hamburguesa=hamburger
la sal=salt
el azúcar=sugar
delicioso=delicious
picante=spicy
rico=tasty
tener hambre=to be hungry
tener sed=to be thirsty
pedir=to order, to ask for
servir=to serve
probar=to taste, to try
cocinar=to cook
preparar=to prepare
recomendar=to recommend
la receta=recipe
la cocina=kitchen""")
    u.n('Ordering in a restaurant','Useful phrases: Quisiera... / Me gustaría... (I would like...), Para mí... (For me...), La cuenta, por favor.\nTener hambre and tener sed use tener, not ser: Tengo mucha hambre. Tenemos sed.\nPedir means to order or ask for. Servir means to serve. Both change e→i in the present (pido, pides, pide, pedimos, piden).')
    u.n('Direct object pronouns','A direct object pronoun replaces the noun that receives the action.\n- me, te, nos\n- lo (him, it masc.), la (her, it fem.)\n- los (them masc.), las (them fem.)\nPut it before the conjugated verb: ¿Quién preparó las papas? Mi padre las preparó. Pido la sopa. La pido con pan.\nWith an infinitive it can attach: Voy a pedirla. = La voy a pedir.')
    u.n('Stem changes in the preterite (-ir)','Pedir and servir change e→i in the preterite, but only in the él/ella and ellos forms: pidió, pidieron; sirvió, sirvieron. Yo, tú and nosotros stay regular: pedí, pediste, pedimos.')
    u.n('Ser or estar with food','Use estar for how food tastes or looks right now: La sopa está rica. Los frijoles están picantes.\nUse ser for what something is: La sopa es de pollo.')
    P='present';T='preterite'
    u.cs('Yo',P,'pedir',0,'una hamburguesa y un refresco.')
    u.cs('Ana',P,'pedir',2,'la sopa del día.')
    u.cs('Nosotros',P,'pedir',3,'postre.')
    u.cs('El camarero',P,'servir',2,'la comida rápido.')
    u.cs('Tú',P,'servir',1,'el pollo con arroz.')
    u.cs('Yo',P,'probar',0,'la sopa.')
    u.cs('Ellos',P,'probar',4,'los mariscos.')
    u.cs('Mi madre',P,'cocinar',2,'muy bien.')
    u.cs('Nosotros',P,'preparar',3,'una ensalada.')
    u.cs('El camarero nos',P,'recomendar',2,'el pescado.')
    u.cs('Yo',P,'almorzar',0,'en la cafetería.')
    u.cs('Nosotros',P,'almorzar',3,'a las doce.')
    u.cs('Tú',P,'tener',1,'hambre, ¿verdad?')
    u.cs('Yo',P,'tener',0,'sed.')
    u.cs('Ayer yo',T,'pedir',0,'pollo.')
    u.cs('Anoche el camarero',T,'servir',2,'la cena.')
    u.cs('Ellos',T,'pedir',4,'el menú.')
    u.cs('Anoche nosotros',T,'cenar',3,'en un restaurante.')
    u.cs('Mi amigo',T,'probar',2,'los frijoles.')
    u.cs('Tú',T,'beber',1,'agua.')
    u.cs('Ayer yo',T,'cocinar',0,'para mi familia.')
    u.hs('¿Dónde está el menú? — ____ tengo aquí.','lo','Menú is masculine singular, so the pronoun is lo.')
    u.hs('¿Quién preparó las papas? — Mi padre ____ preparó.','las','Papas is feminine plural, so the pronoun is las.')
    u.hs('La cuenta, por favor. — Ahora ____ traigo.','la','Cuenta is feminine singular, so the pronoun is la.')
    u.hs('Me encantan los mariscos. Siempre ____ pido.','los','Mariscos is masculine plural, so the pronoun is los.')
    u.hs('La sopa ____ (estar) rica.','está','Estar for how food tastes right now.')
    u.hs('Los frijoles ____ (estar) picantes.','están','Estar for how food tastes; frijoles is plural.')
    u.hs('Tengo mucha ____ (hunger).','hambre','Tener hambre = to be hungry.')
    return u
def familia():
    u=Unit('familia','La familia y las descripciones','Family vocabulary, describing people, ser and estar, possessive adjectives.')
    u.v("""la familia=family
los padres=parents
la madre=mother
el padre=father
el hermano=brother
la hermana=sister
los hermanos=siblings
el hijo=son
la hija=daughter
el abuelo=grandfather
la abuela=grandmother
los abuelos=grandparents
el tío=uncle
la tía=aunt
el primo=male cousin
la prima=female cousin
el sobrino=nephew
la sobrina=niece
el esposo=husband
la esposa=wife
el gemelo=twin
el vecino=neighbor
alto=tall
bajo=short
delgado=thin
fuerte=strong
joven=young
viejo=old
guapo=handsome
bonito=pretty
simpático=nice
antipático=unpleasant
amable=kind
trabajador=hard-working
perezoso=lazy
divertido=fun
serio=serious
inteligente=intelligent
callado=quiet
castaño=brown
rubio=blond
los ojos=eyes
mayor=older
menor=younger
llevarse bien con=to get along with""")
    u.n('Ser or estar','Ser (DOCTOR): Description, Occupation, Characteristic, Time/date, Origin, Relationship. Mi tío es alto. Mi madre es doctora. Somos de Texas. La fiesta es en mi casa (events use ser).\nEstar (PLACE): Position/Location, How someone feels (a state or condition), Emotion. Mis abuelos están en casa. Hoy estoy cansado.\nForms: soy, eres, es, somos, son and estoy, estás, está, estamos, están.')
    u.n('Adjective agreement','Adjectives agree with the noun in gender and number.\n- -o becomes -a for feminine: alto → alta\n- Adjectives ending in -e or most consonants do not change in gender: inteligente, joven\n- -dor adds an -a: trabajador → trabajadora\n- Add -s after a vowel and -es after a consonant for plural: simpáticos, jóvenes\nMost adjectives go after the noun: una hermana simpática.')
    u.n('Possessive adjectives','mi(s), tu(s), su(s), nuestro/a(s). They agree with the thing owned, not with the owner: mi hermano, mis hermanos, nuestra casa, nuestras casas.\nSu can mean his, her, your (formal), their. Add de + name to clarify: la casa de Ana.')
    u.n('Age and comparisons','Use tener for age: Mi prima tiene quince años.\nmayor = older, menor = younger. Comparisons: más/menos + adjective + que (Soy más alto que mi hermano).')
    S='present'
    u.verbs_only('present','ser estar')
    u.cs('Yo',S,'tener',0,'dos hermanos.')
    u.cs('Mi prima',S,'tener',2,'quince años.')
    u.cs('Nosotros',S,'tener',3,'un perro.')
    u.cs('Mis tíos',S,'tener',4,'tres hijos.')
    u.cs('Mis abuelos',S,'vivir',4,'cerca de nosotros.')
    u.cs('Yo',S,'vivir',0,'con mi madre.')
    u.cs('Nosotros',S,'vivir',3,'en una casa pequeña.')
    u.cs('Yo',S,'querer',0,'mucho a mi familia.')
    u.cs('Mis padres',S,'querer',4,'a todos sus nietos.')
    u.cs('Nosotros',S,'querer',3,'visitar a los abuelos.')
    u.hs('Mi abuela ____ (ser) muy amable.','es','Ser for description (personality).')
    u.hs('Mis primos ____ (estar) en Miami ahora.','están','Estar for location.')
    u.hs('Yo ____ (ser) de Texas.','soy','Ser for origin.')
    u.hs('Mi hermano ____ (estar) cansado.','está','Estar for a condition or how someone feels.')
    u.hs('Nosotros ____ (ser) cuatro en mi familia.','somos','Ser with a number of people in a group.')
    u.hs('Tú ____ (estar) muy contento hoy.','estás','Estar for emotion.')
    u.hs('Mi tío ____ (ser) alto y delgado.','es','Ser for physical description.')
    u.hs('Mis abuelos ____ (estar) en casa.','están','Estar for location.')
    u.hs('La fiesta ____ (ser) en mi casa.','es','Ser tells where an event takes place.')
    u.hs('Hoy mi madre ____ (estar) enferma.','está','Estar for health, a temporary condition.')
    u.hs('Mi hermana es ____ (tall, feminine).','alta','Alto changes to alta for a feminine noun.')
    u.hs('Mis primos son ____ (nice, plural masculine).','simpáticos','Simpático becomes simpáticos in the masculine plural.')
    u.hs('Mi madre es muy ____ (hard-working, feminine).','trabajadora','Adjectives ending in -dor add -a for feminine.')
    u.hs('Mis tías son ____ (intelligent, plural).','inteligentes','Inteligente is the same for both genders; add -s for plural.')
    u.hs('____ (our) casa es grande.','nuestra','Casa is feminine singular: nuestra.')
    u.hs('Ana quiere mucho a ____ (her) abuelo.','su','Su = her, his, their or your (formal). Abuelo is singular.')
    u.hs('Yo veo a ____ (my) primos.','mis','Primos is plural: mis.')
    u.hs('¿Dónde viven ____ (your, informal) padres?','tus','Padres is plural: tus.')
    return u
def casa():
    u=Unit('casa','La casa y los quehaceres','Rooms, furniture, chores, prepositions of place, and estar + gerund.')
    u.v("""la casa=house
el apartamento=apartment
la sala=living room
el comedor=dining room
la cocina=kitchen
el dormitorio=bedroom
el baño=bathroom
el garaje=garage
el jardín=garden
el patio=patio, yard
la escalera=stairs
el piso=floor
la pared=wall
la ventana=window
la puerta=door
el sofá=sofa
la silla=chair
la mesa=table
la cama=bed
el escritorio=desk
la lámpara=lamp
el armario=closet
la estufa=stove
el refrigerador=refrigerator
el lavaplatos=dishwasher
la alfombra=rug
los muebles=furniture
los quehaceres=chores
limpiar=to clean
barrer=to sweep
lavar los platos=to wash the dishes
sacar la basura=to take out the trash
pasar la aspiradora=to vacuum
cortar el césped=to mow the lawn
hacer la cama=to make the bed
poner la mesa=to set the table
ayudar=to help
encima de=on top of
debajo de=under
al lado de=next to
detrás de=behind
delante de=in front of
entre=between
cerca de=near
lejos de=far from""")
    u.n('Estar + place words','Use estar with prepositions to say where something is: encima de, debajo de, al lado de, detrás de, delante de, entre, cerca de, lejos de.\nEl gato está debajo de la cama. La lámpara está encima del escritorio. (de + el = del)')
    u.n('Tener que + infinitive','Tener que + infinitive means have to: Tengo que sacar la basura. Tenemos que limpiar el baño.\nConjugate tener and leave the second verb in the infinitive. Hay que + infinitive means one has to (general): Hay que limpiar la casa.')
    u.n('Present progressive','Use estar + gerund for what is happening right now.\n- -ar → -ando: limpiar → limpiando\n- -er/-ir → -iendo: barrer → barriendo, escribir → escribiendo\n- Irregular: dormir → durmiendo, leer → leyendo, pedir → pidiendo\nMi madre está cocinando. Estoy haciendo la tarea.')
    u.n('Yo forms to know','Hacer → hago, poner → pongo, sacar → saco (regular), salir → salgo. Yo hago la cama. Yo pongo la mesa.')
    P='present';T='preterite'
    u.hs('El sofá está ____ (in front of) la televisión.','delante de','Delante de = in front of.')
    u.hs('La lámpara está ____ (on top of) el escritorio.','encima de','Encima de = on top of.')
    u.hs('El gato está ____ (under) la cama.','debajo de','Debajo de = under.')
    u.hs('La cocina está ____ (next to) el comedor.','al lado de','Al lado de = next to.')
    u.hs('El jardín está ____ (behind) la casa.','detrás de','Detrás de = behind.')
    u.hs('La mesa está ____ (between) las sillas.','entre','Entre = between.')
    u.hs('Mi madre está ____ (cocinar) en la cocina.','cocinando','-ar verbs: stem + -ando.')
    u.hs('Yo estoy ____ (barrer) el patio.','barriendo','-er verbs: stem + -iendo.')
    u.hs('Nosotros estamos ____ (limpiar) la sala.','limpiando','-ar verbs: stem + -ando.')
    u.hs('Mi hermano está ____ (dormir) en el sofá.','durmiendo','Dormir has a stem change in the gerund: durmiendo.')
    u.hs('Ellos están ____ (lavar) los platos.','lavando','-ar verbs: stem + -ando.')
    u.hs('Tú estás ____ (hacer) la tarea.','haciendo','-er verbs: stem + -iendo.')
    u.hs('Yo estoy ____ (leer) en mi cuarto.','leyendo','Leer becomes leyendo (i between vowels → y).')
    u.cs('Yo',P,'tener',0,'que sacar la basura.')
    u.cs('Nosotros',P,'tener',3,'que limpiar el baño.')
    u.cs('Mi hermano',P,'tener',2,'que cortar el césped.')
    u.cs('Ustedes',P,'tener',4,'que hacer las camas.')
    u.cs('Tú',P,'tener',1,'que poner la mesa.')
    u.cs('Yo',P,'hacer',0,'mi cama todas las mañanas.')
    u.cs('Yo',P,'poner',0,'la mesa para la cena.')
    u.cs('Yo',P,'sacar',0,'la basura los lunes.')
    u.cs('Ayer yo',T,'limpiar',0,'mi cuarto.')
    u.cs('Anoche mis padres',T,'lavar',4,'los platos.')
    u.cs('El sábado nosotros',T,'barrer',3,'la cocina.')
    u.cs('Ayer tú',T,'sacar',1,'la basura.')
    u.cs('Anoche ella',T,'poner',2,'la mesa.')
    u.cs('Yo',P,'estar',0,'en la cocina.')
    u.cs('Mis padres',P,'estar',4,'en el jardín.')
    return u
