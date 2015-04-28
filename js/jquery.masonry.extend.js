!function($){
   $.fn.filteredMasonry = function(options){
     var cache=[];
	 //the main job of the function is to cache the item,because we are going to filter the items later
	 var init = function($container){
		$container.find(options.itemSelector).each(function(){
			cache.push($(this));
		});
		$container.masonry(options);
	 }
	 //filter items in cache
	 var filterItems = function(selector){
		var result=[];
		$(cache).each(function(item){
			if(cache[item].is(selector)){
				result.push(cache[item]);
			}
		})
		return result;
	 }
	 //reload masonry
	 var reload = function($container,items){
		$container.empty();
		$(items).each(function(){
			$($container).append($(this));
		});
		$container.masonry('reload');
		
	 }

	 var proc = function($container){
		$(options.filtersGroupSelector).find('[data-filter]').each(function(){
			$(this).on('click',function(){
				var selector = $(this).attr('data-filter');
				var items = filterItems(selector);
				reload($container,items);
				return false;
			})
		})
	 }

	 return this.each(function() {
	    var $$ = $(this);
	    init($$);
		proc($$);
	 });
   }
}(window.jQuery)