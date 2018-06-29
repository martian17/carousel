(function(){
    var init = function(configs){
        for(var key in configs){//overriding the default setings
            config[key] = configs[key];
        }
        //getting the carousel class from the document
        var carousels = document.getElementsByClassName("carousel");
        for(var i = 0; i <carousels.length; i++){
            var carousel = carousels[i];
            initCarousel(carousel);
        }
    };

    var initCarousel = function(carousel){

        var config = {};
        config.criteria = true;

        //initiating children
        var children0 = carousel.children;
        var children = [];
        for(var i = 0; i < children0.length; i++){
            children[i] = children0[i]
        }//end initiating children

        var clength = children0.length;
        var castate = [0,clength];//this one, length

        //dom setup
        //position relative for the carousel
        var inner = document.createElement("div");

        //dom overwrap area
        var left = document.createElement("div");
        var right = document.createElement("div");
        var under = document.createElement("div");
        left.style="position:absolute;height:100%;width:50%;top:0px;left:0px;";
        right.style="position:absolute;height:100%;width:50%;top:0px;right:0px;";
        under.style="position:absolute;bottom:0px;left:calc(50%-30px);overflow:hidden;";



        inner.style="width:100%;height:100%;position:relative;overflow:hidden;";
        inner.style.paddingTop = carousel.getAttribute("ratio")||"30%";
        for(var i = 0; i < children.length; i++){
            console.log(i);
            var child = children[i];
            child.style="width:100%;height:100%;top:0px;position:absolute;left:1000000px;";
            inner.appendChild(child);

            //overwrap button
            var temp = function(i,child){
                var b = document.createElement("div");
                child.button = b;
                b.style="float:left;margin:5px;width:10px;height:10px;background-color:#888;border-radius:50%;";
                b.addEventListener("click",function(){
                    config.criteria = false;
                    goTo(i);
                });
                under.appendChild(b);
            };
            temp(i,child);
        }
        children[0].style.left = "0px";
        carousel.appendChild(inner);
        inner.appendChild(left);
        inner.appendChild(right);
        inner.appendChild(under);
        var thisChild = children[0];

        var nextChild = function(){
            var thisOne = castate[0];
            castate[0]++;
            if(castate[0] === castate[1])castate[0] = 0;
            //going forward
            //initial condition for next frame
            children[castate[0]].style.left = carousel.offsetWidth+"px";//next one
            children[castate[0]].style.transition = "";
            //animate
            setTimeout(function(){
                children[thisOne].style.transition = "all.5s";
                children[thisOne].style.left = -1*carousel.offsetWidth+"px";
                children[castate[0]].style.transition = "all.5s";
                children[castate[0]].style.left = "0px";
                //children[thisOne].button.classList.remove("current-button");
                //children[castate[0]].button.classList.add("current-button");
                children[thisOne].button.style.backgroundColor="#888";
                children[castate[0]].button.style.backgroundColor="#666";
            },0);
        };
        var previousChild = function(){
            var thisOne = castate[0];
            castate[0]--;
            if(castate[0] === -1)castate[0] = castate[1]-1;
            //going backword
            //initial condition for next frame
            children[castate[0]].style.left = -1*carousel.offsetWidth+"px";//next one
            children[castate[0]].style.transition = "";
            //animate
            setTimeout(function(){
                children[thisOne].style.transition = "all.5s";
                children[thisOne].style.left = carousel.offsetWidth+"px";
                children[castate[0]].style.transition = "all.5s";
                children[castate[0]].style.left = "0px";
                //children[thisOne].button.classList.remove("current-button");
                //children[castate[0]].button.classList.add("current-button");
                children[thisOne].button.style.backgroundColor="#888";
                children[castate[0]].button.style.backgroundColor="#666";
            },0);
        };
        var goTo = function(n){
            var diff = n-castate[0];
            if(diff > 0){//forward
                callFunction(nextChild,diff,100);
            }else if(diff < 0){//backword
                callFunction(previousChild,-1*diff,100);
            }
        }

        var callFunction = function(callback,n,t){
            var interval = t/n;
            console.log(interval);
            var i = 0;
            var func = function(){
                if(i === n)return false;
                callback();
                setTimeout(func,interval);
                i++;
            };setTimeout(func,interval);
        };


        children[0].style.left = "0px";
        carousel.appendChild(inner);
        inner.appendChild(left);
        inner.appendChild(right);
        inner.appendChild(under);
        left.addEventListener("click",function(){config.criteria = false;previousChild();});
        right.addEventListener("click",function(){config.criteria = false;nextChild();});




        var itr = 0;
        var loop = function(){
            if(!config.criteria || itr+1 >= clength)return false;
            itr++;
            nextChild();
            setTimeout(loop,2000);
        };setTimeout(loop,2000);

    };
    init();
}());