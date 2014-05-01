/* Created by jankoatwarpspeed.com */

(function($) {
    $.fn.formToWizard = function(options) {
        options = $.extend({  
            submitButton: "" 
        }, options); 
        
        var element = this;


        var steps = $(element).find("fieldset.user-registration");
        var count = steps.size();
        var submmitButtonName = "#" + options.submitButton;
        $(submmitButtonName).hide();


        steps.each(function(i) {
            $(this).wrap("<div id='step" + i + "' class='parent'></div>");
            $(this).append("<p id='step" + i + "commands' class='commands'></p>");


            if (i == 0) {
                createNextButton(i);
                selectStep(i);
            }
            else if (i == count - 1) {
                $("#step" + i).hide();
                createPrevButton(i);
            }
            else {
                $("#step" + i).hide();
                createPrevButton(i);
                createNextButton(i);

            }

        });

        function createPrevButton(i) {
            var stepName = "step" + i;

            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>Back</a>");

            $("#" + stepName + "Prev").on("click", function(e) {
                e.preventDefault();
	            loadLeftContent(i, stepName);
            });

            $("#" + stepName).on("swiperight", function(event){
	    		event.preventDefault();
                event.stopPropagation();
				loadLeftContent(i, stepName);
            });
        }

        function createNextButton(i) {
            var stepName = "step" + i;

            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next</a>");
            $("#" + stepName + "right").append("<a href='#' id='" + stepName + "Answer' class='answer-later'>Answer Later</a>");

            var form = $("#" + stepName + "commands").parents("form:first");

            $("#" + stepName + "Next").on("click", function(e) {
                e.preventDefault();
                loadRightContent(i, stepName, form);

            });

            $("#" + stepName + "Answer").on("click", function(e){
                e.preventDefault();
                loadRightContent(i, stepName, form);
            });

            $("#" + stepName).on("swipeleft", function(event){
				event.preventDefault();
                event.stopPropagation();
                loadRightContent(i, stepName, form);
             });
            }

        function selectStep(i) {
                $("#steps li").removeClass("current");
                $("#stepDesc" + i).addClass("current");
                if(i + 1 == count) {
                    EditInformation();
                }
            }

        function loadLeftContent(i, stepName) {
                $("#" + stepName).hide();
                $("#step" + (i - 1)).show("slide", {direction: "left"}, 300);
                $(submmitButtonName).hide();
                selectStep(i - 1);
            }

        function loadRightContent(i, stepName, form) {
            if (form.valid()) {
                $("#" + stepName).hide();
                $("#step" + (i + 1)).show("slide", {direction: "right"}, 300);
                if (i + 2 == count)
                    $(submmitButtonName).show();
                selectStep(i + 1);
            }
        }

        function EditInformation(){
            var fields = new Array(
                $("#first-name").val(),
                $("#role").val(),
                $("#address1").val(),
                $("#phone").val(),
                $("#email").val(),
                $("#card-name").val()
            );
            var list = $(".user-registration-summary ul li");
            list.each(function(){
                $(this).children('.user-summary-value').html(fields[$(this).index()]);
             });
            fields.lenght = 0;

            $('a.edit-info').on('click', function(e){
                e.preventDefault();
                $this = $(this);
                var name = $this.attr('href');
                $this.parents(".parent").hide();
                $("input[name='"+name+"']").parents(".parent").show();
                $("input[name='"+name+"']").focus();
            });
          }
        }

})(jQuery); 