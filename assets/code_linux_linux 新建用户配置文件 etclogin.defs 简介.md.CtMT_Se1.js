import{_ as a,c as i,o as n,ag as l}from"./chunks/framework.B-XtCDNB.js";const p="/assets/b9f73b5cf75f85b6e764611cc322d553.OKu28eiq.png",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"code/linux/linux 新建用户配置文件 etclogin.defs 简介.md","filePath":"code/linux/linux 新建用户配置文件 etclogin.defs 简介.md"}'),t={name:"code/linux/linux 新建用户配置文件 etclogin.defs 简介.md"};function e(h,s,k,d,F,r){return n(),i("div",null,[...s[0]||(s[0]=[l('<p>/etc/login.defs 是设置用户帐号限制的文件。该文件里的配置对root用户无效。/etc/login.defs 文件用于在Linux创建用户时，对用户的一些基本属性做默认设置，例如指定用户 UID 和 GID 的范围，用户的过期时间，密码的最大长度，等等。</p><p>需要注意的是，该文件的用户默认配置对 root 用户无效。并且，当此文件中的配置与 /etc/passwd 和 /etc/<a href="https://so.csdn.net/so/search?q=shadow&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">shadow</a> 文件中的用户信息有冲突时，系统会以/etc/passwd 和 /etc/shadow 为准。</p><p>如果/etc/shadow文件里有相同的选项，则以/etc/shadow里的设置为准，也就是说/etc/shadow的配置优先级高于/etc/login.defs</p><p><img src="'+p+`" alt="Linux新建用户配置文件 /etc/login.defs 详解"></p><p>读者可自行使用 vim /etc/login.defs 命令查看该文件中的内容，表 1 中对文件中的各个选项做出了具体的解释。</p><table><caption>表 1 /etc/login.defs文件内容</caption><tbody><tr><th>设置项</th><th>含义</th></tr><tr><td>MAIL_DIR /var/spool/mail </td><td>创建用户时，系统会在目录 /var/spool/mail 中创建一个用户邮箱，比如 lamp 用户的邮箱是 /var/spool/mail/lamp。</td></tr><tr><td>PASS_MAX_DAYS 99999</td><td>密码有效期，99999 是自 1970 年 1 月 1 日起密码有效的天数，相当于 273 年，可理解为密码始终有效。</td></tr><tr><td>PASS_MIN_DAYS 0</td><td>表示自上次修改密码以来，最少隔多少天后用户才能再次修改密码，默认值是 0。</td></tr><tr><td>PASS_MIN_LEN 5</td><td>指定密码的最小长度，默认不小于 5 位，但是现在用户登录时验证已经被 PAM 模块取代，所以这个选项并不生效。</td></tr><tr><td>PASS_WARN_AGE 7</td><td>指定在密码到期前多少天，系统就开始通过用户密码即将到期，默认为 7 天。</td></tr><tr><td>UID_MIN 500 </td><td>指定最小 UID 为 500，也就是说，添加用户时，默认 UID 从 500 开始。注意，如果手工指定了一个用户的 UID 是 550，那么下一个创建的用户的 UID 就会从 551 开始，哪怕 500~549 之间的 UID 没有使用。</td></tr><tr><td>UID_MAX 60000</td><td>指定用户最大的 UID 为 60000。</td></tr><tr><td>GID_MIN 500</td><td>指定最小 GID 为 500，也就是在添加组时，组的 GID 从 500 开始。</td></tr><tr><td>GID_MAX 60000</td><td>用户 GID 最大为 60000。</td></tr><tr><td>CREATE_HOME yes</td><td>指定在创建用户时，是否同时创建用户主目录，yes 表示创建，no 则不创建，默认是 yes。</td></tr><tr><td>UMASK 077</td><td>用户主目录的权限默认设置为 077。</td></tr><tr><td>USERGROUPS_ENAB yes</td><td>指定删除用户的时候是否同时删除用户组，准备地说，这里指的是删除用户的初始组，此项的默认值为 yes。</td></tr><tr><td>ENCRYPT_METHOD SHA512</td><td>指定用户密码采用的加密规则，默认采用 SHA512，这是新的密码加密模式，原先的 Linux 只能用 DES 或 MD5 加密。</td></tr></tbody></table><p>/etc/login.defs 完整文件如下：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">root@linuxidc:/home/linuxidc/linuxidc.com</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">MAIL_DIR</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/mail</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FAILLOG_ENAB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">LOG_UNKFAIL_ENAB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">LOG_OK_LOGINS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SYSLOG_SU_ENAB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SYSLOG_SG_ENAB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FTMP_FILE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/log/btmp</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SU_NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> su</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HUSHLOGIN_FILE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .hushlogin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ENV_SUPATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ENV_PATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TTYGROUP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tty</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TTYPERM</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0600</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ERASECHAR</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0177</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">KILLCHAR</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 025</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">UMASK</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 022</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PASS_MAX_DAYS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 99999</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PASS_MIN_DAYS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PASS_WARN_AGE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">UID_MIN</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">UID_MAX</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 60000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GID_MIN</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GID_MAX</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 60000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">LOGIN_RETRIES</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">LOGIN_TIMEOUT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 60</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHFN_RESTRICT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rwh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DEFAULT_HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">USERGROUPS_ENAB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ENCRYPT_METHOD</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SHA512</span></span></code></pre></div>`,8)])])}const _=a(t,[["render",e]]);export{g as __pageData,_ as default};
