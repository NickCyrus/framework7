creandoapp = {

          
            getWidth  : function(ele){  return $(ele).width(); },  
            getHeight : function(ele){  return $(ele).height(); },
            getinnerWidth : function(ele){  return $(ele).innerwidth(); },  
            getinnerHeight : function(ele){  return $(ele).innerHeight(); },      
            getWindow  : function (){
                      var size = [];
                      size[0] =  this.getWidth(window);
                      size[1] =  this.getHeight(window);  
            } ,

            main : function(){
                  this.modal()
                  this.preparePages();
                 
            },

            heightHeader : function(){
                  
                   if ($('view + header').length){
                           var marginTop = $('header').css('margin-top').split('px')
                         return ((this.getinnerHeight('header')) + parseInt(marginTop[0]));    
                  }

                   return 0; 
            },

            setPositionDefault : function(datapage){
                  var page    = $('.page[data-page="'+datapage+'"]');
                  var Default = page.attr('data-origen');
                  page.attr('style',Default);
                  
            }, 
            preparePages : function(){

                $('.page').each(function(){

                  // Establecemos el width y heigth
                      var page   = $(this)
                      var dataIn = page.attr('data-in');


                      if ($('header').length){
                           $(this).css({
                                    'width' : creandoapp.getWidth(window),
                                    'height' : (creandoapp.getHeight(window) - creandoapp.heightHeader()), 
                                  })
                      }else{
                           $(this).css({
                                    'width' : creandoapp.getWidth(window),
                                    'height' : creandoapp.getHeight(window), 
                          })
                      }

                    // Se posicionan las paginas según su data-in
                    
                     switch(dataIn){
                        case 'left':
                            page.css({right : creandoapp.getWidth(window) });
                        break;
                        case 'right':
                            page.css({left : creandoapp.getWidth(window) });
                        break;
                        case 'downUp':
                            page.css({top : creandoapp.getHeight(window) });
                        break;
                        case 'upDown':
                            page.css({bottom : creandoapp.getHeight(window) });
                        break;
                     }

                      page.attr('data-origen',page.attr('style')); 

                })

            },

            pageOut : function(datapage){
                  var page = $('.page[data-page="'+datapage+'"]');
                  var animate  = page.attr('data-out');
                  if (!animate) animate = page.attr('data-in');
                  switch(animate){
                        case 'left':
                            page.animate({right : this.getWidth(window) },300, function(){
                                  creandoapp.setPositionDefault(datapage)
                            });
                        break;
                        case 'right':
                            page.animate({left : this.getWidth(window) },300, function(){
                                  creandoapp.setPositionDefault(datapage)
                            });
                        break;
                         
                        case 'upDown':
                            page.animate({top : this.getHeight(window) },300 , function(){
                                  creandoapp.setPositionDefault(datapage)
                            });
                        break;

                  }
 
                 // this.setPositionDefault(datapage);  

            },

            pageIn : function(datapage){

                  var page = $('.page[data-page="'+datapage+'"]');
                  var animate  = page.attr('data-in');
                  if (!animate) animate = page.attr('data-out');


                  switch(animate){
                        case 'left':
                            page.show();
                            page.animate({right : 0 },300);
                        break;
                        case 'right':
                            page.show();
                            page.animate({left : 0 },300);
                        break;
                        case 'downUp':
                            page.show();
                            page.animate({top : this.heightHeader() },300);
                        break;
                        case 'upDown':
                            page.show();
                            page.animate({top : this.heightHeader() },300);
                        break;
                  }

                  // this.preparePages();



            },


            moveLeft : function( datapage ){
                  $('.page[data-page="'+datapage+'"]').animate({left : '-'+app.getWS() },500);
            },

            modal : function(){
                $("body").append("<div class='modal-overlay'></div>");
            },

            modalOverlay : function(action){

                  switch(action){
                      case 'show': 
                        $('.modal-overlay').addClass('modal-overlay-visible')
                       break;
                      case 'hide': 
                        $('.modal-overlay').removeClass('modal-overlay-visible')
                        $('.modal').remove();
                       break; 
                  }

            }, 

            modalWait : function( obj ){
                $("body").remove('.modal');  
                var wait = '<div class="modal modal-no-buttons modal-in" style="display: block; margin-top: -70px; "><div class="modal-inner">'
                if (obj.title) wait += '<div class="modal-title"><center>'+obj.title+'</center></div>';
                if (obj.text) wait += '<div class="modal-text"><center>'+obj.text+'</center></div>';  
                wait += '</div>'
                this.modalOverlay('show');
                $("body").append(wait);    


            },

            modalClose : function(){

                  $('.modal').addClass('modal-out');
                  this.modalOverlay('hide');


            }





}


creandoapp.main(); 