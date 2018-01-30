$.fn.ignore = function(sel){
  return this.clone().children(sel||">*").remove().end();
};

function getItems() {
	var optionsArea = $('.requirements ul.proplist')
	var options = $.map(optionsArea, el => el.lastElementChild)

	return $(options).parents('.item')
}

function getName(el) {
	var title = $(el).find('.title').ignore('span')[0].outerText.trim()

	var parts = title.split(" ")
	var firstPart = parts.slice(0, -2).join(" ");
	var lastPart = parts.slice(-2).join(" ");

	return firstPart + '\n' + lastPart
}

function getMods(el) {
	var mods = $(el).find('.item-mods .bullet-item li:not(.pseudo)').ignore('span')
	var modsAsText = $.map(mods, el => el.outerText.trim()).join("\n")

	return modsAsText
}

function createPoBLink(el, data) {
	var link = $('<a/>')
	link.click(function(event){
		event.preventDefault(); //or return false;
	});
	link.attr('href', '#')
	link.text("PoB");
	link.addClass('PoB-link')
	link.attr('data-clipboard-text', data.name + '\n' + data.mods)

	var li = $('<li/>')
	li.append(link)

	var last = $(el).find('.requirements ul.proplist').children().last()
	li.insertAfter(last)
}

var items = getItems()
var itemData = $.map(items, item => {
	var obj = {}
	obj['parent'] = item,
	obj['name'] = getName(item)
	obj['mods'] = getMods(item)

	return obj
})

itemData.forEach(item => createPoBLink(item.parent, item))

new Clipboard('.PoB-link');