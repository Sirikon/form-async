# form-async #
form-async allows you to implement easily async forms in your website, without headache and extendible

## How to use ##
Just write your form as usual and add the class 'async'

```html
<form class="async" action="savesomething.php" method="POST">
  <input type="text" name="firstdata" />
  <input type="text" name="seconddata" />
  <input type="submit" value="Send Data" />
</form>
````

That's it! now the form is async, but you can extend it...

```html
<form class="async form-disableinputs" action="savesomething.php" method="POST">
  <div class="form-fail-show form-resultmessage"></div>
  <div class="form-success-show">
    Thanks for your data!: 
    <span class="form-resultmessage"></span>
  </div>
  <input class="form-success-hide" type="text" name="firstdata" />
  <input class="form-success-hide" type="text" name="seconddata" />
  <input class="form-success-hide" type="submit" value="Send Data" />
</form>
```

Now when the data is sent, while is loading all inputs will be disabled thanks to the `form-disableinputs` class in the form, when the request is a success all inputs will hide due the `form-success-hide` class, the message returned in the request will be shown (class `form-resultmessage`) when the request fails (class `form-fail-show`), and finally, if everything was ok, a div showing the message "Thanks for your data!" + the message returned will be shown.

So, with that form, if the response from savesomething.php is something like:

```json
{
  "status": "ok",
  "message": "Data saved successfully.",
  "data": {}
}
```

The result will be:

```
Thanks for your data!: Data saved successfully.
```

__NOTE__: status = 'ok' is a successfull request, any other value for status is a fail

You can combine all those classes to make your form work as you want:

__form-[success,fail,initial,loading]-[show,hide]__: For example, with `form-loading-hide` an element will hide when the form is loading

## API ##

__formasync.on('elementsID','status',callback)__: This way you can extend the functionality of a form subscribing to a status, for example:

```javascript
formasync.on('my_form_ID','success', function(form,res){
	console.log(form);
	console.log(res);
	alert('Done!');
});
```

## License ##

MIT
