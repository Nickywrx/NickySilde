window.onload=function(){
    
    swipeLeft();

   
    // swipeRight()
}

function swipeLeft(){
    var leftBox=document.querySelector('.body-left');
    var ul=leftBox.querySelector('ul');
    var lis=ul.querySelectorAll('li');
    var rightins=document.querySelectorAll('.right-in ul');
    // console.log(lis);
    var currentY=0;
 
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight-520;

    var maxSwipe=maxTop+240;
    var minSwipe=minTop-240;
    var addTransition=function(){
        ul.style.webkitTransition='transform 0.4s';
        ul.style.transition='transform 0.4s';
    }
    var removeTransition=function(){
        ul.style.webkitTransition='none';
        ul.style.transition='none';
    }
    var setTranslateY=function(translateY){
        ul.style.webkitTransform='translateY('+translateY+'px)';
        ul.style.transform='translateY('+translateY+'px)';
    }


    itcast.tap(ul,function(event){
        var target= event.target.parentNode;
        console.log(currentY);
        if($(target).text().length>4){
            alert(123);
        }
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('current');
            lis[i].index=i;
             lis[i].setAttribute('atr',i);
            $(rightins[i]).removeClass('active'); 
        }
       
        target.classList.add('current');
        // rightins[target.getAttribute('atr')].classList.add('active');
        $(rightins).eq($(target).attr('atr')).addClass('active');
        
        var y=-50*target.index;
        
        if(y>maxTop){
            y=maxTop;
        }

        if(y<minTop){
            y=minTop;
        }
        addTransition();
       
        setTranslateY(y);

        currentY=y; 
    

        if(currentY<-599){
        $('.back').show()
        $('.back').on('click',function(event){
            var y=leftBox.offsetHeight-ul.offsetHeight;
            addTransition();
           
            setTranslateY(y);

            currentY=y; 
            console.log(123);
    })
    }

    });

    
    var startY=0;
    var moveY=0;
    var distanceY=0;
    leftBox.addEventListener('touchstart',function(e){
        startY= e.targetTouches[0].clientY;
    });

    leftBox.addEventListener('touchmove',function(e){
        moveY= e.targetTouches[0].clientY;
        distanceY=moveY-startY;
        
        var y=currentY+distanceY;
        
        if(y>maxSwipe){
            y=maxSwipe;
        }
        if(y<minSwipe){
            y=minSwipe;
        }
        removeTransition();
        setTranslateY(y);
    });

    leftBox.addEventListener('touchend',function(){
       
        currentY=currentY+distanceY;
       
        if(currentY>maxTop){
            currentY=maxTop;
            addTransition(); 
            setTranslateY(currentY); 
        }
        if(currentY<minTop){
            currentY=minTop;
            addTransition(); 
            setTranslateY(currentY); 
        }

       
        startY=0;
        moveY=0;
        distanceY=0;
    })
    
    
}