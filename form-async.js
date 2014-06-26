var formasync = {
	init: function(){
		$('form.async:not(.form-initiated) *.form-success-show').hide();
		$('form.async:not(.form-initiated) *.form-fail-show').hide();
		$('form.async:not(.form-initiated) *.form-loading-show').hide();
		$('form.async:not(.form-initiated) *.form-initial-show').show();
		$('form.async:not(.form-initiated) *.form-success-hide').show();
		$('form.async:not(.form-initiated) *.form-fail-hide').show();
		$('form.async:not(.form-initiated) *.form-loading-hide').show();
		$('form.async:not(.form-initiated) *.form-initial-hide').hide();
		$('form.async:not(.form-initiated)').addClass('form-initiated');
		$(document).off('submit', 'form.async', formasync.submitCallback);
		$(document).on('submit', 'form.async', formasync.submitCallback);
	},
	submitCallback: function(e){
		e.preventDefault();
		var el = $(this);
		if(el.get(0).actualRequest){
			el.get(0).actualRequest.abort();
		}
		var action = el.attr('action');
		var method = el.attr('method').toUpperCase();
		formasync.statusToLoading(el);
		el.get(0).actualRequest = $.ajax(action,{
			cache: false,
			type: method,
			data: el.serialize(),
			success: function(data,status,jqxhr){
				parsedData = data;
				if(typeof(parsedData) == 'string'){
					parsedData = JSON.parse(parsedData);
				}
				if(parsedData.status == 'ok'){
					formasync.statusToSuccess(el);
				}else{
					formasync.statusToFail(el);
				}
				formasync.writeMessage(el,parsedData.message);
			},
			error: function(){
				formasync.statusToFail(el);
			}
		});
	},
	statusToLoading: function(form){
		form.find('*.form-success-show').hide();
		form.find('*.form-fail-show').hide();
		form.find('*.form-initial-show').hide();
		form.find('*.form-loading-show').show();

		form.find('*.form-success-hide').show();
		form.find('*.form-fail-hide').show();
		form.find('*.form-initial-hide').show();
		form.find('*.form-loading-hide').hide();

		if(form.hasClass('form-disableinputs')){
			form.find('input').each(function(){
				$(this).attr('disabled','true');
			});
		}
	},
	statusToFail: function(form){
		form.find('*.form-success-show').hide();
		form.find('*.form-loading-show').hide();
		form.find('*.form-initial-show').hide();
		form.find('*.form-fail-show').show();

		form.find('*.form-success-hide').show();
		form.find('*.form-loading-hide').show();
		form.find('*.form-initial-hide').show();
		form.find('*.form-fail-hide').hide();

		if(form.hasClass('form-disableinputs')){
			form.find('input').each(function(){
				$(this).removeAttr('disabled');
			});
		}
	},
	statusToSuccess: function(form){
		form.find('*.form-fail-show').hide();
		form.find('*.form-loading-show').hide();
		form.find('*.form-initial-show').hide();
		form.find('*.form-success-show').show();

		form.find('*.form-initial-hide').show();
		form.find('*.form-fail-hide').show();
		form.find('*.form-loading-hide').show();
		form.find('*.form-success-hide').hide();

		if(form.hasClass('form-disableinputs')){
			form.find('input').each(function(){
				$(this).removeAttr('disabled');
			});
		}
	},
	writeMessage: function(form,message){
		form.find('*.form-resultmessage').each(function(){
			$(this).text(message);
		});
	}
};


$(document).ready(function(){
	formasync.init();
});