(function ($, Drupal) {
  Drupal.behaviors.oan = {
    attach: function (context) {

      $(".shutterstock_block_load").each(function () {
        var that = this;
        var oan_query = $(that).attr("data-query");
        var oan_query_spare = "";
        var oan_query_spare2 = "";
        var oan_query_spare3 = "";
        var oan_key_hash = $(that).attr("key_hash");
        var oan_img_type = $(that).attr("data-image-type");
        var str_breadcrumb_query = "";
        try {
          /*$(".breadcrumb li a:eq(1)").each(function () {
            var spl_text = $(this).text();
            spl_text = spl_text.replace('HD Wallpapers', "");
            spl_text = spl_text.replace('HD Wallpaper', "");
            spl_text = spl_text.replace('Wallpapers', "");
            spl_text = spl_text.replace('Wallpaper', "");
            str_breadcrumb_query += spl_text;
          });*/


          if (oan_query == "breadcrumb") {
            var suite_words = "";
            $(".breadcrumb li:eq(1)").each(function () {
              var spl_text = $(this).text();
              var firstWord = spl_text.substr(0, spl_text.indexOf(" "));
              suite_words += firstWord;
              str_breadcrumb_query += firstWord;
            });
            $(".breadcrumb li:eq(0)").each(function () {
              suite_words += " " + $(this).text();
              str_breadcrumb_query += suite_words + " OR " + str_breadcrumb_query + " OR " + $(this).text();
            });
            oan_query = str_breadcrumb_query;
          }
          else if (oan_query == "rand") {
            var lng_name = $(".main-container .views-field-name a").length;
            if (lng_name == 0) {
              lng_title = $(".main-container .views-field-title a").length;
              rnd_numb = Math.floor((Math.random() * lng_title) + 0);
              spl_text = $(".main-container .views-field-title a:eq(" + rnd_numb + ")").text();
              console.log(spl_text);
              var firstWord = spl_text.substr(0, spl_text.indexOf(" "));
              str_breadcrumb_query += firstWord;
              oan_query = str_breadcrumb_query;
            }
            else {
              rnd_numb = Math.floor((Math.random() * lng_name) + 0);
              console.log(rnd_numb);
              spl_text = $(".main-container .views-field-name a:eq(" + rnd_numb + ")").text();
              str_breadcrumb_query += spl_text;
              oan_query = str_breadcrumb_query;
            }
          }
          else if (oan_query == "title1") {
            spl_text = $(".page-header:eq(0)").text();
            var firstWord = spl_text.substr(0, spl_text.indexOf(" "));
            str_breadcrumb_query += firstWord;
            oan_query = str_breadcrumb_query;

          }
          else if (oan_query == "title") {
            spl_text = $(".page-header:eq(0)").text().split(" HD Wallpap");
            // spl_text = spl_text.replace('HD Wallpapers*', "");
            // spl_text = spl_text.replace('HD Wallpaper*', "");
            // spl_text = spl_text.replace('Wallpapers*', "");
            // spl_text = spl_text.replace('Wallpaper*', "");
            $(".page-header").text().split(" HD Wallpap");
            oan_query = spl_text[0];

            var lng_name = $(".main-container .views-field-name a").length;
            rnd_numb = Math.floor((Math.random() * lng_name) + 0);
            spl_text = $(".main-container .views-field-name a:eq(" + rnd_numb + ")").text();
            oan_query_spare2 = spl_text;

            var suite_words = "";
            $(".breadcrumb li:eq(1)").each(function () {
              var spl_text = $(this).text();
              var firstWord = spl_text.substr(0, spl_text.indexOf(" "));
              suite_words += firstWord;
              str_breadcrumb_query += firstWord;
            });
            $(".breadcrumb li:eq(0)").each(function () {
              suite_words += " " + $(this).text();
              oan_query_spare2 = $(this).text();
              //str_breadcrumb_query += $(this).text();
              //str_breadcrumb_query = suite_words + " OR " + str_breadcrumb_query + " OR " + $(this).text();
              //str_breadcrumb_query = suite_words;
              str_breadcrumb_query = suite_words + " OR " + $(this).text();
            });
            oan_query_spare = str_breadcrumb_query;
          }
        } catch (error) {

        }
        console.log(oan_query);
        console.log(oan_query_spare);
        console.log(oan_query_spare2);
        if (oan_query == "breadcrumb") {
          oan_query = "";
        }
        $.ajax({
          url: "/oan-query?" + "key_hash=" + oan_key_hash + "&query=" + oan_query + "&image_type=" + oan_img_type + "&query_spare=" + oan_query_spare + "&query_spare2=" + oan_query_spare2,
          method: "GET",
          cache: true,
          async: true
        }).done(function (data) {
          $(data).each(function () {
            if (this.command == "insert") {
              if (this.data.length > 0) {
                $(that).html(this.data);
              }
              return "";
            }
          });
        });
      });
    }
  };
})(jQuery, Drupal);
