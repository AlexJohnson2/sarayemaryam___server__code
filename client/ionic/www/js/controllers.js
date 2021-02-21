angular.module('starter.controllers', [])

.controller('LearnCtrl', function($scope,$state) {
  if (document.cookie.indexOf("username") > -1){
    if (getCookie("username") == ""){
      $state.go('signin',{})
    }
    if (document.cookie.indexOf("username") == -1){
        $state.go('signin',{})
      }
  }
    $scope.img_height = window.innerHeight-(window.innerHeight/4)
    $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
})

.controller('HomeCtrl',function($scope,$state){
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  
})

.controller('HelpCtrl',function($scope){
  $scope.back = function(){
    history.back()
}
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
  

})

.controller('StoreCtrl', function($scope,$state,$http,$ionicLoading,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
    $scope.username = String(getCookie("username"))
    console.log($scope.username)
    $scope.this_user_phone = String(getCookie("phonenumber"))
    $scope.this_user_tel_id = String(getCookie("tel_id"))
    $scope.this_user_address = String(getCookie("address"))
    $scope.this_post_code = String(getCookie("post_code"))
    console.log($scope.this_address)
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
      .success(function(data){
        console.log(data)
        $scope.kalas = data.result
      })
    $scope.cart = true
    $scope.this_data = "user="+String(getCookie("username"))
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/getall", $scope.this_data)
    .success(function(data){
      if (data.result.length == 0){
        $scope.cart = false
      }
    })

  });


  $scope.gotoexternallink = function(link){
    size = 'width='+window.innerWidth+',height='+window.innerHeight
    window.open(link,'newwindow',size); 
  }

  $scope.go_to_eitaa_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
  }
  $scope.finished_buy = function(){
    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">سفارشات شما به مسئول فروش در پیام رسان ایتا ارسال شد. در حال انتقال به آیدی مسئول فروش...</p>', noBackdrop: true, duration: 3000 });
    $http.post(DjangoURL+"/send_message","text=آغاز سبد خرید فرد با آیدی : "+$scope.this_user_tel_id+"\n\n و به شماره : "+$scope.this_user_phone+"\n\nو به آدرس : "+$scope.this_user_address+"\n\nو به کد پستی : "+$scope.this_post_code)
    $scope.this_data = "user="+$scope.username
    setTimeout(() => {  
    $http.post(DjangoURL+"/cart/getall", $scope.this_data)
    .success(function(data){
      if (data.result.length != 0){
        for (i in data.result){
          $scope.this_data = 'text='+"سلام. \n\n"+"\n\nنام محصول : "+data.result[i]['name']+"\n\n  قیمت آن : "+data.result[i]['amount']+"\n\n آدرس سفارش: "+data.result[i]['kala_address']+"\n\n و تعداد آن:  "+data.result[i]['num']
          $http.post(DjangoURL+"/send_message",$scope.this_data)
          $http.post(DjangoURL+"/cart/delete","user="+$scope.username+"&name="+data.result[i]['name']+"&amount="+data.result[i]['amount']+"&kala_address="+data.result[i]['kala_address']+"&img="+data.result[i]['img'])
          $state.reload();
        }
      }
    });}, 1200);
    $state.reload();
    $state.reload();
    $state.reload();
    window.scroll(0,0);
    $state.reload();
    $state.reload();
    $state.reload();
  }

  $scope.delete_from_cart = function(kala) {
    $scope.data = {};
  
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: 'آیا از حذف این مورد مطمئن هستید؟',
      title: 'حذف',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'خیر' },
        {
          text: '<b>بله</b>',
          type: 'button-positive',
          onTap: function(e) {
            $scope.this_data = "user="+$scope.username+"&name="+kala.name+"&amount="+kala.amount+"&kala_address="+kala.kala_address+"&img="+kala.img
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/delete", $scope.this_data)
            .success(function(data){
              console.log(data)
            })
            $state.reload()
          }
        }
      ]
    })}

    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;



    $scope.gotopage = function () {
    $state.go('parcheh',{});
    }
})


.controller('AccountCtrl', function($scope,$window,$state,$http,$ionicPopup,$ionicLoading) {
  $scope.back = function(){
      history.back()
  }
  $scope.logout = function(){
    document.cookie = "username=;"
    document.cookie = "password=;"
    document.cookie = "phonenumber=;"
    document.cookie = "tel_id=;"
    document.cookie = "address=;"
    document.cookie = "post_code=;"
    $window.location.href = '#/signin'
    // $state.go('signin')
    $window.location.reload()
  }

  $scope.delete_account = function(id) {
    $scope.data = {};
  
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: 'آیا از حذف این مورد مطمئن هستید؟',
      title: 'حذف',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'خیر' },
        {
          text: '<b>بله</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/account/delete","username="+$scope.username+"&password="+$scope.password)
            loggedin = false
            $window.location.href = '#/signin'
            $window.location.reload()
          }
        }
      ]
    })}

  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
    $scope.username = String(getCookie("username"))
    $scope.password = String(getCookie("password"))
    console.log($scope.username)
    $scope.this_user_phone = String(getCookie("phonenumber"))
    $scope.this_user_tel_id = String(getCookie("tel_id"))
    $scope.this_user_address = String(getCookie("address"))
    $scope.this_post_code = String(getCookie("post_code"))
    // console.log($scope.this_user_address)
  });

  $scope.edit_account = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام کاربری جدید:</p><input type="text" ng-model="data.username"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">رمز عبور جدید: </p><input type="text" ng-model="data.password"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">شماره تلفن جدید:</p><input type="text" ng-model="data.phonenumber"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آیدی ایتای جدید:</p><input type="text" ng-model="data.tel_id"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس جدید:</p><input type="text" ng-model="data.address"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">کد پستی جدید:</p><input type="text" ng-model="data.post_code"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            if ($scope.data.username == undefined){
              $scope.data.username = $scope.username
            }
            if ($scope.data.password == undefined){
              $scope.data.password = $scope.password
            }
            if ($scope.data.tel_id == undefined){
              $scope.data.tel_id = $scope.this_user_tel_id
            }
            if ($scope.data.phonenumber == undefined){
              $scope.data.phonenumber = $scope.this_user_phone
            }
            if ($scope.data.address == undefined){
              $scope.data.address = $scope.this_user_address
            }
            if ($scope.data.post_code == undefined){
              $scope.data.post_code = $scope.this_post_code
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/account/edit","old_username="+$scope.username+"&new_username="+$scope.data.username+"&new_password="+$scope.data.password+"&new_phonenumber="+$scope.data.phonenumber+"&new_tel_id="+$scope.data.tel_id+"&new_address="+$scope.data.address+"&new_post_code="+$scope.data.post_code)
            .success(function(data){
              console.log(data.result)

              document.cookie = "username="+data.result['new_username']
              document.cookie = "password="+data.result['new_password']
              document.cookie = "phonenumber="+data.result['new_phonenumber']
              document.cookie = "tel_id="+data.result['new_tel_id']
              document.cookie = "address="+data.result['new_address']
              document.cookie = "post_code="+data.result['new_post_code']

              $state.reload()
              $state.reload()
              $state.reload()
            })
  /*
.success(function(data){
              console.log(data)
        $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ... </p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
          $state.reload()
          }
        }
      ]
    })}

})

.controller('SigninCtrl', function($scope,$http,$ionicLoading,$state,$window) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (!getCookie("username") == ""){
        $state.go('tab.home',{})
      }
    }
  })
  $state.reload()
  $scope.back = function(){
      history.back()
  }
  $scope.signin = function(){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL + '/account/checkuserwithpassword',
                'username='+$scope.username+'&password='+$scope.password)
    .success(function(data){
      if (data.status == 'ok'){
        $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon><p dir="rtl">  شما با موفقیت به سیستم وارد شدید. </p>', noBackdrop: true, duration: 1300 });
        loggedin = true
        // $state.go('tab-store')
        $window.location.href = '#/tab/home'
        document.cookie = "username="+$scope.username
        document.cookie = "password="+$scope.password
        document.cookie = "phonenumber="+data.this_phone
        document.cookie = "tel_id="+data.tel_id
        document.cookie = "address="+data.this_address
        document.cookie = "post_code="+data.post_code
      }
      else{
        $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon>  در ورود شما به سیستم مشکلی پیش آمده. لطفا یوزرنیم و پسورد خود را چک کنید.', noBackdrop: true, duration: 2200 });

      }
    })
    .error(function(){
      $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon>  در ورود شما به سیستم مشکلی پیش آمده است. لطفا اینترنت خود را چک کنید.', noBackdrop: true, duration: 2200 });
    })
  }
})

.controller('SignupCtrl', function($scope,$http,$ionicLoading,$window,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (!getCookie("username") == ""){
        $state.go('tab.home',{})
      }
    }})
  $scope.back = function(){
      history.back()
  }
  $scope.signup = function(){
    if ($scope.address == undefined){
      $scope.address = ""
    }
    if ($scope.post_code == undefined){
      $scope.post_code = ""
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+'/account/register',
                'username='+$scope.username+'&password='+$scope.password+'&phonenumber='+$scope.phonenumber+'&tel_id='+$scope.tel_id+"&address="+$scope.address+"&post_code="+$scope.post_code)
    .success(function(data){
      if (data.status == 'ok'){
        $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">شما با موفقیت در سیستم ثبت نام کردید. لطفا حساب خود را در همین صفحه تایید کیند.</p>', noBackdrop: true, duration: 2200 });
        loggedin = true
        document.cookie = "username="+$scope.username
        document.cookie = "password="+$scope.password
        document.cookie = "phonenumber="+data.this_phone
        document.cookie = "tel_id="+data.tel_id
        document.cookie = "address="+data.this_address
        document.cookie = "post_code="+data.post_code
        // $state.go('tab-store')
        $window.location.href = '#/confirm'
        $state.reload()

      }
      else{
        if (data.result == 'repetitious user'){
          $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon><p dir="rtl">یوزر نیم شما تکراری است. لطفا یوزر نیم دیگری را امتحان کنید.</p>', noBackdrop: true, duration: 2200 });
        }
        if (data.result == 'repetitious phonenumber'){
          $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon><p dir="rtl">شماره تلفن شما تکراری است. لطفا شماره تلفن دیگری را امتحان کنید.</p>', noBackdrop: true, duration: 2200 });
        }
      }
    })
    .error(function(){
      $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon>  <p dir="rtl">ثبت نام با مشکل مواجه شد.</p>', noBackdrop: true, duration: 2200 });
    })
  }
})

.controller('ConfirmCtrl', function($scope,$http,$ionicLoading) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (!getCookie("username") == ""){
        $state.go('tab.home',{})
      }
    }})
    $scope.username = String(getCookie("username"))
    $scope.this_user_phone = String(getCookie("phonenumber"))
    $scope.this_user_tel_id = String(getCookie("tel_id"))
    console.log($scope.username,$scope.this_user_phone,$scope.this_user_tel_id) 
  $scope.message = Math.floor(Math.random()*100000)
  // $http.post("https://api.kavenegar.com/v1/596B62346B54313941663337754E7537372B394134734B2F4269753074727556524766386347796C5A5A453D/sms/send",
  //             'Message='+String(message+'&Receptor='+String(this_user_phonenumber)))
  // .success(function(data){$scope.message = "کد به موبایل شما ارسال شد"})
  // .error(function(){$scope.message = "کد به موبایل شما ارسال نشد. لطفا شماره تلفن و یا اینترنت خود را چک کنید"})
  $scope.confirm = function(){
    if ($scope.confirm_code == $scope.message){
      $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon>  <p dir="rtl">حساب کاربری شما تایید شد.</p>', noBackdrop: true, duration: 2200 });
      loggedin = true
      storage.setItem('loggedin',loggedin)
      window.location.href = "#/tab/home"
    }
    else {
      $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon>  <p dir="rtl">کد درست نیست. لطفا دوباره چک کنید.</p>', noBackdrop: true, duration: 2200 });

    }
  }
  
})

.controller('PooshaksCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })

    
})

.controller('PooshakDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});

    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }

  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

  $scope.gotoexternallink = function(link){
    size = 'width='+window.innerWidth+',height='+window.innerHeight
    window.open(link,'newwindow',size); 
  }
  $scope.go_to_tel_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://t.me/salambarf"); }, 4200);
  }
  $scope.go_to_eitaa_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
  }

  $scope.get_tel_id = function(){
    $scope.this_username = String(getCookie("username"))
    $scope.this_password = String(getCookie("password"))
    $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
    .success(function(data){
      const this_tel_id = data.tel_id
      storage.removeItem('this_tel_id')
      storage.setItem('this_tel_id',this_tel_id)

    })
      .error(function () {
        console.log("error")
      })

}

  
  $scope.sefaresh = function(pooshak){
    $scope.message_template =  '<p dir="rtl"> پیام شما در ایتا  به مسئول فروش ارسال شد. در اسرع وقت پاسخگو خواهیم بود . در حال انتقال به آیدی مسئول فروش ...</p>'
        setTimeout(() => {
          $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 1500});
        }, 1500);
      $scope.this_username = String(getCookie("username"))
      $scope.this_password = String(getCookie("password"))

      $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
      .success(function(data){
        $scope.this_tel_id = data.tel_id
        storage.removeItem('this_tel_id')
        $state.reload()
        storage.setItem('this_tel_id',$scope.this_tel_id)

        $scope.this_address = String(getCookie("assress"))
        // Send Message To Telegram

        // $http.post('https://api.telegram.org/bot1480674202:AAEuY1mfVI2LMSszabJM0nZni5CjpzhLCVA/sendmessage'
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.pooshak.name+"\n\n  قیمت آن : "+$scope.pooshak.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
        // .success(function(data){
        //
        // console.log(data)
        // $scope.message_template =  '<p dir="rtl">پیام شما در تلگرام به مسئول فروش ارسال شد. در اسرع وقت پاسگو خواهیم بود.</p>'
        // setTimeout(() => {
        //   $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 3700});
        // }, 1500);
        // })

        // Send Message To Eitaa
        
        $http.post(DjangoURL+'/send_message'
        ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.pooshak.name+"\n\n  قیمت آن : "+$scope.pooshak.amount+"\n\nو آدرس سفارش دهنده : "+$scope.this_address+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone)
        .success(function(data){
          if (true){
            setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
          }
        console.log(data)
        })
        

      })
      .error(function () {
        console.log("error")
      })
  }

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    $scope.num += 1
  }

  $scope.remove_from_num = function(){
    console.log("removed num!")
    if ($scope.num == 1){
      $scope.num = 1
    }
    else {
      $scope.num -= 1
    }
  }

  $scope.cart = false
  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
  .success(function(data){
    console.log(data)
    if (data.result.length > 0){
      if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
        $scope.cart = true
      }
    }
  })
  $scope.add_to_cart = function(){
    $scope.cart = true
    console.log($scope.pooshak)
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.account")
  }

})

.controller('ParchehsCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
        console.log(data);
    $scope.parchehs = data.result
    })
    
})

.controller('ParchehDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});

    $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
    console.log(data);
    $scope.parcheh = data.result[$stateParams.parchehId-1]
    })

  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''


  $scope.gotoexternallink = function(link){
    size = 'width='+window.innerWidth+',height='+window.innerHeight
    window.open(link,'newwindow',size); 
  }
  $scope.go_to_tel_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://t.me/salambarf"); }, 4200);
  }
  $scope.go_to_eitaa_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
  }


  $scope.get_tel_id = function(){
    $scope.this_username = String(getCookie("username"))
    $scope.this_password = String(getCookie("password"))
    $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
    .success(function(data){
      const this_tel_id = data.tel_id
      storage.removeItem('this_tel_id')
      storage.setItem('this_tel_id',this_tel_id)

    })
      .error(function () {
        console.log("error")
      })

}

  $scope.sefaresh = function(){
    $scope.message_template =  '<p dir="rtl"> پیام شما در ایتا  به مسئول فروش ارسال شد. در اسرع وقت پاسخگو خواهیم بود . در حال انتقال به آیدی مسئول فروش ...</p>'
        setTimeout(() => {
          $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 1500});
        }, 1500);
      $scope.this_username = String(getCookie("username"))
      $scope.this_password = String(getCookie("password"))
      $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
      .success(function(data){
        $scope.this_tel_id = data.tel_id
        storage.removeItem('this_tel_id')
        $state.reload()
        storage.setItem('this_tel_id',$scope.this_tel_id)
        $scope.this_address = String(getCookie("address"))

        // Send Message To Telegram

        // $http.post('https://api.telegram.org/bot1480674202:AAEuY1mfVI2LMSszabJM0nZni5CjpzhLCVA/sendmessage'
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.pooshak.name+"\n\n  قیمت آن : "+$scope.pooshak.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
        // .success(function(data){
        //
        // console.log(data)
        // $scope.message_template =  '<p dir="rtl">پیام شما در تلگرام به مسئول فروش ارسال شد. در اسرع وقت پاسگو خواهیم بود.</p>'
        // setTimeout(() => {
        //   $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 3700});
        // }, 1500);
        // })

        // Send Message To Eitaa

        $http.post(DjangoURL+'/send_message'
        ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.parcheh.name+"\n\n  قیمت آن : "+$scope.parcheh.amount+"\n\nو آدرس سفارش دهنده : "+$scope.this_address+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone)
        .success(function(data){
          if (true){
            setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
          }
        console.log(data)

        })
      })
      .error(function () {
        console.log("error")
      })
  }

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    $scope.num += 1
  }

  $scope.remove_from_num = function(){
    console.log("removed num!")
    if ($scope.num == 1){
      $scope.num = 1
    }
    else {
      $scope.num -= 1
    }
  }

  $scope.cart = false
  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
  .success(function(data){
    console.log(data)
    if (data.result.length > 0){
      if (JSON.stringify(data.result).indexOf($scope.parcheh.name) > -1){
        $scope.cart = true
      }
    }
  })
  $scope.add_to_cart = function(){
    $scope.cart = true
    console.log($scope.parcheh)
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.parcheh.name+"&amount="+$scope.parcheh.amount+"&kala_address="+LocalURL+"/#/parcheh/"+String($stateParams.parchehId)+"&img="+$scope.parcheh.img+"&num="+String($scope.num)
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.account")
  }
})

.controller('KharazisCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
        console.log(data);
    $scope.kharazis = data.result
    })
    
})

.controller('KharaziDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});

    $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
    console.log(data);
    $scope.kharazi = data.result[$stateParams.kharaziId-1]
    })

    
  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''


  $scope.gotoexternallink = function(link){
    size = 'width='+window.innerWidth+',height='+window.innerHeight
    window.open(link,'newwindow',size); 
  }
  $scope.go_to_tel_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://t.me/salambarf"); }, 4200);
  }
  $scope.go_to_eitaa_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
  }


  $scope.get_tel_id = function(){
    $scope.this_username = String(getCookie("username"))
    $scope.this_password = String(getCookie("password"))
    $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
    .success(function(data){
      const this_tel_id = data.tel_id
      storage.removeItem('this_tel_id')
      storage.setItem('this_tel_id',this_tel_id)

    })
      .error(function () {
        console.log("error")
      })

}

  $scope.sefaresh = function(){
    $scope.message_template =  '<p dir="rtl"> پیام شما در ایتا  به مسئول فروش ارسال شد. در اسرع وقت پاسخگو خواهیم بود . در حال انتقال به آیدی مسئول فروش ...</p>'
        setTimeout(() => {
          $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 1500});
        }, 1500);
      $scope.this_username = String(getCookie("username"))
      $scope.this_password = String(getCookie("password"))
      $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
      .success(function(data){
        $scope.this_tel_id = data.tel_id
        storage.removeItem('this_tel_id')
        $state.reload()
        storage.setItem('this_tel_id',$scope.this_tel_id)
        $scope.this_address = String(getCookie("address"))
        // Send Message To Telegram

        // $http.post('https://api.telegram.org/bot1480674202:AAEuY1mfVI2LMSszabJM0nZni5CjpzhLCVA/sendmessage'
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.pooshak.name+"\n\n  قیمت آن : "+$scope.pooshak.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
        // .success(function(data){
        //
        // console.log(data)
        // $scope.message_template =  '<p dir="rtl">پیام شما در تلگرام به اپراتور ارسال شد. در اسرع وقت پاسگو خواهیم بود.</p>'
        // setTimeout(() => {
        //   $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 3700});
        // }, 1500);
        // })

        // Send Message To Eitaa

        $http.post(DjangoURL+'/send_message'
        ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.kharazi.name+"\n\n  قیمت آن : "+$scope.kharazi.amount+"\n\nو آدرس سفارش دهنده : "+$scope.this_address+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone)
        .success(function(data){
          if (true){
            setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
          }
        console.log(data)
        })

      })
      .error(function () {
        console.log("error")
      })
  }

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    $scope.num += 1
  }

  $scope.remove_from_num = function(){
    console.log("removed num!")
    if ($scope.num == 1){
      $scope.num = 1
    }
    else {
      $scope.num -= 1
    }
  }

  $scope.cart = false
  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
  .success(function(data){
    console.log(data)
    if (data.result.length > 0){
      if (JSON.stringify(data.result).indexOf($scope.kharazi.name) > -1){
        $scope.cart = true
      }
    }
  })
  $scope.add_to_cart = function(){
    $scope.cart = true
    console.log($scope.kharazi)
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.kharazi.name+"&amount="+$scope.kharazi.amount+"&kala_address="+LocalURL+"/#/kharazi/"+String($stateParams.kharaziId)+"&img="+$scope.kharazi.img+"&num="+String($scope.num)
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.account")
  }
})

.controller('HejabsCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $http.post(DjangoURL+"/kala/hejab/getall")
    .success(function(data){
        console.log(data);
    $scope.hejabs = data.result
    })
})

.controller('HejabDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});

    $http.post(DjangoURL+"/kala/hejab/getall")
    .success(function(data){
    console.log(data);
    $scope.hejab = data.result[$stateParams.hejabId-1]
    })


  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth;
  $scope.button_screen = (window.innerWidth/2)-45;
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px";
  $scope.params_utf8 = encodeURI($scope.params);
  $scope.this_url_with_http = window.location.href;
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = '';

  $scope.gotoexternallink = function(link){
    size = 'width='+window.innerWidth+',height='+window.innerHeight
    window.open(link,'newwindow',size); 
  }
  $scope.go_to_tel_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://t.me/salambarf"); }, 4200);
  }
  $scope.go_to_eitaa_id = function (){
    setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
  }


  $scope.get_tel_id = function(){
    $scope.this_username = String(getCookie("username"))
    $scope.this_password = String(getCookie("password"))
    $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
    .success(function(data){
      const this_tel_id = data.tel_id
      storage.removeItem('this_tel_id')
      storage.setItem('this_tel_id',this_tel_id)

    })
      .error(function () {
        console.log("error")
      })

}

  $scope.sefaresh = function(){
    $scope.message_template =  '<p dir="rtl"> پیام شما در ایتا  به مسئول فروش ارسال شد. در اسرع وقت پاسخگو خواهیم بود . در حال انتقال به آیدی مسئول فروش ...</p>'
        setTimeout(() => {
          $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 1500});
        }, 1500);
      $scope.this_username = String(getCookie("username"))
      $scope.this_password = String(getCookie("password"))
      $http.post(DjangoURL + '/account/checkuserwithpassword','username='+$scope.this_username+'&password='+$scope.this_password)
      .success(function(data){
        $scope.this_tel_id = data.tel_id
        storage.removeItem('this_tel_id')
        $state.reload()
        storage.setItem('this_tel_id',$scope.this_tel_id)
        $scope.this_address = String(getCookie("address"))
        // Send Message To Telegram

        // $http.post('https://api.telegram.org/bot1480674202:AAEuY1mfVI2LMSszabJM0nZni5CjpzhLCVA/sendmessage'
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.pooshak.name+"\n\n  قیمت آن : "+$scope.pooshak.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
        // .success(function(data){
        //
        // console.log(data)
        // $scope.message_template =  '<p dir="rtl">پیام شما در تلگرام به مسئول فروش ارسال شد. در اسرع وقت پاسگو خواهیم بود.</p>'
        // setTimeout(() => {
        //   $ionicLoading.show({template: $scope.message_template, noBackdrop: true, duration: 3700});
        // }, 1500);
        // })

        // Send Message To Eitaa

        $http.post(DjangoURL+'/send_message'
        ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.hejab.name+"\n\n  قیمت آن : "+$scope.hejab.amount+"\n\nو آدرس سفارش دهنده : "+$scope.this_address+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone)
        .success(function(data){
          if (true){
            setTimeout(() => { $scope.gotoexternallink("https://eitaa.com/salambarf"); }, 4200);
          }
        console.log(data)
        })
        
      })
      .error(function () {
        console.log("error")
      })
  }

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    $scope.num += 1
  }

  $scope.remove_from_num = function(){
    console.log("removed num!")
    if ($scope.num == 1){
      $scope.num = 1
    }
    else {
      $scope.num -= 1
    }
  }

  $scope.cart = false
  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
  .success(function(data){
    console.log(data)
    if (data.result.length > 0){
      if (JSON.stringify(data.result).indexOf($scope.hejab.name) > -1){
        $scope.cart = true
      }
    }
  })
  $scope.add_to_cart = function(){
    $scope.cart = true
    console.log($scope.hejab)
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.hejab.name+"&amount="+$scope.hejab.amount+"&kala_address="+LocalURL+"/#/hejab/"+String($stateParams.hejabId)+"&img="+$scope.hejab.img+"&num="+String($scope.num)
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.account")
  }
})

.controller('SettingsCtrl', function($scope,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
})

.controller('AboutmeCtrl', function($scope,$state) {
  $scope.gotoexternallink = function(link){
    size = 'width='+window.innerWidth+',height='+window.innerHeight
    window.open(link,'newwindow',size); 
  }
  $scope.back = function(){
      history.back()
  }
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  });
})


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


var loggedin = false

var DjangoURL = "http://193.176.243.61:8080"
// var DjangoURL = "http://localhost:8000"
// var LocalURL =  "https://ionic-saraye-maryam.fandogh.cloud"
var LocalURL = "http://193.176.243.61"
