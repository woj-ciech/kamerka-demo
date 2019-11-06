$(document).ready(function(){

    $(".faq .faq-item .faq-title").click(function(){        
        var item = $(this).parent('.faq-item');
        
        if(item.hasClass("active"))
            $(this).find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
        else
            $(this).find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
        
        item.toggleClass("active");
        
        onresize(300);
    });

$('#shodan_show').on('click', function(){
var x = document.getElementById("shodan_results");
if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } if(x.innerHTML == ""){
        $.ajax({
            url: "/get_shodan_scan_results/{{device.id}}",
            type: "get",
            success: function(response) {
            $.each(response, function(key, val) {
            console.log(val);
                 // response is form in html format
             $("#shodan_results").append("<p><b>" + val.fields.ports + ' </b><br> ' + val.fields.products + " </p>"+' ' + val.fields.module +"</p>");
             var i;
for (i = 0; i < val.fields.tags.length; i++) {
  $("#shodan_results").append("<li><span class=fa fa-tag></span>"+i+"</li>");
}
)
              }
              )
            }
        })
    }

});

    $("#faqForm").on("submit",function(){
        var keyword = $("#faqSearchKeyword").val();
        
        if(keyword.length >= 3){
            $(".faq .faq-item").removeClass("active");
            
            $("#faqSearchResult").html("");
            $(".faq").removeHighlight();
            
            var items = $(".faq .faq-text:containsi('"+keyword+"')");
            
            items.highlight(keyword);
            
            items.each(function(){
                $(this).parent(".faq-item").addClass("active");
            });
            
            onresize(300);
            
            $("#faqSearchResult").html("<span class='text-success'>Found in "+items.length+" answers</span>");            
        }else
            $("#faqSearchResult").html("<span class='text-error'>Minimum 3 chars required</span>");
        
        return false;
    });
    
    $("#faqOpenAll").click(function(){
        $(".faq .faq-item").addClass("active");
        onresize(300);
    });
    
    $("#faqCloseAll").click(function(){
        $(".faq .faq-item").removeClass("active");
        onresize(300);
    });
    
    $("#faqRemoveHighlights").click(function(){
        var hl = $(".faq").find(".faq-highlight");
        hl.each(function(){
            var txt = $(this).html();
            $(this).after(txt);
            $(this).remove();
        });
    });
    
    
    
});
