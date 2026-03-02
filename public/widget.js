(function () {
  var script = document.currentScript;
  var category = script.getAttribute('data-category') || '';
  var iframe = document.createElement('iframe');
  var src = 'https://jokelikeadad.com/widget';
  if (category) src += '?category=' + encodeURIComponent(category);
  iframe.src = src;
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.maxWidth = '440px';
  iframe.style.height = '200px';
  iframe.style.borderRadius = '12px';
  iframe.title = 'Dad Joke Widget';
  script.parentNode.insertBefore(iframe, script);
})();
