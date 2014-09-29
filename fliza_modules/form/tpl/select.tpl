
<div class="fui-form-ele fui-form-select">
    {{#if label}}
    <label class="fui-form-ele-label">{{label}}</label>
    {{/if}}
    <div class="fui-form-ele-container">
        <!--{{#if label}}-->
        <!--<div class="left">-->
            <!--<label>{{label}}</label>-->
        <!--</div>-->
        <!--{{/if}}-->
        <div class="right">
            <a href="#" class="holder" data-fui-key="sel-holder"></a>
            <ul class="sel-list" data-fui-key="sel-list">
                {{#each data}}
                <li class="sel">
                    <a href="#" data-value="{{value}}">{{text}}</a>
                </li>
                {{/each}}
            </ul>
        </div>
    </div>
    <div class="fui-form-ele-description"></div>
    <div class="fui-form-ele-error-msg"></div>
</div>


