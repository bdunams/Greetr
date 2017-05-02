;(function(global, $) {
    
    // 'new' object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }
    
    // hidden within the scope of the IIFE and never directly accessible
    // English, Spanish, French, Chinese, Arabic
    var supportedLangs = ['en', 'es', 'fr', 'zh', 'ar'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Bonjour',
        zh: 'Nǐ hǎo',
        ar: 'marhabaan'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'Salutations',
        zh: 'Wènhòu',
        ar: 'tahiat tayiba'
    };
    
    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        fr: 'Connecté',
        zh: 'Dēnglù',
        ar: 'tasjil alddukhul'
    }
    
    // prototype holds all methods for efficiency
    Greetr.prototype = {
        
        // 'this' refers to or points to object calling method at execution 
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        // will validate if language is supported (standard language abbreviation ISO 639-1 Code)
        validate: function() {
            // references 'supportedLangs' array within the closure
            if (supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language";
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        // chainable methods return their own containing object
        greet: function(formal) {
            var msg;
            
            //if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            if(console) {
                console.log(msg);
            }
            
            //'this' refers to the calling object at execution time
            //makes the method chainable
            return this;
        },
        
        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // makes method chainable
            return this;
        },
        
        setLang: function(lang) {
            
            // set language
            this.language = lang;
            
            // validate selection
            this.validate();
            
            // make chainable
            return this;
        },
        
        // added jQuery support
        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            // set message to formal or informal
            var msg;
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            // insert msg where jQuery selector is in DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
    };
    
    // function constructor used to make the object without needing to use 'new' 
    // contains object defaults
    Greetr.init = function(firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        self.validate();
        
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand '$G'
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));