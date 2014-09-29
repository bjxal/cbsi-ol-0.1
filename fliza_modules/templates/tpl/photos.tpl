<a class="phtots-arrow photos-l-arrow"></a>
<a class="phtots-arrow photos-r-arrow"></a>
<div class="photos-pack">
    {{#each imgList}}
        <img class="normal" data-leftSwipe="page-{{../pageIndex}}-photos-item" data-rightSwipe="page-{{../pageIndex}}-photos-item" src="{{src}}"/>
    {{/each}}
</div>
        {{#if withDesc}}
<div class="desc-pack">
    {{#each imgList}}
    <p data-desc-index="page-{{../pageIndex}}-desc-item-{{@index}}">{{desc}}</p>
    {{/each}}
</div>
        {{/if}}