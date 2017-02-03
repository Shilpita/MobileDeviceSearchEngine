(function ($) {
	
AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
	init: function () {
		  var self = this;
		  $(this.target).find('input').bind('keydown', function(e) {
		    if (e.which == 13) {

		      var value = $(this).val();
		      if (value && self.set(value)) {
		        //Adding user search data
					var counterQuery=  parseInt(sessionStorage.getItem('CounterForQuery')) + 1;	       
		       
		         var Query="Query"+counterQuery;
		        var Querytimestamp="Querytimestamp"+counterQuery;
		         var timestamp = new Date();
				sessionStorage.setItem(Query,value);

				sessionStorage.setItem(Querytimestamp,JSON.stringify(timestamp));

		         sessionStorage.setItem("CounterForQuery",counterQuery);
		         var results = [];
		        sessionStorage.setItem(Query+"ResultsClicked",JSON.stringify(results));
		        	 var resultRelevant = [];
		        	  var resultSatisfied = [];

 					sessionStorage.setItem(Query+"MarkedAsRelevant",JSON.stringify(resultRelevant));
 					 sessionStorage.setItem(Query+"MarkedAsSatisfied",JSON.stringify(resultSatisfied));

		          sessionStorage.setItem("Total"+Query+"ResultsClicked",0);
		        //end
		        self.doRequest();
		      }
		    }
		  });
		},

		afterRequest: function () {
		  $(this.target).find('input').val('');
		}
});

})(jQuery);