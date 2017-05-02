// gets a new object (architecture doesn't require 'new')
var g = G$('Brian', 'Dunams', 'en');

// use our chainable methods
g.greet('formal').setLang('es').greet();

// let's use our object on the click of the login button
$('#login').click(function(){
    
    // create a new 'Greetr' object (is if we know the login name already)
    var loginGrtr = G$('Brian', 'Dunams');
    
    $('#logindiv').hide();
    
    // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and long the welcome as well
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
    
});