import{_ as i,c as a,o as n,ag as e}from"./chunks/framework.B-XtCDNB.js";const p="/assets/5708e3a58c4f4de9b3253941a725f346.FAXsB9Aa.png",l="/assets/a53300b37805446b80822251feced3c3.CDLoMzDc.png",t="/assets/06b2a02b00074e62a532628788f12aee.BSCqcmg8.png",y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"code/linux/使用qemu搭建linux环境.md","filePath":"code/linux/使用qemu搭建linux环境.md"}'),h={name:"code/linux/使用qemu搭建linux环境.md"};function k(E,s,r,c,d,o){return n(),a("div",null,[...s[0]||(s[0]=[e('<h2 id="qemu" tabindex="-1">qemu <a class="header-anchor" href="#qemu" aria-label="Permalink to &quot;qemu&quot;">​</a></h2><p>QEMU（Quick EMUlator）是一款开源的虚拟化软件，能够模拟多种硬件平台，并支持多种虚拟化技术，如 KVM（Kernel-based Virtual Machine）加速。QEMU 能够在多个操作系统上运行，包括 Windows、Linux 和 macOS。</p><ol><li>下载 QEMU： 访问 QEMU 官方网站或通过包管理器下载适用于 Windows 的 QEMU 版本。</li></ol><p>官网地址:<a href="https://www.qemu.org/?spm=a2c6h.12873639.article-detail.4.b56d1783Rqc5sS" target="_blank" rel="noreferrer">https://www.qemu.org/</a></p><ol><li>安装 QEMU： 解压下载的文件到您选择的目录，并确保路径添加到系统的环境变量中。(配置好变量路径方便,手动进入路径也可)</li><li>准备好一个x86的镜像或者img的镜像，格式可以为qcow2</li></ol><p>QEMU 支持多种磁盘映像格式，包括 raw、qcow2、qed、vdi、vhd、vmdk、cow、parallels 和 dmg 等。</p><p>QEMU_EFI.fd文件下载地址： <a href="http://releases.linaro.org/components/kernel/uefi-linaro/16.02/release/qemu64/" target="_blank" rel="noreferrer">http://releases.linaro.org/components/kernel/uefi-linaro/16.02/release/qemu64/</a></p><p>centos:</p><p><a href="https://archive.kernel.org/centos-vault/altarch/" target="_blank" rel="noreferrer">Index of /centos-vault/altarch/</a></p><p>阿里云centos:</p><p><a href="https://mirrors.aliyun.com/centos-vault/altarch" target="_blank" rel="noreferrer">https://mirrors.aliyun.com/centos-vault/altarch</a></p><h3 id="安装虚拟网卡" tabindex="-1">安装虚拟网卡 <a class="header-anchor" href="#安装虚拟网卡" aria-label="Permalink to &quot;安装虚拟网卡&quot;">​</a></h3><p><a href="../../public/linux/tap-windows_XQYHn-1.exe">当时使用下载到的</a></p><p>这里我们选择openvpn</p><p>官方地址:<a href="https://swupdate.openvpn.net/downloads/connect/openvpn-connect-3.3.6.2752_signed.msi?spm=a2c6h.12873639.article-detail.5.b56d1783Rqc5sS&amp;file=openvpn-connect-3.3.6.2752_signed.msi" target="_blank" rel="noreferrer">https://swupdate.openvpn.net/downloads/connect/openvpn-connect-3.3.6.2752_signed.msi</a></p><p>双击下载下来的openvpn-connect-3.3.6.2752_signed.msi软件，和安装其它软件一样，一步步安装即可。</p><p>注意：不一定非得安装这个软件，能创建虚拟网卡就行如win+R &quot;hdwwiz&quot;添加硬件,找到合适的网卡我个人觉得理论可行(此法慎用,当时我安装后电脑提示过时硬件一直引导不进系统修了一下午电脑)</p><p><img src="'+p+'" alt="image"></p><p>红框内所示的网卡是新添加的,安装完 OpenVPN 后名称可能会有所不同只需关注小红框中的网卡类型是否为“TAP-Windows Adapter”，找到这种类型的网卡即可确认这是新添加的网卡。此时，该网卡的连接状态会显示为未连接状态，无需担心，启动虚拟机后连接状态会变为正常。</p><p>这里修改为了tap0，其它的名称也可以，建议还是修改为tapXX这种形式，最好不要用中文名称。</p><p><img src="'+l+'" alt="image"></p><p>再选择你需要桥接到的网卡创建新网卡的网桥</p><p><img src="'+t+`" alt="image"></p><h3 id="创建linux-bat文件" tabindex="-1">创建linux bat文件 <a class="header-anchor" href="#创建linux-bat文件" aria-label="Permalink to &quot;创建linux bat文件&quot;">​</a></h3><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%创建硬盘文件%</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;E:\\qemu\\qemu-img.exe&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> create -f qcow2 D:\\qemu\\centos7\\centos7.9-aarch64.qcow2 50G</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">% 启动qemu程序,这里启动的是arm64 cpu型号的qemu程序 %</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;E:\\qemu\\qemu-system-aarch64.exe&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">% 要分配的内存 %</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-m </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8192</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">% 模拟的CPU %</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-cpu cortex-a76 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-smp 4,cores=4,threads=1,sockets=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-M virt </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">% 引导文件 %</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-bios F:\\iso\\QEMU_EFI.fd </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device VGA </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device nec-usb-xhci </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device usb-mouse </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device usb-kbd </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">% 使用的镜像位置 %</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-cdrom F:\\iso\\CentOS-7-aarch64-Minimal-2009.iso </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-net nic,model=virtio </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-net tap,ifname=tap0 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-boot d D:\\qemu\\centos7\\centos7.9-aarch64.qcow2</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参数参考:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-m 指定内存大小，单位M，2048就是2G。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-cpu 指定CPU型号，cortex-a53 是一款ARMv8架构的处理器。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-smp 依次为：逻辑处理器的个数、每个CPU的核心数、每个CPU的线程数、CPU的个数。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-bios UEFI固件的路径，前文【下载】的步骤中提到过。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-cdrom 光盘镜像文件的地址，这里就是操作系统安装镜像的路径。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-boot 当前虚拟机镜像的文件路径。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-net tap 指定后端网络类型是TAP，ifname指定TAP网卡的名字是tap0。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">qemu-system-aarch64.exe: 启动 AArch64 架构的 QEMU 模拟器。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-m 8192: 分配 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> GB 的内存给虚拟机。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-cpu cortex-a72: 指定使用 Cortex-A72 CPU 模型。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-smp 4,sockets=2,cores=2: 配置 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 个 CPU 核心，分为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 个插槽，每个插槽 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 个核心。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-M virt: 使用 “virt” 机器类型，适合虚拟化。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-bios </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;F:\\arm-os-test\\QEMU_EFI.fd&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 指定 EFI BIOS 文件。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-net nic -net tap,ifname=tap0: 设置网络，使用 NIC 和 tap 接口。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device VGA: 添加 VGA 显示设备。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device nec-usb-xhci: 添加 USB 控制器。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device usb-mouse -device usb-kbd: 添加 USB 鼠标和键盘设备。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-drive if=none,file=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;F:\\arm-os-test\\openeuler.qcow2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,id=hd0 -device virtio-blk-device,drive=hd0: 配置一个 VirtIO 块设备作为主磁盘。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-drive if=none,file=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;F:\\arm-os-test\\openEuler-22.03-LTS-SP4-aarch64-dvd.iso&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,id=cdrom,media=cdrom: 设置 CD-ROM 驱动器，使用指定的 ISO。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device virtio-scsi-device -device scsi-cd,drive=cdrom: 添加 SCSI 控制器，并连接 CD-ROM 驱动器。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%</span></span></code></pre></div><p><strong>说明</strong>：待操作系统安装完成后，如果后续需要使用，<strong>启动虚拟机的命令</strong>如下（无需再次指定ISO文件启动）：</p><div class="language-bat vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bat</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;E:\\qemu\\qemu-system-aarch64.exe&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-m </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8192</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-cpu cortex-a76 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-smp 4,cores=4,threads=1,sockets=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-M virt </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-bios D:\\qemu\\centos7\\QEMU_EFI.fd </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-global driver=cfi.pflash01,property=secure,value=off </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device VGA </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device nec-usb-xhci </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device usb-mouse </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-device usb-kbd </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-net nic,model=virtio </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-net tap,ifname=tap0 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">^</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-boot d D:\\qemu\\centos7\\centos7.9-aarch64.qcow2</span></span></code></pre></div>`,27)])])}const u=i(h,[["render",k]]);export{y as __pageData,u as default};
