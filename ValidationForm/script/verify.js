var Global_verfCode;
// 验证函数
function verify(obj, type) {
  var reg;
  var text = {};
  switch (type) {
    case 'phone' : reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
                   text.blank = '手机号不能为空';
                   text.error = '请输入正确手机号';
                   text.success = '';
    break;

    case 'email' : reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                   text.blank = '请输入邮箱';
                   text.error = '邮箱格式不正确';
                   text.success = ''
    break;

    case 'password' : reg = /^[a-zA-Z0-9\x21-\x7e]{6,20}$/;
                      text.blank = '请输入密码';
                      text.error = '密码必须输入6-20个字符';
                      text.success = ''
    break;


    default : reg = /^\w{6,20}$/;
              text.blank = '输入为空';
              text.error = '必须输入6-20个字符';
              text.success = ''
    break;
  }

  if( obj.val() === '') {
    obj.removeClass('success').addClass('error').siblings('p').text(text.blank)
  } else {
    if ( !reg.test(obj.val())) {
      obj.removeClass('success').addClass('error').siblings('p').text(text.error)
    } else {
      obj.removeClass('error').addClass('success').siblings('p').text(text.success)
    }
  }
}
// 验证两次输入是否一致
function confirmPassword(obj) {
  var text = {
    blank     : '请输入确认密码',
    different : '两次输入的密码不一致',
    success   : ''
  }
  if (obj.val() === '') {
    obj.removeClass('success').addClass('error').siblings('p').text(text.blank)
  } else {
    if( obj.val() !== $('#password').val() ) {
      obj.removeClass('success').addClass('error').siblings('p').text(text.different);
    } else {
      obj.removeClass('error').addClass('success').siblings('p').text(text.success);
    }
  }
}
function confirmVerfCode(obj) {
 var text = {
  blank: '请输入验证码',
  different : '验证码输入错误',
  success : '',

 }
  if (obj.val() === '') {
    obj.removeClass('success').addClass('error').siblings('p').text(text.blank)
  } else {
    if (obj.val() !== Global_verfCode) {
      obj.removeClass('success').addClass('error').siblings('p').text(text.different);
    } else {
      obj.removeClass('error').addClass('success').siblings('p').text(text.success);
    }
  }
}
// 发送验证码
$('#verfCode + a').click(function() {
  verify($('#phone'),'phone');
  if($('#phone').hasClass('success') && (!$(this).hasClass('disabled'))) {
    // 发送验证码 
    var count = 60;
    var timer;
    var $that = $(this);
    $(this).addClass('disabled').text( count + 's')
    timer = setInterval(function(){
      if(count === 0) {
        clearInterval(timer);
        $that.removeClass('disabled').text('获取');
      } else {
        count--;
        $that.text(count + 's');
      }
    }, 1000)
    Global_verfCode = getVerfCode();
    alert('您的验证码为:' + Global_verfCode)
  }


})
// 生成随机四位验证码
function getVerfCode() {
  return ( ('0000' + Math.floor(Math.random() * 9999)).slice(-4) );
}
// 事件绑定
$('#phone').blur(function(){
  verify($(this),'phone')
}).keyup(function(){
  verify($(this),'phone')
})

$('#verfCode').keyup(function() {
  confirmVerfCode($(this))
})

$('#email').blur(function() {
  verify($(this),'email')
}).keyup(function() {
  verify($(this),'email')
})

$('#password').blur(function() {
  verify($(this),'password')
}).keyup(function() {
  verify($(this),'password');
  confirmPassword($('#confirmPassword'))
})

$('#confirmPassword').blur(function() {
  confirmPassword($(this))
}).keyup(function() {
  confirmPassword($(this))
})

// 提交验证
$('#doReg').click(function(){
  var isAllPass = true;
  $('.register_box input').each(function() {
    if($(this).val() === '') {
      $(this).addClass('error')
    }
    if($(this).hasClass('error')) {
       isAllPass = false;
    }
  });
  if (isAllPass) {
    alert('注册成功')
  }
  return false;
})