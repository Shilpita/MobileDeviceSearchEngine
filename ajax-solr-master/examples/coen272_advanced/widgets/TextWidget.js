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
		        	   var resultFacets = [];

 					sessionStorage.setItem(Query+"MarkedAsRelevant",JSON.stringify(resultRelevant));
 					 sessionStorage.setItem(Query+"MarkedAsSatisfied",JSON.stringify(resultSatisfied));

		          sessionStorage.setItem("Total"+Query+"ResultsClicked",0);
		           sessionStorage.setItem(Query+"Facet",JSON.stringify(resultFacets));
		        //end
		        self.doRequest();
		      }
		    }
		  });
		},

		afterRequest: function () {
		  $(this.target).find('input').val('');
		 // facetChecker();
		}
});




//only for those selectionswhich persist before the next query adding tothe facets array
function facetChecker(){
 var counterQuery=  parseInt(sessionStorage.getItem('CounterForQuery')) + 0; 




var checkedNum =$('input.facetclass').is(':checked').length;
var arrayChecked=$('input[type="checkbox"].facetclass :checked')
alert("Direct"+arrayChecked.length);
alert("InDirect"+checkedNum);
      var counterQueryCheckBox=  parseInt(sessionStorage.getItem('CounterForQuery')) + 0; 

      var labelFacetResult="Query"+counterQueryCheckBox+"Facet";
       

      var resultFacetResult = JSON.parse(sessionStorage.getItem(labelFacetResult));

//if ($('input.rs').is(':checked')) {
if(arrayChecked.length!=0){

for(i=0;i<arrayChecked.length;i++){



var facetValue = $(arrayChecked[i]).attr('value');


alert(facetValue);

 resultFacetResult.push({
        "facet":facetValue 
});

}

sessionStorage.setItem(labelFacetResult,JSON.stringify(resultFacetResult));

}//checking if input boxesof facts is checked



}
//end









})(jQuery);