$(function() {
   init();
   
   $('.itemCell').each(function() {
       var obj=$(this)[0]; 
       var touchStartX = 0;
       var touchStartY = 0; 
       var targetElement={};
       obj.addEventListener("touchstart", function(t){
              var r,n;
              r = t.targetTouches[0];
              n = t.target;
              targetElement = n;
              touchStartX = r.pageX;
              touchStartY = r.pageY;
       }, !1);
       obj.addEventListener("touchmove", function(t){
           var e = t.changedTouches[0],
             n = 50;
           return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;
       }, !1);
       obj.addEventListener("touchend",function(t){
             
              var e = t.changedTouches[0],f = document.elementFromPoint(e.pageX - t.pageXOffset, l.pageY - e.pageYOffset);
           
             n = 50;
           var res=Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;     
           var newNode=t.targetTouches[0];
           var left= newNode.style.left;
           var top=newNode.style.top;
           console.log(left+','+top);
           // t.target.style.left=targetElement.style.left;
           // t.target.style.top=targetElement.style.top;
           // targetElement.style.left=left;
           // targetElement.style.top=top;
       } , !1);
       obj.addEventListener("touchcancel", function(){
         targetElement = null;        
       }, !1);
   });
    
});

function PosA() {
    var arr = [];
    for (var i = 0; i < 100000; i++) {
        r = Math.floor(Math.random() * 9);
        var flag = 1;
        for (var j = 0; j < arr.length; j++) {
            if (r == arr[j]) {
                flag = 0;
            }
        }
        if (flag && (arr.length <= 9)) {
            if (arr.length <= 9) {
                arr.push(r);
            }
        }
    }
    return arr;
}

function init() {
    var ops = [
        [0, 0],
        ['1rem', 0],
        ['2rem', 0],
        ['0', '1rem'],
        ['1rem', '1rem'],
        ['2rem', '1rem'],
        ['0', '2rem'],
        ['1rem', '2rem'],
        ['2rem', '2rem']
    ];
    var posArr = PosA();
    $('.itemCell').each(function() {
        $(this).css({ 'left': ops[posArr[$(this).index()]][0], 'top': ops[posArr[$(this).index()]][1] });
    });
}
    function dropItem() {
        this.touchStartX = 0;
        this.touchStartY = 0;       
    }
    dropItem.prototype.onTouchStart = function(t) {
        var n;
        r = t.targetTouches[0];
        n = t.target;
        this.targetElement = n;
        this.touchStartX = r.pageX;
        this.touchStartY = r.pageY;
        console.log(this.touchStartY + ',' + this.touchStartX);
    };
    dropItem.prototype.onTouchMove = function(t) {
           var e = t.changedTouches[0],
             n = 50;
           return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;
    };
    dropItem.prototype.onTouchEnd = function(t) {          
           var res=this.onTouchMove(t);
           console.log(res);
    };
    dropItem.prototype.onTouchCancel = function() {
        this.targetElement = null;
    };
