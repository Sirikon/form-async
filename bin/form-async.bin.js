var formasync={init:function(){$("form.async:not(.form-initiated) *.form-success-show").hide(),$("form.async:not(.form-initiated) *.form-fail-show").hide(),$("form.async:not(.form-initiated) *.form-loading-show").hide(),$("form.async:not(.form-initiated) *.form-initial-show").show(),$("form.async:not(.form-initiated) *.form-success-hide").show(),$("form.async:not(.form-initiated) *.form-fail-hide").show(),$("form.async:not(.form-initiated) *.form-loading-hide").show(),$("form.async:not(.form-initiated) *.form-initial-hide").hide(),$("form.async:not(.form-initiated)").addClass("form-initiated"),$(document).off("submit","form.async",formasync.submitCallback),$(document).on("submit","form.async",formasync.submitCallback)},submitCallback:function(i){i.preventDefault();var o=$(this);o.get(0).actualRequest&&o.get(0).actualRequest.abort();var s=o.attr("action"),a=o.attr("method").toUpperCase();formasync.statusToLoading(o),o.get(0).actualRequest=$.ajax(s,{cache:!1,type:a,data:o.serialize(),success:function(i,s,a){parsedData=i,"string"==typeof parsedData&&(parsedData=JSON.parse(parsedData)),"ok"==parsedData.status?formasync.statusToSuccess(o):formasync.statusToFail(o),formasync.writeMessage(o,parsedData.message)},error:function(){formasync.statusToFail(o)}})},statusToLoading:function(i){i.find("*.form-success-show").hide(),i.find("*.form-fail-show").hide(),i.find("*.form-initial-show").hide(),i.find("*.form-loading-show").show(),i.find("*.form-success-hide").show(),i.find("*.form-fail-hide").show(),i.find("*.form-initial-hide").show(),i.find("*.form-loading-hide").hide(),i.hasClass("form-disableinputs")&&i.find("input").each(function(){$(this).attr("disabled","true")})},statusToFail:function(i){i.find("*.form-success-show").hide(),i.find("*.form-loading-show").hide(),i.find("*.form-initial-show").hide(),i.find("*.form-fail-show").show(),i.find("*.form-success-hide").show(),i.find("*.form-loading-hide").show(),i.find("*.form-initial-hide").show(),i.find("*.form-fail-hide").hide(),i.hasClass("form-disableinputs")&&i.find("input").each(function(){$(this).removeAttr("disabled")})},statusToSuccess:function(i){i.find("*.form-fail-show").hide(),i.find("*.form-loading-show").hide(),i.find("*.form-initial-show").hide(),i.find("*.form-success-show").show(),i.find("*.form-initial-hide").show(),i.find("*.form-fail-hide").show(),i.find("*.form-loading-hide").show(),i.find("*.form-success-hide").hide(),i.hasClass("form-disableinputs")&&i.find("input").each(function(){$(this).removeAttr("disabled")})},writeMessage:function(i,o){i.find("*.form-resultmessage").each(function(){$(this).text(o)})}};$(document).ready(function(){formasync.init()});