

<div class="fui-form-ele fui-form-text">
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
            <label class="fui-form-field">
                {{#if icon}}
                <span class="input-icon icon icon-{{icon}}"></span>
                {{else}}
                <span class="input-icon-null"></span>
                {{/if}}
                <span class="input-wrapper">
                    <input type="{{type}}" placeholder="{{placeHolder}}"/>
                </span>
                <span class="fui-form-field-label">{{fieldLabel}}</span>
            </label>
        </div>
    </div>
    <div class="fui-form-ele-description"></div>
    <div class="fui-form-ele-error-msg"></div>
</div>