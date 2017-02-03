(function ($) {

AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({

	start: 0,

	afterRequest: function () {
	  var self = this;
	  var links = [];

	  var q = this.manager.store.get('q').val();
	 // alert("Query "+q);
	 
	  if (q != '*:*') {
/*if(q==null || q=="" || q==undefined){
  self.manager.store.get('q').val('*:*');
	      self.doRequest();
}	    
else{*/
	    links.push($('<a href="#"></a>').text('(x) ' + q).click(function () {
	      self.manager.store.get('q').val('*:*');
	      self.doRequest();
	      return false;
	    }));
/*}*/


	  }

	  var fq = this.manager.store.values('fq');
	 // alert("Facets   "+fq)
	  for (var i = 0, l = fq.length; i < l; i++) {
	    links.push($('<a href="#"></a>').text('(x) ' + fq[i]).click(self.removeFacet(fq[i])));
	  }

	  if (links.length) {
	    var $target = $(this.target);
	    $target.empty();
	    for (var i = 0, l = links.length; i < l; i++) {
	      $target.append($('<li></li>').append(links[i]));
	    }
	  }
	  else {
if(q==null || q=="" || q==undefined){

}	    
else{
	  
	    $(this.target).html('<li>Viewing all phones</li>');
	  
}
	  }
	},

	removeFacet: function (facet) {
	  var self = this;
	  return function () {
	    if (self.manager.store.removeByValue('fq', facet)) {
	      self.doRequest();
	    }
	    return false;
	  };
	}
	
});

})(jQuery);