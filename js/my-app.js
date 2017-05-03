// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// myApp.showPreloader();

 
 

var rta = 'http://www.lomejordebarranquilla.com/app.php';
//rta = 'http://192.168.1.9/android/app/framework7/json.php';
app = {

           main : function(){

                        $.ajax({
                                beforeSend : function(){
                                  myApp.modal({
                                        title: '<center>Cargando</center>',
                                        text: '<center><img src="images/loading.svg" /></center>'
                                    })  
                           },
                           crossDomain: true,
                           data : 'action=get_cupon',
                           type: 'POST',
                           dataType : 'json',
                           url : rta,
                           success: function(rs){
                                
                                var imagesHome = '';

                                if (rs.res.home){
                                    
                                    $.each(rs.res.home , function (i, image){
                                       imagesHome  = imagesHome + "<div class='swiper-slide'><img src='"+image+"' /></div>";
                                         
                                    })
                                    
                                    $('.swiper-wrapper').append(imagesHome);
                                }
                              
                                myApp.swiper('.swiper-container', { pagination:'.swiper-pagination'});
                           },
                           
                           complete: function(){

                                myApp.closeModal()
                           },

                           error: function(){

                           }

                   }) 


            }  

}

app.main()