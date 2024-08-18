import{_ as a,c as e,o as t,a4 as s}from"./chunks/framework.qL1yNBZ5.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"code/vmware/vmware上ubuntu,debian设置root用户,配置ens33网卡,虚拟机挂载目录.md","filePath":"code/vmware/vmware上ubuntu,debian设置root用户,配置ens33网卡,虚拟机挂载目录.md"}'),i={name:"code/vmware/vmware上ubuntu,debian设置root用户,配置ens33网卡,虚拟机挂载目录.md"},n=s('<h2 id="设置root用户" tabindex="-1">设置root用户 <a class="header-anchor" href="#设置root用户" aria-label="Permalink to &quot;设置root用户&quot;">​</a></h2><p>给root账户设置密码 在当前普通用户界面下输入命令: sudo passwd root 然后按提示两次输入密码即可</p><h2 id="配置ens33网卡" tabindex="-1">配置ens33网卡 <a class="header-anchor" href="#配置ens33网卡" aria-label="Permalink to &quot;配置ens33网卡&quot;">​</a></h2><p>1.进入 /etc/netplan/ 目录 2.修改目录下文件 <img src="http://home.wxioi.cn:8086/wp-content/uploads/2024/05/image-1716390475391.png" alt="file"></p><p>3.执行命令 netplan apply 再重启执行 ifconfig 就能看到 ens33 网卡已经存在了</p><p>查询VM虚拟机网关 vm菜单栏 – 编辑 – 虚拟网络编辑器 <img src="http://home.wxioi.cn:8086/wp-content/uploads/2024/05/image-1716390492406.png" alt="file"></p><p><img src="http://home.wxioi.cn:8086/wp-content/uploads/2024/05/image-1716390503031.png" alt="file"></p><h4 id="安装ubuntu时参考" tabindex="-1">安装ubuntu时参考 <a class="header-anchor" href="#安装ubuntu时参考" aria-label="Permalink to &quot;安装ubuntu时参考&quot;">​</a></h4><p><img src="http://home.wxioi.cn:8086/wp-content/uploads/2024/05/image-1716390982781.png" alt="file"></p><h2 id="虚拟机目录挂载" tabindex="-1">虚拟机目录挂载 <a class="header-anchor" href="#虚拟机目录挂载" aria-label="Permalink to &quot;虚拟机目录挂载&quot;">​</a></h2><p>在root模式下输入</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/fstab</span></span></code></pre></div><p>然后在最后一行加入</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.host:/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/hgfs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fuse.vmhgfs-fuse</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> allow_other</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span></code></pre></div><p>并保存</p><h3 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h3><ul><li>ubuntu <a href="https://blog.csdn.net/xl196908/article/details/137166220" target="_blank" rel="noreferrer">https://blog.csdn.net/xl196908/article/details/137166220</a></li><li>debian <a href="https://blog.csdn.net/shoujoai/article/details/131995593" target="_blank" rel="noreferrer">https://blog.csdn.net/shoujoai/article/details/131995593</a></li><li>ens33 <a href="https://blog.csdn.net/Peanutfight/article/details/127235808" target="_blank" rel="noreferrer">https://blog.csdn.net/Peanutfight/article/details/127235808</a></li></ul>',17),o=[n];function l(r,h,p,d,c,u){return t(),e("div",null,o)}const g=a(i,[["render",l]]);export{b as __pageData,g as default};
