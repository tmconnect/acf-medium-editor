
var acf_medium_editors = {};

(function($){
	function initialize_acf_medium_editor_field($el) {
		var $key = $el.data('key');
		var $uniqid = acf.get_uniqid();
		var $data = $el.find('div[data-key="medium_editor_'+$key+'"]').first();
		var $buttons = decodeURIComponent($data.data('buttons'));
		var $buttons = JSON.parse(decodeURIComponent($data.data('buttons')));
		var $extensions = JSON.parse(decodeURIComponent($data.data('extensions')));
		var $extension_object = {};
		$custom_buttons = {};
		for (i=0; i<$extensions.length; i++) {
			$custom_buttons[$extensions[i]['name']] = new MediumButton($extensions[i]['settings']);
		}
		var $placeholder = $data.data('placeholder');
		$options =  JSON.parse(decodeURIComponent($data.data('options')));
		var $object = {
			toolbar: {buttons: $buttons},
			extensions: $custom_buttons,
			placeholder: {
				text: $placeholder,
				hideOnClick: false
			}
		};
		for (i in $options) {
			$object[i] = $options[i];
		}
		var $selector = '[data-key="'+$key+'"] textarea';
		var $parent = $el.parent();
		if ($parent.hasClass('acf-row')) {
			var $id = $parent.data('id');
			$selector = '[data-id="'+$id+'"] '+$selector;
		} else if ($parent.is('td')) {
			$parent = $parent.parent();
			if ($parent.hasClass('acf-row')) {
				var $id = $parent.data('id');
				$selector = '[data-id="'+$id+'"] '+$selector;
			}
		}
		var editor = new MediumEditor($selector, $object);
		
		// cause update to editor to trigger acf change event
		editor.subscribe('editableInput', function(e, editable) {
			$($selector).trigger('change');
		});
		
		/* hack to deal with MediumButton not updating textarea properly */
		/*
		var $targetObj;
		$($selector).each(function(index, element) {
			$targetObj = element;
		});;
		*/
		//console.log($targetObj);
		
		//console.log(editor.elements[0]);
		//console.log(editor.elements);
		if (!editor.elements.length) {
			// not a new editor
			// happens when the editor is for a cloned field
			return;
		}
		var elements = editor.elements;
		//console.log(elements);
		for (i=0; i<editor.elements.length; i++) {
			//console.log(elements[i].id);
			var editorId = elements[i].id;
			//console.log(editorId);
			//var $target = document.getElementById(editorId);
			//console.log($target.getAttribute('medium-editor-index'));
			$('#'+editorId).bind('DOMSubtreeModified', function(e) {
				//console.log(e.currentTarget.id);
				var $target = document.getElementById(e.currentTarget.id);
				var $targetObj
				$('textarea[medium-editor-textarea-id="'+e.currentTarget.id+'"]').each(function(index, element) {
					//console.log(element);
					$targetObj = document.getElementById(element.id);
				});
				//console.log($targetObj);
				//$targetObj.innerHTML = $target.innerHTML;
				editor.events.updateInput($target, $targetObj);
				//console.log($target.innerHTML);
				//console.log($targetObj.innerHTML);
			});
		}
		/* end of hack */
	}
	if(typeof acf.add_action !== 'undefined') {
		acf.add_action('ready append', function( $el ){
			acf.get_fields({ type : 'medium_editor'}, $el).each(function(){
				initialize_acf_medium_editor_field($(this));
			});
		});
	} else {
		$(document).on('acf/setup_fields', function(e, postbox){
			$(postbox).find('.field[data-field_type="medium_editor"]').each(function(){
				initialize_acf_medium_editor_field($(this));
			});
		});
	}
})(jQuery);
