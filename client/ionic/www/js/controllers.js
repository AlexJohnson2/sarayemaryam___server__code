angular.module('starter.controllers', [])

.controller('LearnCtrl', function($scope,$state,$ionicLoading,$ionicPopup,$http) {
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
  

  $scope.send_signup_class_hozoori = function() {
    $scope.data = {};
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<h4 dir="rtl">درخواست ثبت نام شما به مسئول ثبت نام ارسال می شود و برای ارائه توضیحات در اسرع وقت با شما تماس خواهند گرفت.<br> جهت دریافت شرایط ثبت نام و شرکت در کلاس ها کاربری ایتای خود را چک کنید.</h4>',
      title: 'ثبت نام کلاس های خیاطی',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: 'تایید',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/send_signup_class","text=درخواست ثبت نام کلاس خیاطی حضوری : "+"\n\n آیدی : "+String(getCookie("tel_id"))+"\n\nشماره : "+String(getCookie("phonenumber"))+"\n\nآدرس : "+String(getCookie("address"))+"\n\nکد پستی : "+String(getCookie("post_code")))
            $ionicLoading.show({ template: '<p dir="rtl">پیام شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });
          }
        }
      ]
    })}

    $scope.send_signup_class_majazi = function() {
      $scope.data = {};
      // An elaborate, custom popup
      $scope.myPopup = $ionicPopup.show({
        template: '<h4 dir="rtl">در حال حاضر امکان ثبت نام کلاس مجازی وجود ندارد.<br> برای اجرای کلاسهای مجازی در حال برنامه ریزی هستیم.  <br> درخواست شما به مسئول ثبت نام ارسال می شود. به محض آماده شدن شرایط به شما اطلاع رسانی خواهد شد.<br> باتشکر </h4>',
        title: 'ثبت نام کلاس های خیاطی',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: 'تایید',
            type: 'button-positive',
            onTap: function(e) {
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/send_signup_class","text=درخواست ثبت نام کلاس خیاطی مجازی : "+"\n\n آیدی : "+String(getCookie("tel_id"))+"\n\nشماره : "+String(getCookie("phonenumber"))+"\n\nآدرس : "+String(getCookie("address"))+"\n\nکد پستی : "+String(getCookie("post_code")))
              $ionicLoading.show({ template: '<p dir="rtl">پیام شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });
            }
          }
        ]
      })}

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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
  }


  $scope.pooshak_toggle = function(){
        var y = document.getElementById("pooshak-toggle-button");
        if (y.className === "icon ion-arrow-down-b") {
          y.className = "icon ion-arrow-left-b";
        } else {
          y.className = "icon ion-arrow-down-b";
        }
        var x = document.getElementsByName("pooshak_subset");
        console.log(x)
        for (var i = 0; i <x.length; i++){
          if (x[i].style.display === "none") {
            x[i].style.display = "block";
          } else {
            x[i].style.display = "none";
          }
        }
        
      }

      $scope.parcheh_toggle = function(){
        var y = document.getElementById("parcheh-toggle-button");
        if (y.className === "icon ion-arrow-down-b") {
          y.className = "icon ion-arrow-left-b";
        } else {
          y.className = "icon ion-arrow-down-b";
        }
        var x = document.getElementsByName("parcheh_subset");
        console.log(x)
        for (var i = 0; i <x.length; i++){
          if (x[i].style.display === "none") {
            x[i].style.display = "block";
          } else {
            x[i].style.display = "none";
          }
        }
        
      }

      $scope.kharazi_toggle = function(){
        var y = document.getElementById("kharazi-toggle-button");
        if (y.className === "icon ion-arrow-down-b") {
          y.className = "icon ion-arrow-left-b";
        } else {
          y.className = "icon ion-arrow-down-b";
        }
        var x = document.getElementsByName("kharazi_subset");
        console.log(x)
        for (var i = 0; i <x.length; i++){
          if (x[i].style.display === "none") {
            x[i].style.display = "block";
          } else {
            x[i].style.display = "none";
          }
        }
        
      }

      $scope.hejab_toggle = function(){
        var x = document.getElementsByName("hejab_subset");
        console.log(x)
        for (var i = 0; i <x.length; i++){
          if (x[i].style.display === "none") {
            x[i].style.display = "block";
          } else {
            x[i].style.display = "none";
          }
        }
        var y = document.getElementById("hejab-toggle-button");
        if (y.className === "icon ion-arrow-down-b") {
          y.className = "icon ion-arrow-left-b";
        } else {
          y.className = "icon ion-arrow-down-b";
        }
        
        
      }

      $scope.sefaresh_toggle = function(){
        var x = document.getElementsByName("sefaresh_subset");
        console.log(x)
        for (var i = 0; i <x.length; i++){
          if (x[i].style.display === "none") {
            x[i].style.display = "block";
          } else {
            x[i].style.display = "none";
          }
        }
        var y = document.getElementById("sefaresh-toggle-button");
        if (y.className === "icon ion-arrow-down-b") {
          y.className = "icon ion-arrow-left-b";
        } else {
          y.className = "icon ion-arrow-down-b";
        }
        
        
      }
  


  $scope.go_to_eitaa_id = function (){
    $scope.gotoexternallink("https://eitaa.com/salambarf")
  }

{/* <ion-list><ion-radio ng-model="choice" ng-value="'A'">Choose A</ion-radio><ion-radio ng-model="choice" ng-value="'B'">Choose B</ion-radio></ion-list> */}
  


$scope.finished_buy = function(post_data){
  // $scope.go_to_eitaa_id();
  // $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">سفارشات شما به مسئول فروش در پیام رسان ایتا ارسال شد. در حال انتقال به آیدی مسئول فروش...</p>', noBackdrop: true, duration: 3000 }).then(function(){$scope.gotoexternallink("https://eitaa.com/salambarf");});
  $http.post(DjangoURL+"/send_message","text=سبد خرید : "+"\n\n آیدی : "+$scope.this_user_tel_id+"\n\nشماره : "+$scope.this_user_phone+"\n\nآدرس : "+$scope.this_user_address+"\n\nکد پستی : "+$scope.this_post_code+"\n\nنحوه دریافت کالا :"+post_data)
  $scope.this_data = "user="+$scope.username
  setTimeout(() => {  
  $http.post(DjangoURL+"/cart/getall", $scope.this_data)
  .success(function(data){
    if (data.result.length != 0){
      for (i in data.result){
        $scope.this_data = 'text='+"سلام. \n\n"+"\n\nنام محصول : "+data.result[i]['name']+"\n\n  قیمت آن : "+data.result[i]['amount']+"\n\n آدرس سفارش: "+data.result[i]['kala_address']+"\n\n و تعداد آن:  "+data.result[i]['num']
        $http.post(DjangoURL+"/send_message",$scope.this_data)
        $http.post(DjangoURL+"/cart/delete","user="+$scope.username+"&name="+data.result[i]['name']+"&amount="+data.result[i]['amount']+"&kala_address="+data.result[i]['kala_address']+"&img="+data.result[i]['img'])
        $scope.this_data = "name="+data.result[i]['name']+"&id="+data.result[i]['id']+"&num="+String(data.result[i]['num'])
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/"+data.result[i]['group']+"/remove_num",$scope.this_data)
        .success(function(){
          console.log("removed item!")
        })
        $state.reload();
      }
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'انتقال به آیدی مسئول فروش',
          template: '<p dir="rtl" style="line-height : 150%;font-size:23px;">سبد خرید و سفارشات شما به مسئول فروش در پیام رسان ایتا ارسال شد. برای انتقال به آیدی ایتای مسئول فروش روی دکمه زیر کلیک کنید.</p><a onclick="window.open(\'https://eitaa.com/salambarf\', \'_system\', \'location=yes\'); return false;">انتقال به آیدی مسئول فروش</a>',
          buttons: [] //{text:'انتقال به آیدی مسئول فروش',type:'button-positive'}
        });
     
        alertPopup.then(function(res) {
          console.log("finish!!!")
        });
        setTimeout(() => {
          alertPopup.close();
        }, 5000);
      };
      $scope.showAlert()
      
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




$scope.finish = function() {
  if (getCookie("address") == ""){
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'هشدار',
        template: '<p dir="rtl">لطفا آدرس خود را در بخش حساب کاربری کامل کنید.</p>'
      });
    };
    $scope.showAlert()
   }
    else if (getCookie("post_code") == ""){
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'هشدار',
        template: '<p dir="rtl">لطفا کد پستی خود را در بخش حساب کاربری کامل کنید.</p>'
      });
    };
    $scope.showAlert()
  }
  else if (getCookie("address") == " "){
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'هشدار',
        template: '<p dir="rtl">لطفا آدرس خود را در بخش حساب کاربری کامل کنید.</p>'
      });
    };
    $scope.showAlert()
   }
  else if (getCookie("post_code") == " "){
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'هشدار',
        template: '<p dir="rtl">لطفا کد پستی خود را در بخش حساب کاربری کامل کنید.</p>'
      });
    };
    $scope.showAlert()
  }
  else{
    
  $scope.data = {};

  // An elaborate, custom popup
  $scope.myPopup = $ionicPopup.show({
  //   
  template:'<div dir="rtl"><label class="container"><p style="font-size:18px">تحویل حضوری از سرای مریم</p><p style="font-size:15px">(قم،بلوار 15 خرداد،کوچه 40)</p><input ng-model="data.post" ng-value="\'post_in_sara\'" type="radio" name="radio"><span class="checkmark"></span></label><label class="container">ارسال به مجتمع اساتید<br>هزینه : رایگان<input style="color:red" ng-model="data.post" ng-value="\'post_in_this\'" type="radio" checked="checked" name="radio"><span class="checkmark"></span></label><label class="container">ارسال به داخل شهر قم<br>هزینه : 3000 تومان<input ng-model="data.post" ng-value="\'post_in_qom\'" type="radio" name="radio"><span class="checkmark"></span></label><label class="container">ارسال به پردیسان قم<br>هزینه : 5000 تومان<input ng-model="data.post" ng-value="\'post_out_qom\'" type="radio" name="radio"><span class="checkmark"></span></label><label class="container">ارسال به شهرستان ها<br>هزینه : 10000 تومان<input ng-model="data.post" ng-value="\'post_out_city\'" type="radio" name="radio"><span class="checkmark"></span></label></div>',
  // template: '<input type="radio" id="male" name="gender" value="male"><label for="male">Male</label><br><input type="radio" id="female" name="gender" value="female"><label for="female">Female</label><br><input type="radio" id="other" name="gender" value="other"><label for="other">Other</label>',
    // template: '<p dir="rtl">نحوه دریافت کالا را انتخاب کنید.</p><ion-list><label for="post_in_this">ارسال به شهرستان ها<br>هزینه : 10000 تومان</label><input id="" type="radio" ng-model="data.serverSide" value="post_in_this" ng-value="item.value"></ion-list>',
    // <ion-radio-group></ion-radio-group><ion-radio class="radio radio-inline radio-gray " ng-model="data.post" ng-value="\'post_in_this\'" checked><p dir="rtl">ارسال به مجتمع اساتید<br>هزینه : رایگان🤩</p></ion-radio><ion-radio ng-model="data.post" ng-value="\'post_in_qom\'"><p dir="rtl">ارسال به درون شهر قم<br>هزینه : 3000 تومان</p></ion-radio><ion-radio ng-model="data.post" ng-value="\'post_out_qom\'"><p dir="rtl">ارسال به پردیسان قم<br>هزینه : 5000 تومان</p></ion-radio><ion-radio ng-model="data.post" ng-value="\'post_out_city\'"><p dir="rtl">ارسال به شهرستان ها<br>هزینه : 10000 تومان</p></ion-radio></ion-radio-group>
    title: 'ویرایش',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'انصراف' },
      {
        text: '<b>اعمال</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.data.post == "post_in_this"){
            $scope.post_data = "ارسال به مجتمع اساتید"
          }
          if ($scope.data.post == "post_in_qom"){
            $scope.post_data = "ارسال به درون شهر قم"
          }
          if ($scope.data.post == "post_out_qom"){
            $scope.post_data = "ارسال به پردیسان قم"
          }
          if ($scope.data.post == "post_out_city"){
            $scope.post_data = "ارسال به سایر شهر ها"
          }
          if ($scope.data.post == "post_in_sara"){
            $scope.post_data = "تحویل حضوری از سرای مریم"
          }
          console.log("finished buy!!",$scope.post_data)
          $scope.finished_buy($scope.post_data)
          $state.reload();
          $state.reload();
          $state.reload();

        }
      }
    ]
  
  })
  $state.reload();
  $state.reload();
}}

  
  
  $scope.delete_from_cart = function(kala) {
    $scope.data = {};
    console.log("kala group is : ",kala.group)
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
              $scope.this_data = "id="+kala.id+"&num="+kala.num
              add_url = "/kala/"+kala.group+"/add_num"
              console.log($scope.this_data,add_url)
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+add_url, $scope.this_data)
              console.log(data)
              $state.reload()
              $state.reload()
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
            document.cookie = "username=;"
            document.cookie = "password=;"
            document.cookie = "phonenumber=;"
            document.cookie = "tel_id=;"
            document.cookie = "address=;"
            document.cookie = "post_code=;"
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
        document.cookie = "phonenumber="+$scope.phonenumber
        document.cookie = "tel_id="+$scope.tel_id
        document.cookie = "address="+$scope.address
        document.cookie = "post_code="+$scope.post_code
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



.controller('PooshaksِMardaneCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('PooshakMardaneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakmardaneId-1]
    console.log("this is pooshak :  ",$scope.pooshak)
    
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakmardaneId-1]
    console.log($stateParams)
    console.log($stateParams.pooshakmardaneId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
      
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.pooshakmardaneId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $scope.this_data = "user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name
          console.log($scope.this_data)
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',$scope.this_data)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=pooshak_mardane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('PooshaksِDokhtaraneCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('PooshakDokhtaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakzananeId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakdokhtaraneId-1]
    console.log($stateParams)
    console.log($stateParams.pooshakdokhtaraneId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.pooshakdokhtaraneId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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

  $$scope.gotoexternallink = function(link){
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=pooshak_dokhtarane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('PooshaksِZananeCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('PooshakZananeDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakzananeId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakzananeId-1]
    console.log($stateParams)
    console.log($stateParams.pooshakzananeId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.pooshakzananeId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
      
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=pooshak_zanane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('PooshaksِPesaraneCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('PooshakPesaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakpesaraneId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakpesaraneId-1]
    console.log($stateParams)
    console.log($stateParams.pooshakpesaraneId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        console.log(JSON.stringify(data.result))
      
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          console.log("it is a true")
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.pooshakpesaraneId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=pooshak_pesarane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('PooshaksِNozadiCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('PooshakNozadiDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshaknozadiId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshaknozadiId-1]
    console.log($stateParams)
    console.log($stateParams.pooshaknozadiId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.pooshaknozadiId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=pooshak_nozadi"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('HejabChadorCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/hejab_chador/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('HejabChadorDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_chador/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabchadorId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/hejab_chador/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabchadorId-1]
    console.log($stateParams)
    console.log($stateParams.hejabchadorId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_chador/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.hejabchadorId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=hejab_chador"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('HejabShalCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/hejab_shal/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('HejabShalDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_shal/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabshalId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/hejab_shal/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabshalId-1]
    console.log($stateParams)
    console.log($stateParams.hejabshalId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_shal/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.hejabshalId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=hejab_shal"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('HejabRoosariCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/hejab_roosari/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('HejabRoosariDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_roosari/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabroosariId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/hejab_roosari/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabroosariId-1]
    console.log($stateParams)
    console.log($stateParams.hejabroosariId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_roosari/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.hejabroosariId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=hejab_roosari"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('HejabSaghedastdastkeshCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('HejabSaghedastdastkeshDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabsaghedastdastkeshId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabsaghedastdastkeshId-1]
    console.log($stateParams)
    console.log($stateParams.hejabsaghedastdastkeshId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.hejabsaghedastdastkeshId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=hejab_saghedast_dastkesh"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('HejabMaskpooshieCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('HejabMaskpooshieDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabmaskpooshieId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabmaskpooshieId-1]
    console.log($stateParams)
    console.log($stateParams.hejabmaskpooshieId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.hejabmaskpooshieId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=hejab_mask_pooshie"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('KharaziAbzarkhayatiCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('KharaziAbzarkhayatiDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.kharaziabzarkhayatiId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.kharaziabzarkhayatiId-1]
    console.log($stateParams)
    console.log($stateParams.kharaziabzarkhayatiId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.kharaziabzarkhayatiId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=kharazi_abzarkhayati"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

.controller('KharaziLavazemtahrirCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('KharaziLavazemtahrirDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.kharazilavazemtahrirId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.kharazilavazemtahrirId-1]
    console.log($stateParams)
    console.log($stateParams.kharazilavazemtahrirId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        console.log(JSON.stringify(data.result))
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          console.log("it is a true")
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.kharazilavazemtahrirId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=kharazi_lavazemtahrir"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
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
  
    $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshak_zanane = data.result
    })
    $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak_mardane = data.result
    })
    $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshak_dokhtarane = data.result
    })
    $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshak_pesarane = data.result
    })
    $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshak_nozadi = data.result
    })
  });
  
      
})

















.controller('SefareshMardaneCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/sefaresh_mardane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('SefareshMardaneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/sefaresh_mardane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshmardaneId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/sefaresh_mardane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshmardaneId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshmardaneId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_mardane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.sefareshmardaneId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=sefaresh_mardane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.sefareshmardaneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

















.controller('SefareshZananeCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/sefaresh_zanane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('SefareshZananeDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/sefaresh_zanane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshzananeId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/sefaresh_zanane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshzananeId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshzananeId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_zanane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.sefareshzananeId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=sefaresh_zanane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})

























.controller('SefareshDokhtaraneCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('SefareshDokhtaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshdokhtaraneId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshdokhtaraneId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshdokhtaraneId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.sefareshdokhtaraneId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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

        console.log(data)
        })
        

      })
      .error(function () {
        console.log("error")
      })
  }
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=sefaresh_dokhtarane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})













.controller('SefareshPesaraneCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/sefaresh_pesarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('SefareshPesaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/sefaresh_pesarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshpesaraneId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/sefaresh_pesarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshpesaraneId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshpesaraneId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_pesarane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.sefareshpesaraneId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=sefaresh_pesarane"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})










.controller('SefareshNozadiCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/sefaresh_nozadi/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('SefareshNozadiDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/sefaresh_nozadi/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshnozadiId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/sefaresh_nozadi/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshnozadiId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshnozadiId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_pesarane/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.sefareshnozadiId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=sefaresh_nozadi"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})










.controller('SefareshSayerCtrl', function($scope,$state,$http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (document.cookie.indexOf("username") > -1){
      if (getCookie("username") == ""){
        $state.go('signin',{})
      }
    }
    if (document.cookie.indexOf("username") == -1){
      $state.go('signin',{})
    }
  
    $http.post(DjangoURL+"/kala/sefaresh_sayer/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
      
})

.controller('SefareshSayerDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/sefaresh_sayer/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshsayerId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/sefaresh_sayer/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshsayerId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshsayerId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_sayer/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.sefareshsayerId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&group=sefaresh_sayer"+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
  }

})








.controller('PooshakDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakId-1]
    storage.setItem("pooshak",$scope.pooshak)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.pooshak = storage.getItem("pooshak")
  console.log($scope.pooshak)
  
  $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakId-1]
    console.log($stateParams)
    console.log($stateParams.pooshakId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.pooshak.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.pooshak.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak/getall")
        .success(function(data){
          $scope.pooshak = data.result[$stateParams.pooshakId-1]
          console.log($scope.pooshak.name)
          var name = $scope.pooshak.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.pooshak.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.pooshak.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.pooshak.num)){
      $scope.num = parseInt($scope.pooshak.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.pooshak.name+"&amount="+$scope.pooshak.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.pooshak.img+"&num="+String($scope.num)+"&this_id="+$scope.pooshak.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
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
  
    $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
        console.log(data);
    $scope.parchehs = data.result
    })
    

  });
  
      
})

.controller('ParchehDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
    console.log(data);
    $scope.parcheh = data.result[$stateParams.parchehId-1]
    storage.setItem("parcheh",$scope.parcheh)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.parcheh = storage.getItem("parcheh")
  console.log($scope.parcheh)
  
  $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
    console.log(data);
    $scope.parcheh = data.result[$stateParams.parchehId-1]
    console.log($stateParams)
    console.log($stateParams.parchehId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.parcheh)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.parcheh.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.parcheh.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/parcheh/getall")
        .success(function(data){
          $scope.parcheh = data.result[$stateParams.parchehId-1]
          console.log($scope.parcheh.name)
          var name = $scope.parcheh.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.parcheh.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.parcheh.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.parcheh.name+"&amount="+$scope.parcheh.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.parcheh.name+"\n\n  قیمت آن : "+$scope.parcheh.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.parcheh.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.parcheh.num)){
      $scope.num = parseInt($scope.parcheh.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.parcheh.name+"&amount="+$scope.parcheh.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.parcheh.img+"&num="+String($scope.num)+"&this_id="+$scope.parcheh.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
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
  
    $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
        console.log(data);
    $scope.kharazis = data.result
    })
    $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
    .success(function(data){
        console.log(data);
    $scope.kharazi_abzarkhayati = data.result
    })
    $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
    .success(function(data){
        console.log(data);
    $scope.kharazi_lavazemtahrir = data.result
    })
    
  });
  
      
})

.controller('KharaziDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
    console.log(data);
    $scope.kharazi = data.result[$stateParams.kharaziId-1]
    storage.setItem("parcheh",$scope.kharazi)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.kharazi = storage.getItem("kharazi")
  console.log($scope.kharazi)
  
  $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
    console.log(data);
    $scope.kharazi = data.result[$stateParams.kharaziId-1]
    console.log($stateParams)
    console.log($stateParams.kharaziId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.kharazi)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.kharazi.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.kharazi.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi/getall")
        .success(function(data){
          $scope.kharazi = data.result[$stateParams.kharaziId-1]
          console.log($scope.kharazi.name)
          var name = $scope.kharazi.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.kharazi.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.kharazi.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.kharazi.name+"&amount="+$scope.kharazi.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.kharazi.name+"\n\n  قیمت آن : "+$scope.kharazi.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.kharazi.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.kharazi.num)){
      $scope.num = parseInt($scope.kharazi.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.kharazi.name+"&amount="+$scope.kharazi.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.kharazi.img+"&num="+String($scope.num)+"&this_id="+$scope.kharazi.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
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
  
    $http.post(DjangoURL+"/kala/hejab_shal/getall")
    .success(function(data){
        console.log(data);
    $scope.hejab_shal = data.result
    })
    $http.post(DjangoURL+"/kala/hejab_chador/getall")
    .success(function(data){
        console.log(data);
    $scope.hejab_chador = data.result
    })
    $http.post(DjangoURL+"/kala/hejab_roosari/getall")
    .success(function(data){
        console.log(data);
    $scope.hejab_roosari = data.result
    })
    $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
    .success(function(data){
        console.log(data);
    $scope.hejab_saghedast_dastkesh = data.result
    })
    $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
    .success(function(data){
        console.log(data);
    $scope.hejab_mask_pooshie = data.result
    })
  });
  
      
})

.controller('HejabDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab/getall")
    .success(function(data){
    console.log(data);
    $scope.hejab = data.result[$stateParams.hejabId-1]
    storage.setItem("hejab",$scope.hejab)
    })

  $scope.back = function(){
      history.back()
  }
  $scope.hejab = storage.getItem("parcheh")
  console.log($scope.hejab)
  
  $http.post(DjangoURL+"/kala/hejab/getall")
    .success(function(data){
    console.log(data);
    $scope.hejab = data.result[$stateParams.hejabId-1]
    console.log($stateParams)
    console.log($stateParams.hejabId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.hejab)
    $scope.comment = false
    $scope.unavailable = false
    if ($scope.hejab.num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/comments","user="+String(getCookie("username")))
      .success(function(data){
        if (JSON.stringify(data.result).indexOf($scope.hejab.name) > -1){
          $scope.comment = true
          
        }
      })
    }
    })

    $scope.add_to_kalas = function(){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab/getall")
        .success(function(data){
          $scope.hejab = data.result[$stateParams.hejabId-1]
          console.log($scope.hejab.name)
          var name = $scope.hejab.name
          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          $http.post(DjangoURL+'/send_comment',"user="+String(getCookie("username"))+'&text= پیشنهاد موجود شدن کالای : '+name)
          .success(function(){
            if (data.status == 'ok'){
              $scope.comment = true
              $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">پیشنهاد شما ارسال شد.</p>', noBackdrop: true, duration: 2200 });

            }
          })

        })
      
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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

  // this is a edit_cart

  $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        return result.name == $scope.hejab.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala.num)
    })
  
  $scope.edit_cart = function() {
    $scope.data = {};
    $http.post(DjangoURL+"/cart/getall","user="+String(getCookie("username")))
    .success(function(data){
      result = data.result
      $scope.this_kala =  data.result.filter(function(result) {
        
        return result.name == $scope.hejab.name;
        
      });
      console.log($scope.this_kala)
      console.log($scope.this_kala[0].num)
      console.log($scope.this_kala['num'])
    })
    $scope.num = parseInt($scope.this_kala[0].num)
    // An elaborate, custom popup
    $scope.myPopup = $ionicPopup.show({
      template: '<center><ion-button class="button button-positive" ng-click="remove_from_num()" style="display:inline;font-size:30px;">-</ion-button><p id="number" style="display:inline;font-size:20px;padding-top:50px"> {{num}} </p><ion-button class="button button-positive" ng-click="add_to_num()" style="display:inline;font-size:30px;">+</ion-button></center>',
      title: 'ویرایش',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'انصراف' },
        {
          text: '<b>اعمال</b>',
          type: 'button-positive',
          onTap: function(e) {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/cart/edit","user="+String(getCookie("username"))+"&name="+$scope.hejab.name+"&amount="+$scope.hejab.amount+"&num="+$scope.num)
            .success(function(data){
              console.log(data)

            })
          $state.reload()
          }
        }
      ]
    })}


  
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
        // ,'text='+"سلام. \n\n"+"  آیدی سفاش دهنده : "+data.tel_id+"\n\nنام محصول : "+$scope.hejab.name+"\n\n  قیمت آن : "+$scope.hejab.amount+"\n\n آدرس سفارش: "+$scope.this_url+"\n\nشماره تلفن : "+data.this_phone+'&chat_id='+'134200837')
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
  console.log("iiiiiittttttteeeeemmmmm iiiiisssss :  ",$scope.hejab.num)

  $scope.num = 1
  $scope.add_to_num = function(){
    console.log("added num!")
    if ($scope.num == parseInt($scope.hejab.num)){
      $scope.num = parseInt($scope.hejab.num)
    }
    else {
      $scope.num += 1
    }
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
    $scope.this_data = "user="+String(getCookie("username"))+"&name="+$scope.hejab.name+"&amount="+$scope.hejab.amount+"&kala_address="+LocalURL+"/#/pooshak/"+String($stateParams.pooshakdokhtaraneId)+"&img="+$scope.hejab.img+"&num="+String($scope.num)+"&this_id="+$scope.hejab.id
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/cart/add",$scope.this_data)
      .success(function(data){
        console.log(data)          
      })
  }
  $scope.finished_buy = function(){
    $state.go("tab.store")
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
    // size = 'width='+window.innerWidth+',height='+window.innerHeight
    // window.open(link,'newwindow',size); 
    window.open(link, '_system', 'location=yes'); return false;
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
