import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.qL1yNBZ5.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"code/layui/layui关闭子页面刷新父页面table.md","filePath":"code/layui/layui关闭子页面刷新父页面table.md"}'),n={name:"code/layui/layui关闭子页面刷新父页面table.md"},e=t(`<div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">layer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">msg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.info, {icon: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,time:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> parent.layer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getFrameIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(window.name); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//获取窗口索引</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   parent.layer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(index);                            		          window.parent.layui.table.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UserTable&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//刷新父页面</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div>`,1),l=[e];function h(p,k,r,d,E,o){return a(),i("div",null,l)}const _=s(n,[["render",h]]);export{y as __pageData,_ as default};
