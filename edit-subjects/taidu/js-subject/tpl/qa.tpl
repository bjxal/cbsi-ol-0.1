<div class="scrollable-pack" data-scrollable="y">
    <div class="inner">
        <div class="blank"></div>
        <a class="top">
            <span class="qa-title">{{qaTitle}}</span>
            <span class="qa-icon"><img src="{{qaIcon}}"/></span>
            <span class="qa-name">{{qaName}}</span></a>
        <ul class="qa-list">
            {{#each qaList}}
            <li>
                <h3>{{title}}</h3>
                <p>{{content}}</p>
            </li>
            {{/each}}
        </ul>
    </div>
</div>
