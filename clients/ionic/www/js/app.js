// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

	//alert("DEVICE READY");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); //top
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


  // tabs
  .state('tab.learn', {
      url: '/learn',
      views: {
        'tab-learn': {
          templateUrl: 'templates/tab-learn.html',
          controller: 'LearnCtrl'
        }
      }
    })

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.store', {
    url: '/store',
    views: {
      'tab-store': {
        templateUrl: 'templates/tab-store.html',
        controller: 'StoreCtrl'
      }
    }
  })

  // pages

  .state('aboutme', {
    url: '/aboutme',
    templateUrl: 'templates/tab-aboutme.html',
    controller: 'AboutmeCtrl'
  })

  .state('help', {
    url: '/help',
    templateUrl: 'templates/tab-help.html',
    controller: 'HelpCtrl'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/tab-signin.html',
    controller: 'SigninCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/tab-signup.html',
    controller: 'SignupCtrl'
  })

  .state('confirm', {
    url: '/confirm',
    templateUrl: 'templates/tab-confirm.html',
    controller: 'ConfirmCtrl'
  })





  .state('kharazi', {
    url: '/kharazi',
    templateUrl: 'templates/tab-kharazi.html',
    controller: 'KharaziCtrl'
  })
  .state('pooshak', {
    url: '/pooshak',
    templateUrl: 'templates/tab-pooshak.html',
    controller: 'PooshakCtrl'
  })
  .state('hejab', {
    url: '/hejab',
    templateUrl: 'templates/tab-hejab.html',
    controller: 'HejabCtrl'
  })



  .state('pooshaksmardane', {
    url: '/pooshaks_mardane',
    templateUrl: 'templates/tab-pooshaks-mardane.html',
    controller: 'PooshaksِMardaneCtrl'
  })
  .state('pooshak-mardane-detail', {
    url: '/pooshak_mardane/:pooshakmardaneId',
    templateUrl: 'templates/pooshak-mardane-detail.html',
    controller: 'PooshakMardaneDetailCtrl'
  })

  .state('pooshakszanane', {
    url: '/pooshaks_zanane',
    templateUrl: 'templates/tab-pooshaks-zanane.html',
    controller: 'PooshaksِZananeCtrl'
  })
  .state('pooshak-zanane-detail', {
    url: '/pooshak_zanane/:pooshakzananeId',
    templateUrl: 'templates/pooshak-zanane-detail.html',
    controller: 'PooshakZananeDetailCtrl'
  })

  .state('pooshaksdokdokhtarane', {
    url: '/pooshaks_dokhtarane',
    templateUrl: 'templates/tab-pooshaks-dokhtarane.html',
    controller: 'PooshaksِDokhtaraneCtrl'
  })
  .state('pooshak-dokhtarane-detail', {
    url: '/pooshak_dokhtarane/:pooshakdokhtaraneId',
    templateUrl: 'templates/pooshak-dokhtarane-detail.html',
    controller: 'PooshakDokhtaraneDetailCtrl'
  })

  .state('pooshakspesarane', {
    url: '/pooshaks_pesarane',
    templateUrl: 'templates/tab-pooshaks-pesarane.html',
    controller: 'PooshaksِPesaraneCtrl'
  })
  .state('pooshak-pesarane-detail', {
    url: '/pooshak_pesarane/:pooshakpesaraneId',
    templateUrl: 'templates/pooshak-pesarane-detail.html',
    controller: 'PooshakPesaraneDetailCtrl'
  })

  .state('pooshaksnozadi', {
    url: '/pooshaks_nozadi',
    templateUrl: 'templates/tab-pooshaks-nozadi.html',
    controller: 'PooshaksِNozadiCtrl'
  })
  .state('pooshak-nozadi-detail', {
    url: '/pooshak_nozadi/:pooshaknozadiId',
    templateUrl: 'templates/pooshak-nozadi-detail.html',
    controller: 'PooshakNozadiDetailCtrl'
  })











  .state('sefareshsmardane', {
    url: '/sefareshs_mardane',
    templateUrl: 'templates/tab-sefareshs-mardane.html',
    controller: 'SefareshMardaneCtrl'
  })
  .state('sefaresh-mardane-detail', {
    url: '/sefaresh_mardane/:sefareshmardaneId',
    templateUrl: 'templates/sefaresh-mardane-detail.html',
    controller: 'SefareshMardaneDetailCtrl'
  })


  .state('sefareshszanane', {
    url: '/sefareshs_zanane',
    templateUrl: 'templates/tab-sefareshs-zanane.html',
    controller: 'SefareshZananeCtrl'
  })
  .state('sefaresh-zanane-detail', {
    url: '/sefaresh_zanane/:sefareshzananeId',
    templateUrl: 'templates/sefaresh-zanane-detail.html',
    controller: 'SefareshZananeDetailCtrl'
  })


  .state('sefareshsdokhtarane', {
    url: '/sefareshs_dokhtarane',
    templateUrl: 'templates/tab-sefareshs-dokhtarane.html',
    controller: 'SefareshDokhtaraneCtrl'
  })
  .state('sefaresh-dokhtarane-detail', {
    url: '/sefaresh_dokhtarane/:sefareshdokhtaraneId',
    templateUrl: 'templates/sefaresh-dokhtarane-detail.html',
    controller: 'SefareshDokhtaraneDetailCtrl'
  })


  .state('sefareshspesarane', {
    url: '/sefareshs_pesarane',
    templateUrl: 'templates/tab-sefareshs-pesarane.html',
    controller: 'SefareshPesaraneCtrl'
  })
  .state('sefaresh-pesarane-detail', {
    url: '/sefaresh_pesarane/:sefareshpesaraneId',
    templateUrl: 'templates/sefaresh-pesarane-detail.html',
    controller: 'SefareshPesaraneDetailCtrl'
  })


  .state('sefareshsnozadi', {
    url: '/sefareshs_nozadi',
    templateUrl: 'templates/tab-sefareshs-nozadi.html',
    controller: 'SefareshNozadiCtrl'
  })
  .state('sefaresh-nozadi-detail', {
    url: '/sefaresh_nozadi/:sefareshnozadiId',
    templateUrl: 'templates/sefaresh-nozadi-detail.html',
    controller: 'SefareshNozadiDetailCtrl'
  })


  .state('sefareshssayer', {
    url: '/sefareshs_sayer',
    templateUrl: 'templates/tab-sefareshs-sayer.html',
    controller: 'SefareshSayerCtrl'
  })
  .state('sefaresh-sayer-detail', {
    url: '/sefaresh_sayer/:sefareshsayerId',
    templateUrl: 'templates/sefaresh-sayer-detail.html',
    controller: 'SefareshSayerDetailCtrl'
  })











  .state('hejabschador', {
    url: '/hejabs_chador',
    templateUrl: 'templates/tab-hejab-chador.html',
    controller: 'HejabChadorCtrl'
  })
  .state('hejab-chador-detail', {
    url: '/hejab_chador/:hejabchadorId',
    templateUrl: 'templates/hejab-chador-detail.html',
    controller: 'HejabChadorDetailCtrl'
  })

  .state('hejabsshal', {
    url: '/hejabs_shal',
    templateUrl: 'templates/tab-hejab-shal.html',
    controller: 'HejabShalCtrl'
  })
  .state('hejab-shal-detail', {
    url: '/hejab_shal/:hejabshalId',
    templateUrl: 'templates/hejab-shal-detail.html',
    controller: 'HejabShalDetailCtrl'
  })

  .state('hejabsroosari', {
    url: '/hejabs_roosari',
    templateUrl: 'templates/tab-hejab-roosari.html',
    controller: 'HejabRoosariCtrl'
  })
  .state('hejab-roosari-detail', {
    url: '/hejab_roosari/:hejabroosariId',
    templateUrl: 'templates/hejab-roosari-detail.html',
    controller: 'HejabRoosariDetailCtrl'
  })

  .state('hejabssaghedastdastkesh', {
    url: '/hejabs_saghedast_dastkesh',
    templateUrl: 'templates/tab-hejab-saghedast-dastkesh.html',
    controller: 'HejabSaghedastdastkeshCtrl'
  })
  .state('hejab-saghedast-dastkesh-detail', {
    url: '/hejab_saghedast_dastkesh/:hejabsaghedastdastkeshId',
    templateUrl: 'templates/hejab-saghedast-dastkesh-detail.html',
    controller: 'HejabSaghedastdastkeshDetailCtrl'
  })

  .state('hejabsmaskpooshie', {
    url: '/hejabs_mask_pooshie',
    templateUrl: 'templates/tab-hejab-mask-pooshie.html',
    controller: 'HejabMaskpooshieCtrl'
  })
  .state('hejab-mask-pooshie-detail', {
    url: '/hejab_mask_pooshie/:hejabmaskpooshieId',
    templateUrl: 'templates/hejab-mask-pooshie-detail.html',
    controller: 'HejabMaskpooshieDetailCtrl'
  })

  .state('kharazisabzarkhayati', {
    url: '/kharazis_abzarkhayati',
    templateUrl: 'templates/tab-kharazi-abzarkhayati.html',
    controller: 'KharaziAbzarkhayatiCtrl'
  })
  .state('kharazi-abzarkhayati-detail', {
    url: '/kharazi_abzarkhayati/:kharaziabzarkhayatiId',
    templateUrl: 'templates/kharazi-abzarkhayati-detail.html',
    controller: 'KharaziAbzarkhayatiDetailCtrl'
  })

  .state('kharazislavazemtahrir', {
    url: '/kharazis_lavazemtahrir',
    templateUrl: 'templates/tab-kharazi-lavazemtahrir.html',
    controller: 'KharaziLavazemtahrirCtrl'
  })
  .state('kharazi-lavazemtahrir-detail', {
    url: '/kharazi_lavazemtahrir/:kharazilavazemtahrirId',
    templateUrl: 'templates/kharazi-lavazemtahrir-detail.html',
    controller: 'KharaziLavazemtahrirDetailCtrl'
  })


  .state('pooshaks', {
    url: '/pooshaks',
    templateUrl: 'templates/tab-pooshaks.html',
    controller: 'PooshaksCtrl'
  })
  .state('pooshak-detail', {
    url: '/pooshak/:pooshakId',
    templateUrl: 'templates/pooshak-detail.html',
    controller: 'PooshakDetailCtrl'
  })

  .state('parchehs', {
    url: '/parchehs',
    templateUrl: 'templates/tab-parchehs.html',
    controller: 'ParchehsCtrl'
  })
  .state('parcheh-detail', {
    url: '/parcheh/:parchehId',
    templateUrl: 'templates/parcheh-detail.html',
    controller: 'ParchehDetailCtrl'
  })




  .state('kharazis', {
    url: '/kharazis',
    templateUrl: 'templates/tab-kharazis.html',
    controller: 'KharazisCtrl'
  })
  .state('kharazi-detail', {
    url: '/kharazi/:kharaziId',
    templateUrl: 'templates/kharazi-detail.html',
    controller: 'KharaziDetailCtrl'
  })



  .state('hejabs', {
    url: '/hejabs',
    templateUrl: 'templates/tab-hejabs.html',
    controller: 'HejabsCtrl'
  })
  .state('hejab-detail', {
    url: '/hejab/:hejabId',
    templateUrl: 'templates/hejab-detail.html',
    controller: 'HejabDetailCtrl'
  })


  ;


  $urlRouterProvider.otherwise('/signin');

  // if none of the above states are matched, use this as the fallback



});



var loggedin = false;
this_username = '';
this_password = '';
var storage = window.localStorage;
storage.setItem(loggedin, false);
storage.setItem("reload",false)
var version = "1.0"