import{_ as a,c as i,o as n,ag as l}from"./chunks/framework.B-XtCDNB.js";const p="/assets/image-20241030092710528.xiwQXh4Q.png",F=JSON.parse('{"title":"centos","description":"","frontmatter":{},"headers":[],"relativePath":"code/linux/version `GLIBC_2.33‘ not found.md","filePath":"code/linux/version `GLIBC_2.33‘ not found.md"}'),t={name:"code/linux/version `GLIBC_2.33‘ not found.md"};function e(h,s,k,d,c,r){return n(),i("div",null,[...s[0]||(s[0]=[l('<div class="note custom-block github-alert"><p class="custom-block-title">NOTE</p><p></p><p>这是在C和C++编译php扩展时遇到了问题,编译完成之后在其他服务器系统里无法运行的情况</p></div><p><img src="'+p+`" alt="image-20241030092710528"></p><h1 id="centos" tabindex="-1">centos <a class="header-anchor" href="#centos" aria-label="Permalink to &quot;centos&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#用strings命令查看下系统中的GLIBC版本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">strings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /lib64/libc.so.6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GLIBC</span></span></code></pre></div><h1 id="ubuntu" tabindex="-1">ubuntu <a class="header-anchor" href="#ubuntu" aria-label="Permalink to &quot;ubuntu&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#检查版本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">strings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /lib/x86_64-linux-gnu/libc.so.6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GLIBC_</span></span></code></pre></div><h1 id="结果示例" tabindex="-1">结果示例 <a class="header-anchor" href="#结果示例" aria-label="Permalink to &quot;结果示例&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.2.5</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.2.6</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.3.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.3.3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.3.4</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.4</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.5</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.6</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.7</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.8</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.9</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.10</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.11</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.12</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.13</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.14</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.15</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.16</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.17</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.18</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.22</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.23</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.24</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.25</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.26</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.27</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.28</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.29</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_2.30</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GLIBC_PRIVATE</span></span></code></pre></div>`,8)])])}const o=a(t,[["render",e]]);export{F as __pageData,o as default};
