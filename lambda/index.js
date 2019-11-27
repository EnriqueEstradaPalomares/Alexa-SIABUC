// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

const request = require('request');//requiere para realizar trar el json de respuesta
const util = require('util');//se ocupa para poder esperar la respuesta
const Alexa = require('ask-sdk-core');//el SDK de Alexa en Node.js
const {
    getRequestType,
    getIntentName,
    getSlotValue, //se requiere para poder obtener el slotValue de la variable del intent
    getDialogState,
} = require('ask-sdk-core');


const LaunchRequestHandler = { //este metodo es el de entrada, define que se hace al momento de entrar a la skill
    canHandle(handlerInput) { //indica que esta entrada es un intentRequest
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'; //especifica que intent inicia
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a la app de SIABUC, dime, ¿Qué es lo que estás buscando?';//respuesta de iniciacion de la skill
        return handlerInput.responseBuilder//crea la respuesta
            .speak(speakOutput)//envia la respuesta
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Buscar libro
const BuscarLibroIntent = { //intent BuscarLibro
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuscarLibroIntent'; //especifica que intent inicia
    },
    async handle(handlerInput) {//obtiene el json de respuesta y el funcionameinto del intent
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'libroo'); //obtiene el valor de libroo checar el build de BuscarLibroIntent
        //const nameAutor = getSlotValue(handlerInput.requestEnvelope, 'autor'); //obtiene el valor de autor agregar las frases en BuscarLibroIntent que ahora se relacionen con autor
        var speakOutput = "";                                                       //variable que tendra la cadena de respuesta
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + nameBook; //API de SIABUC, agregando el titulo del libro
        const requestPromise = util.promisify(request);                             //checar al final del archivo
        const response = await requestPromise(url);
        var consulta = JSON.parse(response.body);
        const long = Object.keys(consulta).length;                                  //obtiene la longitud del json de respuesta

        if (long !== 0) { //si la longitud del json es > 0 no esta vacio
            if (consulta[0].ejemplares >= 1) {//si hay almenos un ejemplar del libro buscado
                speakOutput = 'El libro ' + consulta[0].titulo + ' por ' + consulta[0].autor + ' está disponible, pregúntale a algún bibliotecario por información de su ubicación'; //respuesta, cabe mencionar que tomara el primer registro, entre mas especifico sea la busqueda mas precisa
            }
            else {//por el contrario, si los no hay ningun ejemplar
                speakOutput = 'Discúlpame, el libro ' + consulta[0].titulo + ' no está disponible, puedes reintentarlo siendo un poco más específico';//respuesta

            }
        }

        else {//por el contrario, si la longitud del json es 0
            speakOutput = "Por desgracia, el libro  " + nameBook + " no está registrado en SIABUC, si lo entendí mal, intenta buscarlo de nuevo"; //respuesta 
        }

        return handlerInput.responseBuilder  //constructor de la respuesta al intent
            .speak(speakOutput)             //regresa la respuesta 
            .reprompt('si deseas realizar otra búsqueda, solo dímelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//MostPopularIntent
const MostPopularIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MostPopularIntent'; //indica que este sera el MostPopularIntent
    },
    handle(handlerInput) {//funcionamiento de la skill
        const speakOutput = 'Por el momento no se como responder a tu pregunta, Aun estoy aprendiendo esta habilidad.';//respuesta predefinida 
        return handlerInput.responseBuilder//crea la respuesta
            .speak(speakOutput)//envia la respuesta a Alexa
            .reprompt('si deseas realizar otra búsqueda, solo dímelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();

    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'; //inicia AmazonHelpIntent
    },
    handle(handlerInput) {
        const speakOutput = 'Muy bien, si deseas buscar un libro solamente dime el título, por ejemplo: estoy buscando el libro de La divina Comedia, si no sabes algún libro, te puedo ayudar dándote el título de algún libro relacionado con el tema que estas pidiendo, por ejemplo: estoy buscando un libro sobre Aritmética.';//respuesta de alexa con ayuda al usuario

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' //tanto CancelIntent como StopIntent
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adios, que tengas un excelente día';//respuesta que despide al usuario y cierra la skill
        return handlerInput.responseBuilder //crea la respuesta
            .speak(speakOutput)//envia la respuesta
            .getResponse();
    }
};

const ClasificacionLibroIntent = { //ClacificacionLibroIntent
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' //indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClasificacionLibroIntent';//indica que este es ClasificacionIntentRequest
    },
    async handle(handlerInput) {//obtiene el json de respuesta y realiza el funcionamiento del intent
        const nameBook = getSlotValue(handlerInput.requestEnvelope, 'libro');//obtiene el value de la variable, se debe de colocar el nombre de la variable dada en el build
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + nameBook;//le pasa la api mas la variable
        const requestPromise = util.promisify(request);//promesa asincrona
        const response = await requestPromise(url);//espera la respuesta
        var consulta = JSON.parse(response.body);//traduce el json y lo aloja en consulta
        var speakOutput="";//guardara la respuesta

        const long = Object.keys(consulta).length;//obtiene la longitud del json
        if (long !== 0) {//si el json no esta vacio, tomara el primer libro dado por el json
            speakOutput = 'La clasificación del libro ' + consulta[0].titulo + ' es ' + consulta[0].clasificacion;//respuesta si el json no esta vacio y encuentra el libro, 
        }
        else {//si el json esta vacio
            speakOutput = "Por desgracia, el libro  " + nameBook + " no está registrado en SIABUC, si lo entendí mal, intenta buscarlo de nuevo";//respuesta si el json esta vacio
        }
        return handlerInput.responseBuilder//constructor de la respuesta
            .speak(speakOutput)//envia la respuesta a Alexa
            .reprompt('si deseas realizar otra búsqueda, solo dímelo')
            .getResponse();
    }
};

//LibroDeTemaIntent
const LibroDeTemaIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LibroDeTemaIntent';//indica que es LibroDeTemaIntent
    },
    async handle(handlerInput) {//obtiene el json de respuesta y realiza el funcionamiento del intent
        const tema = getSlotValue(handlerInput.requestEnvelope, 'tema');//obtiene el value de la variable en el build, debe agregarse el nombre de la variable que deseas obtener
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;//le pasa la api mas la variable
        const requestPromise = util.promisify(request);//promesa asincrona
        const response = await requestPromise(url);//espera la respuesta 
        var consulta = JSON.parse(response.body);//traduce el json y lo aloja en consulta

        const long = Object.keys(consulta).length;//obtiene la longitud del json
        var x = Math.floor((Math.random() * long) + 1);//obtiene un numero aleatorio entre 0 y la longitud del json
        const speakOutput = 'Te puede interesar el libro ' + consulta[x].titulo + ' por ' + consulta[x].autor;//respuesta, regresa el libro en la posicion x del json
        return handlerInput.responseBuilder//crea la respuesta
            .speak(speakOutput)//envia la respuesta a Alexa
            .reprompt('si deseas realizar otra búsqueda, solo dímelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//ClasificacionPorTemaIntent
const ClasificacionPorTemaIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClasificacionPorTemaIntent';//indica que es ClasificacionPorTemaIntent
    },
    async handle(handlerInput) {//obtiene el json de respuesta y realiza el funcionamiento del intent
        const tema = getSlotValue(handlerInput.requestEnvelope, 'tema');//obtiene el value de la variable dada en build, se debe poner el nombre de la variable que desea obtener
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;//la pasa la api mas la variable
        const requestPromise = util.promisify(request);//promesa asincrona
        const response = await requestPromise(url);//espera la respuesta
        var consulta = JSON.parse(response.body);//traduce el json de respuesta y lo aloja en consulta
        const long = Object.keys(consulta).length;//obtiene la longitud del json

        var x = Math.floor((Math.random() * long) + 1);//obtiene un numero aleatorio entre 0 y longitud
        const speakOutput = 'La clasificación del libro ' + consulta[x].titulo + ' es ' + consulta[x].clasificacion;//respuesta, regresa un el titulo y clasificacion de un libro de forma aletoria 
        return handlerInput.responseBuilder//crea la respuesta
            .speak(speakOutput)//envia la respuesta a Alexa
            .reprompt('si deseas realizar otra búsqueda, solo dímelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }

};


//ListaLibrosIntent
const ListaLibrosIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'//indica que es un intent
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListaLibrosIntent';//indica que es ListaLibrosIntent
    },
    async handle(handlerInput) {//obtiene el json de respuesta y funcionamiento del intent
        const tema = getSlotValue(handlerInput.requestEnvelope, 'book');//obtiene el value de la variable en build, requiere el nombre de la variable
        let url = 'http://siabuc.ucol.mx:3000/api/v1.1/fichas/busqueda/' + tema;//le pasa la api mas la variable
        const requestPromise = util.promisify(request);//promesa asincrona
        const response = await requestPromise(url);//espera la respuesta
        var consulta = JSON.parse(response.body);//traduce el json y lo aloja en consulta
        var long = Object.keys(consulta).length;//obtiene la longitud del json
        var speakOutput = 'Estos son los libros de ' + tema + ' que encontre.\n ';//aloja la respuesta, pero ya tiene esta respuesta precargada
        if (long !== 0) {//si el json tiene uno o mas libros

            if (long > 10) { long = 11; }//si el json tiene mas de 10 libros, entonces long cambia su valor a 11, de lo contrario, long quedara con su valor dado al momento de su declaracion

            for (var i = 0; i < long - 1; i++) {//inicia desde 0, en este caso, como long es 11 se le resta uno, ya que aveces, son 10 exactos, pero el decimo libro es una confirmacion, y aumentara
                speakOutput += 'Libro ' + (i + 1) + ': La clasificación del libro ' + consulta[i].titulo + ', es ' + consulta[i].clasificacion + '.\n';//respuesta, regresa una cadena con el listado de libros, maximo son 10
            }

        }
        else {//si el json esta vacio
            speakOutput = "Por desgracia, no encontre ningun libro sobre  " + tema + " intenta buscarlo de nuevo";//respuesta
        }

        return handlerInput.responseBuilder//construlle la respuesta
            .speak(speakOutput)//envia la respuesta a Alexa
            .reprompt('si deseas realizar otra búsqueda, solo dímelo')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {//este intent pasa cuando el intent existe, pero alexa no puede procesarlo
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;//regresa el nombre del intent

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {//cuando Alexa no entiende el intent
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Discúlpame, no entendí lo que dijiste, podrias repetirlo porfavor`;//respuesta

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()//se requiere para pasar los intents
    .addRequestHandlers(//los intents deben de ser colocados aqui, si no entrara al IntentReflectorHandle o simplemete la skill se cerrara
        LaunchRequestHandler,
        MostPopularIntent,
        LibroDeTemaIntent,
        ListaLibrosIntent,
        ClasificacionLibroIntent,
        ClasificacionPorTemaIntent,
        BuscarLibroIntent,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
    /*Extras.
    - se puede agregar autor en BuscarLibroIntent, solo de descomentar el autor, agregar en build las frases, y agregar el valor en el envio de la api
    - todos los intents necesitan el json, se podria crear una funcion que haga esa chamba, y solo se envie el intent*/
