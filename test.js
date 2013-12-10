var cleanup = function(){
	$('#sandbox').empty();
	$('#sandbox').append('<div id="someDiv"></div>');
}

describe("pagination", function(){
	var pagination;

	beforeEach(function(){
		cleanup();
		pagination = new Pagination({
				perPage: 5,
				totalItems: 21,
				padding: 1,
				el: $('#someDiv')
		});
	});

	it("should set the initial page to 0", function(){
		expect(pagination.onPage).toEqual(0);
	});
	it("should display 3 pages (one current, two for padding)", function(){
		expect($('.pagination .page').length).toEqual(3);
	});
	it("should go to the last page on clicking the last page link", function(){
		$('.pagination .last a').trigger('click');
		expect(pagination.onPage).toEqual(4);
	});
	it("should go to the first page on clicking the first page link", function(){
		$('.pagination .first a').trigger('click');
		expect(pagination.onPage).toEqual(0);
	});
	it("should go to the next page", function(){
		$('.pagination .next a').trigger('click');
		expect(pagination.onPage).toEqual(1);
	});
	it("should go to the previous page", function(){
		$('.pagination .prev a').trigger('click');
		expect(pagination.onPage).toEqual(0);
	});
});