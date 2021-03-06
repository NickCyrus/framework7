var pictureSource;    
var destinationType;
var strImgBase64
    
document.addEventListener("deviceready",onDeviceReady,false);

var rta = 'http://www.lomejordebarranquilla.com/app.php';


function onDeviceReady() {
        pictureSource   = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;   
}

 
    function capturaScreen(){
        
        $('header').css('visible','hidden');
        
        
        var nameField = 'capture-'+getRandom(1,999999999);
        navigator.screenshot.URI(function(error,res){
        // navigator.screenshot.save(function(error,res){  
          if(error){ 
            alert(error); 
          }else{
              strImgBase64 =  res.URI
              window.plugins.socialsharing.share('Cupon', 'Cupon', strImgBase64 , null);
              
          }
        },'jpg',100,nameField);
        $('header').css('visible','inherit');
        
    }

    function getRandom(min, max) { 
        return Math.random() * (max - min) + min;
}

app = {

           main : function(){
                        
                            window.location.href = "#main";
                            creandoapp.setNavigator('main');
               
                           if (window.history && window.history.pushState) {

                            $(window).on('hashchange', function(e) {
                               
                               
                                var hash = creandoapp.getLastNav();

                                if (this.cancelBack){
                                        location.hash = '#'+hash;
                                        return false;
                                }

                                var hashLocation = location.hash.replace('#','');

                                if ( hash != hashLocation && hashLocation ) {
                                        if (hash =='main') { location.hash = "#main"; return false; } 
                                        creandoapp.pageOut(hash);
                                }
                                
                                console.log(creandoapp.navApp)
                                
                            });
                      }
               
                        $.ajax({
                                beforeSend : function(){
                                    
                                  creandoapp.modalWait({
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
                                       imagesHome  = imagesHome + "<div class='item'><img src='"+image+"' /></div>";
                                    })
                                     
                                    $('#home-slider .swiper-container').append(imagesHome);
                                    $('#home-slider .swiper-container').owlCarousel({
										        items:1
										})
									 
							  }
                           },

                           complete: function(){
									creandoapp.modalClose()
                           },

                           error: function(){

                           }

                      }) 


                  $('.list-option li').on('click',function(){

                  		  var category =  $(this).attr('data');
                          var nameBakc =  $(this).attr('data-nameBack');  
                  		  $.ajax({
                                beforeSend : function(){
                                  $('#grid').html('')
                                  
                                  window.location.href = "#"+nameBakc;
                                  creandoapp.setNavigator(nameBakc);
                                    
                                  $('#slide-contenido .swiper-container').html('');  
                                  creandoapp.modalWait({
                                        title: '<center>Buscando...</center>',
                                        text: '<center><img src="images/loading.svg" /></center>'
                                    })  
                           		},
	                           crossDomain: true,
	                           data : 'action=get_cupon_by_category&category='+category,
	                           type: 'POST',
	                           dataType : 'json',
	                           url : rta,
	                           success: function(rs){
	                               
                                   var imagesHome = '';
	                                
                                   if (rs.title){
	                                   		$('#titleCurrent').html(rs.title);
								  	}
                                    
                                    if (rs.grid){
                                            $('#grid').html('')
                                            var i = 0;
                                            $.each(rs.grid.grid_images, function (key, value){
                                                $('#grid').append('<li onclick="app.getCupon('+rs.grid.grid_ID[i]+')"><img src="'+value+'" />');
                                                i++;
                                           })
                                    }
									
                                   if (rs.slide){
	                                   		 
                                    		$('#slide-contenido .swiper-container').html(rs.slide);
                                    	 	var $owl = $('#slide-contenido .owl-carousel');
											$owl.trigger('destroy.owl.carousel');
	                                    	$('#slide-contenido .swiper-container').owlCarousel({
											        items:1
												})
                                    	 
											 
								  	}

	                           },

	                           complete: function(){
								  creandoapp.modalClose()
								   creandoapp.pageIn('grid');

	                           },

                           error: function(){}

                      }) 	  
                      	   
                  })
            },


            getCupon : function(ID){

            			window.location.href = "#cuponInfo";
                        creandoapp.setNavigator('cuponInfo');
            		
            			$.ajax({
                                beforeSend : function(){
                                  creandoapp.modalWait({
                                        title: '<center>Creando Cupon</center>',
                                        text: '<center><img src="images/loading.svg" /></center>'
                                    })  
                           		},
	                           crossDomain: true,
	                           data : 'action=get_cupon_by_ID&id='+ID,
	                           type: 'POST',
	                           dataType : 'json',
	                           url : rta,
	                           success: function(rs){
	                                var imagesHome = '';
	                                if (rs.title){
	                                   		$('#titleCurrentCupon').html(rs.title);
								  	}

									if (rs.cupon){
                                    		$('#cupon-info').html(rs.cupon);
								  	}

	                           },

	                           complete: function(){
										          creandoapp.modalClose()
										          creandoapp.pageIn('cuponInfo')
                               
	                           },

                           error: function(){}

                      })


            },

            shared : function(){
            	   capturaScreen();
            }
}

app.main();