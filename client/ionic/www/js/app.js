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

  .state('tab.learn', {
      url: '/learn',
      views: {
        'tab-learn': {
          templateUrl: 'templates/tab-learn.html',
          controller: 'LearnCtrl'
        }
      }
    })


  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })



  .state('parcheh', {
    url: '/parcheh',
    templateUrl: 'templates/tab-parcheh.html',
    controller: 'ParchehCtrl'
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


  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('pooshaksdokdokhtarane', {
    url: '/pooshaks/dokhtarane',
    templateUrl: 'templates/tab-pooshaks-dokhtarane.html',
    controller: 'PooshaksِDokhtaraneCtrl'
  })
  .state('pooshak-dokhtarane-detail', {
    url: '/pooshak/:pooshakId',
    templateUrl: 'templates/pooshak-dokhtarane-detail.html',
    controller: 'PooshakDokhtaraneDetailCtrl'
  })

  .state('pooshaksmardane', {
    url: '/pooshaks/mardane',
    templateUrl: 'templates/tab-pooshaks-mardane.html',
    controller: 'PooshaksِMardaneCtrl'
  })
  .state('pooshak-mardane-detail', {
    url: '/pooshak/:pooshakId',
    templateUrl: 'templates/pooshak-mardane-detail.html',
    controller: 'PooshakMardaneDetailCtrl'
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




  .state('tab.store', {
      url: '/store',
      views: {
        'tab-store': {
          templateUrl: 'templates/tab-store.html',
          controller: 'StoreCtrl'
        }
      }
    })
  ;


  $urlRouterProvider.otherwise('/tab/home');

  // if none of the above states are matched, use this as the fallback



});



var loggedin = false;
this_username = '';
this_password = '';
var storage = window.localStorage;
storage.setItem(loggedin, false);
