angular.module('starter.controllers', [])


.controller('SigninCtrl', function($scope,$http,$ionicLoading,$state,$window) {
  $state.reload()
  $scope.back = function(){
      history.back()
  }
  $scope.signin = function(){
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL + '/account/checkadmin',
                'username='+$scope.username+'&password='+$scope.password)
    .success(function(data){
      if (data.status == 'ok'){
        $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon><p dir="rtl">  شما با موفقیت به سیستم وارد شدید. </p>', noBackdrop: true, duration: 1300 });
        loggedin = true
        // $state.go('tab-store')
        $window.location.href = '#/tab/home'
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




.controller('HomeCtrl', function($scope, $http,$state, $ionicLoading,$ionicPopup) {
  $scope.add_new_kala = function(){
    $scope.selected = document.getElementById("selecteditem").value;
    console.log($scope.selected)
    if ($scope.selected == "پوشاک مردانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak_mardane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
                })
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak/add",
                          "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
            }
    if ($scope.selected == "پوشاک زنانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak_zanane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
    })
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)

                        }
    if ($scope.selected == "پوشاک دخترانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak_dokhtarane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
                })
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
            }
    if ($scope.selected == "پوشاک پسرانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak_pesarane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
                })
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
            }

    if ($scope.selected == "پوشاک نوزاد"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/pooshak_nozadi/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }

    if ($scope.selected == "ابزار خیاطی"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }

    if ($scope.selected == "لوازم التحریر"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/kharazi/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }

    if ($scope.selected == "چادر"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_chador/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }

    if ($scope.selected == "شال"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_shal/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }

    if ($scope.selected == "روسری"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_roosari/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
                  
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }
          
    if ($scope.selected == "ساق دست و دستکش"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }
    
    if ($scope.selected == "ماسک و پوشیه"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab_mask_pooshie/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/hejab/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
          }

    if ($scope.selected == "پارچه مریم"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/parcheh/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
      })
    }


    if ($scope.selected == "سفارش دوخت مردانه"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_mardane/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
          }
    if ($scope.selected == "سفارش دوخت زنانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/sefaresh_zanane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
    })

                        }
    if ($scope.selected == "سفارش دوخت دخترانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
                })
            }
    if ($scope.selected == "سفارش دوخت پسرانه"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/sefaresh_pesarane/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
                })
            }

    if ($scope.selected == "سفارش دوخت نوزاد"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_nozadi/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
          }

    if ($scope.selected == "سفارش دوخت سایر موارد"){
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $http.post(DjangoURL+"/kala/sefaresh_sayer/add",
              "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
              .success(function(data){
                  console.log(data)
                  $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                  document.getElementById("addform").reset();
                  $state.reload()
              })
          }


};
})

.controller('ChatsCtrl', function($scope, Chats,$ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$ionicPopup) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('StoreCtrl', function($scope,$state,$http,$ionicLoading,$ionicPopup) {


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

})

.controller('PooshaksCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {
    $scope.$on('$ionicView.enter', function(e) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
        console.log(data);
        $scope.pooshaks = data.result
    })
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak/delete","id="+String(id))
		    /*         
              .success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'> در حال حذف...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })
	      */
	      $state.reload()
            }
          }
        ]
      })}

      $scope.edit = function(item) {
        $scope.data = {};
      
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
          // templateUrl: 'edit-pooshaks-mardane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  console.log(item.img.substring(32, item.img.length))
                  $scope.data.img = item.img.substring(32, item.img.length)
                  // console.log(item.img)
                  // $scope.data.img = "photo_2021-02-23_21-00-10.jpg"
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                
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
        console.log("vared shod!")
        $scope.get = function(){
          var s = document.getElementsByClassName("item-content")
        console.log(s)
        for (var i = 0; i <s.length; i++){
          if (s[i].tagName == "A"){
              s[i].style = "transform: translate3d(-111px, 0px, 0px);"
              console.log(s[i])}}
        var s = document.getElementsByClassName("item-options invisible")
        for (var i = 0; i <s.length; i++){
          if (s[i].tagName == "div"){
              s[i].className = "item-options"
              console.log(s[i])}}
        }
        // $scope.get()
        // setTimeout(() => { $scope.get() }, 400);
        
})})

.controller('PooshakDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakId-1]
    })


  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth
  $scope.button_screen = window.innerWidth-10
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''
})

.controller('ParchehsCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {
     $scope.$on('$ionicView.enter', function(e) {
     $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
        console.log(data);
    $scope.parchehs = data.result
    })
})
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/parcheh/delete","id="+String(id))
              /*
              .success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}

      $scope.edit = function(item) {
        $scope.data = {};
      
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/parcheh/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
                  $ionicLoading.show({template: "<p dir='rtl'> در حال ویرایش... </p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
    
})

.controller('ParchehDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
    console.log(data);
    $scope.parcheh = data.result[$stateParams.parchehId-1]
    })

  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth
  $scope.button_screen = window.innerWidth-10
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''
})

.controller('KharazisCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {
    $scope.$on('$ionicView.enter', function(e) {
    $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
        console.log(data);
    $scope.kharazis = data.result
    })
    })
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id)) 
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/kharazi/delete","id="+String(id))
              /*
              .success(function(data){
                console.log(data)
	        $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}
      $scope.edit = function(item) {
        $scope.data = {};
      
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/kharazi/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                
		/*.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
    
})

.controller('KharaziDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $http.post(DjangoURL+"/kala/kharazi/getall")
    .success(function(data){
    console.log(data);
    $scope.kharazi = data.result[$stateParams.kharaziId-1]
    })

    
  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth
  $scope.button_screen = window.innerWidth-10
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''
})

.controller('HejabsCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {
    $scope.$on('$ionicView.enter', function(e) {
    $http.post(DjangoURL+"/kala/hejab/getall")
    .success(function(data){
        console.log(data);
    $scope.hejabs = data.result
    })
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
    })
    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/hejab/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
      
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/hejab/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
})

.controller('HejabDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
    $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    $http.post(DjangoURL+"/kala/hejab/getall")
    .success(function(data){
    console.log(data);
    $scope.hejab = data.result[$stateParams.hejabId-1]
    })


  $scope.back = function(){
      history.back()
  }
  $scope.screen_width = window.innerWidth;
  $scope.button_screen = window.innerWidth-10
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px";
  $scope.params_utf8 = encodeURI($scope.params);
  $scope.this_url_with_http = window.location.href;
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = '';
})

.controller('TestCtrl', function($scope, $ionicPopup) {
  $scope.showAlert = function() {  
    var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
    });

    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
})

////////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////









.controller('PooshaksِMardaneCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/pooshak_mardane/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak_mardane/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak_mardane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('PooshakMardaneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_mardane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakmardaneId-1]
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


})

.controller('PooshaksِDokhtaraneCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  
  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/pooshak_dokhtarane/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak_dokhtarane/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak_dokhtarane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                console.log(
                $scope.data.name = item.name,
                $scope.data.text = item.text,
                $scope.data.img = item.img,
                $scope.data.num = item.num,
                $scope.data.amount = item.amount)
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
})

.controller('PooshakDokhtaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_dokhtarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakzananeId-1]
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


})

.controller('PooshaksِZananeCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/pooshak_zanane/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak_zanane/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak_zanane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('PooshakZananeDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_zanane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakzananeId-1]
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


})

.controller('PooshaksِPesaraneCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/pooshak_pesarane/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak_pesarane/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak_pesarane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('PooshakPesaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_pesarane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakpesaraneId-1]
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


})

.controller('PooshaksِNozadiCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/pooshak_nozadi/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak_nozadi/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/pooshak_nozadi/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('PooshakNozadiDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {

    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak_nozadi/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshaknozadiId-1]
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
})

.controller('HejabChadorCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/hejab_chador/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab_chador/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/hejab_chador/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/hejab_chador/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('HejabChadorDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_chador/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabchadorId-1]
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

})

.controller('HejabShalCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/hejab_shal/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab_shal/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/hejab_shal/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/hejab_shal/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('HejabShalDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_shal/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabshalId-1]
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

})

.controller('HejabRoosariCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/hejab_roosari/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab_roosari/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/hejab_roosari/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/hejab_roosari/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('HejabRoosariDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_roosari/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabroosariId-1]
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

})

.controller('HejabSaghedastdastkeshCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('HejabSaghedastdastkeshDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_saghedast_dastkesh/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabsaghedastdastkeshId-1]
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
})

.controller('HejabMaskpooshieCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true;
    $scope.delete = function (id){
      
      $http.post(DjangoURL+"/kala/hejab_mask_pooshie/delete","id="+id)
      .success(function(data){
        console.log(data)
      })
      
     console.log("deleted item : ",id)
    }
    $scope.delete = function(id) {
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
              console.log("deleted item : ",String(id))
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/hejab_mask_pooshie/delete","id="+String(id))
              
		/*	    
		.success(function(data){
                console.log(data)
                $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
		$state.reload()
              })*/
	      $state.reload()
            }
          }
        ]
      })}


      $scope.edit = function(item) {
        $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
          title: 'ویرایش',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'انصراف' },
            {
              text: '<b>اعمال</b>',
              type: 'button-positive',
              onTap: function(e) {
                if ($scope.data.name == undefined){
                  $scope.data.name = item.name
                }
                if ($scope.data.text == undefined){
                  $scope.data.text = item.text
                }
                if ($scope.data.img == undefined){
                  $scope.data.img = item.img.substring(32, item.img.length)
                }
                if ($scope.data.amount == undefined){
                  $scope.data.amount = item.amount
                }
                if ($scope.data.num == undefined){
                  $scope.data.num = item.num
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                $http.post(DjangoURL+"/kala/hejab_mask_pooshie/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
                /*
		.success(function(data){
                  console.log(data)
		  $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
		  $state.reload()
                })*/
		$state.reload()
              }
            }
          ]
        })}
  
      
})

.controller('HejabMaskpooshieDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/hejab_mask_pooshie/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.hejabmaskpooshieId-1]
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

})

.controller('KharaziAbzarkhayatiCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/delete","id="+String(id))
            
  /*	    
  .success(function(data){
              console.log(data)
              $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
              /*
  .success(function(data){
                console.log(data)
    $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
    $state.reload()
              })*/
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('KharaziAbzarkhayatiDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/kharazi_abzarkhayati/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.kharaziabzarkhayatiId-1]
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

})

.controller('KharaziLavazemtahrirCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/delete","id="+String(id))
            
  /*	    
  .success(function(data){
              console.log(data)
              $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
              /*
  .success(function(data){
                console.log(data)
    $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
    $state.reload()
              })*/
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('KharaziLavazemtahrirDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/kharazi_lavazemtahrir/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.kharazilavazemtahrirId-1]
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

})

.controller('PooshaksCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
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

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/pooshak/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/pooshak/delete","id="+String(id))
            
  /*	    
  .success(function(data){
              console.log(data)
              $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
    
      // An elaborate, custom popup
      $scope.myPopup = $ionicPopup.show({
        template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/pooshak/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
              /*
  .success(function(data){
                console.log(data)
    $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
    $state.reload()
              })*/
  $state.reload()
            }
          }
        ]
      })}
  
      
})
















































.controller('SefareshMardaneCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/sefaresh_mardane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/sefaresh_mardane/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/sefaresh_mardane/delete","id="+String(id))
            
  /*	    
  .success(function(data){
              console.log(data)
              $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/sefaresh_mardane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
              /*
  .success(function(data){
                console.log(data)
    $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
    $state.reload()
              })*/
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('SefareshMardaneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
   
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
  

  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

})


.controller('SefareshZananeCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/sefaresh_zanane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/sefaresh_zanane/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
    $scope.data = {};
  
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/sefaresh_zanane/delete","id="+String(id))
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/sefaresh_zanane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
  
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('SefareshZananeDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {

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
  
  $http.post(DjangoURL+"/kala/sefaresh_zanane/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.sefareshzananeId-1]
    console.log($stateParams)
    console.log($stateParams.sefareshzananeId-1)
    console.log(data.result)
    console.log("pooooooshaaaaak is :  ",$scope.pooshak)
    if (data.result[$stateParams.sefareshzananeId-1].num == "ناموجود"){
      console.log("ناموجوده ها !!!")
      $scope.unavailable = true
    }
    })

  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

  
})






















.controller('SefareshDokhtaraneCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
    $scope.data = {};
  
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/delete","id="+String(id))
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/sefaresh_dokhtarane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
  
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('SefareshDokhtaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
  
  

  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

  

})













.controller('SefareshPesaraneCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/sefaresh_pesarane/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/sefaresh_pesarane/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
    $scope.data = {};
  
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/sefaresh_pesarane/delete","id="+String(id))
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/sefaresh_pesarane/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
  
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('SefareshPesaraneDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
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
  

  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

  

})










.controller('SefareshNozadiCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {

    $http.post(DjangoURL+"/kala/sefaresh_nozadi/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/sefaresh_nozadi/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
    $scope.data = {};
  
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/sefaresh_nozadi/delete","id="+String(id))
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/sefaresh_nozadi/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
  
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('SefareshNozadiDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {

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

  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

  

})










.controller('SefareshSayerCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/sefaresh_sayer/getall")
    .success(function(data){
        console.log(data);
    $scope.pooshaks = data.result
    })
  });
  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/sefaresh_sayer/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
    $scope.data = {};
  
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/sefaresh_sayer/delete","id="+String(id))
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
        $scope.name = item.name
        $scope.text = item.text
        $scope.img = item.img.slice(33,String(item.img.length))
        $scope.num = item.num
        $scope.amount = item.amount
        $scope.data.name = item.name
        $scope.data.text = item.text
        $scope.data.img = item.img.slice(33,String(item.img.length))
        $scope.data.num = item.num
        $scope.data.amount = item.amount
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          template: '<div dir="rtl"><p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name" value="{{name}}"><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text" value="{{text}}"></textarea><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img" value="{{img}}"><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num" value="{{num}}"><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount" value="{{amount}}"></div>',
          // templateUrl: 'templates/edit-pooshaks-dokhtarane.html',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/sefaresh_sayer/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
  
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('SefareshSayerDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {

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



  $scope.screen_width = window.innerWidth
  $scope.button_screen = (window.innerWidth/2)-45
  $scope.img_height = window.innerHeight-(window.innerHeight/4)
  $scope.img_width = window.innerWidth-(window.innerWidth/4)
  $scope.img = String($scope.img_width)+"px"
  $scope.params_utf8 = encodeURI($scope.params)
  $scope.this_url_with_http = window.location.href
  $scope.this_url = LocalURL+$scope.this_url_with_http.substring(LocalURL.length, $scope.this_url_with_http.length);
  $scope.message_template = ''

  

})



.controller('PooshakDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


    $http.post(DjangoURL+"/kala/pooshak/getall")
    .success(function(data){
    console.log(data);
    $scope.pooshak = data.result[$stateParams.pooshakId-1]
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

})

.controller('ParchehsCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
    $http.post(DjangoURL+"/kala/parcheh/getall")
    .success(function(data){
        console.log(data);
    $scope.parchehs = data.result
    })
  });

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/parcheh/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/parcheh/delete","id="+String(id))
            
  /*	    
  .success(function(data){
              console.log(data)
              $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
    
      // An elaborate, custom popup
      $scope.myPopup = $ionicPopup.show({
        template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/parcheh/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
              /*
  .success(function(data){
                console.log(data)
    $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
    $state.reload()
              })*/
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('ParchehDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


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

})

.controller('KharazisCtrl', function($scope,$state,$http,$ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
  
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

  $scope.shouldShowDelete = false;
  $scope.listCanSwipe = true;
  $scope.delete = function (id){
    
    $http.post(DjangoURL+"/kala/kharazi/delete","id="+id)
    .success(function(data){
      console.log(data)
    })
    
    
   console.log("deleted item : ",id)
  }
  $scope.delete = function(id) {
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
            console.log("deleted item : ",String(id))
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post(DjangoURL+"/kala/kharazi/delete","id="+String(id))
            
  /*	    
  .success(function(data){
              console.log(data)
              $ionicLoading.show({template: "<p dir='rtl'>در حال حذف ...</p>", noBackdrop: true, duration: 700});
  $state.reload()
            })*/
      $state.reload()
          }
        }
      ]
    })}


    $scope.edit = function(item) {
      $scope.data = {};
    
      // An elaborate, custom popup
      $scope.myPopup = $ionicPopup.show({
        template: '<p style="text-align:center">مشخصات جدید را وارد کنید</p><br><p dir="rtl">نام:</p><input type="text" ng-model="data.name"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">توضیحات:</p><textarea style="height:100px" ng-model="data.text"></textarea><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">آدرس عکس:</p><input type="text" ng-model="data.img"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">موجودی:</p><input type="text" ng-model="data.num"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p><br><p dir="rtl">قیمت:</p><input type="text" ng-model="data.amount"><p dir="rtl" style="color:red;font-size:13px">اگر این مقدار خالی بماند، با مقدار قبلی جایگزین می شود.</p>',
        title: 'ویرایش',
        subTitle: '',
        scope: $scope,
        buttons: [
          { text: 'انصراف' },
          {
            text: '<b>اعمال</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.name == undefined){
                $scope.data.name = item.name
              }
              if ($scope.data.text == undefined){
                $scope.data.text = item.text
              }
              if ($scope.data.img == undefined){
                $scope.data.img = item.img.substring(32, item.img.length)
              }
              if ($scope.data.amount == undefined){
                $scope.data.amount = item.amount
              }
              if ($scope.data.num == undefined){
                $scope.data.num = item.num
              }
              $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
              $http.post(DjangoURL+"/kala/kharazi/edit","id="+String(item.id)+"&name="+$scope.data.name+"&text="+$scope.data.text+"&img="+$scope.data.img+"&amount="+$scope.data.amount+"&num="+$scope.data.num+"&tag=دخترانه")
              /*
  .success(function(data){
                console.log(data)
    $ionicLoading.show({template: "<p dir='rtl'>در حال ویرایش ...</p>", noBackdrop: true, duration: 700});
    $state.reload()
              })*/
  $state.reload()
            }
          }
        ]
      })}
  
      
})

.controller('KharaziDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state,$ionicPopup) {
    // $ionicLoading.show({template: "<p dir='rtl'> در حال بارگذاری... </p>", noBackdrop: true, duration: 700});
    $ionicLoading.show({template: "<ion-spinner class='spinner-energized' icon='dots'></ion-spinner>", noBackdrop: false, duration: 700});


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

})








////////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////
////////////////////
///////////////////////////////////


function toPersianNum( num, dontTrim ) {

  var i = 0,

      dontTrim = dontTrim || false,

      num = dontTrim ? num.toString() : num.toString().trim(),
      len = num.length,

      res = '',
      pos,

      persianNumbers = typeof persianNumber == 'undefined' ?
          ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
          persianNumbers;

  for (; i < len; i++)
      if (( pos = persianNumbers[num.charAt(i)] ))
          res += pos;
      else
          res += num.charAt(i);

  return res;
}


var DjangoURL = "http://193.176.243.61:8080"
// var DjangoURL = "http://localhost:8000"
// var DjangoURL = "https://sarayemaryam-saraye-maryam.fandogh.cloud"
var LocalURL =  "http://193.176.243.61"
