/*
    Project Name : Business
    Author Company : SpecThemes
    Project Date: 5 Feb, 2017
    Template Developer: vsafaryan50@gmail.com
*/


/*
==============================================
TABLE OF CONTENT
==============================================

1. Owl Carousels
2. CountUp
3. WOW
4. Navbar (Menu)
5. Scroll To Top
6. Video Modal
7. Preloader


==============================================
[END] TABLE OF CONTENT
==============================================
*/

"use strict";



$(document).ready(function() {


/*------------------------------------
    1. Owl Carousel
--------------------------------------*/  


/*---------------------
Testmonials carousel
-----------------------*/
  function options(){
    $('#testmonials-carousel').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav:false,
      autoplay: true,
      autoplaySpeed: 1500,
      loop: true,
      lazyLoad: true,
      navText: ["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],    
      responsive: {
        0: {
          items: 1,
          nav: false,
          margin: 10,
        },
        600: {
          items: 2,
          nav: false,      
          margin: 15,
        },
        1060: {
          items: 3,
          nav: false,        
          margin: 15,
        },
        1100: {
          items: 4,
          margin: 10,
        }
      }
    })
  }
  if($("#index").length == 1){
    $.ajax({
      url: 'https://sahabatdemokrat.id/bpokk/api/reference',
      type: 'GET',
      success: function(d){
        var json = JSON.parse(d);
        $.each(json,function(i,v){
          $("#testmonials-carousel").append('<div class="item">'+
          '<img src="../assets/img/no-image.jpg" alt="img" id="'+v.id+'">'+          	
          '<div class="content">'+
          '<h6>'+v.name+'</h6>'+     
          '<p><small>Referensi : '+v.total+' KADER</small></p>'+
          '<p><small>DPD : Prov. '+v.prov+'</small></p>'+
          '<p><small>DPC : Kota/Kab. '+v.kab+'</small></p>'+
          '<div class="number">'+v.no+'</div>'+
          '</div>'+	        	
          '</div>');
          loadImg(v.id);
        });
      }
    }).done(function(data){
      options();
    });
    function loadImg(code){
      $.ajax({
        url: 'https://sahabatdemokrat.id/bpokk/api/image/'+code,
        type: 'GET',
        success: function(data){
          $("#"+code).attr('src','data:image/png;base64,'+data);
        }
      });
    }
  }

/*---------------------
Screenshots carousel
-----------------------*/

  $('#screenshots').owlCarousel({
    center: true,
    loop:true,
    nav: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2100,
    margin:20,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
            margin:60
        },
        1000:{
            items:4
        }
    }
  })


/*---------------------
Clients carousel
-----------------------*/

  $('#clients').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,  
    responsiveClass: true,
    autoplayHoverPause:false,
    responsive: {
      0: {
        items: 2,
        margin: 50,
      },
      600: {
        items: 3,
        margin: 30,
      },
      1000: {
        items: 6,
        margin: 40,
      }
    }
  })



/*---------------------
Project Single carousel
-----------------------*/
  $('#project-single').owlCarousel({
    loop: false,
    nav: false,    
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        margin: 15,
      },
      600: {
        items: 2,
        margin: 15,
      },
      1000: {
        items: 3,
        margin: 15
      }
    }
  })  


/*------------------------------------
    2. CountUp
--------------------------------------*/  

    $('.countup').counterUp({
        delay: 25,
        time: 2000
    });



/*------------------------------------
    3. WOW
--------------------------------------*/ 

    new WOW().init();

/*------------------------------------
    4. Navbar
--------------------------------------*/    

  if ($(window).width() > 1200) {
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
    });
  }

  if ($(window).width() < 991) {
    $(".logo_main").css("display" , "inline-block"); 
    $(".logo_light").css("display" , "none"); 
  }  

  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if ($(window).width() > 991){
      if (scroll > 30) {
        $(".navbar-custom").css("background" , "#fff");
        $(".navbar-links-custom a").css("color" , "#3b3b3b");
        $(".dropdown-menu a").css("color" , "#999"); 
        $(".navbar-custom").css("border-bottom" , "1px solid #eee"); 
        $(".logo_main").css("display" , "inline-block"); 
        $(".logo_light").css("display" , "none");
      }
      else{
        $(".navbar-custom").css("background" , "transparent");  
        $(".navbar-links-custom a").css("color" , "rgba(255, 255, 255, 1)"); 
        $(".dropdown-menu a").css("color" , "#999"); 
        $(".navbar-custom").css("border-bottom" , "1px solid transparent"); 
        $(".logo_main").css("display" , "none"); 
        $(".logo_light").css("display" , "inline-block");         
      }
    }
  });

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });



/*------------------------------------
    5. Scroll To Top
--------------------------------------*/ 
    $(window).scroll(function(){
        if($(this).scrollTop() > 500) {
            $(".scroll-to-top").fadeIn(400);
            
        } else {
            $(".scroll-to-top").fadeOut(400);
        }
    });
 
    $(".scroll-to-top").on('click', function(event){
        event.preventDefault();
        $("html, body").animate({scrollTop: 0},600);
    });


/*------------------------------------
    6. Video Modal
--------------------------------------*/ 

  $('.modal').on('hidden.bs.modal', function() {
    var $this = $(this).find('iframe'),
      tempSrc = $this.attr('src');
    $this.attr('src', "");
    $this.attr('src', tempSrc);
  });


/*------------------------------------
    7. Preloader
--------------------------------------*/ 

  $('#preloader').fadeOut('normal', function() {
      $(this).remove();
  });

  if($("#register").length == 1){
    getProvince();
    if(sessionStorage.getItem('register') == 'true'){
      $('button').prop('disabled',true);
      window.location.href = 'register-info.html';
    }
    $("input[name=nik]").on('focusout',function(){
      checkNik($(this).val());
    });
    $("input[name=fullname]").on('focusout',function(){
      if($(this).val().length == 0){
        $(".warning_member_name").html('<span class="text-danger">Nama Lengkap Harus Diisi</span>');
      }else{
        $(".warning_member_name").html('');
      }
    });
    $("input[name=birth_place]").on('focusout',function(){
      if($(this).val().length == 0){
        $(".warning_birth_place").html('<span class="text-danger">Tempat Lahir Harus Diisi</span>');
      }else{
        $(".warning_birth_place").html('');
      }
    });
    $("input[name=birth_date]").on('focusout',function(){
      if($(this).val().length == 0){
        $(".warning_birth_date").html('<span class="text-danger">Tanggal Lahir Harus Diisi</span>');
      }else{
        $(".warning_birth_date").html('');
      }
    });
    $("input[name=referensi]").on('focusout',function(){
      if($(this).val().length == 10){
        checkReference($(this).val());
      }
      else{
        $('.warning_referensi').html('');
      }
    });
    $("input[name=cellular").on('focusout',function(){
      if($(this).val().length > 9){
        checkPhone($(this).val());
      }
    })
    $("select").select2({
      theme: "bootstrap"
    });

    $('select[name=education]').select2({
      ajax: { 
        url: baseUrl+"/api/check/education",
        type: "GET",
        dataType: 'json',
        delay: 250,
        processResults: function (response) {
          return {
             results: response
          };
        },
      },
    });
    $('select[name=gender]').select2({
      data: [{'id': 'L','text':'Laki - Laki'},{'id':'P','text':'Perempuan'}]
    })
    $('#form_religion select').select2({
      ajax: { 
        url: baseUrl+"/api/check/religion",
        type: "GET",
        dataType: 'json',
        delay: 250,
        processResults: function (response) {
          return {
             results: response
          };
        },
      },
    });

    $("select[name=provinsi]").on('change',function(e){
      getKabupaten($(this).val());
    });
    $("select[name=kabupaten]").on('change',function(e){
      getKecamatan($(this).val());
    });
    $("select[name=kecamatan]").on('change',function(e){
      getKelurahan($(this).val());
    });
    $("#registerPost").submit(function(e){
      e.preventDefault();
      postRegister($(this).serialize());
    });

    function getProvince()
    {
      $.ajax({
        url: baseUrl+'/api/get/province',
        method: 'GET',
        success: function(data){
          var json = JSON.parse(data);
          var data = [];
          $.each(json,function(i,v){
            data.push({id: v.id,text: v.text});
          });
          $("select[name=provinsi]").select2({
            data: data
          });
        },
        error: function(e){
          console.log(e);
        }
      });
    }
    function getKabupaten(prov)
    {
      $('select[name=kabupaten]').select2({
        ajax: { 
          url: baseUrl+"/api/get/kabupaten/"+prov,
          type: "GET",
          dataType: 'json',
          delay: 250,
          processResults: function (response) {
            return {
               results: response
            };
          },
        },
      });
    }
    function getKecamatan(kab)
    {
      $('select[name=kecamatan]').select2({
        ajax: { 
          url: baseUrl+"/api/get/kecamatan/"+kab,
          type: "GET",
          dataType: 'json',
          delay: 250,
          processResults: function (response) {
            return {
               results: response
            };
          },
        },
      });
    }
    function getKelurahan(kec){
      $('select[name=kelurahan]').select2({
        ajax: { 
          url: baseUrl+"/api/get/kelurahan/"+kec,
          type: "GET",
          dataType: 'json',
          delay: 250,
          processResults: function (response) {
            return {
               results: response
            };
          },
        },
      }); 
    }
    function checkNik(nik)
    {
      $.ajax({
        url: baseUrl+'/api/check/nik',
        method: 'POST',
        data: {nik: nik},
        success: function(data){
          var json = JSON.parse(data);
          if(json.status == false){
            if(json.data){
              $(".warning_nik").html(json.data);
            }else{
              $("input[name=nik]").val('');
              $(".warning_nik").html(json.message);
            }
          }else{
            var tgl = nik.substr(6,2);
            if(tgl > 31){
              tgl = nik.substr(6,2) - 40;
              if(tgl < 10){
                tgl = '0'+tgl;
              }
              $("select[name=gender]").val('P').trigger('change');
            }
            else{
              tgl = nik.substr(6,2);
                $("select[name=gender]").val('L').trigger('change');
            }
            var bln = nik.substr(8,2);
            var thn = nik.substr(10,2);
            if(thn < 45)
            {
              thn = '20'+nik.substr(10,2);
            }
            else
            {
              thn = '19'+nik.substr(10,2);
            }
            $("input[name=birth_date]").val(thn+'-'+bln+'-'+tgl);
            var getAge = (new Date).getFullYear() - thn;
            if(getAge > 28)
            {
              $("select[name=is_married]").val('Y').trigger('change');
            }
            else
            {
              $("select[name=is_married]").val('N').trigger('change');
            }
            $("select[name=provinsi]").val(json.data.id_prov).trigger('change');
            $("select[name=kabupaten]").html('<option value="'+json.data.id_kab+'">'+json.data.kota+'</option>').trigger('change');
            $("select[name=kecamatan]").html('<option value="'+json.data.id_kec+'">'+json.data.kecamatan+'</option>').trigger('change');
            $(".warning_nik").html('');
          }
        },
        error: function(e){
          console.log(e);
        }
      })
    }
    function checkPhone(phone)
    {
      $.ajax({
        url: baseUrl+'/api/check/phone',
        method: 'POST',
        data: {phone: phone},
        success: function(data){
          var d = JSON.parse(data);
          $('.warning_cellular').html('');
          if(d.status == false){
            $(".warning_cellular").html('<span class="text-danger">'+d.message+'</span>');
          }
        },
        error: function(e){

        }
      })
    }
    function checkReference(referensi)
    {
      $.ajax({
        url: baseUrl+'/api/check/reference',
        method: 'POST',
        data: {referensi: referensi},
        success: function(data){
          var json = JSON.parse(data);
          if(json.status == true){
            $('.warning_referensi').html('<span class="label label-success">'+json.message+'</span>');
          }else{
            $('.warning_referensi').html('<span class="text-danger">'+json.message+'</span>');
          }
        },
        error: function(e){

        }
      })
    }
    function postRegister(data)
    {
      $.ajax({
        url: baseUrl+'/api/register',
        method: 'POST',
        data: data,
        beforeSend: function(){
          $("button").prop('disabled',true);
        },
        success: function(data){
          $("button").prop('disabled',false);
          var json = JSON.parse(data);
          if(json.status === false){
            if(json.type === 'validation'){
              $.each(json.data,function(i,v){
                $(".warning_"+i).html('');
                if(v != ''){
                  $('.warning_'+i).html(v);
                }
              });
            }
          }
          else{
            sessionStorage.setItem('temp_kta',json.url);
            sessionStorage.setItem('register',true);
            window.location.reload();
          }
        },
        error: function(e){
          $("button").prop('disabled',false);
          console.log(e);
        }
      })
    }
  }
  if($("#register-info").length == 1){
    if(sessionStorage.getItem('register') == 'false'){
      $('button').prop('disabled',true);
      window.location.href = 'register.html';
    }
    else if(sessionStorage.getItem('registerInfo') == 'true'){
      $('button').prop('disabled',true);
      window.location.href = 'register-foto.html';
    }
    getReligion();
    checkKode();
    $('select[name=blood_type]').select2({
        data: [{'id':'O','text':'Golongan Darah O'},{'id':'A','text':'Golongan Darah A'},{'id':'B','text':'Golongan Darah B'},{'id':'AB','text':'Golongan Darah AB'}]
    }); 
    $('select[name=is_married]').select2({
        data: [{'id':'N','text':'Belum Menikah'},{'id':'Y','text':'Sudah Menikah'},{'id':'C','text':'Janda/Duda'}]
    }); 

    $("input[name=id]").val(sessionStorage.getItem('temp_kta'));
    $('#registerPost').on('submit',function(e){
      e.preventDefault();
      $.ajax({
        url: baseUrl+'/api/update/info',
        type: 'POST',
        data: $(this).serialize(),
        success: function(data){
          var json = JSON.parse(data);
          if(json.status == false){
            if(json.type == 'validation'){
              $.each(json.data,function(i,v){
                if(v != ''){
                  $('.warning_'+i).html(v);
                }
              });
            }
          }
          else{
            sessionStorage.setItem('registerInfo',true);
            window.location.reload();
          }
        },
        error: function(e){
          console.log(e);
        }
      })
    });

    function getReligion(){
      $('select[name=religion]').select2({
        ajax: { 
          url: baseUrl+"/api/check/religion/",
          type: "GET",
          dataType: 'json',
          delay: 250,
          processResults: function (response) {
            return {
               results: response
            };
          },
        },
      }); 
    }
  }
  if($("#register-foto").length == 1){
    if(sessionStorage.getItem('register') == 'false'){
      $('button').prop('disabled',true);
      window.location.href = 'register.html';
    }
    $("input[name=id]").val(sessionStorage.getItem('temp_kta'));
    checkKode();

    var cropPhotoOption = {
      uploadUrl: baseUrl+'/api/update/upload',
      cropUrl:baseUrl+'/api/update/crop',
      outputUrlId:'photoOutput',
      imgEyecandy:false,
      doubleZoomControls:false,
      modal:true,
      loaderHtml: "<img src='"+baseUrl+"/assets/img/loading2.gif' class='loader' />"
    }
    var cropKtpOption = {
      uploadUrl: baseUrl+'/api/update/upload',
      cropUrl:baseUrl+'/api/update/crop',
      outputUrlId:'ktpOutput',
      imgEyecandy:false,
      doubleZoomControls:false,
      modal:true,
      loaderHtml: "<img src='"+baseUrl+"/assets/img/loading2.gif' class='loader' />"
    }
    var cropPhoto = new Croppic('photo', cropPhotoOption);
    var cropKtp = new Croppic('ktp', cropKtpOption);

    $('#registerPost').on('submit',function(e){
      e.preventDefault();
      $.ajax({
          url:baseUrl+'/api/update/photo',
          type:'POST',
          data: {id: $('input[name=id]').val(),fotoUrl: $("input[name=fotoUrl]").val(),ktpUrl: $("input[name=ktpUrl").val()},
          success: function(data){
            var json = JSON.parse(data);
            if(json.status == true){
              $("#registerPost")[0].reset();
              $('#fotoId').html('');
              $('#ktpId').html('');
              $('button').prop('disabled',true);
              sessionStorage.clear();
              $(".warning").html('<center>'+
                              '<h4>Keanggotaan Berhasil Didaftarkan</h4>'+
                              '</center>'+
                              '<table class="table table-bordered">'+
                              '<tr>'+
                              '<td><img src="'+baseUrl+json.path_kta+'" width="100%" /></td>'+
                              '</tr>'+
                              '<tr><td colspan="2"><h6 style="line-height: 24px;font-weight: normal;">Saat Ini Keanggotaan Anda Belum Terverifikasi, Anda Perlu Melakukan Pencetakan KTA Di DPP/DPD/DPC Untuk Memverifikasi & Mengaktifkan Keanggotaan Anda.</h6></td></tr></table>');
            }else{
              $('.warning').html('<div class="alert alert-danger">Harap Mengupload Foto Diri</div>');  
            }
          },error:(e)}){
            $('.warning').html('<div class="alert alert-danger">Terjadi Kesalahan Pada Server, Ulangi Sekali Lagi</div>');
          }
      });
    };

    function uploadFoto()
    {
      if($("input[name=fotoUrl]").val() == ''){
        $(".warning").html('<div class="alert alert-danger">Anda Harus Mengupload Foto Diri</div>');
      }else{
        
      }
    }
    function uploadKtp()
    {
      if($("input[name=ktpUrl").val() == ''){
        $(".warning").html('<div class="alert alert-danger">Anda Harus Mengupload KTP Anda</div>');
      }
      else{
      $.ajax({
        url:baseUrl+'/api/update/ktp',
        type:'POST',
        data: {id: $('input[name=id]').val(),ktpUrl: $("input[name=ktpUrl]").val()},
        success: function(data){
          var json = JSON.parse(data);
          if(json.status == true){
            sessionStorage.clear();
            $('#fotoId').html('');
            $('#ktpId').html('');
            $('button').prop('disabled',true);
            $(".warning").html('<center>'+
                              '<h4>Keanggotaan Berhasil Didaftarkan</h4>'+
                              '</center>'+
                              '<table class="table table-bordered">'+
                              '<tr><td>Nama Lengkap:</td>'+
                              '<td></td>'+
                              '</tr>'+
                              '<tr><td>Provinsi:</td>'+
                              '<td></td>'+
                              '</tr>'+
                              '<tr><td>Kota:</td>'+
                              '<td></td>'+
                              '</tr>'+
                              '<tr><td>Alamat Lengkap:</td>'+
                              '<td></td>'+
                              '</tr>'+
                              '<tr><td colspan="2"><h6 style="line-height: 24px;font-weight: normal;">Saat Ini Keanggotaan Anda Belum Terverifikasi, Anda Perlu Melakukan Pencetakan KTA Untuk Memverifikasi & Mengaktifkan Keanggotaan Anda.</h6></td></tr></table>');
          }
        },error:(e)}){
          $('.warning').html('<div class="alert alert-danger">Terjadi Kesalahan Pada Server, Ulangi Sekali Lagi</div>');
        }
      };
    }})
  }
  function checkKode()
    {
      var res;
      $.ajax({
        url: baseUrl+'/api/check/kode',
        type: 'POST',
        data: {kode: sessionStorage.getItem('temp_kta')},
        success: function(data){
          if(data == 0){
            sessionStorage.setItem('register',false);
            window.location.href = 'register.html';
          }
        },
        error: function(e){
          $('button').prop('disabled',true);
          $(".warning").html('<div class="alert alert-danger">Terjadi Kesalahan Pada Server, Silahkan Refresh</div>');
        }
      });
    }
});
