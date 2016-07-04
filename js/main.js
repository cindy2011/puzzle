$(function() {
    var newObj = init();

    $('.itemCell').each(function() {
        var _this = $(this);
        var obj = $(this)[0];
        var touchStartX = 0;
        var touchStartY = 0;
        var _thisT = '',
            _thisL = '',
            _thisNum = 0;
        var _thatT = '',
            _thatL = '';
        var flag = 0;
        obj.addEventListener("touchstart", function(t) {
            var r, n;
            r = t.targetTouches[0];
            n = t.target;
            touchStartX = r.pageX;
            touchStartY = r.pageY;
            _thisT = _this[0].style.top;
            _thisL = _this[0].style.left;
            _thisNum = _this.index();
            t.preventDefault();
        }, !1);
        obj.addEventListener("touchmove", function(t) {
            var e = t.changedTouches[0],
                n = $('.itemCell').eq(0).width() / 2;
            flag = Math.abs(e.pageX - touchStartX) > n || Math.abs(e.pageY - touchStartY) > n ? !0 : !1;
        }, !1);
        obj.addEventListener("touchend", function(t) {
            if (flag) {
                var e = t.changedTouches[0],
                    l = window;
                f = document.elementFromPoint(e.pageX - l.pageXOffset, e.pageY - l.pageYOffset);
                if (f.className == 'itemCell') {
                    _thatL = f.style.left;
                    _thatT = f.style.top;
                    var Topflag=0,Leftflag=0;
                    if ((_thatL == _thisL) || (_thatT == _thisT)) {
                        if(_thatL==_thisL){
                             var new_thatT=_thatT.replace(/rem/, "");
                             var new_thisT=_thisT.replace(/rem/, "");
                             //console.log(new_thatT+","+new_thisT);
                            if(Math.abs(new_thatT-new_thisT)==2){
                                  Topflag=1;
                            }else{
                                alert('少年，步伐太快了！');
                            }
                        }
                         if(_thatT==_thisT){
                             var new_thatL=_thatL.replace(/rem/, "");
                             var new_thisL=_thisL.replace(/rem/, "");
                            if(Math.abs(new_thatL-new_thisL)==2){
                                  Leftflag=1;
                            }else{
                                alert('少年，步伐太快了！');
                            }
                        }
                        if(Topflag||Leftflag){
                               $(f).css({ 'left': _thisL, 'top': _thisT });
                            $('.itemCell').eq(_thisNum).css({ 'left': _thatL, 'top': _thatT });
                            if (checked(newObj.posArr, newObj.ops)) {
                                alert('拼图成功！');
                            };  
                        }
                        
                    } else {
                        alert('不支持斜滑');
                    }
                }
            }
        }, !1);
        obj.addEventListener("touchcancel", function() {
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
        ['0rem', '0rem'],
        ['2rem', '0rem'],
        ['4rem', '0rem'],
        ['0rem', '2rem'],
        ['2rem', '2rem'],
        ['4rem', '2rem'],
        ['0rem', '4rem'],
        ['2rem', '4rem'],
        ['4rem', '4rem']
    ];
    var posArr = PosA();
    $('.itemCell').each(function() {
        $(this).css({ 'left': ops[posArr[$(this).index()]][0], 'top': ops[posArr[$(this).index()]][1] });
    });
    return { ops: ops, posArr: posArr };
}

function checked(posArr, ops) {
    var flag = 1;
    for (var i = 1; i <= posArr.length; i++) {
        var newNode = document.getElementById('node' + i);
        if ((newNode.style.left != (ops[i - 1][0])) || (newNode.style.top != (ops[i - 1][1]))) {
            flag = 0;
        }
    }
    return flag;

}
// function dropItem() {
//     this.touchStartX = 0;
//     this.touchStartY = 0;
// }
// dropItem.prototype.onTouchStart = function(t) {
//     var n;
//     r = t.targetTouches[0];
//     n = t.target;
//     this.targetElement = n;
//     this.touchStartX = r.pageX;
//     this.touchStartY = r.pageY;
//     console.log(this.touchStartY + ',' + this.touchStartX);
// };
// dropItem.prototype.onTouchMove = function(t) {
//     var e = t.changedTouches[0],
//         n = 50;
//     return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1;
// };
// dropItem.prototype.onTouchEnd = function(t) {
//     var res = this.onTouchMove(t);
//     console.log(res);
// };
// dropItem.prototype.onTouchCancel = function() {
//     this.targetElement = null;
// };
