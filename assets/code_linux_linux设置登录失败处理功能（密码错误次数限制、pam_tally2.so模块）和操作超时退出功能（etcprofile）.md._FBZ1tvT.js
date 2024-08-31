import{_ as s,c as i,o as a,a4 as h}from"./chunks/framework.qL1yNBZ5.js";const t="/assets/e7e6766f217403825f4c9ad3a7443648.C7w4vpCG.png",o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"code/linux/linux设置登录失败处理功能（密码错误次数限制、pam_tally2.so模块）和操作超时退出功能（etcprofile）.md","filePath":"code/linux/linux设置登录失败处理功能（密码错误次数限制、pam_tally2.so模块）和操作超时退出功能（etcprofile）.md"}'),p={name:"code/linux/linux设置登录失败处理功能（密码错误次数限制、pam_tally2.so模块）和操作超时退出功能（etcprofile）.md"},k=h(`<h3 id="一、登录失败处理功能策略" tabindex="-1">一、登录失败处理功能策略 <a class="header-anchor" href="#一、登录失败处理功能策略" aria-label="Permalink to &quot;一、登录失败处理功能策略&quot;">​</a></h3><h4 id="_1、登录失败处理功能策略-服务器终端" tabindex="-1">1、登录失败处理功能策略（服务器终端） <a class="header-anchor" href="#_1、登录失败处理功能策略-服务器终端" aria-label="Permalink to &quot;1、登录失败处理功能策略（服务器终端）&quot;">​</a></h4><p>（1）编辑系统/etc/pam.d/system-auth 文件，在 auth 字段所在的那一部分添加如下pam_tally2.so模块的策略参数：</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> required</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> pam_tally2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> onerr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> deny</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unlock_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> even_deny_root</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> root_unlock_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span></span></code></pre></div><p>或者</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> required</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> pam_tally2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> onerr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> deny</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unlock_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> no_magic_root</span></span></code></pre></div><p>（2）pam_tally2.so模块参数解读：</p><p>onerr=fail #表示连续错误</p><p>deny=n #表示连续登录失败次数超过n次后拒绝访问</p><p>unlock_time=300 #表示连续登录失败后锁定的时间（秒数）为300秒</p><p>no_magic_root #表示连root用户也在限制范围内</p><p>even_deny_root #root用户失败登录次数超过deny=n次后拒绝访问</p><p>root_unlock_time=300 #与even_deny_root相对应的选项，如果配置该选项，则root用户在登录失败次数超出限制后被锁定指定时间为300秒</p><p>**注：**用户锁定期间，无论在输入正确还是错误的密码，都将视为错误密码，并以最后一次登录为锁定起始时间，若果用户解锁后输入密码的第一次依然为错误密码，则再次重新锁定。</p><h4 id="_2、登录失败处理功能策略-ssh远程连接登录" tabindex="-1">2、<strong>登录失败处理功能策略（ssh远程连接登录）</strong> <a class="header-anchor" href="#_2、登录失败处理功能策略-ssh远程连接登录" aria-label="Permalink to &quot;2、**登录失败处理功能策略（ssh远程连接登录）**&quot;">​</a></h4><p>（1）编辑系统/etc/pam.d/<a href="https://so.csdn.net/so/search?q=sshd&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">sshd</a>文件，添加的内容与服务器终端的一致。</p><p>在 auth 字段所在的那一部分添加如下pam_tally2.so模块的策略参数：</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> required</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> pam_tally2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> onerr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> deny</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unlock_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> even_deny_root</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> root_unlock_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span></span></code></pre></div><p>或者</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> required</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> pam_tally2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> onerr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fail</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> deny</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unlock_time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> no_magic_root</span></span></code></pre></div><p>（2）错误处理：</p><p>如果在操作中间出现下面这个错误：</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 15</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">06</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">51</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> iZ2zee7gmy40tbverl53rfZ</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sshd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15747</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PAM</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unable</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> to</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dlopen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lib64</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">security</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">pam_tally</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">): </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lib64</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">security</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">pam_tally</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cannot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> open</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> shared</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> object</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">No</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> such</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> directory</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 15</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">06</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">51</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> iZ2zee7gmy40tbverl53rfZ</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sshd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15747</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PAM</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> adding</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> faulty</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">lib64</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">security</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">pam_tally</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">so</span></span></code></pre></div><p>上面的错误意思是在/lib64/security/ 下面找不到pam_tally.so，而我进入到目录下，确实没找到这个文件，解决方法是将现有的 pam_tally2.so做个<a href="https://so.csdn.net/so/search?q=%E8%BD%AF%E8%BF%9E%E6%8E%A5&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">软连接</a>到pam_tally.so。</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">localhost</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">localhost</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> security</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><h3 id="二、操作超时退出功能策略" tabindex="-1">二、操作超时退出功能策略 <a class="header-anchor" href="#二、操作超时退出功能策略" aria-label="Permalink to &quot;二、操作超时退出功能策略&quot;">​</a></h3><p>（1）编辑/etc/profile系统文件，在文件后面添加：</p><p>export TMOUT=300 #表示无操作300秒后自动退出</p><p>扩展：</p><p>export TMOUT=0 #0代表永不自动退出</p><p>readonly TMOUT # 将值设置为readonly 防止用户更改，在shell中无法修改TMOUT</p><p>（2）source /etc/profile 使修改生效。</p><p><img src="`+t+'" alt=""></p>',33),l=[k];function n(e,r,d,F,C,y){return a(),i("div",null,l)}const c=s(p,[["render",n]]);export{o as __pageData,c as default};
