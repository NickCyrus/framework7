 
var rta = 'http://www.lomejordebarranquilla.com/app.php';

app = {

           main : function(){

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

                  		  $.ajax({
                                beforeSend : function(){
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
										creandoapp.pageIn('contenido');

	                           },

                           error: function(){}

                      }) 	  
                      	   
                  })
            },


            getCupon : function(ID){

            			
            		
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
            	 
            }
}

app.main();