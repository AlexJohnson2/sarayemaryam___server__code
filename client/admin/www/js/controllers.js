angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http,$state, $ionicLoading) {
  $scope.add_new_kala = function(){
    $scope.selected = document.getElementById("selecteditem").value;
    console.log($scope.selected)
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
    if ($scope.selected == "پوشاک مریم"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/pooshak/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
    })

                        }
    if ($scope.selected == "خرازی مریم"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/kharazi/add",
                "name="+$scope.name+"&text="+$scope.text+"&img="+$scope.img+"&amount="+$scope.amount+"&num="+$scope.num)
                .success(function(data){
                    console.log(data)
                    $ionicLoading.show({ template: '<ion-icon class="ion-icon ion-looping" animation="fade-in"></ion-icon> <p dir="rtl">محصول با موفقیت اضافه شد.</p>', noBackdrop: true, duration: 2200 });
                    document.getElementById("addform").reset();
                    $state.reload()
                })
            }
    if ($scope.selected == "حجاب مریم"){
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post(DjangoURL+"/kala/hejab/add",
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

.controller('ChatsCtrl', function($scope, Chats) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('StoreCtrl', function($scope,$state) {
    $scope.gotopage = function () {
    $state.go('parcheh',{});
    }
})

.controller('PooshaksCtrl', function($scope,$state,$http,$ionicPopup,$ionicLoading) {
    $scope.$on('$ionicView.enter', function(e) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(DjangoURL+"/kala/pooshak/getall","tag=دخترانه")
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

.controller('PooshakDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
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
                  $scope.data.img = item.img
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
                  $scope.data.img = item.img
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

.controller('KharaziDetailCtrl', function($scope, $stateParams,$http,$ionicLoading,$state) {
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
                  $scope.data.img = item.img
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
});

var DjangoURL = "http://193.176.243.61:8080"
// var DjangoURL = "http://localhost:8000"
// var DjangoURL = "https://sarayemaryam-saraye-maryam.fandogh.cloud"
var LocalURL =  "http://193.176.243.61"
