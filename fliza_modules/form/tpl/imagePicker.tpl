
<div class="fui-form-ele fui-form-image-picker">
    <!--<div class="left">-->
        <!--<label>{{label}}</label>-->
    <!--</div>-->
    <!--<div class="right">-->
        <!--<input type="file" accept="image/*"/>-->
    <!--</div>-->
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
            <input type="file" accept="image/*"/>
            <!--<input type="text" style="display: none;"/>-->
        </div>
    </div>
    <div class="fui-form-ele-description"></div>
    <div class="fui-form-ele-error-msg"></div>
</div>