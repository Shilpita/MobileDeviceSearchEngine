(function ($) {

AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({

	afterRequest: function () {
		  $(this.target).empty();
		  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
		    var doc = this.manager.response.response.docs[i];
		    $(this.target).append(this.template(doc,i));
		  }
		},

		template: function (doc,i) {	
		  // limit snippet to first 150 characters
		  var snippet;
		  if (doc.description === undefined)
			  snippet = "";
		  else
			  snippet = doc.description.toString().substring(0,150);
		if (doc.description.toString().length > 150)
			snippet += " ...";
		  
		  var output = '<div><h2><a  class="myclass"  id="specialLink" href=' + doc.url + ' target="_blank" \>' + doc.title + '</a></h2>';
		  //output += '<p id="links_' + doc.id + '" class="links"></p>';
		  
		  output += '<input class="rs" type="checkbox" value="Satisfied" data-checkbox-text=' + doc.url + ' data-checkbox-text-position='+i+' />Satisfied         <input type="checkbox" class="rs" value="Relevant" data-checkbox-text=' + doc.url + ' data-checkbox-text-position='+i+' />Relevant<br><a class="myclass" id="specialLink" href=' + doc.url + ' target="_blank"' + '\>' + doc.url + '</a>';
		  output += '<p>' + snippet + '</p></div>';
		  return output;
		}
	
});

})(jQuery);