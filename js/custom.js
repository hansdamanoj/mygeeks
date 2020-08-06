$(function() {
    'use strict'; // Start of use strict
   
   

    /*--------------------------
    scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fas fa-long-arrow-alt-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    /*--------------------------
       Main Navigation
    ---------------------------- */	
	 if ($('.main-navigation .navigation-box').length) {
        var subMenu = $('.main-navigation .submenu');
        subMenu.parent('li').children('a').append(function () {
            return '<button class="sub-nav-toggler"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>';
        });
        var mainNavToggler = $('.header-navigation .menu-toggler');
        var subNavToggler = $('.main-navigation .sub-nav-toggler');
        mainNavToggler.on('click', function () {
            var Self = $(this);
            var menu = Self.closest('.header-navigation').find(Self.data('target'));
            $(menu).slideToggle();
            $(menu).toggleClass('showen');
            return false;
        });
        subNavToggler.on('click', function () {
            var Self = $(this);
            Self.parent().parent().children('.submenu').slideToggle();
            return false;
        });
    }
	
	if ($('.slider-one__carousel').length) {
            var slideOneWrap = $('.slider-one');
            var slideOneCarousel = $('.slider-one__carousel').owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                dots: true,
                nav: false,
                animateOut: 'slideOutDown',
                animateIn: 'fadeIn',
                active: true,
                smartSpeed: 1000,
                autoplay: 7000
            });
            slideOneWrap.find('.slide-one__left-btn').on('click', function (e) {
                slideOneCarousel.trigger('next.owl.carousel');
                e.preventDefault();
            });
            slideOneWrap.find('.slide-one__right-btn').on('click', function (e) {
                slideOneCarousel.trigger('prev.owl.carousel');
                e.preventDefault();
            });
        }
		
    /*--------------------------
       Fact Counter + Text Count
    ---------------------------- */			

	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	 /*--------------------------
       Client Testimonial Carousel
    ---------------------------- */	
	if ($('.client-testimonial-carousel').length && $('.client-thumbs-carousel').length) {

		var $sync3 = $(".client-testimonial-carousel"),
			$sync4 = $(".client-thumbs-carousel"),
			flag = false,
			duration = 500;

			$sync3
				.owlCarousel({
					loop:true,
					items: 1,
					margin: 0,
					nav: true,
					navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
					dots: true,
					autoplay: true,
					autoplayTimeout: 5000
				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = false;
						$sync4.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});

			$sync4
				.owlCarousel({
					loop:true,
					margin:195,
					items: 1,
					nav: false,
					navText: [ '<span class="icon flaticon-left-arrow-2"></span>', '<span class="icon flaticon-right-arrow-1"></span>' ],
					dots: false,
					center: true,
					autoplay: true,
					autoplayTimeout: 5000,
					responsive: {
						0:{
				            items:1,
				            autoWidth: false
				        },
				        400:{
				            items:1,
				            autoWidth: false
				        },
				        600:{
				            items:1,
				            autoWidth: false
				        },
				        1000:{
				            items:1,
				            autoWidth: false
				        },
						1200:{
				            items:1,
				            autoWidth: false
				        }
				    },
				})
				
		.on('click', '.owl-item', function () {
			$sync3.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
		.on('changed.owl.carousel', function (e) {
			if (!flag) {
				flag = true;		
				$sync3.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
			}
		});
	}
	
	/*------------------------------------------------------------------
        Fixed Header
    ------------------------------------------------------------------*/
	$(window).on('scroll', function () {

        if ($('.stricked-menu').length) {
            var headerScrollPos = 130;
            var stricky = $('.stricked-menu');
            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass('stricky-fixed');
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass('stricky-fixed');
            }
        }
    });
	 if ($('.stricky').length) {
        $('.stricky').addClass('original').clone(true).insertAfter('.stricky').addClass('stricked-menu').removeClass('original');
         } 
  	/*------------------------------------------------------------------
        Popup Youtube
    ------------------------------------------------------------------*/       
         $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
          });   

          $('.image-popup').magnificPopup({
            type: 'image',
            gallery:{
              enabled:true
            }
          });

   /*quote popup*/
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true,
        mainClass: 'mfp-fade'
    });
    /*quote popup end*/   

	/*------------------------------------------------------------------
        Accordion Box
    ------------------------------------------------------------------*/
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	/*------------------------------------------------------------------
        Year
    ------------------------------------------------------------------*/
	$(function(){
    var theYear = new Date().getFullYear();
    $('#year').html(theYear);
	});

	if ($('.search-popup__toggler').length) {
        $('.search-popup__toggler').on('click', function (e) {
            $('.search-popup').addClass('active');
            e.preventDefault();
        });
    }

    if ($('.search-popup__overlay').length) {
        $('.search-popup__overlay').on('click', function (e) {
            $('.search-popup').removeClass('active');
            e.preventDefault();
        });
    }
});


/*------------------------------------------------------------------
 Loader 
------------------------------------------------------------------*/
jQuery(window).on("load scroll", function() {
    'use strict'; // Start of use strict
    // Loader 
     $('#dvLoading').fadeOut('slow', function () {
            $(this).remove();
        });
	
});

$( document ).ready(function() {
    $.get("locationProcessor.php", function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        console.log(data.data.geo.city);
        $('#locationName').html("&nbsp;&nbsp; On-site Repair Service in "+data.data.geo.city);
        $('#banner-location,#banner-location-2').html(data.data.geo.city);
        $('.location').html(data.data.geo.city);
        $("#locationName").css("color", "yellow");
    });
    
    var form=$("#newsLetter");
    $("#subscribe").click(function(){
        $.ajax({
            type:"POST",
            url:form.attr("action"),
            data:$('#newsLetter').serialize(),
            success: function(response){
                console.log(JSON.parse(response)); 
                var respJson = JSON.parse(response);
                $("#subs-msg").html(respJson.message);
            }
        });
    });
    
    if(document.URL.indexOf("service-details.html") >= 0){ 
        var id = findGetParameter("service");
        console.log("GET : "+findGetParameter("id"));
          switch(id) {
              case "windowsLaptop":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.windowsLaptop);
                    $('#service-label').html(data.windowsLaptop.serviceLabel);
                    $("#service-lg").attr("src",data.windowsLaptop.serviceLg);
                    $("#service-sm").attr("src",data.windowsLaptop.serviceSm);
                    $('#service-overview').html(data.windowsLaptop.serviceOverview);
                    $('#service-stratergy').html(data.windowsLaptop.serviceStratergy);
                    $('#service-repairs').html(data.windowsLaptop.serviceRepairs);
                });
                // $('#service-label').html("Windows Laptop Repair");
                break;
              case "smartHomeInstallation":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.smartHomeInstallation);
                    $('#service-label').html(data.smartHomeInstallation.serviceLabel);
                    $("#service-lg").attr("src",data.smartHomeInstallation.serviceLg);
                    $("#service-sm").attr("src",data.smartHomeInstallation.serviceSm);
                    $('#service-overview').html(data.smartHomeInstallation.serviceOverview);
                    $('#service-stratergy').html(data.smartHomeInstallation.serviceStratergy);
                    $('#service-repairs').html(data.smartHomeInstallation.serviceRepairs);
                });
                break;
              case "onSiteLaptopRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.onSiteLaptopRepair);
                    $('#service-label').html(data.onSiteLaptopRepair.serviceLabel);
                    $("#service-lg").attr("src",data.onSiteLaptopRepair.serviceLg);
                    $("#service-sm").attr("src",data.onSiteLaptopRepair.serviceSm);
                    $('#service-overview').html(data.onSiteLaptopRepair.serviceOverview);
                    $('#service-stratergy').html(data.onSiteLaptopRepair.serviceStratergy);
                    $('#service-repairs').html(data.onSiteLaptopRepair.serviceRepairs);
                });
                break;
              case "homeTheaterRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.homeTheaterRepair);
                    $('#service-label').html(data.homeTheaterRepair.serviceLabel);
                    $("#service-lg").attr("src",data.homeTheaterRepair.serviceLg);
                    $("#service-sm").attr("src",data.homeTheaterRepair.serviceSm);
                    $('#service-overview').html(data.homeTheaterRepair.serviceOverview);
                    $('#service-stratergy').html(data.homeTheaterRepair.serviceStratergy);
                    $('#service-repairs').html(data.homeTheaterRepair.serviceRepairs);
                });
                break;
              case "desktopRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.desktopRepair);
                    $('#service-label').html(data.desktopRepair.serviceLabel);
                    $("#service-lg").attr("src",data.desktopRepair.serviceLg);
                    $("#service-sm").attr("src",data.desktopRepair.serviceSm);
                    $('#service-overview').html(data.desktopRepair.serviceOverview);
                    $('#service-stratergy').html(data.desktopRepair.serviceStratergy);
                    $('#service-repairs').html(data.desktopRepair.serviceRepairs);
                });
                break;
              case "tabletRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.tabletRepair);
                    $('#service-label').html(data.tabletRepair.serviceLabel);
                    $("#service-lg").attr("src",data.tabletRepair.serviceLg);
                    $("#service-sm").attr("src",data.tabletRepair.serviceSm);
                    $('#service-overview').html(data.tabletRepair.serviceOverview);
                    $('#service-stratergy').html(data.tabletRepair.serviceStratergy);
                    $('#service-repairs').html(data.tabletRepair.serviceRepairs);
                });
                break;
              case "appleLaptopRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log("page data :"+data.appleLaptopRepair);
                    $('#service-label').html(data.appleLaptopRepair.serviceLabel);
                    $("#service-lg").attr("src",data.appleLaptopRepair.serviceLg);
                    $("#service-sm").attr("src",data.appleLaptopRepair.serviceSm);
                    $('#service-overview').html(data.appleLaptopRepair.serviceOverview);
                    $('#service-stratergy').html(data.appleLaptopRepair.serviceStratergy);
                    $('#service-repairs').html(data.appleLaptopRepair.serviceRepairs);
                });
                break;
              case "homeAndBusinessComputerRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.homeAndBusinessComputerRepair);
                    $('#service-label').html(data.homeAndBusinessComputerRepair.serviceLabel);
                    $("#service-lg").attr("src",data.homeAndBusinessComputerRepair.serviceLg);
                    $("#service-sm").attr("src",data.homeAndBusinessComputerRepair.serviceSm);
                    $('#service-overview').html(data.homeAndBusinessComputerRepair.serviceOverview);
                    $('#service-stratergy').html(data.homeAndBusinessComputerRepair.serviceStratergy);
                    $('#service-repairs').html(data.homeAndBusinessComputerRepair.serviceRepairs);
                });
                break;
              case "virusAndMalwareRemoval":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.virusAndMalwareRemoval);
                    $('#service-label').html(data.virusAndMalwareRemoval.serviceLabel);
                    $("#service-lg").attr("src",data.virusAndMalwareRemoval.serviceLg);
                    $("#service-sm").attr("src",data.virusAndMalwareRemoval.serviceSm);
                    $('#service-overview').html(data.virusAndMalwareRemoval.serviceOverview);
                    $('#service-stratergy').html(data.virusAndMalwareRemoval.serviceStratergy);
                    $('#service-repairs').html(data.virusAndMalwareRemoval.serviceRepairs);
                });
                break;
              case "generalTroubleShooting":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.generalTroubleShooting);
                    $('#service-label').html(data.generalTroubleShooting.serviceLabel);
                    $("#service-lg").attr("src",data.generalTroubleShooting.serviceLg);
                    $("#service-sm").attr("src",data.generalTroubleShooting.serviceSm);
                    $('#service-overview').html(data.generalTroubleShooting.serviceOverview);
                    $('#service-stratergy').html(data.generalTroubleShooting.serviceStratergy);
                    $('#service-repairs').html(data.generalTroubleShooting.serviceRepairs);
                });
                break;
              case "dataBackup":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.dataBackup);
                    $('#service-label').html(data.dataBackup.serviceLabel);
                    $("#service-lg").attr("src",data.dataBackup.serviceLg);
                    $("#service-sm").attr("src",data.dataBackup.serviceSm);
                    $('#service-overview').html(data.dataBackup.serviceOverview);
                    $('#service-stratergy').html(data.dataBackup.serviceStratergy);
                    $('#service-repairs').html(data.dataBackup.serviceRepairs);
                });
                // $('#service-label').html("Data Backup & Free Up Storage");
                break;
              case "osUpgrades":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.osUpgrades);
                    $('#service-label').html(data.osUpgrades.serviceLabel);
                    $("#service-lg").attr("src",data.osUpgrades.serviceLg);
                    $("#service-sm").attr("src",data.osUpgrades.serviceSm);
                    $('#service-overview').html(data.osUpgrades.serviceOverview);
                    $('#service-stratergy').html(data.osUpgrades.serviceStratergy);
                    $('#service-repairs').html(data.osUpgrades.serviceRepairs);
                });
                // document.getElementById("service-content").innerHTML='<object type="text/html" data="services/osUpgrades.html" ></object>';
                break;
              case "virusAndMalwareReinstall":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.virusAndMalwareReinstall);
                    $('#service-label').html(data.virusAndMalwareReinstall.serviceLabel);
                    $("#service-lg").attr("src",data.virusAndMalwareReinstall.serviceLg);
                    $("#service-sm").attr("src",data.virusAndMalwareReinstall.serviceSm);
                    $('#service-overview').html(data.virusAndMalwareReinstall.serviceOverview);
                    $('#service-stratergy').html(data.virusAndMalwareReinstall.serviceStratergy);
                    $('#service-repairs').html(data.virusAndMalwareReinstall.serviceRepairs);
                });
                break;
              case "newComputerSetup":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.newComputerSetup);
                    $('#service-label').html(data.newComputerSetup.serviceLabel);
                    $("#service-lg").attr("src",data.newComputerSetup.serviceLg);
                    $("#service-sm").attr("src",data.newComputerSetup.serviceSm);
                    $('#service-overview').html(data.newComputerSetup.serviceOverview);
                    $('#service-stratergy').html(data.newComputerSetup.serviceStratergy);
                    $('#service-repairs').html(data.newComputerSetup.serviceRepairs);
                });
                break;
              case "emailConfiguration":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.emailConfiguration);
                    $('#service-label').html(data.emailConfiguration.serviceLabel);
                    $("#service-lg").attr("src",data.emailConfiguration.serviceLg);
                    $("#service-sm").attr("src",data.emailConfiguration.serviceSm);
                    $('#service-overview').html(data.emailConfiguration.serviceOverview);
                    $('#service-stratergy').html(data.emailConfiguration.serviceStratergy);
                    $('#service-repairs').html(data.emailConfiguration.serviceRepairs);
                });
                break;
              case "businessNetworking":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.businessNetworking);
                    $('#service-label').html(data.businessNetworking.serviceLabel);
                    $("#service-lg").attr("src",data.businessNetworking.serviceLg);
                    $("#service-sm").attr("src",data.businessNetworking.serviceSm);
                    $('#service-overview').html(data.businessNetworking.serviceOverview);
                    $('#service-stratergy').html(data.businessNetworking.serviceStratergy);
                    $('#service-repairs').html(data.businessNetworking.serviceRepairs);
                });
                break;
              case "routerConfiguration":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.routerConfiguration);
                    $('#service-label').html(data.routerConfiguration.serviceLabel);
                    $("#service-lg").attr("src",data.routerConfiguration.serviceLg);
                    $("#service-sm").attr("src",data.routerConfiguration.serviceSm);
                    $('#service-overview').html(data.routerConfiguration.serviceOverview);
                    $('#service-stratergy').html(data.routerConfiguration.serviceStratergy);
                    $('#service-repairs').html(data.routerConfiguration.serviceRepairs);
                });
                break;
              case "newEquipmentInstallation":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.newEquipmentInstallation);
                    $('#service-label').html(data.newEquipmentInstallation.serviceLabel);
                    $("#service-lg").attr("src",data.newEquipmentInstallation.serviceLg);
                    $("#service-sm").attr("src",data.newEquipmentInstallation.serviceSm);
                    $('#service-overview').html(data.newEquipmentInstallation.serviceOverview);
                    $('#service-stratergy').html(data.newEquipmentInstallation.serviceStratergy);
                    $('#service-repairs').html(data.newEquipmentInstallation.serviceRepairs);
                });
                break;
              case "homeOfficeSchool":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.homeOfficeSchool);
                    $('#service-label').html(data.homeOfficeSchool.serviceLabel);
                    $("#service-lg").attr("src",data.homeOfficeSchool.serviceLg);
                    $("#service-sm").attr("src",data.homeOfficeSchool.serviceSm);
                    $('#service-overview').html(data.homeOfficeSchool.serviceOverview);
                    $('#service-stratergy').html(data.homeOfficeSchool.serviceStratergy);
                    $('#service-repairs').html(data.homeOfficeSchool.serviceRepairs);
                });
                break;
              case "cctvNIpCamera":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.cctvNIpCamera);
                    $('#service-label').html(data.cctvNIpCamera.serviceLabel);
                    $("#service-lg").attr("src",data.cctvNIpCamera.serviceLg);
                    $("#service-sm").attr("src",data.cctvNIpCamera.serviceSm);
                    $('#service-overview').html(data.cctvNIpCamera.serviceOverview);
                    $('#service-stratergy').html(data.cctvNIpCamera.serviceStratergy);
                    $('#service-repairs').html(data.cctvNIpCamera.serviceRepairs);
                });
                break;
              case "audioNVideo":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.audioNVideo);
                    $('#service-label').html(data.audioNVideo.serviceLabel);
                    $("#service-lg").attr("src",data.audioNVideo.serviceLg);
                    $("#service-sm").attr("src",data.audioNVideo.serviceSm);
                    $('#service-overview').html(data.audioNVideo.serviceOverview);
                    $('#service-stratergy').html(data.audioNVideo.serviceStratergy);
                    $('#service-repairs').html(data.audioNVideo.serviceRepairs);
                });
                break;
              case "wifiInternetNNetworkRepair":
                // code block
                readTextFile("services/services.json", function(text){
                    var data = JSON.parse(text);
                    console.log(data.wifiInternetNNetworkRepair);
                    $('#service-label').html(data.wifiInternetNNetworkRepair.serviceLabel);
                    $("#service-lg").attr("src",data.wifiInternetNNetworkRepair.serviceLg);
                    $("#service-sm").attr("src",data.wifiInternetNNetworkRepair.serviceSm);
                    $('#service-overview').html(data.wifiInternetNNetworkRepair.serviceOverview);
                    $('#service-stratergy').html(data.wifiInternetNNetworkRepair.serviceStratergy);
                    $('#service-repairs').html(data.wifiInternetNNetworkRepair.serviceRepairs);
                });
                break;
            //   case "tabletRepair":
            //     // code block
            //     $('#service-label').html("Tablet Repair");
            //     break;
              default:
                // code block
            }
        }
});

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
