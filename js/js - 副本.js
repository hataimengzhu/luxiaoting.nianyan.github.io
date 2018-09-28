var oLogo = $('#lLogo');
var oHead = $('.mcHead');
var oMain = $('.main');
var oSide = $('#side');
var oRcarte = $('.rCarte');
var oRclose = $('.rClose');
var oRmenu = $('.rMenu');
var oTop = $('.bTop');
//右侧边栏效果
function push() {
    oHead.toggleClass('active2');
    oMain.toggleClass('active2');
    oTop.toggleClass('active1');
    oRcarte.toggleClass('active3');
    oRclose.toggleClass('active3');
    // $('#curtain').css('left', '-300%');
}
//方法一
// $('.rCarte').click(push);
// $('.rClose').click(push);
// 方法二
$('.rMenu').click(function(){
  push();  
})
//右侧边栏效果
//显示日期
function time() {
    var oTime = $('.cTime');
    var now = new Date();
    oTime.html(now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日" + now.getHours() + "时" + now.getMinutes() + "分" + now.getSeconds() + "秒");
    setTimeout(time, 1000)
}
time();
//显示日期
//左搜索栏
$('#lSearch').click(function() {
    $('#curtain').css('left', '0px');
    $('#lClose').css('left', '0px');
    executeFrame();
    $('#lClose').click(function() {
        $('#curtain').css('left', '-300%')
    });
    $('#lClose').mouseover(function() {
        cancelAnimationFrame(executeFrame)
    })
});
//左搜索栏
$(function() {
    $('.main').scroll(function() {
        var sc = $('.main').scrollTop();
        if (sc >= 800) {
            $('.bTop').css('bottom', '120px')
        } else {
            $('.bTop').css('bottom', '-40px')
        }
        if (sc > 0) {
            $('.mcHead #hUl li ').css('margin-right', '5%')
        } else {
            $('.mcHead #hUl li ').css('margin-right', '0px')
        }
    })
});
$('.bTop').click(function() {
    var sc = $(window).scrollTop();
    $('.main').animate({
        scrollTop: 0
    },
    500)
});
// 返回顶部
// 动感画布
var lFollowX = 0,
lFollowY = 0,
x = 0,
y = 0,
friction = 1 / 30;
function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
    var x1 = -x * 3;
    var y1 = -y * 3;
    var translate1 = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
    var translate2 = 'translate(' + x1 + 'px, ' + y1 + 'px) scale(1.1)';
    $('#lLogo').css({
        '-webit-transform': translate1,
        '-moz-transform': translate1,
        'transform': translate1
    });
    $('.logo').css({
        '-webit-transform': translate2,
        '-moz-transform': translate2,
        'transform': translate2
    });
    window.requestAnimationFrame(moveBackground)
}
$('#lLogo').on('mousemove click',
function(e) {
    var lMouseX = Math.max( - 100, Math.min(100, $('#lLogo').width() / 2 - e.clientX));
    var lMouseY = Math.max( - 100, Math.min(100, $('#lLogo').height() / 2 - e.clientY));
    lFollowX = (20 * lMouseX) / 100;
    lFollowY = (10 * lMouseY) / 100
});
moveBackground();
// 动感画布
// 抖动（取消该功能）
// $('.mcHead').mouseover(function() {
//     $('.rCarte').addClass('active4');
// })
// $('.mcHead').mouseout(function() {
//     $('.rCarte').removeClass('active4');
// })
// $('.rMenu').mouseover().removeClass('active4');
// 抖动
// 呼吸
var breathInt = null;
function breath(s, t) {
    clearInterval(breathInt);
    breathInt = setInterval(function() {
        $(s).animate({
            opacity: "0.1"
        },
        1800).animate({
            opacity: "1"
        },
        2800)
    },
    800);
    if (t) {
        clearInterval(breathInt);
        $('.logo').stop()
    }
}
$('.wrap').on({
    'mouseover': function() {
        breath('.logo', false)
    },
    'mouseout': function() {
        breath('.logo', true)
    }
});
// 呼吸
// 页码
$(document).ready(function() {
    $(".main .item .clear:gt(0)").hide();
    var total_q = $(".main .item .clear").next(".clear").index() + 1;
    var current_page = 1;
    var current_num = 1;
    var total_page = Math.round(total_q / current_page);
    var next = $(".next");
    var prev = $(".prev");
    $(".total").text(total_page);
    $(".current_page").text(current_num);
    $(".next").click(function() {
        if (current_num == total_page) {
            return false
        } else {
            $(".current_page").text(++current_num);
            $('.main').scrollTop(0);
            $.each($('.main  .item .clear'),
            function(index, item) {
                var start = current_page * (current_num - 1);
                var end = current_page * current_num;
                if (index >= start && index < end) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            })
        }
    });
    $(".prev").click(function() {
        if (current_num == 1) {
            return false
        } else {
            $(".current_page").text(--current_num);
            $('.main').scrollTop(0);
            $.each($('.main  .item .clear'),
            function(index, item) {
                var start = current_page * (current_num - 1);
                var end = current_page * current_num;
                if (index >= start && index < end) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            })
        }
    })
});
// 页码
// 关于页面之信息区域开始    
$('#abHead').on({
    'mouseover': function() {
        $('#abHead').css('left', '0px')
    },
    'mouseout': function() {
        $('#abHead').css('left', '-24%')
    }
});
$('#lInfo a').mouseover(function() {
    var i = $(this).index();
    $('#lInfo .iInfo').eq(i).css('display', 'block');
    $(this).css({
        'left': '128px',
        'background-color': '#3EA3FF'
    })
});
$('#lInfo a').mouseout(function() {
    var i = $(this).index();
    $('#lInfo .iInfo').eq(i).css('display', 'none');
    $(this).css({
        'left': '48px',
        'background-color': '#31353D'
    })
});
$('#lInfo a').eq(3).unbind();
$('#lInfo a').eq(3).mouseover(function() {
    $('#lInfo a').eq(3).css('background-color', '#3EA3FF');
    $('#code').css('display', 'block')
});
$('#lInfo a').eq(3).mouseout(function() {
    $('#lInfo a').css('background-color', '#31353D');
    $('#code').css('display', 'none')
});
// 关于页面之信息区域结束
// 星空
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame
})();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");
var numStars = 1900;
var radius = '0.' + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var centerX, centerY;
var stars = [],
star;
var i;
var ani = true;
initializeStars();
function executeFrame() {
    if (ani) {
        requestAnimFrame(executeFrame);
        moveStars(ani);
        drawStars(ani)
    }
}
function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    stars = [];
    for (i = 0; i < numStars; i++) {
        star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: '0.' + Math.floor(Math.random() * 99) + 1
        };
        stars.push(star)
    }
}
function moveStars() {
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z--;
        if (star.z <= 0) {
            star.z = canvas.width
        }
    }
}
function drawStars() {
    var pixelX, pixelY, pixelRadius;
    if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars()
    }
    if (warp == 0) {
        c.fillStyle = "rgba(0,10,20,1)";
        c.fillRect(0, 0, canvas.width, canvas.height)
    }
    c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX;
        pixelY = (star.y - centerY) * (focalLength / star.z);
        pixelY += centerY;
        pixelRadius = 1 * (focalLength / star.z);
        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        c.fillStyle = "rgba(209, 255, 255, " + star.o + ")"
    }
}
// 星空
// 回车键事件
$('input').keydown(function(e) {
    var e = e || window.event;
    if (e.keyCode == 13) {
        window.location.href = "notfound.html"
    }
});
// function notfound(){
//            window.location.href="notfound.html";
// }
// 测验
// $(document).keydown(function(event){
//     alert(event.keyCode);
// })
// 测验
// 回车键事件
// 历史上的今天
var now = new Date;
var Jan = new Array;
Jan[1] = "中国画家、篆刻家齐白石出生 ";
Jan[2] = "世界上第一个星际探测器月球1号发射";
Jan[3] = "勇气号探测器成功登陆火星";
Jan[4] = "“物理学之父”、发现和阐述三大运动定律的艾萨克·牛顿出生 ";
Jan[5] = "中国歼-10战机研制成功 ";
Jan[6] = "中国著名语言大师梁实秋出生 ";
Jan[7] = "Place quote here";
Jan[8] = "Place quote here";
Jan[9] = "Place quote here";
Jan[10] = "Place quote here";
Jan[11] = "Place quote here";
Jan[12] = "Place quote here";
Jan[13] = "Place quote here";
Jan[14] = "Place quote here";
Jan[15] = "Place quote here";
Jan[16] = "Place quote here";
Jan[17] = "Place quote here";
Jan[18] = "Place quote here";
Jan[19] = "Place quote here";
Jan[20] = "Place quote here";
Jan[21] = "Place quote here";
Jan[22] = "Place quote here";
Jan[23] = "Place quote here";
Jan[24] = "Place quote here";
Jan[25] = "Place quote here";
Jan[26] = "Place quote here";
Jan[27] = "Place quote here";
Jan[28] = "Place quote here";
Jan[29] = "Place quote here";
Jan[30] = "Place quote here";
Jan[31] = "Place quote here";
Feb = new Array;
Feb[1] = "Place quote here";
Feb[2] = "Place quote here";
Feb[3] = "Place quote here";
Feb[4] = "Place quote here";
Feb[5] = "Place quote here";
Feb[6] = "Place quote here";
Feb[7] = "Place quote here";
Feb[8] = "Place quote here";
Feb[9] = "Place quote here";
Feb[10] = "Place quote here";
Feb[11] = "Place quote here";
Feb[12] = "Place quote here";
Feb[13] = "Place quote here";
Feb[14] = "Place quote here";
Feb[15] = "Place quote here";
Feb[16] = "Place quote here";
Feb[17] = "Place quote here";
Feb[18] = "Place quote here";
Feb[19] = "Place quote here";
Feb[20] = "Place quote here";
Feb[21] = "Place quote here";
Feb[22] = "Place quote here";
Feb[23] = "Place quote here";
Feb[24] = "Place quote here";
Feb[25] = "Place quote here";
Feb[26] = "Place quote here";
Feb[27] = "Place quote here";
Feb[28] = "Place quote here";
Feb[29] = "Place quote here";
Mar = new Array;
Mar[1] = "Place quote here";
Mar[2] = "Place quote here";
Mar[3] = "Place quote here";
Mar[4] = "Place quote here";
Mar[5] = "Place quote here";
Mar[6] = "Place quote here";
Mar[7] = "Place quote here";
Mar[8] = "你若安好，我便是晴天";
Mar[9] = "Place quote here";
Mar[10] = "Place quote here";
Mar[11] = "Place quote here";
Mar[12] = "Place quote here";
Mar[13] = "Place quote here";
Mar[14] = "Place quote here";
Mar[15] = "Place quote here";
Mar[16] = "Place quote here";
Mar[17] = "Place quote here";
Mar[18] = "Place quote here";
Mar[19] = "Place quote here";
Mar[20] = "Place quote here";
Mar[21] = "Place quote here";
Mar[22] = "Place quote here";
Mar[23] = "Place quote here";
Mar[24] = "Place quote here";
Mar[25] = "Place quote here";
Mar[26] = "Place quote here";
Mar[27] = "Place quote here";
Mar[28] = "Place quote here";
Mar[29] = "Place quote here";
Mar[30] = "Place quote here";
Mar[31] = "Place quote here";
Apr = new Array;
Apr[1] = "Place quote here";
Apr[2] = "Place quote here";
Apr[3] = "Place quote here";
Apr[4] = "Place quote here";
Apr[5] = "Place quote here";
Apr[6] = "Place quote here";
Apr[7] = "Place quote here";
Apr[8] = "Place quote here";
Apr[9] = "Place quote here";
Apr[10] = "Place quote here";
Apr[11] = "Place quote here";
Apr[12] = "Place quote here";
Apr[13] = "Place quote here";
Apr[14] = "Place quote here";
Apr[15] = "Place quote here";
Apr[16] = "Place quote here";
Apr[17] = "Place quote here";
Apr[18] = "Place quote here";
Apr[19] = "Place quote here";
Apr[20] = "Place quote here";
Apr[21] = "Place quote here";
Apr[22] = "Place quote here";
Apr[23] = "Place quote here";
Apr[24] = "Place quote here";
Apr[25] = "Place quote here";
Apr[26] = "Place quote here";
Apr[27] = "Place quote here";
Apr[28] = "Place quote here";
Apr[29] = "Place quote here";
Apr[30] = "Place quote here";
May = new Array;
May[1] = "世界最长的跨海大桥之一的中国杭州湾跨海大桥通车";
May[2] = "康有为率举人联名上书要求改革，史称“公车上书”";
May[3] = "华纳制片公司推出第一部有声片";
May[4] = "中国人民彻底的反帝反封建的爱国运动五四运动爆发";
May[5] = "中国共产主义青年团成立";
May[6] = "英国发行了世界上最早的邮票——黑便士邮票";
May[7] = "香港发生六七暴动";
May[8] = "北京奥运会奥林匹克圣火登上珠穆朗玛峰";
May[9] = "中国翻译家赵萝蕤出生";
May[10] = "《康熙字典》编成";
May[11] = "东南亚国家暹罗正式将国名更名为泰国";
May[12] = "中国四川省汶川县发生5·12汶川地震，里氏地震规模8.3级";
May[13] = "中国人民解放军在山东战场发起孟良崮战役";
May[14] = "中国首次空爆原子弹试验成功";
May[15] = "中华人民共和国恢复了世界银行与国际货币基金组织的合法席位";
May[16] = "中华民国国军将军张自忠在与日军战斗中壮烈殉国";
May[17] = "《国际电报公约》签订，国际电报联盟成立";
May[18] = "印度试爆核弹";
May[19] = "苏联儿童共产主义组织列宁少年先锋队成立";
May[20] = "中国明末政治家、民族英雄史可法逝世";
May[21] = "世界上第一台光纤录像电话在法国开始试用";
May[22] = "印度航空公司一架波音737飞机发生门格洛尔空难";
May[23] = "中国西藏地区和平解放，实行民族自治";
May[24] = "晶体管电子计算机诞生";
May[25] = "中国共产党高级军事将领左权逝世";
May[26] = "中国首次成功发射地对地中程导弹";
May[27] = "中国爆发义和团运动";
May[28] = "巴黎公社解体";
May[29] = "中国红十字会成立";
May[30] = "中国第一次发现古生代地层油田";
May[31] = "中国第一辆国产汽车诞生";
Jun = new Array;
Jun[1] = "中央气象局开始每日公布各地天气预报";
Jun[2] = "美国无人飞船“观察者前1号”在月球登陆 ";
Jun[3] = "中国互联网络信息中心组建 ";
Jun[4] = "中途岛海战爆发 ";
Jun[5] = "意大利著名诗人但丁诞生 ";
Jun[6] = "中国农学家袁隆平荣获中国第一个特等发明奖 ";
Jun[7] = "哥德巴赫猜想被提出 ";
Jun[8] = "DNA双螺旋结构的发现者之一克里克出生 ";
Jun[9] = "近代蒸汽汽车奠基人斯蒂芬逊出生 ";
Jun[10] = "中国建筑师、诗人林徽因出生于浙江杭州 ";
Jun[11] = "光绪下“明定国是”诏书戊戌变法开始 ";
Jun[12] = "围棋大师、昭和棋圣吴清源出生";
Jun[13] = "美国先驱者10号空间探测器越过海王星轨道 ";
Jun[14] = "美国建造出世界第一艘原子动力潜艇";
Jun[15] = "中国文学家、语文学家夏丏尊出生 ";
Jun[16] = "神舟九号飞船发射 ";
Jun[17] = "中国第一颗氢弹空爆成功 ";
Jun[18] = "美国第二次独立战争爆发 ";
Jun[19] = "中国人民解放军组建潜艇部队 ";
Jun[20] = "亚洲最大汽车试验场在襄樊建成 ";
Jun[21] = "历史上首次太阳在夏至日直射北回归线中点 ";
Jun[22] = "“银河全数字仿真·II”计算机通过国家鉴定 ";
Jun[23] = "民族英雄郑成功去世 ";
Jun[24] = "中国首座脉冲反应堆建成 ";
Jun[25] = "物理学家居里夫人发现了镭 ";
Jun[26] = "世界第一架可正常操纵的直升机首次试飞成功 ";
Jun[27] = "世界首台电子式自动柜员机出现";
Jun[28] = "北大西洋公约组织成立";
Jun[29] = "诺贝尔奖金基金会成立";
Jun[30] = "中国第一次全国人口普查";
Jul = new Array;
Jul[1] = "首条连接西藏自治区的铁路——青藏铁路全线通车 ";
Jul[2] = "亚洲金融风暴爆发 ";
Jul[3] = "大海雀灭绝 ";
Jul[4] = "中国大陆与台湾的两岸包机正式开始 ";
Jul[5] = "世界第一只体细胞克隆动物克隆羊多莉诞生 ";
Jul[6] = "中国福建土楼被正式列入《世界遗产名录》 ";
Jul[7] = "日本军在宛平发动侵华战争七七事变";
Jul[8] = "中国国内卫星通信网建成 ";
Jul[9] = "基辛格秘密访华 ";
Jul[10] = "陕西省临潼县发现秦代兵马俑";
Jul[11] = "人造卫星首次播送全球电视 ";
Jul[12] = "赤壁之战爆发 ";
Jul[13] = "北京申办2008年奥林匹克运动会成功 ";
Jul[14] = "汉武帝出生 ";
Jul[15] = "民主爱国人士、著名诗人与学者闻一多遭遇暗杀 ";
Jul[16] = "美国成功试爆世界上第一颗原子弹";
Jul[17] = "波茨坦会议开幕 ";
Jul[18] = "第一座迪斯尼乐园正式向公众开放 ";
Jul[19] = "中国现代杰出画家、美术教育家徐悲鸿诞辰";
Jul[20] = "人类实现首次登月";
Jul[21] = "第一次古代奥林匹克运动会在古希腊举行";
Jul[22] = "挪威发生严重爆炸和枪击事件——于特岛惨案";
Jul[23] = "中国温州发生甬温线特别重大铁路交通事故";
Jul[24] = "世界第一台打字机诞生 ";
Jul[25] = "甲午中日战争爆发";
Jul[26] = "蛟龙号创造中国载人深潜5000米新纪录 ";
Jul[27] = "世界第一架喷气式客机试飞 e";
Jul[28] = "中国河北省唐山市发生唐山大地震";
Jul[29] = "“两弹”元勋邓稼先逝世 ";
Jul[30] = "中国首次参加奥运会";
Jul[31] = "人类首次月球车行驶 s";
Aug = new Array;
Aug[1] = "Place quote here";
Aug[2] = "Place quote here";
Aug[3] = "Place quote here";
Aug[4] = "Place quote here";
Aug[5] = "Place quote here";
Aug[6] = "Place quote here";
Aug[7] = "Place quote here";
Aug[8] = "Place quote here";
Aug[9] = "Place quote here";
Aug[10] = "Place quote here";
Aug[11] = "Place quote here";
Aug[12] = "Place quote here";
Aug[13] = "Place quote here";
Aug[14] = "Place quote here";
Aug[15] = "Place quote here";
Aug[16] = "Place quote here";
Aug[17] = "Place quote here";
Aug[18] = "Place quote here";
Aug[19] = "Place quote here";
Aug[20] = "Place quote here";
Aug[21] = "Place quote here";
Aug[22] = "Place quote here";
Aug[23] = "Place quote here";
Aug[24] = "Place quote here";
Aug[25] = "Place quote here";
Aug[27] = "Place quote here";
Aug[28] = "Place quote here";
Aug[29] = "Place quote here";
Aug[30] = "Place quote here";
Aug[31] = "Place quote here";
Sep = new Array;
Sep[1] = "Place quote here";
Sep[2] = "Place quote here";
Sep[3] = "Place quote here";
Sep[4] = "Place quote here";
Sep[5] = "Place quote here";
Sep[6] = "Place quote here";
Sep[7] = "Place quote here";
Sep[8] = "Place quote here";
Sep[9] = "Place quote here";
Sep[10] = "Place quote here";
Sep[11] = "Place quote here";
Sep[12] = "Place quote here";
Sep[13] = "Place quote here";
Sep[14] = "Place quote here";
Sep[15] = "Place quote here";
Sep[16] = "Place quote here";
Sep[17] = "Place quote here";
Sep[18] = "Place quote here";
Sep[19] = "Place quote here";
Sep[20] = "Place quote here";
Sep[21] = "Place quote here";
Sep[22] = "Place quote here";
Sep[23] = "Place quote here";
Sep[24] = "Place quote here";
Sep[25] = "Place quote here";
Sep[26] = "Place quote here";
Sep[27] = "Place quote here";
Sep[28] = "Place quote here";
Sep[29] = "Place quote here";
Sep[30] = "Place quote here";
Oct = new Array;
Oct[1] = "Place quote here";
Oct[2] = "Place quote here";
Oct[3] = "Place quote here";
Oct[4] = "Place quote here";
Oct[5] = "Place quote here";
Oct[6] = "Place quote here";
Oct[7] = "Place quote here";
Oct[8] = "Place quote here";
Oct[9] = "Place quote here";
Oct[10] = "Place quote here";
Oct[11] = "Place quote here";
Oct[12] = "Place quote here";
Oct[13] = "Place quote here";
Oct[14] = "Place quote here";
Oct[15] = "Place quote here";
Oct[16] = "Place quote here";
Oct[17] = "Place quote here";
Oct[18] = "Place quote here";
Oct[19] = "Place quote here";
Oct[20] = "Place quote here";
Oct[21] = "Place quote here";
Oct[22] = "Place quote here";
Oct[23] = "Place quote here";
Oct[24] = "Place quote here";
Oct[25] = "Place quote here";
Oct[26] = "Place quote here";
Oct[27] = "Place quote here";
Oct[28] = "Place quote here";
Oct[29] = "Place quote here";
Oct[30] = "Place quote here";
Oct[31] = "Place quote here";
Nov = new Array;
Nov[1] = "Place quote here";
Nov[2] = "Place quote here";
Nov[3] = "Place quote here";
Nov[4] = "Place quote here";
Nov[5] = "Place quote here";
Nov[6] = "Place quote here";
Nov[7] = "Place quote here";
Nov[8] = "Place quote here";
Nov[9] = "Place quote here";
Nov[10] = "Place quote here";
Nov[11] = "Place quote here";
Nov[12] = "Place quote here";
Nov[13] = "Place quote here";
Nov[14] = "Place quote here";
Nov[15] = "Place quote here";
Nov[16] = "Place quote here";
Nov[17] = "Place quote here";
Nov[18] = "Place quote here";
Nov[19] = "Place quote here";
Nov[20] = "Place quote here";
Nov[21] = "今天是21号，今天没有什么重要消息";
Nov[22] = "Place quote here";
Nov[23] = "Place quote here";
Nov[24] = "Place quote here";
Nov[25] = "Place quote here";
Nov[26] = "Place quote here";
Nov[27] = "Place quote here";
Nov[28] = "Place quote here";
Nov[29] = "Place quote here";
Nov[30] = "Place quote here";
var Dec = new Array;
Dec[1] = "本月1日的话";
Dec[2] = "你说啥？";
Dec[3] = "本月3日的话";
Dec[4] = "本月4日的话";
Dec[5] = "本月5日的话";
Dec[6] = "本月6日的话";
Dec[7] = "本月7日的话";
Dec[8] = "本月8日的话";
Dec[9] = "本月9日的话";
Dec[10] = "本月10日的话";
Dec[11] = "本月11日的话";
Dec[12] = "本月12日的话";
Dec[13] = "本月13日的话";
Dec[14] = "本月14日的话";
Dec[15] = "本月15日的话";
Dec[16] = "本月16日的话";
Dec[17] = "本月17日的话";
Dec[18] = "本月18日的话";
Dec[19] = "本月19日的话";
Dec[20] = "本月20日的话";
Dec[21] = "本月21日的话";
Dec[22] = "本月22日的话";
Dec[23] = "本月23日的话";
Dec[24] = "本月24日的话";
Dec[25] = "本月25日的话";
Dec[26] = "本月26日的话e";
Dec[27] = "本月27日的话";
Dec[28] = "本月28日的话";
Dec[29] = "本月29日的话";
Dec[30] = "本月30日的话";
Dec[31] = "本月31日的话e";
var abc = $("#xiaorong");
function judge() {
    if (now.getMonth() == 0) {
        var cba = Jan[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 1) {
        var cba = Feb[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 2) {
        var cba = Mar[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 3) {
        var cba = Apr[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 4) {
        var cba = May[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 5) {
        var cba = Jun[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 6) {
        var cba = Jul[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 7) {
        var cba = Aug[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 8) {
        var cba = Sep[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 9) {
        var cba = Oct[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 10) {
        var cba = Nov[now.getDate()];
        addtext(cba)
    };
    if (now.getMonth() == 11) {
        var cba = Dec[now.getDate()];
        addtext(cba)
    }
}
judge();
function addtext(i) {
    abc.html((now.getMonth() + 1) + '月' + now.getDate() + '日' + i)
}
// 历史上的今天
//进度条
// function scroll_fn(){
//     document_height = $(document).height();
//     scroll_so_far = $('.main').scrollTop();
//     window_height = $(window).height();   
//     max_scroll = document_height-window_height;
//     scroll_percentage = scroll_so_far/(max_scroll/100);   
//     $('#loading').width(scroll_percentage + '%');
// }
// $('.main ').scroll(function() {
// scroll_fn();
// });
// $('.main ').resize(function() {
// scroll_fn();
// });
//进度条