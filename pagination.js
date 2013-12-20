var Pagination = (function(){
	function Pagination(opts){
		if(!(this instanceof Pagination)){
			throw new Error('instantiate me!');
		} else {
			opts = opts || {};
			initialize(opts);
		}
	}

	var initialize = function(opts){
		p.opts = opts;
		ich.addTemplate('pagination', '<div class="pagination"><ul>{{#pages}}<li class="{{active}}"><a href="" data-page="{{href}}">{{title}}</a></li>{{/pages}}</ul></div>');
		p.padding = opts.padding || 3;

		p.opts.el.after(p.$el);

		generatePages();

		p.$el.on('click', 'a', function(){
			var $a = $(this);
			var page = $a.data('page');

			p.$el.find('li.active').removeClass('active');
			p.setPage(page);

			generatePages();

			if(opts.callback){
				opts.callback(page);
			}
			return false;
		});
	};

	var generatePages = function(){
		var pages = [];
		var onPage = p.onPage;
		var padding = p.padding;
		var totalPages = Math.ceil(p.opts.totalItems / p.opts.perPage);


		var from = Math.max(0, onPage - padding);
		var to = Math.min(totalPages, onPage + padding + 1);


		if(onPage - from < padding){
			//WTF???
			// to += Math.min(totalPages, padding - (onPage - from));
		} else if(to - onPage < padding){
			from -= Math.max(0, padding - (to - onPage));
		}

		var first = onPage === 0;
		pages.push({href: 0, title: '«', active: first ? 'active' : ''});
		pages.push({href: Math.max(0, onPage - 1), title: '‹ Previous', active: first ? 'active' : ''});

		for(var i = from; i < to; i++){
			pages.push({href: i, title: i + 1, active: i === onPage ? 'active' : ''});
		}

		var last = onPage === Math.min(totalPages - 1, onPage + 1);
		pages.push({href: Math.min(totalPages - 1, onPage + 1), title: 'Next ›', active: last ? 'active' : ''});
		pages.push({href: totalPages - 1, title: '»', active: last ? 'active' : ''});

		p.$el.html(ich.pagination({pages: pages}));
	};

	var p = Pagination.prototype;

	p.$el = $('<div></div>');
	p.onPage = 0;
	p.setPage = function(page){
		this.onPage = page;
		this.$el.find('[data-page=' + page + ']').closest('li').addClass('active');
	};

	return Pagination;
})();